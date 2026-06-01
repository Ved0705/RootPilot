package com.rootpilot.rootpilot_backend.controller;

import com.rootpilot.rootpilot_backend.service.IncidentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}