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
}