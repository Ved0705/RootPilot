# RootPilot Frontend — Observability & SRE Dashboard

RootPilot Frontend is a premium Single Page Application (SPA) designed to act as an SRE CommandCenter, Incident Response interface, and RCA (Root Cause Analysis) workbench. It communicates with the Spring Boot backend to visualize real-time telemetry metrics.

---

## 🚀 Key Features

* **AI Ops Command Center**: High-density dashboards displaying platform health, alert statuses, latency charts, and priority services requiring SRE attention.
* **Root Cause Analysis (RCA) Workbench**: Tracks probable verdicts, statistical deviations, and draws interactive topology relationship maps.
* **Operations Copilot Drawer**: A side-drawer AI assistant featuring dynamic suggested questions, SRE risk assessment badges, confidence indicators, and retry recovery fallbacks.
* **Service Intelligence Registry**: Full catalog containing ownership, owner info, uptime SLA metrics, availability buckets, and change histories.
* **Interactive UI Transitions**: Premium feel with 3D lift translations on cards, active button shrinkage feedback, and custom styled scrollbars.
* **Synchronized Dark/Light Theme**: A unified CSS variables and Material-UI design system that switches dark/light layout values dynamically.

---

## 🛠️ Technology Stack

* **Build Tool**: Vite (extremely fast development and bundling)
* **Framework**: React 18 & TypeScript
* **State Management**: Zustand
* **Query Caching**: TanStack Query (React Query)
* **Design System**: Material-UI (MUI 5) & Vanilla CSS Variables
* **Topology Visualization**: React Flow (for SRE relationship maps)

---

## 🔧 Installation & Setup

### 1. Install Dependencies
Navigate to the frontend directory and install the packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of the project (if it doesn't already exist):
```env
# URL target of the Spring Boot backend server
VITE_API_BASE_URL=http://localhost:3000
```
*(Note: Set the backend URL to proxy requests through Vite's dev server to localhost:8080 to prevent CORS issues).*

### 3. Launch Development Server
Start the frontend dev environment:
```bash
npm run dev
```
The application will launch on your local IP or localhost: **http://localhost:3000**.

---

## 📂 Project Structure

* `src/api` — Base HTTP client (Axios configuration, endpoints mapping)
* `src/components` — Shared controls (Loading/Error/Empty states, Status pills, Copilot drawer)
* `src/context` — Authentication providers (JWT localStorage session handlers)
* `src/layouts` — Application templates and sidebar navigation shells
* `src/pages` — Command Center, Incidents timeline, RCA graphs, Settings
* `src/theme` — Theme provider declarations (Light/Dark tokens)
* `src/types` — TypeScript mappings of Spring Boot entity models
