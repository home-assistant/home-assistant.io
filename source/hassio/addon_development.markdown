---
layout: page
title: "Developing an add-on"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Add-ons for Hass.io allows the user to extend the functionality around Home Assistant. This can be running an application that Home Assistant can integrate with (like an MQTT broker) or to share the configuration via Samba for easy editing from other computers. Add-ons can be configured via the Hass.io panel in Home Assistant.

Under the hood, add-ons are Docker images published in Docker hub. Developers can create GitHub repositories that contain multiple references to add-ons for easy sharing with the community.
