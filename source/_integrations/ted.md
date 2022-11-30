---
title: The Energy Detective
description: How to add a TED energy monitor to Home Assistant.
ha_category:
  - Energy
ha_release: 2021.11
ha_iot_class: Local Polling
ha_domain: ted
ha_config_flow: true
ha_codeowners:
  - '@rianadon'
ha_platforms:
  - sensor
---

The TED integration monitors electricity consumption/production by connecting to the [TED](https://www.theenergydetective.com/home) gateway or Energy Control Center, itself connected to one or several Measuring Transmitting Units (MTU). The platform creates sensors for measuring current, daily, and month-to-date energy consumption.

Works with the TED5000 and TED6000 energy monitors.

{% include integrations/config_flow.md %}
