# Refueller Management System

A Vue 3 application for managing refuellers. The project allows users to organize issues into refuellers, add, edit, and delete issues. 

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Features

- **Admin Dashboard**: Manage refuellers and issues via an graphic interface.
- **Issue Management**: Create, update, delete, and assign issues to refuellers. Validate issue types to prevent duplicates within a refueller.
- **Drag-and-Drop**: Easily move issues between refuellers with live feedback and sorting by type.
- **Dynamic Routing**: View or edit issues via `/issues/:id`.
- **Validation & Notifications**: Real-time validation and toast notifications for all actions.
- **Responsive Design**: Horizontal and vertical scrolling optimized for refuellers and issues.
- **Tech Stack**: Vue 3 (Frontend), Node.js + Express.js (Backend), PostgreSQL (Database), REST-like API.

---

## Technologies

- **Frontend**: Vue 3, Pinia, Vue Router, Vite for development and build
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Knex.js for database migrations and queries

---
## Setup

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/axywe/bmstu_web.git
   cd bmstu_web
   ```

2. **Initialize the project**:
   Run the following command to set up and prepare the project:
   ```bash
   make init
   ```

3. **Build and start the services**:
   Use the command below to build and run the backend, frontend, and database services:
   ```bash
   make all
   ```

---

## Usage

1. Open the application in your browser: `http://localhost:3000/`.
2. Navigate through the following key sections:
   - **Issues**: View and manage issues.
   - **Refuellers**: Organize issues into refuellers with drag-and-drop functionality.

---

## Folder Structure

```
.
├── backend
│   ├── src
│   │   ├── controllers      # Handles HTTP requests (e.g., issues.controller.ts, refuellers.controller.ts)
│   │   ├── services         # Application logic (e.g., issues.service.ts, refuellers.service.ts)
│   │   ├── migrations       # Database schema migrations
│   │   ├── routes           # API routes (e.g., issues.routes.ts, refuellers.routes.ts)
│   │   ├── models           # Database models (e.g., issue.model.ts, refueller.model.ts)
│   │   └── utils            # Utility functions (e.g., response.util.ts)
│   ├── Dockerfile           # Backend Docker configuration
│   ├── knexfile.ts          # Knex.js configuration
│   └── tsconfig.json        # TypeScript configuration
├── frontend
│   ├── src
│   │   ├── components       # Reusable Vue components (e.g., IssueItem.vue, RefuellerItem.vue)
│   │   ├── pages            # Application views (e.g., IssuePage.vue, RefuellerPage.vue)
│   │   ├── router           # Vue Router configuration
│   │   ├── store            # State management (e.g., Pinia stores)
│   │   └── services         # API service calls (e.g., issueService.ts, refuellerService.ts)
│   ├── public
│   │   └── index.html       # Entry point for the frontend
│   ├── Dockerfile           # Frontend Docker configuration
│   └── vite.config.ts       # Vite.js configuration
├── docker-compose.yml       # Docker Compose configuration for the project
├── Makefile                 # Makefile for build and deployment tasks
└── README.md                # Project documentation
```

---

## License

This project is licensed under the [MIT License](LICENSE).
