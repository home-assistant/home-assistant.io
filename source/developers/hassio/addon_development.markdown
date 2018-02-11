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

1. [Tutorial: Making your first add-on](/developers/hassio/addon_tutorial/)
1. [Configuration](/developers/hassio/addon_config/)
1. [Communication](/developers/hassio/addon_communication/)
1. [Local Testing](/developers/hassio/addon_testing/)
1. [Publishing](/developers/hassio/addon_publishing/)
1. [Presentation](/developers/hassio/addon_presentation/)
1. [Repositories](/developers/hassio/addon_repository/)
