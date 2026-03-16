const API_KEY = "AIzaSyAyEogqMev3OuV2NORLl9WYF2vqiltpfeM";
const CHANNEL_ID = "ucqgbqpm5jdxwyudadlv-t4g";

/* subscriber counter */

async function getSubs() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

    const res = await fetch(url);

    const data = await res.json();

    const subs = data.items[0].statistics.subscriberCount;

    document.getElementById("subs").textContent = subs;
  } catch {
    document.getElementById("subs").textContent = "error";
  }
}

getSubs();

/* latest videos */

async function loadVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6`;

  const res = await fetch(url);

  const data = await res.json();

  const grid = document.getElementById("videoGrid");

  data.items.forEach((v) => {
    if (v.id.videoId) {
      const iframe = document.createElement("iframe");

      iframe.src = `https://www.youtube.com/embed/${v.id.videoId}`;

      grid.appendChild(iframe);
    }
  });
}

loadVideos();

/* comments */

function addComment() {
  let input = document.getElementById("commentInput");

  let comments = document.getElementById("comments");

  if (input.value.trim() != "") {
    let p = document.createElement("p");

    p.textContent = input.value;

    comments.appendChild(p);

    localStorage.setItem("comments", comments.innerHTML);

    input.value = "";
  }
}

window.onload = function () {
  let saved = localStorage.getItem("comments");

  if (saved) {
    document.getElementById("comments").innerHTML = saved;
  }
};

/* matrix effect */

const canvas = document.getElementById("matrix");

const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;

canvas.width = window.innerWidth;

let letters = "01".split("");

let fontSize = 14;

let columns = canvas.width / fontSize;

let drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff66";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    let text = letters[Math.floor(Math.random() * letters.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.98)
      drops[i] = 0;

    drops[i]++;
  }
}

setInterval(draw, 50);
