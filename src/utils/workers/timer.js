onmessage = (e) => {
  const delay = e.data;

  const interval = setInterval(() => {
    postMessage('tick');
  }, delay);

  if (e.data === 'stop') {
    clearInterval(interval);
  }
};
