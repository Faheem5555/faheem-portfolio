const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const points = [];
const total = 900;
const radius = Math.min(w,h)/3;

for(let i=0;i<total;i++){
  const theta = Math.acos(2*Math.random()-1);
  const phi = 2*Math.PI*Math.random();
  points.push({
    x: Math.sin(theta)*Math.cos(phi),
    y: Math.cos(theta),
    z: Math.sin(theta)*Math.sin(phi)
  });
}

let rot = 0;
function draw(){
  ctx.clearRect(0,0,w,h);
  rot += 0.0015;

  points.forEach(p=>{
    const x = p.x*Math.cos(rot)-p.z*Math.sin(rot);
    const z = p.x*Math.sin(rot)+p.z*Math.cos(rot);
    const y = p.y;

    const scale = radius/(radius+z*radius);
    const px = x*radius*scale + w/2;
    const py = y*radius*scale + h/2;

    ctx.fillStyle = "rgba(255,215,0,0.85)";
    ctx.beginPath();
    ctx.arc(px,py,1.5,0,Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();
