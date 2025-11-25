---
title: IKEA Idasen Desk
description: Control and monitor your IKEA Idåsen standing desk.
ha_iot_class: Local Push
ha_config_flow: true
ha_release: '2023.10'
ha_category:
  - Cover
ha_domain: idasen_desk
ha_bluetooth: true
ha_platforms:
  - button
  - cover
  - sensor
ha_integration_type: device
ha_codeowners:
  - '@abmantis'
ha_quality_scale: bronze
---

The IKEA IDÅSEN {% term integration %} allows you to connect your [IKEA Idåsen](https://www.ikea.com/us/en/cat/idasen-system-47424/) motorized desk to Home Assistant, making it possible to control the desk height and also monitor height changes from the physical controller.

{% tip %}

The recommended way to connect the desk to Home Assistant is by using an [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth), as they provide the best experience.
  
If you are not using an ESPHome Bluetooth Proxy, you need to keep `bluetoothctl` (or any other Bluetooth Agent) open during the integration setup, or it will fail to authenticate with the desk. The connection process is also less reliable than with ESPHome, so you may need to retry a few times until it succeeds. This is due to a limitation in the third-party Bluetooth implementation used by Home Assistant.

Also, if not using an ESPHome Bluetooth Proxy, you may experience the desk becoming unavailable and needing re-pairing after a restart of Home Assistant or a reload of the integration. To pair it permanently, [access the host over SSH](https://developers.home-assistant.io/docs/operating-system/debugging/#ssh-access-to-the-host), pair the desk with `bluetoothctl pair <desk-BT-address>`, and validate it being listed by `bluetoothctl devices Paired`. If the desk is not listed as paired, repeat the command several times while entering pairing mode on the desk.

{% endtip %}

{% include integrations/config_flow.md %}

Home Assistant will display a list of addresses of the available desks, and you just need to select the one you want to add. Repeat the process to add more than one desk.

{% note %}
If you see an "No unconfigured devices found" message, make sure that the desk is in Bluetooth pairing mode. For that, press the small button with the Bluetooth logo on the controller until it starts blinking (about 3 seconds).
{% endnote %}

## Connect/Disconnect buttons

This integration provides two buttons to connect and disconnect to/from the desk using Bluetooth. These can be used to automate connecting to the desk only when needed, for example, to avoid keeping a constant connection when the available connection slots are limited.

## Sensors

{% configuration_basic %}
Height:
  description: The current height of the desk, in meters.
{% endconfiguration_basic %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
