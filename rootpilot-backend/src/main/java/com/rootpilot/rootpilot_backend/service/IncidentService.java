package com.rootpilot.rootpilot_backend.service;
import java.time.LocalDateTime;
import java.util.*;

import com.rootpilot.rootpilot_backend.dto.Alert;
import com.rootpilot.rootpilot_backend.dto.DashboardSummary;
import org.springframework.data.redis.core.RedisTemplate;
import com.rootpilot.rootpilot_backend.entity.Incident;
import com.rootpilot.rootpilot_backend.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(
            IncidentRepository incidentRepository,
            RedisTemplate<String, Object> redisTemplate) {

        this.incidentRepository = incidentRepository;
        this.redisTemplate = redisTemplate;
    }

    public Incident saveIncident(
            Incident incident) {

        Incident saved =
                incidentRepository.save(incident);

        redisTemplate.opsForValue()
                .increment("liveIncidentCount");
        System.out.println(
                "SERVICE = "
                        + incident.getServiceName()
        );
        redisTemplate.opsForValue()
                .increment(
                        "service:"
                                + incident.getServiceName()
                );
        redisTemplate.opsForValue()
                .increment(
                        "exception:"
                                + incident.getExceptionType()
                );
        redisTemplate.opsForValue()
                .increment(
                        "correlation:"
                                + incident.getServiceName()
                                + "|"
                                + incident.getExceptionType()
                );
        redisTemplate.delete("totalIncidents");
        redisTemplate.delete("serviceMetrics");
        redisTemplate.delete("exceptionMetrics");
        redisTemplate.delete("rcaSummary");
        redisTemplate.delete("recentRcaSummary");

        return saved;
    }

    public List<Incident> getAllIncidents() {

        return incidentRepository.findAll();
    }

    public Optional<Incident> getIncidentById(
            Long id) {

        return incidentRepository.findById(id);
    }
    public long getTotalIncidents() {

        String cacheKey = "totalIncidents";

        Object cachedValue =
                redisTemplate.opsForValue()
                        .get(cacheKey);

        if (cachedValue != null) {

            return Long.parseLong(
                    cachedValue.toString()
            );
        }

        long count =
                incidentRepository.count();

        redisTemplate.opsForValue()
                .set(cacheKey, count);

        return count;
    }
    public List<String> getAllServices() {

        return incidentRepository.findDistinctServiceNames();
    }
    @SuppressWarnings("unchecked")
    public Map<String, Long> getExceptionMetrics() {

        String cacheKey = "exceptionMetrics";

        Object cached =
                redisTemplate.opsForValue()
                        .get(cacheKey);

        if (cached != null) {

            return (Map<String, Long>) cached;
        }

        List<Object[]> results =
                incidentRepository.countIncidentsByException();

        Map<String, Long> metrics =
                new HashMap<>();

        for (Object[] row : results) {

            metrics.put(
                    (String) row[0],
                    (Long) row[1]
            );
        }

        redisTemplate.opsForValue()
                .set(cacheKey, metrics);

        return metrics;
    }
    @SuppressWarnings("unchecked")
    public Map<String, Long> getServiceMetrics() {

        String cacheKey = "serviceMetrics";

        Object cached =
                redisTemplate.opsForValue()
                        .get(cacheKey);

        if (cached != null) {

            return (Map<String, Long>) cached;
        }

        List<Object[]> results =
                incidentRepository.countIncidentsByService();

        Map<String, Long> metrics =
                new HashMap<>();

        for (Object[] row : results) {

            metrics.put(
                    (String) row[0],
                    (Long) row[1]
            );
        }

        redisTemplate.opsForValue()
                .set(cacheKey, metrics);

        return metrics;
    }
    public Map<String, Long> getExceptionCounts() {

        return incidentRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        Incident::getExceptionType,
                        Collectors.counting()
                ));
    }
    public Map<String, Object> getTopFailingService() {

        Map<String, Long> metrics = getServiceMetrics();

        Map.Entry<String, Long> topService =
                metrics.entrySet()
                        .stream()
                        .max(Map.Entry.comparingByValue())
                        .orElse(null);

        if (topService == null) {
            return Map.of();
        }

        return Map.of(
                "service", topService.getKey(),
                "incidentCount", topService.getValue()
        );
    }
    public Map<String, Object> getTopException() {

        Map<String, Long> metrics = getExceptionMetrics();

        Map.Entry<String, Long> topException =
                metrics.entrySet()
                        .stream()
                        .max(Map.Entry.comparingByValue())
                        .orElse(null);

        if (topException == null) {
            return Map.of();
        }

        return Map.of(
                "exception", topException.getKey(),
                "incidentCount", topException.getValue()
        );
    }
    public Map<String, Object> getAnalysisSummary() {

        Map<String, Object> topService =
                getTopFailingService();

        Map<String, Object> topException =
                getTopException();

        Map<String, Object> summary =
                new HashMap<>();

        summary.put(
                "totalIncidents",
                getTotalIncidents()
        );

        summary.put(
                "topService",
                topService.get("service")
        );

        summary.put(
                "topServiceIncidentCount",
                topService.get("incidentCount")
        );

        summary.put(
                "topException",
                topException.get("exception")
        );

        summary.put(
                "topExceptionIncidentCount",
                topException.get("incidentCount")
        );

        return summary;
    }
    public List<Map<String, Object>> getServiceRanking() {

        return getServiceMetrics()
                .entrySet()
                .stream()
                .sorted(
                        Map.Entry.<String, Long>comparingByValue()
                                .reversed()
                )
                .map(entry -> {

                    Map<String, Object> service =
                            new HashMap<>();

                    service.put(
                            "service",
                            entry.getKey()
                    );

                    service.put(
                            "incidentCount",
                            entry.getValue()
                    );

                    return service;
                })
                .toList();
    }
    public List<Map<String, Object>> getExceptionRanking() {

        return getExceptionMetrics()
                .entrySet()
                .stream()
                .sorted(
                        Map.Entry.<String, Long>comparingByValue()
                                .reversed()
                )
                .map(entry -> {

                    Map<String, Object> exception =
                            new HashMap<>();

                    exception.put(
                            "exception",
                            entry.getKey()
                    );

                    exception.put(
                            "incidentCount",
                            entry.getValue()
                    );

                    return exception;
                })
                .toList();
    }
    public Map<String, Object> getRootCauseCandidates() {

        Map<String, Object> topService =
                getTopFailingService();

        Map<String, Object> topException =
                getTopException();

        return Map.of(
                "topService",
                topService.get("service"),

                "topException",
                topException.get("exception"),

                "probableRootCause",
                topException.get("exception")
                        + " in "
                        + topService.get("service")
        );
    }
    public List<Map<String, Object>> getCorrelations() {

        List<Object[]> results =
                incidentRepository.countServiceExceptionCorrelations();

        List<Map<String, Object>> correlations =
                new ArrayList<>();

        for (Object[] row : results) {

            Map<String, Object> correlation =
                    new HashMap<>();

            correlation.put(
                    "service",
                    row[0]
            );

            correlation.put(
                    "exception",
                    row[1]
            );

            correlation.put(
                    "incidentCount",
                    row[2]
            );

            correlations.add(correlation);
        }

        return correlations;
    }
    public Map<String, Object> getTopCorrelation() {

        List<Map<String, Object>> correlations =
                getCorrelations();

        if (correlations.isEmpty()) {
            return Map.of();
        }

        return correlations.get(0);
    }
    @SuppressWarnings("unchecked")
    public Map<String, Object> getRcaSummary() {

        String cacheKey = "rcaSummary";

        Object cached =
                redisTemplate.opsForValue()
                        .get(cacheKey);

        if (cached != null) {

            return (Map<String, Object>) cached;
        }

        Map<String, Object> summary =
                new HashMap<>();

        Map<String, Object> topService =
                getTopFailingService();

        Map<String, Object> topException =
                getTopException();

        Map<String, Object> topCorrelation =
                getTopCorrelation();

        summary.put(
                "totalIncidents",
                getTotalIncidents()
        );

        summary.put(
                "topService",
                topService.get("service")
        );

        summary.put(
                "topException",
                topException.get("exception")
        );

        summary.put(
                "topCorrelation",
                topCorrelation
        );

        summary.put(
                "probableRootCause",
                topCorrelation.get("exception")
                        + " in "
                        + topCorrelation.get("service")
        );

        redisTemplate.opsForValue()
                .set(cacheKey, summary);

        return summary;
    }
    public Map<String, Long> getRecentIncidentCount() {

        LocalDateTime since =
                LocalDateTime.now().minusHours(1);

        long count =
                incidentRepository.countRecentIncidents(
                        since
                );

        return Map.of(
                "recentIncidents",
                count
        );
    }
    public List<Map<String, Object>> getHourlyTrend() {

        List<Object[]> results =
                incidentRepository.getHourlyTrend();

        List<Map<String, Object>> trend =
                new ArrayList<>();

        for (Object[] row : results) {

            Map<String, Object> point =
                    new HashMap<>();

            point.put(
                    "hour",
                    row[0].toString()
            );

            point.put(
                    "count",
                    row[1]
            );

            trend.add(point);
        }

        return trend;
    }
    public Map<String, Object> detectSpike() {

        List<Map<String, Object>> trend =
                getHourlyTrend();

        if (trend.size() < 2) {

            return Map.of(
                    "message",
                    "Not enough data for spike detection"
            );
        }

        Map<String, Object> previous =
                trend.get(trend.size() - 2);

        Map<String, Object> current =
                trend.get(trend.size() - 1);

        long previousCount =
                ((Number) previous.get("count"))
                        .longValue();

        long currentCount =
                ((Number) current.get("count"))
                        .longValue();

        double increasePercent = 0;

        if (previousCount > 0) {

            increasePercent =
                    ((double)
                            (currentCount - previousCount)
                            / previousCount)
                            * 100;
        }

        boolean spikeDetected =
                increasePercent > 50;

        Map<String, Object> result =
                new HashMap<>();

        result.put(
                "currentHourIncidents",
                currentCount
        );

        result.put(
                "previousHourIncidents",
                previousCount
        );

        result.put(
                "increasePercent",
                Math.round(increasePercent * 100.0) / 100.0
        );

        result.put(
                "spikeDetected",
                spikeDetected
        );

        return result;
    }
    public Map<String, Object> getRecentTopService() {

        LocalDateTime since =
                LocalDateTime.now().minusHours(1);

        List<Object[]> results =
                incidentRepository
                        .countRecentIncidentsByService(
                                since
                        );

        if (results.isEmpty()) {
            return Map.of();
        }

        Object[] row = results.get(0);

        return Map.of(
                "service",
                row[0],
                "incidentCount",
                row[1]
        );
    }
    public Map<String, Object> getRecentTopException() {

        LocalDateTime since =
                LocalDateTime.now().minusHours(1);

        List<Object[]> results =
                incidentRepository
                        .countRecentIncidentsByException(
                                since
                        );

        if (results.isEmpty()) {
            return Map.of();
        }

        Object[] row = results.get(0);

        return Map.of(
                "exception",
                row[0],
                "incidentCount",
                row[1]
        );
    }
    public Map<String, Object> getTrendSummary() {

        Map<String, Long> recentIncidents =
                getRecentIncidentCount();

        Map<String, Object> spike =
                detectSpike();

        Map<String, Object> recentService =
                getRecentTopService();

        Map<String, Object> recentException =
                getRecentTopException();

        Map<String, Object> summary =
                new HashMap<>();

        summary.put(
                "recentIncidents",
                recentIncidents.get("recentIncidents")
        );

        summary.put(
                "spikeDetected",
                spike.get("spikeDetected")
        );

        summary.put(
                "topRecentService",
                recentService.get("service")
        );

        summary.put(
                "topRecentException",
                recentException.get("exception")
        );

        return summary;
    }
    public List<Map<String, Object>> getRecentCorrelations() {

        LocalDateTime since =
                LocalDateTime.now().minusHours(1);

        List<Object[]> results =
                incidentRepository.countRecentCorrelations(
                        since
                );

        List<Map<String, Object>> correlations =
                new ArrayList<>();

        for (Object[] row : results) {

            Map<String, Object> correlation =
                    new HashMap<>();

            correlation.put(
                    "service",
                    row[0]
            );

            correlation.put(
                    "exception",
                    row[1]
            );

            correlation.put(
                    "incidentCount",
                    row[2]
            );

            correlations.add(correlation);
        }

        return correlations;
    }
    public Map<String, Object> getRecentTopCorrelation() {

        List<Map<String, Object>> correlations =
                getRecentCorrelations();

        if (correlations.isEmpty()) {
            return Map.of();
        }

        return correlations.get(0);
    }
    @SuppressWarnings("unchecked")
    public Map<String, Object> getRecentRcaSummary() {

        String cacheKey = "recentRcaSummary";

        Object cached =
                redisTemplate.opsForValue()
                        .get(cacheKey);

        if (cached != null) {

            return (Map<String, Object>) cached;
        }

        Map<String, Long> recentIncidents =
                getRecentIncidentCount();

        Map<String, Object> spike =
                detectSpike();

        Map<String, Object> topService =
                getRecentTopService();

        Map<String, Object> topException =
                getRecentTopException();

        Map<String, Object> topCorrelation =
                getRecentTopCorrelation();

        Map<String, Object> summary =
                new HashMap<>();

        summary.put(
                "recentIncidents",
                recentIncidents.get("recentIncidents")
        );

        summary.put(
                "spikeDetected",
                spike.get("spikeDetected")
        );

        summary.put(
                "topService",
                topService.get("service")
        );

        summary.put(
                "topException",
                topException.get("exception")
        );

        summary.put(
                "topCorrelation",
                topCorrelation
        );

        summary.put(
                "probableRootCause",
                topCorrelation.get("exception")
                        + " in "
                        + topCorrelation.get("service")
        );

        redisTemplate.opsForValue()
                .set(cacheKey, summary);

        return summary;
    }
    public Map<String, Object> getSeverityAnalysis() {

        Map<String, Long> recentIncidents =
                getRecentIncidentCount();

        Map<String, Object> spike =
                detectSpike();

        long incidentCount =
                recentIncidents.get("recentIncidents");

        boolean spikeDetected =
                Boolean.TRUE.equals(
                        spike.get("spikeDetected")
                );

        String severity;

        if (spikeDetected || incidentCount > 25) {

            severity = "HIGH";

        } else if (incidentCount > 10) {

            severity = "MEDIUM";

        } else {

            severity = "LOW";
        }

        Map<String, Object> result =
                new HashMap<>();

        result.put(
                "severity",
                severity
        );

        result.put(
                "recentIncidents",
                incidentCount
        );

        result.put(
                "spikeDetected",
                spikeDetected
        );

        return result;
    }
    private final RedisTemplate<String, Object> redisTemplate;
    public Map<String, Long> getLiveIncidentCount() {

        Object count =
                redisTemplate.opsForValue()
                        .get("liveIncidentCount");

        long liveCount = 0;

        if (count != null) {

            liveCount =
                    Long.parseLong(
                            count.toString()
                    );
        }

        return Map.of(
                "liveIncidentCount",
                liveCount
        );
    }

    public Map<String, Long> getLiveServiceCounts() {

        Object count =
                redisTemplate.opsForValue()
                        .get("service:auth-service");

        long serviceCount = 0;

        if (count != null) {

            serviceCount =
                    Long.parseLong(
                            count.toString()
                    );
        }

        return Map.of(
                "auth-service",
                serviceCount
        );
    }
    public Map<String, Object> testExceptionCounter() {

        Object value =
                redisTemplate.opsForValue()
                        .get(
                                "exception:NullPointerException"
                        );

        return Map.of(
                "value",
                String.valueOf(value)
        );
    }
    public Map<String, Long> getLiveExceptionCounts() {

        Object count =
                redisTemplate.opsForValue()
                        .get(
                                "exception:NullPointerException"
                        );

        long exceptionCount = 0;

        if (count != null) {

            exceptionCount =
                    Long.parseLong(
                            count.toString()
                    );
        }

        return Map.of(
                "NullPointerException",
                exceptionCount
        );
    }
    public List<String> generateAlerts() {

        List<String> alerts = new ArrayList<>();

        Object countObject =
                redisTemplate.opsForValue()
                        .get("liveIncidentCount");

        long totalIncidents = 0;

        if (countObject instanceof Number number) {
            totalIncidents = number.longValue();
        }

        if (totalIncidents > 20) {
            alerts.add("HIGH incident volume detected");
        }
        Set<String> serviceKeys =
                redisTemplate.keys("service:*");

        String topService = null;
        long maxCount = 0;

        if (serviceKeys != null) {

            for (String key : serviceKeys) {

                Object value =
                        redisTemplate.opsForValue().get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxCount) {

                    maxCount = count;

                    topService =
                            key.replace("service:", "");
                }
            }
        }

        if (topService != null) {

            alerts.add(
                    topService
                            + " is currently failing most often"
            );
        }
        Set<String> exceptionKeys =
                redisTemplate.keys("exception:*");

        String topException = null;
        long maxExceptionCount = 0;

        if (exceptionKeys != null) {

            for (String key : exceptionKeys) {

                Object value =
                        redisTemplate.opsForValue().get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxExceptionCount) {

                    maxExceptionCount = count;

                    topException =
                            key.replace("exception:", "");
                }
            }
        }

        if (topException != null) {

            alerts.add(
                    topException
                            + " is dominant"
            );
        }
        List<Incident> recentIncidents =
                incidentRepository.findAll()
                        .stream()
                        .filter(i ->
                                i.getTimestamp()
                                        .isAfter(
                                                LocalDateTime.now().minusHours(1)
                                        )
                        )
                        .toList();
        String topCorrelation = "N/A";

        Set<String> correlationKeys =
                redisTemplate.keys("correlation:*");


        long maxCorrelationCount = 0;

        if (correlationKeys != null) {

            for (String key : correlationKeys) {

                Object value =
                        redisTemplate.opsForValue().get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxCorrelationCount) {

                    maxCorrelationCount = count;

                    topCorrelation =
                            key.replace("correlation:", "");
                }
            }
        }

        if (topCorrelation != null) {

            alerts.add(
                    "Strong correlation detected: "
                            + topCorrelation
                            .replace("|", " with ")
            );
        }
        if (totalIncidents > 50) {

            alerts.add("CRITICAL incident situation detected");

        } else if (totalIncidents > 20) {

            alerts.add("HIGH severity incident situation");

        } else if (totalIncidents > 5) {

            alerts.add("MEDIUM severity incident situation");

        }

        if (recentIncidents.size() > 10) {
            alerts.add("Recent failure spike detected");
        }


        return alerts;
    }
    public List<Alert> generateScoredAlerts() {

        List<Alert> alerts = new ArrayList<>();

        Object countObject =
                redisTemplate.opsForValue()
                        .get("liveIncidentCount");

        long totalIncidents = 0;

        if (countObject instanceof Number number) {
            totalIncidents = number.longValue();
        }

        if (totalIncidents > 50) {

            alerts.add(
                    new Alert(
                            "CRITICAL",
                            "Incident volume exceeds 50"
                    )
            );

        } else if (totalIncidents > 20) {

            alerts.add(
                    new Alert(
                            "HIGH",
                            "Incident volume exceeds 20"
                    )
            );
        }
        Set<String> serviceKeys =
                redisTemplate.keys("service:*");

        String topService = null;
        long maxServiceCount = 0;

        if (serviceKeys != null) {

            for (String key : serviceKeys) {

                Object value =
                        redisTemplate.opsForValue().get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxServiceCount) {

                    maxServiceCount = count;

                    topService =
                            key.replace("service:", "");
                }
            }
        }

        if (topService != null) {

            alerts.add(
                    new Alert(
                            "HIGH",
                            topService
                                    + " is failing most often"
                    )
            );
        }
        Set<String> exceptionKeys =
                redisTemplate.keys("exception:*");

        String topException = null;
        long maxExceptionCount = 0;

        if (exceptionKeys != null) {

            for (String key : exceptionKeys) {

                Object value =
                        redisTemplate.opsForValue().get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxExceptionCount) {

                    maxExceptionCount = count;

                    topException =
                            key.replace("exception:", "");
                }
            }
        }

        if (topException != null) {

            alerts.add(
                    new Alert(
                            "HIGH",
                            topException
                                    + " is dominant"
                    )
            );
        }
        Set<String> correlationKeys =
                redisTemplate.keys("correlation:*");

        String topCorrelation = null;
        long maxCorrelationCount = 0;

        if (correlationKeys != null) {

            for (String key : correlationKeys) {

                Object value =
                        redisTemplate.opsForValue().get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxCorrelationCount) {

                    maxCorrelationCount = count;

                    topCorrelation =
                            key.replace("correlation:", "");
                }
            }
        }

        if (topCorrelation != null) {

            alerts.add(
                    new Alert(
                            "HIGH",
                            "Strong correlation detected: "
                                    + topCorrelation.replace("|", " with ")
                    )
            );
        }
        List<Incident> recentIncidents =
                incidentRepository.findAll()
                        .stream()
                        .filter(i ->
                                i.getTimestamp()
                                        .isAfter(
                                                LocalDateTime.now()
                                                        .minusHours(1)
                                        )
                        )
                        .toList();

        if (recentIncidents.size() > 10) {

            alerts.add(
                    new Alert(
                            "CRITICAL",
                            "Recent failure spike detected"
                    )
            );
        }
        return alerts;
    }
    public DashboardSummary getDashboardSummary() {

        Object countObject =
                redisTemplate.opsForValue()
                        .get("liveIncidentCount");

        long totalIncidents = 0;

        if (countObject instanceof Number number) {
            totalIncidents = number.longValue();
        }

        String topService = "N/A";
        long maxServiceCount = 0;

        Set<String> serviceKeys =
                redisTemplate.keys("service:*");

        if (serviceKeys != null) {

            for (String key : serviceKeys) {

                Object value =
                        redisTemplate.opsForValue()
                                .get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxServiceCount) {

                    maxServiceCount = count;

                    topService =
                            key.replace("service:", "");
                }
            }
        }

        String topException = "N/A";
        long maxExceptionCount = 0;
        int alertsCount =
                generateAlerts().size();

        int scoredAlertsCount =
                generateScoredAlerts().size();
        String topCorrelation = "N/A";

        Set<String> correlationKeys =
                redisTemplate.keys("correlation:*");

        long maxCorrelationCount = 0;

        if (correlationKeys != null) {

            for (String key : correlationKeys) {

                Object value =
                        redisTemplate.opsForValue().get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxCorrelationCount) {

                    maxCorrelationCount = count;

                    topCorrelation =
                            key.replace("correlation:", "")
                                    .replace("|", " with ");
                }
            }
        }
        Set<String> exceptionKeys =
                redisTemplate.keys("exception:*");

        if (exceptionKeys != null) {

            for (String key : exceptionKeys) {

                Object value =
                        redisTemplate.opsForValue()
                                .get(key);

                long count = 0;

                if (value instanceof Number number) {
                    count = number.longValue();
                }

                if (count > maxExceptionCount) {

                    maxExceptionCount = count;

                    topException =
                            key.replace("exception:", "");
                }
            }
        }

        String severity = "LOW";

        if (totalIncidents > 50) {
            severity = "CRITICAL";
        } else if (totalIncidents > 20) {
            severity = "HIGH";
        } else if (totalIncidents > 5) {
            severity = "MEDIUM";
        }

        return new DashboardSummary(
                totalIncidents,
                topService,
                topException,
                severity,
                alertsCount,
                scoredAlertsCount,
                topCorrelation
        );
    }

}