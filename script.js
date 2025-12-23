const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// draw a big visible circle
ctx.fillStyle = "rgba(0, 255, 255, 0.6)";
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
ctx.fill();
