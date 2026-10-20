---
title: SteamVR Base Station
description: Instructions on how to control Valve Index base stations with Home Assistant over Bluetooth.
ha_categories:
  - media_entertainment.gaming
ha_bluetooth: true
ha_release: '2026.11'
ha_iot_class: Local Push
ha_codeowners:
  - '@g4bri3lDev'
ha_domain: steamvr_base_station
ha_config_flow: true
ha_platforms:
  - button
  - sensor
  - switch
ha_integration_type: device
ha_quality_scale: silver
---

The **SteamVR Base Station** {% term integration %} lets you control Valve Index base stations over Bluetooth Low Energy.

## Supported devices

- SteamVR Base Station 2.0, as used with the Valve Index

## Unsupported devices

- SteamVR Base Station 1.0, as used with the original HTC Vive

## Prerequisites

- A [Bluetooth](/integrations/bluetooth/) adapter or [ESPHome](/integrations/esphome/) Bluetooth proxy that supports active connections.

{% include integrations/config_flow.md %}

Base stations in range are discovered automatically.

{% configuration_basic %}
Device:
  description: "Select the base station to add. Its name (LHB-…) is printed on the back of the station."
{% endconfiguration_basic %}

## Supported functionality

### Button

- **Identify**: Blinks the station's LED white, to tell stations apart.

### Sensors

- **Power state**: Whether the station is on, booting, in standby, or sleeping.
- **Signal strength**: The Bluetooth signal strength of the station's last broadcast, in dBm. Disabled by default.

### Switch

Each base station has a switch named after the station. Turn it on to wake the station. Turn it off to put it to sleep, which stops its motors and lasers.

## SteamVR Base Station automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Put the base stations to sleep at night

Make sure the base stations are asleep at night, even if you forgot to turn them off.

- **Trigger**: Time: 01:00:00
- **Action**: Turn off switch
  - **Target**: Your base stations

{% details "YAML example for putting the base stations to sleep at night" %}

{% example %}
automation: |
  alias: "Put the base stations to sleep at night"
  triggers:
    - trigger: time
      at: "01:00:00"
  actions:
    - action: switch.turn_off
      target:
        entity_id:
          - switch.lhb_747a9bc5
          - switch.lhb_5e72f725
{% endexample %}

{% enddetails %}

## Data updates

The base stations broadcast their power state over Bluetooth, so Home Assistant updates the switch and sensors without {% term polling %}. Connections are opened briefly to read device information during setup and when the integration loads, and to send commands, such as power changes and identify.

## Troubleshooting

### Symptom: setup or a command fails with a connection error

#### Resolution

Make sure the base station is within range of a Bluetooth adapter or proxy with a free connection slot, then try again.

## Removing the integration

{% include integrations/remove_device_service.md %}
