const device = navigator.userAgent.toLowerCase();

if (device.includes("mobile")) {
  document.body.classList.add("mobile");
} else {
  document.body.classList.add("desktop");
}
