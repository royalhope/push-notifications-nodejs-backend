console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push received...");
  self.registration.showNotification(data.title, {
    body: "This is a test!!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});