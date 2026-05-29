---
title: Ness Alarm
description: Instructions on how to integrate a Ness D8x/D16x alarm system with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
ha_release: 0.85
ha_iot_class: Local Push
ha_codeowners:
  - '@nickw444'
  - '@poshy163'
ha_domain: ness_alarm
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_config_flow: true
---

The **Ness Alarm** {% term integration %} allows Home Assistant users who own a Ness D8x/D16x alarm system to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm is accomplished through an IP232 module that must be connected to the alarm.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone statuses
- Alarm control panel: Reports on alarm status, and can be used to arm/disarm the system

The module communicates via the [Ness D8x/D16x ASCII protocol](https://ia802202.us.archive.org/16/items/ness-d-8x-d-16x-serial-interface.-ascii-protocol/Ness%20D8x%20D16x%20Serial%20Interface.%20ASCII%20Protocol.pdf).

## Prerequisites

As part of the installation process of the IP232 module, the device will need to be configured with the correct settings. From the [iComms Manual](https://ness.zendesk.com/hc/en-us/articles/360021989074-iComms-Manual), there are 3 essential steps:

1. Setting up the IP232 module with the correct baud rate (9600).
2. Ensuring connectivity of the device on either a DHCP assigned or Static IP address.
3. Setting the alarm panel up to allow for serial control. On D8x/D16x panels this is enabled by setting `P 199 E` `1E` to `6E` to be `ON` (6E available on v6 panels and later only).

If the settings in steps 1 and 2 are not set correctly, the integration will not be able to communicate properly with the device. If the `P 199 E` from step 3 is not configured properly, data will not be sent to the integration when events occur.

{% important %}
Incorrect configuration of these settings will prevent the integration from functioning properly.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the IP232 module on your home network."
Port:
  description: "The port on which the IP232 module listens for clients."
Infer arming state:
  description: "Infer the disarmed arming state only via system status events. This works around a bug with some panels (`<v5.8`) which emit `update.status = []` when they are armed."
{% endconfiguration_basic %}

### Managing zones

Adding zones allows you to monitor individual areas of your home, such as doors, windows, and motion sensors. Each zone appears as a binary sensor in Home Assistant.

After setting up the integration, you can add zones through the UI:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **Ness Alarm** integration and select **Configure**.
3. Select **Add zone** to add a new zone.
4. Enter the zone number (1-32) and select the zone type (device class).
5. The zone will appear as a separate device in Home Assistant.

You can reconfigure a zone's device class at any time by selecting the zone's configure button.

## Actions

### Action `aux`

Trigger an aux output.  This requires PCB version 7.8 or higher.

| Data attribute | Optional | Description                                                                                                                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `output_id`            | No       | The aux output you wish to change.  A number from 1-8.                                                                                                              |
| `state`                | Yes      | The On/Off State, represented as true/false. Default is true.  If P14xE 8E is enabled then a value of true will pulse output x for the time specified in P14(x+4)E. |

### Action `panic`

Trigger a panic

| Data attribute | Optional | Description                                |
| ---------------------- | -------- | ------------------------------------------ |
| `code`                 | No       | The user code to use to trigger the panic. |
