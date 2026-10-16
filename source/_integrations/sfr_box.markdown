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
  - event
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: silver
---

The **SFR Box** {% term integration %} offers integration with the **SFR** broadband router.

This integration provides the following platforms:

- Binary sensors - such as ADSL status.
- Buttons - such as reboot.
- Events - such as VoIP call history.
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
## Supported functionality

### Events

- **VoIP call history**: Triggers for every new call entry in the call history
  - **Event types**: incoming, outgoing, missed
  - **Event attributes**:
    - `type`: The type of call (voip)
    - `direction`: The direction of the call (incoming or outgoing)
    - `number`: The phone number associated with the call
    - `length`: The duration of the call in seconds (-1 for missed calls)
    - `date`: Unix timestamp of when the call occurred

{% note %}
The VoIP call history is updated every 60 seconds. If multiple calls happened during that time frame, they will all trigger one after the other once the call history is refreshed.
{% endnote %}

{% note %}
If a VoIP call happens while Home Assistant is down, no event will fire, even after it has restarted.
{% endnote %}

## Compatibility

The integration uses the REST API, which is known to be available on models `NB4`, `NB5`, `NB6`, `NB6V`, and `NB6VAC`.

However, `NCC` models do not appear to expose this REST API, and are therefore unsupported by the integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
