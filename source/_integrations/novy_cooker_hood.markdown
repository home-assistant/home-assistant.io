---
title: Novy Cooker Hood
description: Instructions on how to integrate Novy cooker hoods into Home Assistant.
ha_category:
  - Light
ha_release: 2026.5
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@piitaya'
ha_domain: novy_cooker_hood
ha_platforms:
  - light
ha_integration_type: device
ha_quality_scale: bronze
---

The **Novy Cooker Hood** {% term integration %} lets you control the light on a [Novy](https://www.novy.com/) radio frequency (RF) remote-controlled cooker hood from Home Assistant.

The integration uses the [Radio Frequency](/integrations/radio_frequency/) {% term entity %} platform to send the turn on and turn off commands. This means you need a compatible RF transmitter (for example, a [Broadlink](/integrations/broadlink/) RF blaster or an [ESPHome](/integrations/esphome/) device with a 433.92&nbsp;MHz OOK transmitter) set up before you can add the Novy cooker hood.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Radio frequency transmitter:
  description: "Select the RF transmitter that Home Assistant should use to control the hood. Only transmitters that support 433.92&nbsp;MHz OOK transmissions are shown."
Code:
  description: "The code your hood is paired with. Novy hoods leave the factory paired with code 1, so this is the right value for most users. The remote supports 10 codes in total to avoid interference with nearby RF devices on the same frequency, such as a neighbor's cooker hood or a garage door opener. If you re-paired your hood to work around interference, select the code you set during pairing."
{% endconfiguration_basic %}

After you submit the form, Home Assistant toggles the hood light on and off so you can confirm the code is correct. If the light reacts, select **Finish** to save the configuration. Otherwise, select **Retry** to pick a different code.

## Assumed state

Because RF transmission is a one-way broadcast, Home Assistant cannot confirm whether the hood light actually turned on or off. The integration therefore uses the [assumed state](/integrations/light#assumed-state) pattern: the state is the last state Home Assistant set, and it is restored across restarts.

## Supported devices

The integration has been tested with Novy cooker hoods sold with a 433.92&nbsp;MHz OOK remote and supports all 10 pairing codes.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
