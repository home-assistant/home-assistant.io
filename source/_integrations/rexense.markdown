---
title: Rexense
description: "Integrate Rexense IoT Mesh devices"
ha_category:
  - Sensor
  - Switch
ha_release: 2025.04
ha_codeowners:
  - @rexense
ha_iot_class: local_push
ha_domain: rexense
featured: false
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
  - switch
ha_integration_type: device
---

Integrate [Rexense IoT Mesh devices](https://www.rexense.com) into Home Assistant.

## High-level description

The Rexense integration enables Home Assistant to automatically discover and manage Rexense IoT Mesh devices, providing automated device discovery, real‑time sensor data, and switch control.

## Installation instructions

1. **Enable default integrations**

   In your `configuration.yaml`, add:
   
   ```yaml
   default_config:
   zeroconf:
   ```

2. **Restart Home Assistant**

3. **Add Rexense**

   - Go to **Settings → Devices & Services**
   - Click **Add integration**
   - Search for **Rexense** and select it
   - Follow the prompts to either auto-discover your devices or enter **Host** and **Port** manually

Once configured, HA will fetch `/rex/GetBasicInfo` over HTTP then upgrade to a WebSocket at `/rpc` for live updates.


## Configuration options

{% include integrations/config_flow.md %}

## WebSocket push updates

After initial HTTP setup, the integration upgrades the connection to WebSocket for live updates. Sensor values and switch states are pushed in real time, and Home Assistant entities update immediately.

## Entities

### Sensors

For `REX-3PHASEMETER-01` models, the following sensors are created:

- **Phase A/B/C:** Current, Voltage, Active Power, Apparent Power, Power Factor
- **Totals:** Total Active Power, Total Apparent Power, Cumulative Energy Imported/Exported
- **Temperature**

Each sensor has:

- **Unique ID:** `<device_id>_<sensor_type>`
- **Device & state class** for correct presentation
- **Automatic name** generated from device model and sensor type

## Removal instructions

{% include integrations/remove_device_service.md %}

