---
title: "Home Assistant"
description: "Manage your Home Assistant and custom add-ons."
redirect_from: /integrations/hassio/
---

Home Assistant turns your Raspberry Pi (or another device) into the ultimate home automation hub. With Home Assistant, you can focus on integrating your devices and writing automations.

[Go to the installation instructions &raquo;][install]

The advantages of using Home Assistant:

- Free and open source
- Optimized for embedded devices like Raspberry Pi
- 100% local home automation
- Easy installation and updates (powered by [Home Assistant] and [Home Assistant Core])
- Management web interface integrated into Home Assistant
- Create and restore full backups of your whole configuration with ease
- Install many popular add-ons with a single click! For example [Google Assistant], encryption via [Let's Encrypt] and dynamic DNS via [Duck DNS].<br><br>[Browse available add-ons &raquo;][all]<br><br>
- Active community that is helpful and sharing add-ons including AppDaemon, Homebridge and InfluxDB.<br><br>[Browse the forums &raquo;][forums]<br>[Join the Hass.io chat &raquo;][chat]<br>[Browse community add-on repositories &raquo;][comm-add-ons]<br><br>

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/qnCRcGTznXs" frameborder="0" allowfullscreen></iframe>
</div>

### Upgrading

Home Assistant users can update via the 'Supervisor' panel in the UI. However, please note that updates take some time to roll into the Home Assistant builds. Therefore, there is often a slight delay (a day or two) between the availability of a Home Assistant Core update and the update being available in Home Assistant, so be patient. When a Home Assistant update is available, it will be shown as a notification in the sidebar panel in the web interface.

<p class='img'>
<img src='/images/hassio/screenshots/dashboard.png'>
Home Assistant dashboard with upgrade notification (under the hamburger menu -> Supervisor)
</p>


[Google Assistant]: /addons/google_assistant/
[Snips.ai]: /addons/snips/
[Let's Encrypt]: /addons/lets_encrypt/
[Duck DNS]: /addons/duckdns/
[forums]: https://community.home-assistant.io/c/hass-io
[comm-add-ons]: https://community.home-assistant.io/tags/hassio-repository
[all]: /addons/
[chat]: https://discord.gg/K3UVxJd
[HassOS]: https://github.com/home-assistant/hassos
[Docker]: https://www.docker.com/
[install]: /hassio/installation/
