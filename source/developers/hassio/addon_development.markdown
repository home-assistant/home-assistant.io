---
layout: page
title: "Developing an add-on"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /hassio/addon_development/
---

Add-ons for Hass.io allow the user to extend the functionality around Home Assistant. This can be running an application that Home Assistant can integrate with (like an MQTT broker) or to share the configuration via Samba for easy editing from other computers. Add-ons can be configured via the Hass.io panel in Home Assistant.

Under the hood, add-ons are Docker images published in [Docker Hub](https://hub.docker.com/). Developers can create [GitHub](https://github.com) repositories that contain multiple references to add-ons for easy sharing with the community.

<ol>
  <li><a href='/developers/hassio/addon_tutorial/'>Tutorial: Making your first add-on</a></li>
  <li><a href='/developers/hassio/addon_config/'>Configuration</a></li>
  <li><a href='/developers/hassio/addon_communication/'>Communication</a></li>
  <li><a href='/developers/hassio/addon_testing/'>Local Testing</a></li>
  <li><a href='/developers/hassio/addon_publishing/'>Publishing</a></li>
  <li><a href='/developers/hassio/addon_repository/'>Repositories</a></li>
</ol>
