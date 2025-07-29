
function iniciarConfeti() {
  const canvas = document.getElementById("confetti-canvas");
  const context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 300;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncrement: Math.random() * 0.1 + 0.05,
      tiltAngle: 0
    });
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confettiCount; i++) {
      let c = confetti[i];
      context.beginPath();
      context.lineWidth = c.r;
      context.strokeStyle = c.color;
      context.moveTo(c.x + c.tilt + c.r / 2, c.y);
      context.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      context.stroke();
    }

    update();
    requestAnimationFrame(draw);
  }

  function update() {
    for (let i = 0; i < confettiCount; i++) {
      let c = confetti[i];
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;

      if (c.y > canvas.height) {
        confetti[i] = {
          x: Math.random() * canvas.width,
          y: -20,
          r: c.r,
          d: c.d,
          color: c.color,
          tilt: c.tilt,
          tiltAngleIncrement: c.tiltAngleIncrement,
          tiltAngle: c.tiltAngle
        };
      }
    }
  }

  draw();
}
