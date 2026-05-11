---
title: Honeywell String Lights
description: Instructions on how to integrate Honeywell String Lights into Home Assistant.
ha_category:
  - Light
ha_release: 2026.5
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: honeywell_string_lights
ha_platforms:
  - light
ha_integration_type: device
ha_quality_scale: bronze
---

The **Honeywell String Lights** {% term integration %} lets you control a Honeywell radio frequency (RF) remote-controlled string light set from Home Assistant.

The integration uses the [Radio Frequency](/integrations/radio_frequency/) {% term entity %} platform to send the turn on and turn off commands. This means you need a compatible RF transmitter (for example, an ESPHome device with a 433.92&nbsp;MHz OOK transmitter) set up before you can add the Honeywell String Lights.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Radio frequency transmitter:
  description: "Select the RF transmitter that Home Assistant should use to control the lights. Only transmitters that support 433.92&nbsp;MHz OOK transmissions are shown."
{% endconfiguration_basic %}

## Assumed state

Because RF transmission is a one-way broadcast, Home Assistant cannot confirm whether the lights actually turned on or off. The integration therefore uses the [assumed state](/integrations/light#assumed-state) pattern: the state is the last state Home Assistant set, and it is restored across restarts.

## Supported devices

The integration has been tested with the Honeywell String Lights sold with a 433.92&nbsp;MHz OOK remote.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
