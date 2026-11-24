const fs = require("fs");
const path = "index.html";
let s = fs.readFileSync(path, "utf8");

function rep(old, neu, label) {
  const n = s.split(old).length - 1;
  if (n !== 1) throw new Error(label + ": expected 1 match, got " + n);
  s = s.replace(old, neu);
}

rep(
  `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Taste Experience – Brightspot</title>`,
  `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#021a5c">
<meta name="application-name" content="Tase Exp Brghtspt">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Tase Exp Brghtspt">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<title>Taste Experience – Brightspot</title>`,
  "pwa head"
);

rep(
  `</body>
</html>`,
  `<script>if("serviceWorker" in navigator){window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){});});}</script>
</body>
</html>`,
  "pwa sw register"
);

if (s.includes("\x08")) throw new Error("backspace in file");
fs.writeFileSync(path, s);
console.log("pwa patch ok");