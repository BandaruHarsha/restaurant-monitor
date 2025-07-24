# Restaurant Availability Monitor

A full-stack monitoring tool built to track and flag discrepancies between **expected** and **actual availability** of restaurant listings (Domino’s) on **Swiggy**.

---

## Live Demo

🔗 [https://restaurant-monitor-z3bd.vercel.app](https://restaurant-monitor-z3bd.vercel.app)

---

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Scraper**: Node.js with Puppeteer
- **Data Format**: JSON
- **Deployment**: Vercel (Frontend), Local/cron (Scraper)

---

## Features

- Scrapes real-time availability status of multiple Domino’s restaurants on Swiggy.
- Compares actual availability with expected business hours.
- Flags mismatches in a clear, color-coded dashboard.
- Modular design for easy scalability and production readiness.

---

## Project Structure

restaurant-monitor/
├── frontend/ # Next.js frontend dashboard
│ ├── pages/ # index.js for UI
│ ├── styles/ # Tailwind config and styles
│ └── data/ # JSON scraped data
├── scraper/ # Puppeteer-based scraper script
│ └── scrape.js
├── docs/ # Documentation
│ └── architecture.md # System design doc
└── README.md # This file


---

## Running the App Locally

### Prerequisites

- Node.js 18+ and npm installed
- Git installed

---

### 1. Clone the Repository

git clone https://github.com/BandaruHarsha/restaurant-monitor.git
cd restaurant-monitor

---

### 2. Run the Scraper

cd scraper
npm install
node scrape.js

---

### 3. Start the Frontend

cd ../frontend
npm install
npm run dev

---

Deployment (Vercel)
Framework Preset: Next.js

Root Directory: frontend

Build Command: npm run build

Output Directory: .next

The live deployment is hosted at:
🔗 https://restaurant-monitor-z3bd.vercel.app

---

Architecture Overview

See docs/architecture.md for:

1. System design & scalability to 10,000+ restaurants
2. Data pipeline frequency and fault tolerance
3. Notification architecture for availability mismatches



