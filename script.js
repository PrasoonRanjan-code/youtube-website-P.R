const API_KEY = "AIzaSyDufVdc9E4Maj_nPhsc5PyvkLHFP2QBcoc";
const CHANNEL_ID = "UCqgbqpm5jdxwyudadlv-t4g";

async function getSubs() {

try {

const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

const res = await fetch(url);
const data = await res.json();

if (data.items && data.items.length > 0) {

const subs = data.items[0].statistics.subscriberCount;

document.getElementById("subs").textContent = subs;

} else {

document.getElementById("subs").textContent = "Channel not found";

}

} catch {

document.getElementById("subs").textContent = "error";

}

}

getSubs();
