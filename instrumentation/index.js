// instrumentation/index.ts
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      // Only run on server
      const tracer = require('../lib/datadog-tracer');
      console.log('Datadog tracer initialized');
    }
  }