package com.rootpilot.rootpilot_backend.service;
import java.time.LocalDateTime;
import java.util.*;

import com.rootpilot.rootpilot_backend.entity.Incident;
import com.rootpilot.rootpilot_backend.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(
            IncidentRepository incidentRepository) {

        this.incidentRepository = incidentRepository;
    }

    public Incident saveIncident(
            Incident incident) {

        return incidentRepository.save(incident);
    }

    public List<Incident> getAllIncidents() {

        return incidentRepository.findAll();
    }

    public Optional<Incident> getIncidentById(
            Long id) {

        return incidentRepository.findById(id);
    }
    public long getTotalIncidents() {

        return incidentRepository.count();
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
}