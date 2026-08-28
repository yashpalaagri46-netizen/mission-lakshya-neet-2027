/**
 * Vercel Speed Insights Initialization
 * This script initializes Speed Insights for this vanilla JavaScript application
 */
(function() {
  // Initialize the Speed Insights queue
  window.si = window.si || function() {
    (window.siq = window.siq || []).push(arguments);
  };

  // Load the Speed Insights script
  const script = document.createElement('script');
  script.defer = true;
  
  // In production on Vercel, use the default path
  // In development, use the debug version
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js';
  } else {
    script.src = '/_vercel/speed-insights/script.js';
  }
  
  // Add SDK metadata
  script.setAttribute('data-sdkn', '@vercel/speed-insights');
  script.setAttribute('data-sdkv', '2.0.0');
  
  // Inject the script into the page
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
})();
