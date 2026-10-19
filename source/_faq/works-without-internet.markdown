---
title: "Does Home Assistant work without an internet connection?"
description: "Yes. Home Assistant runs on your own hardware and can keep working without an internet connection. Devices that use local protocols keep responding, and your automations keep running."
ha_category: About Home Assistant
---

Yes. Home Assistant runs on your own hardware in your home, so it can keep working when the internet is down.

Devices that talk to Home Assistant using local protocols, such as [Zigbee](/integrations/zha/), [Z-Wave](/integrations/zwave_js/), [Matter](/integrations/matter/), [Thread](/integrations/thread/), and [ESPHome](/integrations/esphome/), do not need any internet connection at all. Your lights, switches, sensors, and {% term automations %} keep responding the same way they do every other day.

A few things still need the internet, and that is up to you:

- Devices that only talk to a vendor's cloud. If a brand requires its own cloud service to work, that integration cannot reach the device when your internet is down. Whenever there is a local alternative, Home Assistant prefers it.
- [Home Assistant Cloud](https://www.nabucasa.com) features such as remote access, and the Apple Home, Google Home, and Amazon Alexa integrations.
- Updates and access to the {% term app %} store.

Choosing devices that work with Home Assistant locally is the most reliable way to keep your smart home running through any kind of internet outage. The [Works with Home Assistant](https://works-with.home-assistant.io) program highlights devices that have been tested for local control.

Learn more:

- [Is Home Assistant reliable?](/faq/is-home-assistant-reliable/)
- [Is my smart home data private with Home Assistant?](/faq/is-my-smart-home-data-private-with-home-assistant/)
- [Works with Home Assistant](https://works-with.home-assistant.io)
