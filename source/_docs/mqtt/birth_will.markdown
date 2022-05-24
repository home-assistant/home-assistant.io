---
title: "MQTT Birth and Last will"
description: "Instructions on how to setup MQTT birth and last will messages within Home Assistant."
logo: mqtt.png
---

Home Assistant's MQTT integration supports so-called Birth and Last Will and Testament (LWT) messages. The former is used to send a message after the service has started, and the latter is used to notify other clients about a disconnected client. Please note that the LWT message will be sent both in case of a clean (e.g. Home Assistant shutting down) and in case of an unclean (e.g. Home Assistant crashing or losing its network connection) disconnect.

By default, Home Assistant sends `online` and `offline` to `homeassistant/status`.

MQTT Birth and Last Will messages can be customized or disabled from the UI. To do this, click on "Configure" in the integration page in the UI, then "Re-configure MQTT" and then "Next".
