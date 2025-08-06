// performance.js – Monitors performance metrics like page loads and errors

export function trackPerformance() {
    const performanceMetrics = {
        pageLoads: 0,
        errors: 0,
        averageResponseTime: 0
    };

    // Track page load time
    window.addEventListener('load', () => {
        performanceMetrics.pageLoads++;
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;

        performanceMetrics.averageResponseTime =
            (performanceMetrics.averageResponseTime * (performanceMetrics.pageLoads - 1) + loadTime) /
            performanceMetrics.pageLoads;

        // For development/debugging: log to console
        console.log('Page Load Time:', loadTime, 'ms');
        console.log('Avg Response Time:', performanceMetrics.averageResponseTime.toFixed(2), 'ms');
    });

    // Track runtime errors
    window.addEventListener('error', () => {
        performanceMetrics.errors++;

        // For production: send to monitoring server
        // sendToBackend(performanceMetrics);
    });
}
