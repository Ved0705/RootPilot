package com.rootpilot.rootpilot_backend.dto;

public class DashboardSummary {

    private long totalIncidents;
    private String topService;
    private String topException;
    private String severity;

    public DashboardSummary(
            long totalIncidents,
            String topService,
            String topException,
            String severity) {

        this.totalIncidents = totalIncidents;
        this.topService = topService;
        this.topException = topException;
        this.severity = severity;
    }

    public long getTotalIncidents() {
        return totalIncidents;
    }

    public String getTopService() {
        return topService;
    }

    public String getTopException() {
        return topException;
    }

    public String getSeverity() {
        return severity;
    }
}