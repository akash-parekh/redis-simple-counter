
# 📊 Simple Counter with Redis

## Description

This project is a beginner-friendly **Node.js + Redis** demo that tracks website visits.
It helps new developers understand how to integrate Redis into a Node.js app while learning some of Redis’ most important commands: **INCR**, **EXPIRE**, and **TTL**.

The app is built with **Express** and uses Redis to:

-   Count how many times a route has been visited.
-   Set expiration times for counters.
-   Retrieve time-to-live values.

Along the way, you’ll learn:

-   Connecting Node.js with Redis
-   Using Redis CLI to inspect values
-   Creating a basic Express route (`/`) that tracks visits
-   Implementing per-user counters and rate-limiting basics

---

## Routes

### 1️⃣ Global Route: `/`

-   **Purpose:** Count all visits globally.
-   **Redis Key:** `visits:${date}` (e.g., `visits:2025-09-08`)
    _Format: YYYY-MM-DD_
-   **Commands:**

    -   `INCR` → increment the counter
    -   `EXPIRE` → set expiry

-   **Expiry:** 1 minute (for testing) or daily reset in production
-   **Notes:** Use the date in the key to reset counters daily.

---

### 2️⃣ User Route: `/users/:id/visits`

-   **Purpose:** Count visits per user.
-   **Redis Key:** `user:${id}:visits:${date}` → unique per user per day
-   **Commands:** `INCR` + `EXPIRE`
-   **Expiry:** 1 minute (testing) or dynamically until midnight
-   **Notes:** TTL ensures counters reset automatically. Can be extended for rate limiting.

---

### 3️⃣ Stats Route: `/stats`

-   **Purpose:** Aggregate stats globally + per user
-   **Example Response:**

```json
{
    "TotalVisits": 150,
    "GlobalVisits": "50 (expires in 60 seconds)",
    "Users": {
        "user1": "10 (expires in 50 seconds)",
        "user2": "20 (expires in 40 seconds)"
    }
}
```

---

## Getting Started

1. Clone the repo:

```bash
git clone <repo-url>
cd simple-counter
```

2. Install dependencies:

```bash
npm install
```

3. Start Redis (using Docker):

```bash
docker compose up -d
```

4. Run the app:

```bash
npm start
```

5. Visit routes:

-   [http://localhost:3000/](http://localhost:3000/) → global visits
-   [http://localhost:3000/users/1/visits](http://localhost:3000/users/1/visits) → user-specific visits
-   [http://localhost:3000/stats](http://localhost:3000/stats) → aggregated stats

---

## Testing with Redis CLI

```bash
# Check counter value
redis-cli get visits:2025-09-08

# Check TTL (time to live)
redis-cli ttl visits:2025-09-08
```

---

## Tech Stack

-   **Node.js** – Server runtime
-   **Express.js** – Minimal web framework
-   **Redis** – In-memory data store

---

## Why This Project is Great

-   Perfect for learning Redis basics.
-   Practicing caching, counters, and session-like data.
-   Starting point for advanced apps like analytics, rate limiting, and authentication.

---
