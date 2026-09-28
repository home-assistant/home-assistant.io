---
title: SteamVR Lighthouse
description: Instructions on how to control Valve Index base stations with Home Assistant over Bluetooth.
ha_category:
  - Switch
ha_bluetooth: true
ha_release: 2026.10
ha_iot_class: Local Push
ha_codeowners:
  - '@g4bri3lDev'
ha_domain: steamvr_lighthouse
ha_config_flow: true
ha_platforms:
  - switch
ha_integration_type: device
ha_quality_scale: bronze
---

The **SteamVR Lighthouse** {% term integration %} lets you turn Valve Index base stations on and put them to sleep from Home Assistant over Bluetooth Low Energy. For example, you can wake the base stations when you start your VR PC and put them to sleep when you are done, so their motors don't run all day.

## Supported devices

- Valve Index base stations, also known as SteamVR Base Station 2.0. Their Bluetooth name starts with `LHB-`, followed by the ID printed on the back of the station.

## Unsupported devices

- HTC Vive base stations (SteamVR Base Station 1.0).

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) setup that supports active connections, for example:
  - Built-in Bluetooth adapter
  - ESPHome Bluetooth proxy
- A base station that is plugged in and within Bluetooth range.

{% include integrations/config_flow.md %}

Once the [Bluetooth](/integrations/bluetooth) integration is active, base stations are discovered automatically. When you confirm a station, Home Assistant connects to it once to check that it can be controlled.

## Supported functionality

The **SteamVR Lighthouse** integration provides the following entity for each base station.

### Switch

- **Power**: Turning the switch on wakes the base station. Turning it off puts the station to sleep: the lasers turn off, the motors stop, and the status LED slowly pulses blue. The switch shows as on while the station is still starting up.

## Data updates

Base stations continuously broadcast their power state over Bluetooth, including while they sleep. Home Assistant updates the switch from these broadcasts without connecting to the station. A connection is only opened for a moment when you turn the station on or off.

## SteamVR Lighthouse automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Wake the base stations with your VR PC

Turn the base stations on when your VR PC turns on.

- **Trigger**: Entity: Your VR PC changes to on
- **Action**: Switch: Turn on
  - **Entities**: Your base stations

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Wake the base stations with the VR PC"
  triggers:
    - trigger: state
      entity_id: switch.vr_pc
      to: "on"
  actions:
    - action: switch.turn_on
      target:
        entity_id:
          - switch.lhb_747a9bc5
          - switch.lhb_5e72f725
{% endexample %}

{% enddetails %}

### Automation: Put the base stations to sleep at night

Make sure the base stations are asleep at night, even if you forgot to turn them off.

- **Trigger**: Time: 01:00:00
- **Action**: Switch: Turn off
  - **Entities**: Your base stations

{% details "Show example YAML" %}

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

## Known limitations

- Waking a base station from sleep takes about 11 seconds before it tracks again.
- Each command needs a free Bluetooth connection slot on your adapter or proxy.

## Troubleshooting

### Base station is not discovered

#### Resolution

Check that the [Bluetooth](/integrations/bluetooth) integration is set up and working. Then, confirm that the base station is plugged in and within range of your Home Assistant host or an ESPHome Bluetooth proxy.

### Setup or a command fails with a connection error

#### Description

The base station was out of range, or all Bluetooth connection slots on your adapter or proxy were in use.

#### Resolution

Move the base station closer to your Bluetooth adapter or proxy, or add an ESPHome Bluetooth proxy near it. Then, try again.

## Removing the integration

{% include integrations/remove_device_service.md %}
