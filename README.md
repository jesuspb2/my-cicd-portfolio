# Personal Portfolio Project (AWS + Terraform + CICD GitHub Actions)

This project is a personal portfolio application designed and built from scratch, showcasing modern web technologies and cloud infrastructure. It features a serverless backend, a responsive frontend, and a fully automated CI/CD pipeline.

## Table of Contents

- [Architecture](#architecture)
- [Frontend](#frontend)
- [Backend](#backend)
- [CI/CD](#cicd)
- [Project Structure](#project-structure)
- [Infrastructure](#infrastructure)
- [Getting Started](#getting-started)
- [License](#license)

---

## Architecture

The overall architecture follows a serverless pattern, with the frontend hosted on AWS S3 + CloudFront, and the backend deployed on AWS Lambda behind an API Gateway. Here is a high-level architecture diagram:

![Architecture](architecture.svg)

---

## Frontend

The frontend is built using:

- **React** for building reusable UI components
- **TypeScript** for static typing
- **Tailwind CSS** for efficient styling
- **Vite** as the build tool for fast development

The frontend is deployed as a static website on AWS S3, distributed through CloudFront for global performance and SSL via ACM (AWS Certificate Manager).

**Key features:**

- Fully responsive design
- Modern component-based architecture
- Typesafe development
- ESLint and TypeScript configuration for code quality

---

## Backend

The backend is implemented in Python using AWS Lambda functions exposed via API Gateway, following a serverless architecture.

**Features:**

- Lightweight Python backend (`app.py`)
- Packaged with a `Dockerfile` for consistent builds
- Infrastructure defined via Terraform
- Easy to scale and maintain

---

## CI/CD

A fully automated CI/CD pipeline is implemented with **GitHub Actions**, performing:

- Build
- Lint and static analysis
- Unit testing
- Deployment to AWS

The pipeline scripts and definitions are organized under the `/cicd` directory, and follow best practices for security and maintainability.

---

## Infrastructure

The infrastructure is provisioned with **Terraform**, deploying and configuring:

- **S3** (for static frontend hosting)
- **CloudFront** (for global distribution and caching)
- **Route 53** (custom domain management)
- **ACM** (SSL certificates)
- **API Gateway** (exposing the Lambda functions)
- **Lambda** (for the Python backend)

This guarantees an infrastructure-as-code, reproducible, and auditable deployment.

---

## Project Structure

```plaintext
.
├── architecture.svg         # architecture diagram
├── backend                  # backend (Python + Lambda)
│   ├── app.py               # Python Lambda function
│   ├── Dockerfile           # Docker build file for Lambda
│   └── requirements.txt     # Python dependencies
├── cicd
│   ├── deployment           # terraform / deployment scripts
│   └── scripts              # custom scripts for automation
├── frontend                 # frontend (React + TypeScript + Vite + Tailwind)
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src                  # React components and pages
│   ├── tsconfig.*.json
│   └── vite.config.ts
└── README.md
