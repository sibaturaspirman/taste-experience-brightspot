const fs = require("fs");
const path = "index.html";
let s = fs.readFileSync(path, "utf8");

function rep(old, neu, label) {
  const n = s.split(old).length - 1;
  if (n !== 1) throw new Error(label + ": expected 1 match, got " + n);
  s = s.replace(old, neu);
}

const btnSrc = (() => {
  const m = s.match(
    /data-screen="qr"[\s\S]*?<button class="cta sm" data-go="start"[\s\S]*?<img alt="" src="([^"]+)"/
  );
  if (!m) throw new Error("qr screen cta img src not found");
  return m[1];
})();

rep(
  `.qrbox{left:104.5px;top:358.4px;width:876.8px;height:880.2px}
/* margin putih = proporsi versi yang disetujui klien (42.5px untuk QR 565px = 7.5%) -> QR 712.5px, margin 53.75px */
.qr{left:183.75px;top:438.45px;width:712.5px;height:712.5px}
.qrfail{left:183.75px;top:758.7px;width:712.5px}
[data-screen="qr"] .cap{translate:0 -44.6px}`,
  `.qrbox{left:253.2px;top:445px;width:573.6px;height:574px}
/* QR 70% dari 712.5px; jarak judul → tombol download → kotak putih */
.qr{left:290.625px;top:482.5px;width:498.75px;height:498.75px}
.qrfail{left:290.625px;top:1002px;width:498.75px;text-align:center}
a.cta.qr-dl{text-decoration:none;display:block;color:inherit}
a.cta.qr-dl[hidden]{display:none!important;pointer-events:none;opacity:0}
[data-screen="qr"] a.qr-dl{scale:1.1}
[data-screen="qr"] .flipB{translate:0 154px}
[data-screen="qr"] .cap{translate:0 24px}`,
  "qr css 70%"
);

rep(
  `  <section class="screen" data-screen="qr" data-bg="B" aria-label="Scan QR">
    <h1 class="abs ttl shadowed" style="left:0;top:0;width:1080px;height:1px" aria-label="Taste Experience">
      <span class="gt" data-text="TASTE" style="left:174.2px;top:75.0px">TASTE</span>
      <span class="gt" data-text="EXPERIENCE" style="left:275.4px;top:177.0px">EXPERIENCE</span>
    </h1>
    <div class="flipB"><img class="abs qrbox jit" alt="" src="`,
  `  <section class="screen" data-screen="qr" data-bg="B" aria-label="Scan QR">
    <h1 class="abs ttl shadowed" style="left:0;top:0;width:1080px;height:1px" aria-label="Taste Experience">
      <span class="gt" data-text="TASTE" style="left:174.2px;top:75.0px">TASTE</span>
      <span class="gt" data-text="EXPERIENCE" style="left:275.4px;top:177.0px">EXPERIENCE</span>
    </h1>
    <a class="cta sm qr-dl rise" id="qrDl" href="#" download target="_blank" rel="noopener noreferrer" hidden style="top:377px" aria-hidden="true"><img alt="" src="${btnSrc}"><span class="ct">DOWNLOAD</span></a>
    <div class="flipB"><img class="abs qrbox jit" alt="" src="`,
  "qr download html"
);

rep(
  `  var qb=$("#qr");if(qb)qb.innerHTML="";var qf=$("#qrfail");if(qf){qf.hidden=true;qf.textContent=QR_FAIL_MSG}`,
  `  var qb=$("#qr");if(qb)qb.innerHTML="";var qf=$("#qrfail");if(qf){qf.hidden=true;qf.textContent=QR_FAIL_MSG}
  setQrDownloadUrl(null)`,
  "reset download"
);

rep(
  `function drawQRTarget(target){
  var box=$("#qr"),fail=$("#qrfail");box.innerHTML="";
  if(typeof window.qrcode!=="function"){fail.textContent=QR_FAIL_MSG;fail.hidden=false;return}
  try{var q=qrcode(0,"M");q.addData(target);q.make();
    var n=q.getModuleCount(),d="";for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))d+="M"+c+" "+r+"h1v1h-1z";
    box.innerHTML='<svg viewBox="0 0 '+n+' '+n+'" shape-rendering="crispEdges" aria-hidden="true"><path fill="#000" d="'+d+'"/></svg>';
    fail.hidden=true;
  }catch(err){fail.textContent=QR_FAIL_MSG;fail.hidden=false}
}`,
  `function setQrDownloadUrl(url){
  var a=$("#qrDl");if(!a)return;
  if(url){a.href=url;a.hidden=false;a.removeAttribute("aria-hidden")}
  else{a.href="#";a.hidden=true;a.setAttribute("aria-hidden","true")}
}
function drawQRTarget(target){
  var box=$("#qr"),fail=$("#qrfail");box.innerHTML="";
  if(typeof window.qrcode!=="function"){fail.textContent=QR_FAIL_MSG;fail.hidden=false;setQrDownloadUrl(null);return}
  try{var q=qrcode(0,"M");q.addData(target);q.make();
    var n=q.getModuleCount(),d="";for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))d+="M"+c+" "+r+"h1v1h-1z";
    box.innerHTML='<svg viewBox="0 0 '+n+' '+n+'" shape-rendering="crispEdges" aria-hidden="true"><path fill="#000" d="'+d+'"/></svg>';
    fail.hidden=true;setQrDownloadUrl(target);
  }catch(err){fail.textContent=QR_FAIL_MSG;fail.hidden=false;setQrDownloadUrl(null)}
}`,
  "drawQR download"
);

rep(
  `  fail.textContent="Preparing your QR code…";fail.hidden=false;
  qrUploadCtrl=new AbortController();`,
  `  fail.textContent="Preparing your QR code…";fail.hidden=false;setQrDownloadUrl(null);
  qrUploadCtrl=new AbortController();`,
  "prepareQR loading"
);

if (s.includes("\x08")) throw new Error("backspace in file");
fs.writeFileSync(path, s);
console.log("qr ui patch ok");