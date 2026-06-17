package com.rootpilot.rootpilot_backend.service;

import com.rootpilot.rootpilot_backend.dto.BusinessService;
import com.rootpilot.rootpilot_backend.dto.BusinessServiceImpact;
import com.rootpilot.rootpilot_backend.dto.BusinessServiceImpactDetail;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessServiceService {

    public List<BusinessService> getBusinessServices() {
        return List.of(
            new BusinessService(1L, "Payment Gateway", "Core payment processing", "Finance Team", 50000.0, "HEALTHY"),
            new BusinessService(2L, "User Authentication", "Login and IAM", "Security Team", 25000.0, "DEGRADED"),
            new BusinessService(3L, "Order Processing", "Cart and Checkout", "Commerce Team", 75000.0, "HEALTHY")
        );
    }

    public BusinessServiceImpact getBusinessServiceImpact() {
        return new BusinessServiceImpact(
            25000.0,
            1,
            0,
            List.of(
                new BusinessServiceImpactDetail("User Authentication", "DEGRADED", 25000.0, "Security Team")
            )
        );
    }
}
