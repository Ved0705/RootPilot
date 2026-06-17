package com.rootpilot.rootpilot_backend.service;

import com.rootpilot.rootpilot_backend.dto.DailyBriefing;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class OperationalBriefingService {

    public DailyBriefing getTodayBriefing() {
        return new DailyBriefing(
            1L,
            LocalDate.now().toString(),
            0,
            0,
            5.0,
            95.0,
            100.0,
            "N/A",
            "System is currently operating smoothly. No major incidents reported today. All core business services are healthy."
        );
    }
}
