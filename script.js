function menuAction(action) {
  alert(`You clicked on ${action}!`);
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("seasonCanvas");
  const ctx = canvas.getContext("2d");

  // キャンバスサイズの設定
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // 季節の設定
  const seasons = [
    { name: "spring", color: "#FFFAF0", effectColor: "pink", effectSize: 5 }, // 春
    { name: "summer", color: "#C0FFC0", effectColor: "lightgreen", effectSize: 4 }, // 夏
    { name: "autumn", color: "#FFDAB9", effectColor: "orange", effectSize: 6 }, // 秋
    { name: "winter", color: "#F0F8FF", effectColor: "white", effectSize: 3 }, // 冬
  ];

  let currentSeason = 0;
  let time = 0;

  // エフェクト管理クラス
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

  // 季節を変更
  function changeSeason() {
    currentSeason = (currentSeason + 1) % seasons.length;
    document.body.style.backgroundColor = seasons[currentSeason].color;
  }

  // 一定時間ごとに季節を変更
  setInterval(changeSeason, 10000); // 10秒ごとに季節が変わる

  // アニメーション描画
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
