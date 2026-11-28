---
title: "Get the Home Assistant app"
description: "Get the Home Assistant app for your phone or tablet."
sidebar: false
---

<style>
  .get-mobile-app-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
  }
  /* The badges bring their own shape, so drop the frame the site puts on
     images, and show both at the same height. */
  article.page .get-mobile-app-badges img {
    width: auto;
    height: 48px;
    padding: 0;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background: none;
  }
</style>

Use Home Assistant on your phone or tablet with the Home Assistant app.

<p class="get-mobile-app-badges">
  <a href="https://apps.apple.com/app/home-assistant/id1099568401"><img src="/images/get-mobile-app/app-store-badge.svg" width="144" height="48" alt="Download on the App Store"></a>
  <a href="https://play.google.com/store/apps/details?id=io.homeassistant.companion.android"><img src="/images/get-mobile-app/google-play-badge.png" width="161" height="48" alt="Get it on Google Play"></a>
</p>

No Google Play on your Android device? See the [other ways to get the Android app](https://companion.home-assistant.io/download/).

<script>
  // Send phones and tablets on to their app store. The address is in a QR
  // code that the Home Assistant installer shows, so the visitor does not
  // have to pick a store first. When the app is installed, the app link
  // opens the app and this page does not load at all.
  //
  // The page stays put when opened with ?stay, and when the visitor comes
  // back to it in the same tab, for example with Back from a Google Play
  // page on an Android device without Google Play.
  (function () {
    if (new URLSearchParams(location.search).has("stay")) return;

    var ua = navigator.userAgent;
    var store = null;
    if (
      /iPhone|iPad|iPod/.test(ua) ||
      // iPadOS reports itself as a Mac, but Macs have no touch screen.
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
    ) {
      store = "https://apps.apple.com/app/home-assistant/id1099568401";
    } else if (/Android/.test(ua)) {
      store = "https://play.google.com/store/apps/details?id=io.homeassistant.companion.android";
    }
    if (!store) return;

    var key = "get-mobile-app-redirected";
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch (e) {
      // Without storage the page cannot tell a return visit, so replace it:
      // Back then leaves the page instead of redirecting again.
      location.replace(store);
      return;
    }
    location.assign(store);
  })();
</script>
