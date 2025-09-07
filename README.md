# 📊 Simple Counter with Redis

## Description

This project is a beginner-friendly Node.js + Redis demo that tracks website visits.
It’s designed to help new developers understand how to integrate Redis into a Node.js application while learning some of Redis’ most important commands (INCR, EXPIRE, TTL).

### The app is built with Express and uses Redis to:

-   Count how many times a route has been visited.

-   Set expiration times for counters.

-   Retrieve time-to-live values.

### Along the way, the project demonstrates:

-   Connecting Node.js with Redis

-   Using Redis CLI to test values

-   Creating a basic Express route (/) that tracks visits

-   Exploring extensions like per-user counters and rate limiting

### This project is great for:

-   Developers learning Redis basics.
-   Anyone looking to practice caching, counters, and session-like data in Node.js.
-   A starting point for building more advanced apps that rely on Redis (e.g. analytics, rate limiting, authentication).

## Tech Stack

-   Node.js (server-side runtime)

-   Express.js (minimal web framework)

-   Redis (in-memory data store)
