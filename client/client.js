const publicVapidKey = 'BOhwo7pqcI4SFs_J-hE6_eAKbrrmJJE6xtMoJqV6JMov6gVOYL9BqZOluPrnuaPWJ6pfBIzLEe2UwXCEyUbXcVA';

if ('serviceWorker' in navigator) {
    send().catch(error => console.error(error));
}

async function send() {
    console.log('registering serviceWorker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('serviceWorker registered...');

    console.log('registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('push registered...');

    console.log('sending push...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push sent...')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}