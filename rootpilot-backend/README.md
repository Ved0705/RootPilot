# RootPilot Backend — Operations Intelligence Platform

RootPilot Backend is a distributed systems monitoring, SRE automation, and AIOps resilience platform built with Spring Boot. It handles real-time telemetry ingestion, performs statistical anomaly calculations, supports GenAI-powered triaging, and manages stateless authentication.

---

## 🚀 Key Features

* **Real-time Event Ingestion**: Ingests asynchronous failure events through an event-driven pipeline powered by **RabbitMQ**.
* **Statistical Anomaly Detection (Z-Score)**: Dynamically calculates standard deviation ($\sigma$) and mean ($\mu$) over a 30-point rolling window of performance metrics. Identifies anomalies when the absolute Z-Score $|Z| > 3.0$ and caches them in **Redis**.
* **GenAI-Powered SRE Copilot**: Integrates directly with **Google Gemini 1.5 Flash API** to reason over live system metrics (incidents, SLOs, anomalies) and generate actionable recommendations, with an offline domain-specific fallback engine.
* **Stateless Security (JWT)**: Employs signed HMAC-SHA256 tokens for session security and granular route authentication, using **Spring Security** and **BCrypt** password hashing.
* **Autonomous Operations Engine**: Orchestrates self-healing remediation plans, tracks overall automation readiness scores, and manages execution plans.

---

## 🛠️ Technology Stack

* **Language**: Java 21
* **Framework**: Spring Boot 3.x / Spring Web
* **Database**: PostgreSQL (Persistent storage for incidents, catalog data, and anomaly events)
* **Metrics Caching**: Redis (High-frequency telemetry and rolling Z-score storage)
* **Event Broker**: RabbitMQ (Asynchronous failure event simulation ingestion)
* **Security**: Spring Security & jjwt (JSON Web Token library)

---

## ⚙️ Prerequisites

Before launching the server, ensure the following local services are running:

1. **PostgreSQL** (Port: `5432`): Create a database named `rootpilot`.
2. **Redis** (Port: `6379`).
3. **RabbitMQ** (Port: `5672` / `15672`).

---

## 🔧 Installation & Setup

### 1. Clone & Configure Environment Variables
You can customize the datasource and provider configurations in `src/main/resources/application.yml` or export them as environment variables:

```bash
# Database Settings
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/rootpilot?options=-c%20TimeZone=UTC
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=postgres

# Message Broker
export SPRING_RABBITMQ_HOST=localhost
export SPRING_RABBITMQ_USERNAME=guest
export SPRING_RABBITMQ_PASSWORD=guest

# Redis Cache
export SPRING_DATA_REDIS_HOST=localhost
export SPRING_DATA_REDIS_PORT=6379

# GenAI Integration (Optional - Enables live Gemini Copilot responses)
export GEMINI_API_KEY=your_gemini_api_key
```

### 2. Build and Compile the Application
Use Maven to clean compile the codebase:
```bash
mvn clean compile
```

### 3. Run the Server
Launch the Spring Boot application:
```bash
mvn spring-boot:run
```
The server will boot up and bind to **port 8080**.

---

## 📡 API Endpoints Summary

### Authentication (`/api/auth`)
* `POST /api/auth/login` - Authenticate username/password and return JWT. (Default accounts: `admin`/`sre`/`operator`/`viewer` - Password: `rootpilot`).
* `GET /api/auth/session` - Return session details from thread-local security context.

### Incident Ingestion & Management
* `GET /api/incidents` - Retrieve all recorded incident history.
* `POST /api/telemetry/ingest` - Directly push new metrics telemetry points.

### AIOps & RCA Analytics (`/api/analysis`)
* `GET /api/analysis/dashboard` - High-level metrics aggregator.
* `GET /api/analysis/anomalies` - Active Z-score violations.
* `GET /api/analysis/recommendations` - AI-generated corrective recommendations.
* `GET /api/analysis/service-reliability` - Dynamic service SLO metrics.
* `GET /api/analysis/top-dependencies` - Blast radius service dependency map.

### Operations Copilot (`/api/copilot`)
* `POST /api/copilot/ask` - Send SRE queries. Expects JSON `{ "question": "..." }` and returns answers along with risk badges and recommendations.
