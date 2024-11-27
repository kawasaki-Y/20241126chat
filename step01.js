document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("seasonCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const seasons = [
    { name: "spring", color: "white", effectColor: "pink", effectSize: 5 },
    { name: "summer", color: "white", effectColor: "lightgreen", effectSize: 4 },
    { name: "autumn", color: "white", effectColor: "orange", effectSize: 6 },
    { name: "winter", color: "#F0F8FF", effectColor: "white", effectSize: 3 },
  ];

  let currentSeason = 0;

  class Effect {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * seasons[currentSeason].effectSize + 1;
      this.speedY = Math.random() * 2 + 1;
    }

    update() {
      this.y += this.speedY;
      if (this.y > canvas.height) {
        this.y = -this.size;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = seasons[currentSeason].effectColor;
      ctx.fill();
    }
  }

  const effects = [];
  for (let i = 0; i < 100; i++) {
    effects.push(new Effect());
  }

  function changeSeason() {
    currentSeason = (currentSeason + 1) % seasons.length;
    document.body.style.backgroundColor = seasons[currentSeason].color;
  }

  setInterval(changeSeason, 10000);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effects.forEach((effect) => {
      effect.update();
      effect.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
