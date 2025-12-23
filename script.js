/* ===============================
   INTERACTIVE GLOBE BACKGROUND
   =============================== */

const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Mouse tracking
const mouse = { x: w / 2, y: h / 2 };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Globe settings
const centerX = () => w / 2;
const centerY = () => h / 2;
const radius = Math.min(w, h) * 0.28;
const dots = [];
const DOT_COUNT = 900;

// Create globe dots (spherical distribution)
for (let i = 0; i < DOT_COUNT; i++) {
  const theta = Math.acos(2 * Math.random() - 1);
  const phi = Math.random() * 2 * Math.PI;

  dots.push({
    theta,
    phi,
    depth: Math.random()
  });
}

// Animation
function animate() {
  ctx.clearRect(0, 0, w, h);

  const mx = (mouse.x - centerX()) * 0.0008;
  const my = (mouse.y - centerY()) * 0.0008;

  dots.forEach(dot => {
    dot.phi += 0.002 + mx;
    dot.theta += my;

    const x3d = Math.sin(dot.theta) * Math.cos(dot.phi);
    const y3d = Math.cos(dot.theta);
    const z3d = Math.sin(dot.theta) * Math.sin(dot.phi);

    const scale = (z3d + 1.5) / 2.5;
    const x2d = centerX() + x3d * radius * scale;
    const y2d = centerY() + y3d * radius * scale;

    const alpha = scale;
    const size = scale * 1.6;

    ctx.beginPath();
    ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(96,165,250,${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
