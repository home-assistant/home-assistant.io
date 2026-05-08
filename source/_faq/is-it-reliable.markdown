---
title: "Is Home Assistant reliable?"
description: "Yes. Home Assistant runs locally on your own hardware and keeps working even when the internet or a vendor's cloud goes down. Updates are released monthly with automatic backups."
ha_category: About Home Assistant
---

Yes. Home Assistant is built to be reliable for everyday use in your home.

Local protocols like [Zigbee](/integrations/zha/), [Z-Wave](/integrations/zwave_js/), [Matter](/integrations/matter/), [Thread](/integrations/thread/), and [ESPHome](/integrations/esphome/) run entirely on your own network, so they keep working when your internet connection or a vendor's cloud goes down. This local control also means your {% term automations %} keep running too.

A new version of Home Assistant is released on the first Wednesday of every month. An [automatic {% term backup %}](/common-tasks/general/#backups) is taken before each update, and the built-in [repair system](/integrations/repairs/) proactively flags issues so you can resolve them before they become a problem.

Learn more:

- [Do Home Assistant updates break things?](/faq/do-home-assistant-updates-break-things/)
- [Backups](/common-tasks/general/#backups)
- [Repairs](/integrations/repairs/)
- [Browse all integrations](/integrations/)
