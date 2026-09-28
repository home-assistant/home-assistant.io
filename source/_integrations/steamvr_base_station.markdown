---
title: SteamVR Base Station
description: Instructions on how to control Valve Index base stations with Home Assistant over Bluetooth.
ha_category:
  - Switch
ha_bluetooth: true
ha_release: '2026.10'
ha_iot_class: Local Push
ha_codeowners:
  - '@g4bri3lDev'
ha_domain: steamvr_base_station
ha_config_flow: true
ha_platforms:
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

## Supported functionality

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

The base stations broadcast their power state over Bluetooth, so Home Assistant updates the switch without {% term polling %}. A connection is only opened to send a command.

## Troubleshooting

### Symptom: setup or a command fails with a connection error

#### Resolution

Make sure the base station is within range of a Bluetooth adapter or proxy with a free connection slot, then try again.

## Removing the integration

{% include integrations/remove_device_service.md %}
