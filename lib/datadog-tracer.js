// lib/datadog-tracer.js
const tracer = require('dd-trace').init({
    service: 'micro-link',
    env: process.env.NODE_ENV,
    version: process.env.npm_package_version,
    logInjection: true,
    analytics: true,
    profiling: true,
    runtimeMetrics: true
  });
  
  // Add custom tags to all spans
  tracer.use('express', {
    hooks: {
      request: (span, req, res) => {
        // Add custom tags based on the request
        span.setTag('user.id', req.user ? req.user.id : 'anonymous');
        span.setTag('http.route', req.route ? req.route.path : 'unknown');
      }
    }
  });
  
  // Export the configured tracer
  module.exports = tracer;