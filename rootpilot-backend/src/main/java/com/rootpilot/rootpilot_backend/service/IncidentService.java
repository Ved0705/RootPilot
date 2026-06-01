package com.rootpilot.rootpilot_backend.service;
import java.util.HashMap;
import java.util.Map;
import com.rootpilot.rootpilot_backend.entity.Incident;
import com.rootpilot.rootpilot_backend.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
}