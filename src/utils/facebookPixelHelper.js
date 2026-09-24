import { isPROD } from "./EnvUtils";

const addPreconnectLink = () => {
  if (document.querySelector('link[href="https://connect.facebook.net"]')) return; // prevent duplicates

  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = "https://connect.facebook.net";
  preconnect.crossOrigin = "";

  const dnsPrefetch = document.createElement("link");
  dnsPrefetch.rel = "dns-prefetch";
  dnsPrefetch.href = "https://connect.facebook.net";

  document.head.appendChild(preconnect);
  document.head.appendChild(dnsPrefetch);
};

const isFbqAvailable = () =>
  typeof window !== "undefined" && typeof window.fbq === "function" && isPROD();

export const initFacebookPixel = (pixelId) => {
  if (!isPROD()) return;

  addPreconnectLink();

  if (!isFbqAvailable()) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod(...arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    window.fbq("init", pixelId);
  }
};

export const trackPageView = () => {
  if (isFbqAvailable()) {
    window.fbq("track", "PageView");
  }
};

export const trackCustomEvent = (eventName, payload = {}) => {
  if (isFbqAvailable()) {
    window.fbq("trackCustom", eventName, payload);
  }
};
