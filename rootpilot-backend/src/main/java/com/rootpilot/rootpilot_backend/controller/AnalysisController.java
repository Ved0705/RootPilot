package com.rootpilot.rootpilot_backend.controller;

import com.rootpilot.rootpilot_backend.service.IncidentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    private final IncidentService incidentService;

    public AnalysisController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping("/exceptions")
    public Map<String, Long> getExceptionAnalysis() {

        return incidentService.getExceptionMetrics();
    }

    @GetMapping("/top-service")
    public Map<String, Object> getTopService() {

        return incidentService.getTopFailingService();
    }
    @GetMapping("/top-exception")
    public Map<String, Object> getTopException() {

        return incidentService.getTopException();
    }
    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        return incidentService.getAnalysisSummary();
    }
    @GetMapping("/service-ranking")
    public List<Map<String, Object>> getServiceRanking() {

        return incidentService.getServiceRanking();
    }
    @GetMapping("/exception-ranking")
    public List<Map<String, Object>> getExceptionRanking() {

        return incidentService.getExceptionRanking();
    }
    @GetMapping("/root-cause-candidates")
    public Map<String, Object> getRootCauseCandidates() {

        return incidentService.getRootCauseCandidates();
    }
    @GetMapping("/correlations")
    public List<Map<String, Object>> getCorrelations() {

        return incidentService.getCorrelations();
    }
}