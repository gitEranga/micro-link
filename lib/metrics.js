// lib/metrics.js
const StatsD = require('hot-shots');

// Initialize the DogStatsD client
const dogstatsd = new StatsD({
  host: process.env.DATADOG_AGENT_HOST || 'localhost',
  port: 8125,
  prefix: 'micro_link.',
  globalTags: {
    env: process.env.NODE_ENV,
    service: 'micro-link'
  }
});

// Business metrics
const metrics = {
  // Track link creation
  trackLinkCreated: (userId, metadata = {}) => {
    dogstatsd.increment('links.created', 1, [
      `user_id:${userId}`,
      ...Object.entries(metadata).map(([key, value]) => `${key}:${value}`)
    ]);
  },
  
  // Track link clicks
  trackLinkClicked: (linkId, referrer = 'direct', metadata = {}) => {
    dogstatsd.increment('links.clicked', 1, [
      `link_id:${linkId}`,
      `referrer:${referrer}`,
      ...Object.entries(metadata).map(([key, value]) => `${key}:${value}`)
    ]);
  },
  
  // Track user signup
  trackUserSignup: (source = 'direct', metadata = {}) => {
    dogstatsd.increment('users.signup', 1, [
      `source:${source}`,
      ...Object.entries(metadata).map(([key, value]) => `${key}:${value}`)
    ]);
  },
  
  // Track API response time
  trackApiLatency: (route, latencyMs, statusCode) => {
    dogstatsd.timing('api.latency', latencyMs, [
      `route:${route}`,
      `status_code:${statusCode}`
    ]);
  },
  
  // Track custom event with arbitrary tags
  track: (metric, value = 1, tags = []) => {
    dogstatsd.increment(metric, value, tags);
  },
  
  // Gauge metrics (e.g., queue size, active users)
  gauge: (metric, value, tags = []) => {
    dogstatsd.gauge(metric, value, tags);
  },
  
  // Histogram metrics (e.g., request size)
  histogram: (metric, value, tags = []) => {
    dogstatsd.histogram(metric, value, tags);
  }
};

module.exports = metrics;