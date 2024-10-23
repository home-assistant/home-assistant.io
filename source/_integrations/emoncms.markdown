---
title: Emoncms
description: Instructions on how to integrate Emoncms feeds as sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.29
ha_iot_class: Local Polling
ha_domain: emoncms
ha_codeowners:
  - '@borpin'
  - '@alexandrecuer'
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The `emoncms` sensor {% term integration %} creates sensors for the feeds available in your local or cloud based version of [Emoncms](https://emoncms.org).

To write information from Home Assistant to Emoncms, you can use the [`emoncms_history`](/integrations/emoncms_history) {% term integration %}.

## Prerequisites

 To use this service, you need an Emoncms account and an API key. You can find the API key in your local or cloud-based Emoncms account settings.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The url of the emoncms server starting with the protocol (http or https). Example : https://emoncms.org
API key:
  description: The 32 bits read only API key needed for authentication. The read and write API key is not needed as this integration just reads feed datas from emoncms.
Synchronization mode:
  description: Two synchronization modes are available : manual and automatic. **The manual mode is the default one and the preferred option.** In manual mode, you can select the feeds to synchronize one by one. The automatic mode will synchronize all existing feeds automatically. The automatic mode is a feature for advanced users, to be used only if you really plan to use all your emoncms feeds in home assistant.
{% endconfiguration_basic %}

## Sensors

- **energy** in Wh, kWh
- **power** in W
- **voltage** in V
- **current** in A
- **apparent power** in VA
- **temperature** in °C, °F or K
- **frequency** in Hz
- **pressure** in hPa
