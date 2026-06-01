package com.rootpilot.rootpilot_backend.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rootpilot.rootpilot_backend.config.RabbitMQConfig;
import com.rootpilot.rootpilot_backend.entity.Incident;
import com.rootpilot.rootpilot_backend.event.FailureEvent;
import com.rootpilot.rootpilot_backend.service.IncidentService;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class FailureEventConsumer {

    private final IncidentService incidentService;
    private final ObjectMapper objectMapper;

    public FailureEventConsumer(
            IncidentService incidentService,
            ObjectMapper objectMapper) {

        this.incidentService = incidentService;
        this.objectMapper = objectMapper;
    }

    @RabbitListener(
            queues = RabbitMQConfig.FAILURE_QUEUE)
    public void consume(Message message) {

        try {

            FailureEvent event =
                    objectMapper.readValue(
                            message.getBody(),
                            FailureEvent.class);

            System.out.println(
                    "Received Failure Event: "
                            + event.getExceptionType());

            Incident incident = new Incident();

            incident.setServiceName(
                    event.getServiceName());

            incident.setEndpoint(
                    event.getEndpoint());

            incident.setStatusCode(
                    event.getStatusCode());

            incident.setLatency(
                    event.getLatency());

            incident.setExceptionType(
                    event.getExceptionType());

            incident.setVersion(
                    event.getVersion());

            incident.setTimestamp(
                    event.getTimestamp());

            incidentService.saveIncident(incident);

            System.out.println(
                    "Incident saved successfully");

        } catch (Exception e) {

            System.out.println(
                    "Failed to process message");

            e.printStackTrace();
        }
    }
}