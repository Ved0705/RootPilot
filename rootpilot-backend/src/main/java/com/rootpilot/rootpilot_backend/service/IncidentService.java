package com.rootpilot.rootpilot_backend.service;
import java.time.LocalDateTime;
import java.util.*;
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

        redisTemplate.delete(
                "totalIncidents"
        );

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
    public Map<String, Long> getExceptionMetrics() {

        List<Object[]> results =
                incidentRepository.countIncidentsByException();

        Map<String, Long> metrics = new HashMap<>();

        for (Object[] row : results) {

            metrics.put(
                    (String) row[0],
                    (Long) row[1]
            );
        }

        return metrics;
    }
    public Map<String, Long> getServiceMetrics() {

        List<Object[]> results =
                incidentRepository.countIncidentsByService();

        Map<String, Long> metrics = new HashMap<>();

        for (Object[] row : results) {

            metrics.put(
                    (String) row[0],
                    (Long) row[1]
            );
        }

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
    public Map<String, Object> getRcaSummary() {

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
    public Map<String, Object> getRecentRcaSummary() {

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
}