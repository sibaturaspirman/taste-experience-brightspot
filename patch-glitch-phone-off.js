const fs = require("fs");
const path = "index.html";
let s = fs.readFileSync(path, "utf8");

function rep(old, neu, label) {
  const n = s.split(old).length - 1;
  if (n !== 1) throw new Error(label + ": expected 1 match, got " + n);
  s = s.replace(old, neu);
}

rep(
  `html.phone .opt .lbl{font-size:40px;line-height:48px}


/* ===== MODE TABLET`,
  `html.phone .opt .lbl{font-size:40px;line-height:48px}
/* MODE HP: matikan glitch (canvas, video overlay, animasi judul) — ringan di perangkat */
html.phone #fx{display:none!important}
html.phone .vscan{opacity:.3}
html.phone .vcard img.vov,html.phone .vcard img.vov.g1,html.phone .vcard img.vov.g2{display:none!important}
html.phone .glitching .gt::before,html.phone .glitching .gt::after{animation:none!important;opacity:0!important}
html.phone .glitching .jit{animation:none!important}
html.phone .mix.glitch .mx-rgb{animation:none!important}

/* ===== MODE TABLET`,
  "css phone glitch off"
);

rep(
  `var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- scale stage to fit ---------- */`,
  `var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var liteGlitch=false;
function fxLite(){return reduce||liteGlitch;}

/* ---------- scale stage to fit ---------- */`,
  "fxLite var"
);

rep(
  `  stage.style.transform="translate("+(-SW/2*scale)+"px,"+(-sh/2*scale)+"px) scale("+scale+")";drawAmbients();}`,
  `  stage.style.transform="translate("+(-SW/2*scale)+"px,"+(-sh/2*scale)+"px) scale("+scale+")";drawAmbients();
  liteGlitch=ph;
  if(liteGlitch){stage.classList.remove("glitching");bars.length=0;burstEnd=0;if(cx)cx.clearRect(0,0,1080,1920)}}`,
  "fit liteGlitch"
);

rep(
  `  if(current&&current.getAttribute("data-screen")==="result"&&name==="qr"&&!reduce&&typeof next.animate==="function"){flipToQR();return}
  glitch(reduce?0:340);`,
  `  if(current&&current.getAttribute("data-screen")==="result"&&name==="qr"&&!fxLite()&&typeof next.animate==="function"){flipToQR();return}
  glitch(fxLite()?0:340);`,
  "go fxLite"
);

rep(
  `  if(was&&!reduce){nb.classList.remove("pulse");void nb.offsetWidth;nb.classList.add("pulse")}
  glitch(reduce?0:160);`,
  `  if(was&&!fxLite()){nb.classList.remove("pulse");void nb.offsetWidth;nb.classList.add("pulse")}
  glitch(fxLite()?0:160);`,
  "choose fxLite"
);

rep(
  `function glitch(ms){if(!ms)return;Fluid.kick(ms);var end=performance.now()+ms;if(end>burstEnd)burstEnd=end;`,
  `function glitch(ms){if(!ms||fxLite())return;Fluid.kick(ms);var end=performance.now()+ms;if(end>burstEnd)burstEnd=end;`,
  "glitch fn"
);

rep(
  `  if(reduce||document.hidden)return;
  if(t-lastF<66)return;lastF=t;
  cx.clearRect(0,0,1080,1920);
  if(mode==="kiosk"&&t>nextAuto){var onStart=current&&current.getAttribute("data-screen")==="start";glitch(180+Math.random()*200);nextAuto=t+(onStart?1800:3200)+Math.random()*(onStart?2600:4200)}
  if(Math.random()<.55)spawnBar();if(Math.random()<.25)spawnBar();`,
  `  if(fxLite()||document.hidden)return;
  if(t-lastF<66)return;lastF=t;
  cx.clearRect(0,0,1080,1920);
  if(mode==="kiosk"&&t>nextAuto&&!fxLite()){var onStart=current&&current.getAttribute("data-screen")==="start";glitch(180+Math.random()*200);nextAuto=t+(onStart?1800:3200)+Math.random()*(onStart?2600:4200)}
  if(Math.random()<.55)spawnBar();if(Math.random()<.25)spawnBar();`,
  "frame loop"
);

rep(
  `    if(!reduce&&now>nextG){gUntil=now+120+Math.random()*200;nextG=now+2400+Math.random()*3600}
    var burst=!reduce&&now<gUntil,tear=!reduce&&!burst&&Math.random()<.07;`,
  `    if(!fxLite()&&now>nextG){gUntil=now+120+Math.random()*200;nextG=now+2400+Math.random()*3600}
    var burst=!fxLite()&&now<gUntil,tear=!fxLite()&&!burst&&Math.random()<.07;`,
  "fluid glitch"
);

rep(
  `      if(!reduce){lastT=0;raf=requestAnimationFrame(loop)}},`,
  `      if(!fxLite()){lastT=0;raf=requestAnimationFrame(loop)}},`,
  "fluid raf"
);

rep(
  `  if(reduce){`,
  `  if(fxLite()){`,
  "runLoader fxLite"
);

rep(
  `    at(reduce?250:440,function(){mix.hidden=true;`,
  `    at(fxLite()?250:440,function(){mix.hidden=true;`,
  "ldr1"
);

rep(
  `    at(reduce?200:520,function(){next.classList.remove("pending");if(done)done()});`,
  `    at(fxLite()?200:520,function(){next.classList.remove("pending");if(done)done()});`,
  "ldr2"
);

rep(
  `  at(TC+820,function(){glitch(420);Fluid.kick(320);mix.classList.add("glitch");$("#lflash").classList.add("go");finish()});`,
  `  at(TC+820,function(){if(!fxLite()){glitch(420);Fluid.kick(320);mix.classList.add("glitch");$("#lflash").classList.add("go")}finish()});`,
  "loader glitch"
);

rep(
  `  glitch(260);
  from.classList.add("hold");`,
  `  if(!fxLite())glitch(260);
  from.classList.add("hold");`,
  "flip glitch1"
);

rep(
  `  setTimeout(function(){bgA.classList.remove("on");bgB.classList.add("on");setAmbient("B");fxBg=bgB;glitch(200)},300);`,
  `  setTimeout(function(){bgA.classList.remove("on");bgB.classList.add("on");setAmbient("B");fxBg=bgB;if(!fxLite())glitch(200)},300);`,
  "flip glitch2"
);

if (s.includes("\x08")) throw new Error("backspace in file");
fs.writeFileSync(path, s);
console.log("glitch phone off ok");