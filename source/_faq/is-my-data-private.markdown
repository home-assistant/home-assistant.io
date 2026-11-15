---
title: "Is my smart home data private with Home Assistant?"
description: "Yes. Home Assistant runs on your own hardware, stores your data locally, and talks to your devices over your local network whenever possible."
ha_category: About Home Assistant
---

Yes. Privacy is one of the founding principles of Home Assistant.

Home Assistant runs on your own hardware in your home, and your data is stored locally. There is no Home Assistant account in the cloud and no third party gets access to your devices or your data.

Whenever a {% term device %} supports it, Home Assistant talks to it directly over your local network instead of going through a vendor's cloud. Local protocols like [Zigbee](/integrations/zha/), [Z-Wave](/integrations/zwave_js/), [Matter](/integrations/matter/), [Thread](/integrations/thread/), and [ESPHome](/integrations/esphome/) do not need any internet connection at all.

Optional services such as [Home Assistant Cloud](https://www.nabucasa.com) only do what you specifically enable, like remote access or connecting Home Assistant to Apple Home, Google Home, and Amazon Alexa.

Learn more:

- [Privacy policy](/privacy/)
- [Home Assistant Cloud](https://www.nabucasa.com)
- [Browse all integrations](/integrations/)
