---
title: SFR Box
description: Instructions on how to integrate SFR Box into Home Assistant.
ha_category:
  - Sensor
ha_release: 2023.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@epenet'
ha_domain: sfr_box
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: silver
---

The **SFR Box** {% term integration %} offers integration with the **SFR** broadband router.

This integration provides the following platforms:

- Binary sensors - such as ADSL status.
- Buttons - such as reboot.
- Sensors - such as ADSL line status, attenuation, noise and data rate.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname, IP address, or full URL of your SFR device."
Username (optional):
  description: "The username for accessing your SFR box's web interface. The default is 'admin'."
Password (optional):
  description: "The password for accessing your SFR box's web interface. The default is the Wi-Fi security key found on the device label."
{% endconfiguration_basic %}

## Compatibility

The integration uses the REST API, which is known to be available on models `NB4`, `NB5`, `NB6`, `NB6V`, and `NB6VAC`.

However, `NCC` models do not appear to expose this REST API, and are therefore unsupported by the integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
