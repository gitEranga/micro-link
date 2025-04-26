# DevOps Setup Documentation

This document provides an overview of the DevOps setup for the Micro Link application.

## CI/CD Pipeline

Our CI/CD pipeline is implemented using GitHub Actions and consists of the following workflows:

### Continuous Integration (CI)

The CI workflow runs on every push to the `main` and `develop` branches, as well as on pull requests to these branches. It performs the following tasks:

1. **Setup**: Installs dependencies and caches them for subsequent jobs
2. **Lint**: Runs ESLint and Prettier to check code quality
3. **Unit Tests**: Runs unit tests across multiple Node.js versions (16, 18, 20)
4. **Integration Tests**: Runs integration tests
5. **E2E Tests**: Runs end-to-end tests with Playwright
6. **Security Scanning**:
   - CodeQL for static analysis
   - npm audit for dependency vulnerabilities
   - Snyk for additional security checks
7. **Quality Gate**: Ensures all critical checks pass before allowing deployment

### Deployment Workflows

We have separate deployment workflows for different environments:

1. **Development**: Deploys to the development environment on every push to the `develop` branch
2. **Staging**: Deploys to the staging environment when a PR is merged into the `main` branch
3. **Production**: Deploys to the production environment using a blue-green deployment strategy

## Monitoring & Observability

We use Datadog for comprehensive monitoring and observability:

### APM & Distributed Tracing

- The application is instrumented with Datadog APM using the `dd-trace` Node.js library
- Traces are correlated across services and with logs
- Custom spans are added for critical business operations

### Logging

- Structured logging is implemented using Winston with the Datadog transport
- Log correlation with traces is enabled
- Logs include request IDs for easy troubleshooting

### Custom Metrics

- Business metrics are tracked using DogStatsD
- Key metrics include:
  - Link creation rate
  - Link click rate
  - API latency
  - Error rates

### Dashboards & Alerts

- Main dashboard shows application health and business metrics
- SLO dashboards track performance against service level objectives
- Alerts are configured for:
  - High error rates
  - Elevated API latency
  - Failed synthetic tests
  - Deployment events

### Synthetic Monitoring

- API tests verify the link creation and redirection functionality
- Browser tests simulate user flows
- Tests run from multiple regions

## Disaster Recovery

### Database Backups

- Automated backups run daily
- Backups are stored in S3 with a 30-day retention policy
- Backup script is available at `scripts/backup-database.js`

### Rollback Procedure

In case of a failed deployment, follow these steps to roll back:

1. Run the rollback script: