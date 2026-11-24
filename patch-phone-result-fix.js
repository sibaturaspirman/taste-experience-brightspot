const fs = require("fs");
const path = "index.html";
let s = fs.readFileSync(path, "utf8");

function rep(old, neu, label) {
  const n = s.split(old).length - 1;
  if (n !== 1) throw new Error(label + ": expected 1 match, got " + n);
  s = s.replace(old, neu);
}

rep(
  `  var res=(scale*(window.devicePixelRatio||1))>1.25?2:1;if(res!==RES){RES=res;if(window.__fxRes)window.__fxRes()}`,
  `  var res=ph?1:((scale*(window.devicePixelRatio||1))>1.25?2:1);if(res!==RES){RES=res;if(window.__fxRes)window.__fxRes()}`,
  "RES phone"
);

rep(
  `    setResult:function(k){if(!layer)return;key=k;
      poster.src="data:image/webp;base64,"+IMG.poster[k];ovs.forEach(function(x){x.src="data:image/webp;base64,"+IMG.over[k]});
      var u=url(k);video.classList.remove("on");prevTime=0;
      if(u){video.src=u;video.load();if(running){var p=video.play();if(p&&p.catch)p.catch(function(){})}}},
    start:function(){if(!video||running)return;running=true;var p=video.play();if(p&&p.catch)p.catch(function(){});
      if(!fxLite()){lastT=0;raf=requestAnimationFrame(loop)}},`,
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
  "fluid lite"
);

rep(
  `  if(fxLite()){
    L.forEach(function(l,i){l.style.opacity=i?".6":"1"});step.textContent="SCAN 03 / 03";cap.textContent="Analyzing your choices";
    at(700,function(){tint.style.opacity=".8"});at(1300,finish);return;
  }`,
  `  if(fxLite()){
    mix.innerHTML='<div class="mx-tint"></div><div class="mx-hud"><div class="mx-step"><span id="mxStep">AI MATCHING</span></div><div class="mx-cap" id="mxCap">Analyzing your choices</div></div>';
    at(500,function(){var t=$(".mx-tint",mix);if(t)t.style.opacity=".75"});at(1100,finish);return;
  }`,
  "loader lite"
);

rep(
  `    return new Promise(function(res){c.toBlob(function(b){res(b)},"image/jpeg",.92)});
  });
}`,
  `    var q=fxLite()?.84:.92;
    return new Promise(function(res,rej){c.toBlob(function(b){if(b)res(b);else rej(new Error("toBlob failed"))},"image/jpeg",q)});
  });
}`,
  "compose jpeg quality"
);

if (s.includes("\x08")) throw new Error("backspace in file");
fs.writeFileSync(path, s);
console.log("phone result fix ok");