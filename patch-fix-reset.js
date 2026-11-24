const fs = require("fs");
let s = fs.readFileSync("index.html", "utf8");
const old =
  '  $(".opt").forEach(function(o){o.classList.remove("sel","dim");o.setAttribute("aria-checked","false")});\n' +
  '  $("[data-next]").forEach(function(b){b.disabled=true});}';
const neu =
  '  $$(".opt").forEach(function(o){o.classList.remove("sel","dim");o.setAttribute("aria-checked","false")});\n' +
  '  $$("[data-next]").forEach(function(b){b.disabled=true});}';
const n = s.split(old).length - 1;
if (n !== 1) throw new Error("reset forEach fix: expected 1 match, got " + n);
fs.writeFileSync("index.html", s.replace(old, neu));
console.log("reset fixed");