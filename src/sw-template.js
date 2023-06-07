importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.loadModule("workbox-background-sync");

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const url = "http://localhost:4000";

const routesToCache = [`${url}/api/auth/renew`, `${url}/api/events`];

const staticAssets = [
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
];

registerRoute(({ url }) => staticAssets.includes(url.href), new CacheFirst());
registerRoute(
  ({ url }) => routesToCache.includes(url.href),
  new NetworkFirst()
);

// registerRoute(
//   new RegExp(
//     "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
//   ),
//   new CacheFirst()
// );

const bgSyncPlugin = new BackgroundSyncPlugin("posts-only-queue", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

// offline posts
const eventsCacheMethods = ["POST", "PUT", "DELETE"];

eventsCacheMethods.forEach((method) =>
  registerRoute(
    new RegExp(`${url}/api/events`),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    method
  )
);
