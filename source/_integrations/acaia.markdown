---
title: Acaia
description: Instructions on how to integrate Acaia Scales within Home Assistant.
ha_release: 2023.10
ha_category:
  - Button
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: acaia
ha_platforms:
  - button
ha_codeowners:
  - '@zweckj'
ha_integration_type: integration
---

This integration interacts with [Acaia Scales](https://acaia.co) through Bluetooth. 

Your scale should be automatically discovered as long as you have the Bluetooth integration enabled and the scale is in reach.

Once the scale is configured Home Assistant will try to connect to it whenever it can detect that the scale is available, this can take a couple of seconds.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Name:
  description: "Name to give your scale"
  required: true
  type: string
MAC Address:
  description: "Bluetooth MAC address of your scale"
  required: true
  type: string
Is new style scale:
  description: "If your scale is newer than approximately 2020 it is considered new style. If you encounter errors try toggling this setting."
  required: false
  type: boolean
{% endconfiguration_basic %}

## Buttons
| Button Name | Description |
|-------------|-------------|
| Tare        | Tare the scale |
| Reset Timer | Reset the timer of the scale to 0 |
| Start/Stop Timer | Starts the timer, if it is not running, stops it, if it is running |
