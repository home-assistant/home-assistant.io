---
title: "The Home Assistant user interface is acting weird"
description: "If buttons, cards, or whole pages start to look or behave strangely after an update, it is almost always a caching issue in your browser or app. Refreshing usually fixes it."
ha_category: Usage
---

If buttons, cards, or whole pages start to look or behave strangely, it is almost always a caching issue. The Home Assistant user interface caches a lot of things in your browser to make it fast, and sometimes that cache gets out of sync with what is actually running on your Home Assistant.

This typically happens after:

- Installing, updating, or removing a custom card or custom dashboard element from outside the official integration store, such as through HACS.
- In rare cases, after a Home Assistant update.

To fix it:

1. Close all browser tabs and Home Assistant app windows that have Home Assistant open.
2. Open Home Assistant again. In most cases, this is enough.
3. If the issue is still there, do a hard refresh of the page, or clear your browser cache for Home Assistant, and try again.

A hard refresh reloads the page while bypassing the cache:

- On Windows and Linux, press `Ctrl` + `F5` or `Ctrl` + `Shift` + `R`.
- On macOS, press `Cmd` + `Shift` + `R`.
- On the Home Assistant Companion app for Android or iOS, pull down on the page to refresh.

If a hard refresh is not enough, you can clear the browser cache for Home Assistant specifically:

- **Chrome, Edge, or Brave**: Open Home Assistant, then press `F12` to open the developer tools. Right-click the refresh button in the browser toolbar and select **Empty cache and hard reload**.
- **Firefox**: Open the menu, go to **Settings** > **Privacy & Security** > **Cookies and Site Data** > **Manage Data**, search for your Home Assistant address, select it, and select **Remove Selected**.
- **Safari**: Open **Safari** > **Settings** > **Privacy** > **Manage Website Data**, search for your Home Assistant address, select it, and select **Remove**.
- **Home Assistant Companion app**: Go to **Settings** in the app and select **Reset frontend cache**.

If a specific custom card is the cause, removing or updating that card will resolve it.
