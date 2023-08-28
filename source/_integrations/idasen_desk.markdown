---
title: IKEA IDÅSEN Desk
description: Control and monitor your IKEA Idåsen standing desk.
ha_iot_class: Local Push
ha_config_flow: true
ha_release: '2023.10'
ha_category:
  - Desk
ha_domain: idasen_desk
ha_platforms:
  - cover
ha_integration_type: integration
---

The IKEA IDÅSEN integration allows you to connect your IKEA Idåsen motorized desk to Home Assistant, making it possible to control the desk height and also monitor height changes from the physical controller.

{% include integrations/config_flow.md %}

Home Assistant will display a list of addresses of the available desks, and you just need to select the one you want to add. Repeat the process to add more than one desk.

<div class='note'>
If you see an "No unconfigured devices found" message, make sure that the desk is in Bluetooth pairing mode. For that, press the small button with the Bluetooth logo on the controller until it starts blinking (about 3 seconds).
</div>
