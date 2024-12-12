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
  description: The URL of the Emoncms server starting with the protocol (`http` or  `https`). For cloud installations, use <https://emoncms.org> (trailing slash optional). For local installations, use your local server address (e.g., `http://localhost:8080`). Ensure the server is accessible from your Home Assistant instance.
API key:
  description: The 32-character read-only API key needed for authentication is found under "My Account > Read Only API Key" in Emoncms. The key should be a hexadecimal string. The read-and-write API key is not needed as this integration reads data from Emoncms. If you receive authentication errors, verify that you've copied the entire key correctly.
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
