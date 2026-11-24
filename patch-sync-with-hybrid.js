const fs = require("fs");
const path = "index.html";
let s = fs.readFileSync(path, "utf8");

function rep(old, neu, label) {
  const n = s.split(old).length - 1;
  if (n !== 1) throw new Error(label + ": expected 1 match, got " + n);
  s = s.replace(old, neu);
}

rep(
  `var liteGlitch=false;
function fxLite(){return reduce||liteGlitch;}`,
  `function syncNoGlitch(){document.documentElement.classList.toggle("no-glitch",document.documentElement.classList.contains("phone")||mode==="phone")}
function noGlitch(){return reduce||document.documentElement.classList.contains("no-glitch")}`,
  "noGlitch fn"
);

rep(
  `html.phone .opt .lbl{font-size:40px;line-height:48px}
/* MODE HP: matikan glitch (canvas, video overlay, animasi judul) — ringan di perangkat */
html.phone #fx{display:none!important}
html.phone .vscan{opacity:.3}
html.phone .vcard img.vov,html.phone .vcard img.vov.g1,html.phone .vcard img.vov.g2{display:none!important}
html.phone .glitching .gt::before,html.phone .glitching .gt::after{animation:none!important;opacity:0!important}
html.phone .glitching .jit{animation:none!important}
html.phone .mix.glitch .mx-rgb{animation:none!important}

/* ===== MODE TABLET`,
  `html.phone .opt .lbl{font-size:40px;line-height:48px}

/* MODE HP: matikan glitch (ringan di HP) — sama seperti taste-experience-hybrid */
html.no-glitch #fx,html.no-glitch .scan,html.no-glitch .vscan{display:none!important;pointer-events:none}
html.no-glitch .vcard img.vov,html.no-glitch .vcard img.vov.g1,html.no-glitch .vcard img.vov.g2{display:none!important;animation:none}
html.no-glitch .glitching .gt::before,html.no-glitch .glitching .gt::after{animation:none;opacity:0}
html.no-glitch .glitching .jit{animation:none}
html.no-glitch .mix.glitch,html.no-glitch .mix.glitch .mx-rgb,html.no-glitch .mx-step i{animation:none}
html.no-glitch .vcard canvas.gb{display:none}

/* ===== MODE TABLET`,
  "no-glitch css"
);

rep(
  `[data-screen="qr"] .flipB{scale:none}
.flipB{transform-origin:540px 794.7px}
.qrbox{left:253.2px;top:445px;width:573.6px;height:574px}
/* QR 70% dari 712.5px; jarak judul → tombol download → kotak putih */
.qr{left:290.625px;top:482.5px;width:498.75px;height:498.75px}
.qrfail{left:290.625px;top:1002px;width:498.75px;text-align:center}
a.cta.qr-dl{text-decoration:none;display:block;color:inherit}
a.cta.qr-dl[hidden]{display:none!important;pointer-events:none;opacity:0}
[data-screen="qr"] a.qr-dl{scale:1.1}
[data-screen="qr"] .flipB{translate:0 154px}
[data-screen="qr"] .cap{translate:0 24px}`,
  `[data-screen="qr"] .flipB{scale:none}
.flipB{transform-origin:540px 794.7px}
/* QR 70% modul + jarak 10% stage antara tombol Download dan kotak (hybrid) */
[data-screen="qr"]{--qr-stage-h:1920px;--qr-title-bottom:272.8px;--qr-title-gap:calc(var(--qr-stage-h)*.05);--qr-dl-top:calc(var(--qr-title-bottom) + var(--qr-title-gap));--qr-cta-h:109.9px;--qr-gap:calc(var(--qr-stage-h)*.05);--qr-w:498.75px;--qr-box-w:613.76px;--qr-box-h:616.14px;--qr-inset:80.05px}
[data-screen="qr"] .qr-dl{top:var(--qr-dl-top)}
[data-screen="qr"] a.qr-dl{scale:1.1}
[data-screen="qr"] .qrbox{left:233.12px;top:calc(var(--qr-dl-top) + var(--qr-cta-h) + var(--qr-gap));width:var(--qr-box-w);height:var(--qr-box-h)}
[data-screen="qr"] .qr{left:290.625px;top:calc(var(--qr-dl-top) + var(--qr-cta-h) + var(--qr-gap) + var(--qr-inset));width:var(--qr-w);height:var(--qr-w)}
[data-screen="qr"] .qrfail{left:290.625px;top:calc(var(--qr-dl-top) + var(--qr-cta-h) + var(--qr-gap) + var(--qr-inset) + var(--qr-w) + 16px);width:var(--qr-w);text-align:center}
a.cta.qr-dl{text-decoration:none;display:block;color:inherit}
a.cta.qr-dl[hidden]{display:none!important;pointer-events:none;opacity:0}
[data-screen="qr"] .cap{translate:0 48px}`,
  "qr css hybrid"
);

rep(
  `id="qrDl" href="#" download target="_blank" rel="noopener noreferrer" hidden style="top:377px" aria-hidden="true"`,
  `id="qrDl" href="#" target="_blank" rel="noopener noreferrer" hidden aria-hidden="true"`,
  "qrDl html"
);

rep(
  `function setQrDownloadUrl(url){`,
  `function uploadApiName(key){
  var r=RESULTS[key];if(!r)return "Taste Exp Brightspot";
  var n=r.name;return "Taste Exp "+(n.charAt(0)+n.slice(1).toLowerCase());
}
function setQrDownloadUrl(url){`,
  "uploadApiName"
);

rep(
  `function uploadResultBlob(blob,signal){
  var u=uploadSettings();
  var body=new FormData();
  var label="Taste Exp Brightspot";
  body.append("name",label);
  body.append("phone","1");
  body.append("file",blob,label+"-photo-ai-zirolu-mizuho.png");`,
  `function uploadResultBlob(blob,signal){
  var u=uploadSettings();
  var body=new FormData();
  body.append("name",uploadApiName(resultKey));
  body.append("phone","1");
  body.append("file",blob,"taste-exp-"+(resultKey||"result")+".jpg");`,
  "upload blob"
);

rep(
  `  document.documentElement.classList.toggle("phone",ph);document.documentElement.classList.toggle("tab",tab);stage.style.width=SW+"px";stage.style.setProperty("--hx",((SW-1080)/2)+"px");syncSides();`,
  `  document.documentElement.classList.toggle("phone",ph);document.documentElement.classList.toggle("tab",tab);stage.style.width=SW+"px";stage.style.setProperty("--hx",((SW-1080)/2)+"px");syncSides();syncNoGlitch();`,
  "fit syncNoGlitch"
);

rep(
  `  liteGlitch=ph;
  if(liteGlitch)stage.classList.remove("glitching");
  if(liteGlitch&&window.__teFxClear)window.__teFxClear();}`,
  `  stage.classList.remove("glitching");}`,
  "fit remove liteGlitch"
);

rep(
  `window.__teFxClear=function(){bars.length=0;burstEnd=0;cx.clearRect(0,0,1080,1920)};
if(liteGlitch)window.__teFxClear();
function fxRes(){`,
  `function fxRes(){`,
  "remove __teFxClear"
);

rep(
  `    setResult:function(k){if(!layer)return;key=k;
      poster.src="data:image/webp;base64,"+IMG.poster[k];
      if(fxLite()){
        ovs.forEach(function(x){x.style.display="none"});
        video.classList.remove("on");video.pause();try{video.removeAttribute("src")}catch(e){}
        prevTime=0;return;
      }
      ovs.forEach(function(x){x.style.display="";x.src="data:image/webp;base64,"+IMG.over[k]});
      var u=url(k);video.classList.remove("on");prevTime=0;
      if(u){video.src=u;video.load();if(running){var p=video.play();if(p&&p.catch)p.catch(function(){})}}},
    start:function(){if(!layer||running)return;running=true;
      if(fxLite()){if(video){video.pause();video.classList.remove("on")}return;}
      if(!video)return;var p=video.play();if(p&&p.catch)p.catch(function(){});
      if(!fxLite()){lastT=0;raf=requestAnimationFrame(loop)}},`,
  `    setResult:function(k){if(!layer)return;key=k;
      poster.src="data:image/webp;base64,"+IMG.poster[k];ovs.forEach(function(x){x.src="data:image/webp;base64,"+IMG.over[k]});
      video.classList.remove("on");prevTime=0;
      if(noGlitch()){try{video.pause();video.removeAttribute("src");video.load()}catch(e){}return}
      var u=url(k);if(u){video.src=u;video.load();if(running){var p=video.play();if(p&&p.catch)p.catch(function(){})}}},
    start:function(){if(!video||running)return;running=true;
      if(noGlitch())return
      var p=video.play();if(p&&p.catch)p.catch(function(){});
      if(!reduce){lastT=0;raf=requestAnimationFrame(loop)}},`,
  "fluid hybrid"
);

rep(
  `  $("#lwipe").classList.remove("go");$("#lflash").classList.remove("go");
  var EO="cubic-bezier(.23,1,.32,1)",IO="cubic-bezier(.77,0,.175,1)",anims=[];
  function A(el,k,o){var a=el.animate(k,o);anims.push(a);return a}
  function finish(){
    rev.classList.remove("hid");rev.classList.add("go","shown");
    at(fxLite()?250:440,function(){mix.hidden=true;anims.forEach(function(a){try{a.cancel()}catch(e){}});anims=[];mix.innerHTML="";mix.classList.remove("glitch")});
    at(fxLite()?200:520,function(){next.classList.remove("pending");if(done)done()});
  }
  if(fxLite()){
    mix.hidden=false;mix.classList.remove("glitch");mix.style.opacity="";
    mix.innerHTML='<div class="mx-tint"></div><div class="mx-hud"><div class="mx-step"><span id="mxStep">AI MATCHING</span></div><div class="mx-cap" id="mxCap">Analyzing your choices</div></div>';
    at(500,function(){var t=$(".mx-tint",mix);if(t)t.style.opacity=".75"});at(1100,finish);return;
  }
  var layers=answers.map`,
  `  $("#lwipe").classList.remove("go");$("#lflash").classList.remove("go");
  if(noGlitch()){
    mix.hidden=true;mix.innerHTML="";
    rev.classList.remove("hid");rev.classList.add("shown","go");
    at(320,function(){next.classList.remove("pending");if(done)done()});
    return;
  }
  var layers=answers.map`,
  "runLoader hybrid"
);

rep(
      `step=$("#mxStep",mix),cap=$("#mxCap",mix),pctEl=$("#mxPct",mix),bar=$("#mxBar",mix),tint=$(".mx-tint",mix),glowL=$(".mx-glow",mix),match=$(".mx-match",mix);
  var STEP=950,T=[0,STEP,2*STEP];`,
      `step=$("#mxStep",mix),cap=$("#mxCap",mix),pctEl=$("#mxPct",mix),bar=$("#mxBar",mix),tint=$(".mx-tint",mix),glowL=$(".mx-glow",mix),match=$(".mx-match",mix);
  var EO="cubic-bezier(.23,1,.32,1)",IO="cubic-bezier(.77,0,.175,1)",anims=[];
  function A(el,k,o){var a=el.animate(k,o);anims.push(a);return a}
  function finish(){
    rev.classList.remove("hid");rev.classList.add("go","shown");
    at(noGlitch()?250:440,function(){mix.hidden=true;anims.forEach(function(a){try{a.cancel()}catch(e){}});anims=[];mix.innerHTML="";mix.classList.remove("glitch")});
    at(noGlitch()?200:520,function(){next.classList.remove("pending");if(done)done()});
  }
  var STEP=950,T=[0,STEP,2*STEP];`,
  "runLoader finish fn"
);

rep(
  `  at(TC+820,function(){if(!fxLite()){glitch(420);Fluid.kick(320);mix.classList.add("glitch");$("#lflash").classList.add("go")}finish()});`,
  `  at(TC+820,function(){if(noGlitch()){finish();return}glitch(420);Fluid.kick(320);mix.classList.add("glitch");$("#lflash").classList.add("go");finish()});`,
  "loader end"
);

rep(
  `    var im=v[1],c=document.createElement("canvas");c.width=1080;c.height=1920;var g=c.getContext("2d");
    g.drawImage(im,0,0,1080,1920);g.fillStyle="#fff";g.textAlign="center";
    g.font='700 59px "IQOS", sans-serif';
    r.head.split("<br>").forEach(function(l,i){g.fillText(l,530,924+65*i)});
    g.fillRect(388.3,1053,276.5,3);
    g.font='700 39.7px "IQOS", sans-serif';
    var y=1148.4;
    r.mbody.forEach(function(p,pi){if(pi)y+=45;p.split("<br>").forEach(function(l){g.fillText(l,533,y);y+=45})});
    var q=fxLite()?.84:.92;
    return new Promise(function(res,rej){c.toBlob(function(b){if(b)res(b);else rej(new Error("toBlob failed"))},"image/jpeg",q)});`,
  `    var im=v[1],lite=noGlitch(),c=document.createElement("canvas"),W=lite?540:1080,H=lite?960:1920,s=lite?.5:1;
    c.width=W;c.height=H;var g=c.getContext("2d");
    g.drawImage(im,0,0,W,H);g.fillStyle="#fff";g.textAlign="center";
    g.font='700 '+(59*s)+'px "IQOS", sans-serif';
    r.head.split("<br>").forEach(function(l,i){g.fillText(l,530*s,924*s+65*s*i)});
    g.fillRect(388.3*s,1053*s,276.5*s,3*s);
    g.font='700 '+(39.7*s)+'px "IQOS", sans-serif';
    var y=1148.4*s;
    r.mbody.forEach(function(p,pi){if(pi)y+=45*s;p.split("<br>").forEach(function(l){g.fillText(l,533*s,y);y+=45*s})});
    return new Promise(function(res,rej){c.toBlob(function(b){if(b)res(b);else rej(new Error("toBlob failed"))},"image/jpeg",lite?.84:.92)});`,
  "composeResult"
);

rep(
  `  if(RESULTS[h]){mode="phone";var r=RESULTS[h];`,
  `  if(RESULTS[h]){mode="phone";syncNoGlitch();var r=RESULTS[h];`,
  "route phone"
);

rep(
  `  }else{if(mode==="phone"||!current){mode="kiosk";hot.style.display="";reset();go("start")}}`,
  `  }else{if(mode==="phone"||!current){mode="kiosk";syncNoGlitch();hot.style.display="";reset();go("start")}}`,
  "route kiosk"
);

rep(
  `window.addEventListener("hashchange",route);
route();`,
  `window.addEventListener("hashchange",route);
syncNoGlitch();
route();`,
  "sync init"
);

s = s.split("fxLite()").join("noGlitch()");
s = s.split("fxLite()?").join("noGlitch()?");

if (s.includes("fxLite")) throw new Error("fxLite remnants");
if (s.includes("liteGlitch")) throw new Error("liteGlitch remnants");
if (s.includes("\x08")) throw new Error("backspace in file");
fs.writeFileSync(path, s);
console.log("sync with hybrid ok");