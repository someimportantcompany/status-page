---
---
(() => {
  window.loadQueue = window.loadQueue || [];

  function triggerLoadQueue() {
    // If any new loadQueue calls hit the array, automatically execute them
    window.loadQueue.push = function(c) { c(); };

    // Run through each function in the loadQueue and execute them
    (Array.isArray(window.loadQueue) ? window.loadQueue : [])
      .filter(function (fn) { return typeof fn === 'function' })
      .forEach(function (fn) { fn(); });
  }

  if (document.readyState !== 'loading') triggerLoadQueue();
  else document.addEventListener('DOMContentLoaded', triggerLoadQueue);
})();
