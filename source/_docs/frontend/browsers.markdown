---
title: "Browsers"
description: "Browser Compatibility List"
---

Home Assistant requires a web browser to show the frontend and supports all major modern browsers. We don't test the web interface against all available browsers but this page tracks different browsers on various operating systems and should help you to pick a browser which works. The "Release" column contains the release number which was tested. This doesn't mean that older or newer releases will not work.

If a browser is listed as working but you are still having problems, it is possible that some add-on or extension may be the problem. Some add-ons or extension are known to cause issue with the frontend, but it's not possible to test them all. If you are having issues with the frontend displaying correctly, you should disable all your add-ons or extensions and enable them one at a time.

We would appreciate if you help to keep this page up-to-date and add feedback.

## Microsoft Windows

| Browser                   | Release        | State      | Comments                 |
| :------------------------ |:---------------|:-----------|:-------------------------|
| Internet Explorer ([IE])  | 11             | Not supported | Does not support promises. |
| Microsoft [Edge]          | deli. Win 10   | works | Streaming updates not working. |
| [Chrome]                  | 61.0.3163.100  | works      |                          |
| [Firefox]                 | 62.0.3         | works      |                          |
| [Iridium]                 | 48.2           | works      |                          |
| [Opera]                   | 42.0.2393.351  | works      |                          |

## macOS

| Browser               | Release        | State      | Comments                 |
| :-------------------- |:---------------|:-----------|:-------------------------|
| [Safari]              |                | works      | Not working with Safari Technology Preview 112 beta |

## Linux

| Browser               | Release        | State      | Comments                 |
| :-------------------- |:---------------|:-----------|:-------------------------|
| [Firefox]             | 62.0           | works      |                          |
| [Midori]              | 0.5.11         | works      |                          |
| [Chromium]            | 69.0.3497.81   | works      |                          |
| [Conkeror]            | 1.0.2          | works      |                          |
| [Tor Browser]         | 7.0.8          | works      |                          |
| [Konqueror]           |                | unknown    |                          |
| [Uzbl]                | 0.9.0          | works      |                          |
| [Opera]               | 42.0.2393.351  | works      |                          |
| [Lynx]                | 2.12           | fails      | loads empty page         |
| [elinks]              |                | fails      | page with manifest and import |
| [w3m]                 | 0.5.3          | fails      | display the icon shown while loading HA |
| [Epiphany]            | 3.18.5         | works      |                          |
| [surf]                | 0.7            | works      |                          |
| [Chrome]              | 71.0.3578.98   | works      |                          |
| [Waterfox]            | 56.2.6         | fails      |                          |

## Android

| Browser               | Release        | State      | Comments                 |
| :-------------------- |:---------------|:-----------|:-------------------------|
| [Chrome]              | 50.0.2661.89   | works      | Can also be added to desktop |
| [Firefox]             | 46.0.1         | works      | Can also be added to desktop |
| [Opera]               | 42.0.2246.112628 | works    | Can also be added to desktop |

## iOS

| Browser               | Release        | State      | Comments                 |
| :-------------------- |:---------------|:-----------|:-------------------------|
| [Safari]              |                | works      | Can also be added to desktop. Not working in iOS 14 beta 5. |
| [Chrome]              |                | works      | Not working in iOS 14 beta 5.               |

There are reports that devices running with iOS prior to iOS 10, especially old iPads, are having trouble. Devices running iOS 14 beta 5, you will not be able to interact with Home Assistant controls.

## webOS

| Browser               | Release        | State      | Comments                 |
| :-------------------- |:---------------|:-----------|:-------------------------|
| [LG webOS TV Built-in]| webOS 04.80.03 | works      | including magic remote   |

[Chrome]: https://www.google.com/chrome/
[Chromium]: https://www.chromium.org/
[Conkeror]: http://conkeror.org/
[Edge]: https://www.microsoft.com/en-us/windows/microsoft-edge
[elinks]: http://elinks.or.cz/
[Epiphany]: https://wiki.gnome.org/Apps/Web
[Firefox]: https://www.mozilla.org/en-US/firefox/
[IE]: https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads
[Iridium]: https://iridiumbrowser.de/
[Konqueror]: https://konqueror.org/
[Lynx]: https://lynx.browser.org/
[Midori]: https://astian.org/midori-browser/
[Opera]: https://www.opera.com/
[Safari]: https://www.apple.com/safari/
[surf]: https://surf.suckless.org/
[Tor Browser]: https://www.torproject.org/
[Uzbl]: https://www.uzbl.org/
[w3m]: http://w3m.sourceforge.net/
[Waterfox]: https://www.waterfoxproject.org
[LG webOS TV Built-In]: https://www.lg.com/uk/support/help-library/details-on-enjoying-internet-browsing-on-your-lg-webos-tv-CT00008334-1435838149474
