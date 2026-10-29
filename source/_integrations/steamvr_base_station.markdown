---
description: Instructions on how to control Valve Index base stations with Home Assistant over Bluetooth.
ha_release: '2026.11'
ha_domain: steamvr_base_station
---

The **SteamVR Base Station** {% term integration %} lets you control Valve Index base stations over Bluetooth Low Energy.

## Use cases

- Put the base stations to sleep at night or when nobody is home, so their motors and lasers don't keep running.
- Wake the base stations when your gaming PC turns on, so they are ready when you put on the headset.
- See at a glance whether a base station is on, booting, in standby, or asleep.

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

### Binary sensor

- **Problem**: On when the station reports a fault.

### Button

- **Identify**: Blinks the station's LED white for about 20 seconds, to tell stations apart.

### Selects

- **Power mode**: Switches the station on, to standby, or to sleep. From standby it is back on in about a second, from sleep in about 11 seconds. Standby is hidden on firmware that lacks it.
- **Channel**: The station's tracking channel, from 1 to 16. SteamVR normally assigns channels itself, so only change it to fix a conflict. Disabled by default.

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

The base stations broadcast their power state and channel over Bluetooth, so Home Assistant updates the entities without {% term polling %}. Connections are opened briefly to read device information during setup and when the integration loads, and to send commands.

## Known limitations

- Each command opens a short Bluetooth connection, so commands are not instant. The Bluetooth adapter or proxy needs a free connection slot, or the command fails.
- A base station takes about 11 seconds to come back on from sleep. If you need the stations ready right away, use standby instead, which takes about a second.

## Troubleshooting

### Symptom: setup or a command fails with a connection error

#### Resolution

Make sure the base station is within range of a Bluetooth adapter or proxy with a free connection slot, then try again.

## Diagnostics

The diagnostics download includes the station's device information, its last known state, and the raw data of its last Bluetooth broadcast, which can help developers reproduce issues without access to the hardware. The station name, serial number, and Bluetooth address are redacted.
Attach the downloaded file when reporting an issue. For more information, see [Download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics).

## Removing the integration

{% include integrations/remove_device_service.md %}
