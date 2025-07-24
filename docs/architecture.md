# Architecture Document – Restaurant Availability Monitoring Tool

## Overview
This system monitors Domino's restaurant listings on Swiggy, compares real-time availability with expected business hours, and alerts operations when discrepancies arise.

---

## System Components

### 1. Scraping Pipeline (Data Collector)
- **Tool**: Puppeteer script (Node.js)
- **Function**: Scrapes live availability + opening hours from Swiggy every 10 minutes.
- **Runs via**: Cron job (e.g., GitHub Actions, Render Cron, or GCP Cloud Scheduler)

### 2. Data Storage
- **Format**: JSON (Prototype), Cloud NoSQL DB (Production)
- **Prod Suggestion**: Firebase Firestore, AWS DynamoDB, or PostgreSQL

### 3. Web Frontend
- **Framework**: Next.js + Tailwind CSS
- **Deployment**: Vercel (for fast, serverless hosting)
- **Function**: Displays availability status, highlighting mismatches

---

## Scaling to 10,000+ Restaurants

### Data Currency at Scale
- Use **headless browsers** in parallel via worker queues (e.g., BullMQ, AWS SQS)
- **Sharding** strategy: split restaurants by region/timezone and distribute scraping
- Consider using **Swiggy public APIs** (if any) for efficiency

### Parallelism
- Use **cloud functions** with up to 1,000 concurrent invocations (GCP/AWS Lambda)
- Each function scrapes ~10 restaurants → 1,000 functions cover 10K listings

---

## Notifications

### Strategy
- Detect mismatches (expected = open, actual = unavailable)
- Send alerts via:
  - Email (SendGrid, SES)
  - Slack/Discord Webhook
  - PagerDuty for enterprise ops

### Implementation
- Use Pub/Sub or EventBridge to trigger notifications
- Webhook workers handle alert dispatch asynchronously

---

## Resilience

- **Retry logic** in scrapers for timeouts/failures
- **Logging** with error tracking (Sentry, LogRocket)
- **Monitoring** via UptimeRobot, StatusCake, or Datadog

---

## Fit of Current Code with Architecture

- Scraper is modular, cron-ready
- JSON-based storage can easily swap to DB
- UI reads from static data, replaceable with API/DB fetch
- Ready for future upgrades (workers, alerts, scaling)

---

## Future Improvements

- Add user login for ops team
- Real-time WebSocket updates
- Graphical dashboards + map view
- Multi-platform support (Zomato, Uber Eats, DoorDash)
