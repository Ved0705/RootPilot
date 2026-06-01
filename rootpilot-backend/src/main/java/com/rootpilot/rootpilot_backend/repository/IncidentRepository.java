package com.rootpilot.rootpilot_backend.repository;

import com.rootpilot.rootpilot_backend.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentRepository
        extends JpaRepository<Incident, Long> {

}