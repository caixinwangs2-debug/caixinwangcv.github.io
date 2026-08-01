const canvas = document.getElementById("signal-field");
const context = canvas.getContext("2d");
const particles = [];
let width = 0;
let height = 0;
let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const target = Math.max(46, Math.min(92, Math.floor(width / 18)));
  particles.length = 0;
  for (let index = 0; index < target; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      size: 1 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
    });
  }
}

function draw() {
  context.clearRect(0, 0, width, height);
  context.globalCompositeOperation = "lighter";

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.pulse += 0.018;

    if (particle.x < -20) particle.x = width + 20;
    if (particle.x > width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = height + 20;
    if (particle.y > height + 20) particle.y = -20;

    const alpha = 0.32 + Math.sin(particle.pulse) * 0.16;
    context.beginPath();
    context.fillStyle = `rgba(87, 231, 255, ${alpha})`;
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
  }

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < 130) {
        context.strokeStyle = `rgba(87, 231, 255, ${(1 - distance / 130) * 0.16})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener("resize", resize);
