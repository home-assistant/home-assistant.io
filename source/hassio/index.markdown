---
layout: page
title: "Hass.io"
description: "Manage your Home Assistant and custom add-ons."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Hass.io turns your Raspberry Pi (or another device) into the ultimate home automation hub powered by Home Assistant. With Hass.io you can focus on integrating your devices and writing automations.

[Go to the installation instructions &raquo;][install]

The advantages of using Hass.io:

- Free and open source
- Optimized for embedded devices like Raspberry Pi
- 100% local home automation
- Easy installation and updates (powered by [ResinOS] and [Docker])
- Management user interface integrated into Home Assistant
- Easily create and restore full backups of your whole configuration.
- Easily install many popular add-ons including [Google Assistant], encryption via [Let's Encrypt] and dynamic DNS via [Duck DNS].<br><br>[Browse available add-ons &raquo;][all]<br><br>
- Active community that is helpful and sharing add-ons including AppDaemon, Homebridge and InfluxDB.<br><br>[Browse the forums &raquo;][forums]<br>[Join the Hass.io chat &raquo;][chat]<br>[Browse community add-on repositories &raquo;][comm-add-ons]<br><br>

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XWPluWcYRMI" frameborder="0" allowfullscreen></iframe>
</div>

### {% linkable_title Upgrading %}

Hass.io users can update Home Assistant via the 'Hass.io' page in the UI. However please note that Home Assistant updates take time to roll into the Hass.io builds. Therefore there is often a slight delay between the availability of a Home Assistant update and an update being available in Hass.io, be patient. When a Hass.io update is available, it will be shown as available on the ‘Hass.io' page in your UI.

<p class='img'>
<img src='/images/hassio/screenshots/dashboard.png'>
Hass.io dashboard with upgrade notification (under the hamburger menu -> Hass.io)
</p>

<p class='img'>
<img src='/images/hassio/screenshots/ssh-upgrade.png'>
Hass.io upgrade process from the SSH command line
</p>

[Google Assistant]: /addons/google_assistant/
[Snips.ai]: /addons/snips/
[Let's Encrypt]: /addons/lets_encrypt/
[Duck DNS]: /addons/duckdns/
[forums]: https://community.home-assistant.io/c/hass-io
[comm-add-ons]: https://community.home-assistant.io/tags/hassio-repository
[all]: /addons/
[chat]: https://discord.gg/K3UVxJd
[ResinOS]: https://resinos.io/
[Docker]: https://www.docker.com/
[install]: /hassio/installation/
