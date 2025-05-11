// import { NodeSDK } from '@opentelemetry/sdk-node';
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import pkg from '@opentelemetry/resources';

// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
// import { MeterProvider } from '@opentelemetry/sdk-metrics';
// import { metrics } from '@opentelemetry/api';
// import os from 'os';

// const { Resource } = pkg;
// // Create a Prometheus exporter
// const prometheusExporter = new PrometheusExporter(
//   { port: 9464, endpoint: '/metrics' },
//   () => {
//     console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
//   }
// );


// // MeterProvider setup


// // Get meter
// const meter = metrics.getMeter('interview-cv-tracking-system');

// // --- Custom Metrics ---

// // Total HTTP requests
// const httpRequestCounter = meter.createCounter('http_requests_total', {
//   description: 'Total number of HTTP requests',
// });

// // Error counter
// const errorCounter = meter.createCounter('http_errors_total', {
//   description: 'Total number of HTTP errors (4xx/5xx)',
// });

// // Latency histogram
// const latencyHistogram = meter.createHistogram('http_request_duration_seconds', {
//   description: 'HTTP request latency in seconds',
//   unit: 'seconds',
// });

// // Active users gauge (example logic)
// const activeUsersGauge = meter.createObservableGauge('active_users', {
//   description: 'Number of active users in the system',
// });
// activeUsersGauge.addCallback((observableResult) => {
//   const simulatedActiveUsers = Math.floor(Math.random() * 100); // Replace with real logic
//   observableResult.observe(simulatedActiveUsers);
// });

// // --- OpenTelemetry SDK ---

// const sdk = new NodeSDK({
//   serviceName: 'interview-cv-tracking-system',
//   metricReader: prometheusExporter, // this is valid for PrometheusExporter now
//   instrumentations: [
//     getNodeAutoInstrumentations({
//       '@opentelemetry/instrumentation-express': { enabled: true },
//       '@opentelemetry/instrumentation-http': { enabled: true },
//       '@opentelemetry/instrumentation-mongoose': { enabled: true },
//     }),
//   ],
// });

// // --- Export for use ---
// export { sdk, httpRequestCounter, errorCounter, latencyHistogram, activeUsersGauge };

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { metrics } from '@opentelemetry/api';

// Create a Prometheus exporter
const prometheusExporter = new PrometheusExporter(
  { port: 9464, endpoint: '/metrics' },
  () => {
    console.log('✅ Prometheus scrape endpoint: http://localhost:9464/metrics');
  }
);

// Create OpenTelemetry SDK with metrics
const sdk = new NodeSDK({
  metricReader: prometheusExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-mongoose': { enabled: true },
    }),
  ],
});

// Get meter for custom metrics
const meter = metrics.getMeter('interview-cv-tracking-system');

// Custom Metrics
const httpRequestCounter = meter.createCounter('http_requests_total', {
  description: 'Total number of HTTP requests',
});

const errorCounter = meter.createCounter('http_errors_total', {
  description: 'Total number of HTTP errors (4xx/5xx)',
});

const latencyHistogram = meter.createHistogram('http_request_duration_seconds', {
  description: 'HTTP request latency in seconds',
  unit: 'seconds',
});

const activeUsersGauge = meter.createObservableGauge('active_users', {
  description: 'Number of active users in the system',
});
activeUsersGauge.addCallback((observableResult) => {
  const simulatedActiveUsers = Math.floor(Math.random() * 100);
  observableResult.observe(simulatedActiveUsers);
});

// Export
export { sdk, httpRequestCounter, errorCounter, latencyHistogram, activeUsersGauge };
