 // Number counting function
 function countUp(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    let startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentNumber = Math.floor(progress * (end - start) + start);
      element.textContent = currentNumber.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Trigger counting when the element is visible
  const counterElement = document.getElementById("count");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countUp("count", 0, 1000, 20000); // Start counting
          observer.unobserve(counterElement); // Stop observing after counting
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  observer.observe(counterElement);