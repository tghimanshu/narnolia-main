/**
 * Reports web vitals metrics to a provided callback function.
 * This is useful for measuring performance of the application.
 *
 * @param {Function} onPerfEntry - The callback function to handle the performance metrics.
 *                                 It receives the metric object as an argument.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
