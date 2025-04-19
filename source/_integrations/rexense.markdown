---
title: Rexense
description: "Integrate Rexense IoT Mesh devices"
ha_category:
  - Sensor
  - Switch
ha_release: 2025.04
ha_codeowners:
  - '@rexense'
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

## High‑Level Description
The Rexense integration enables Home Assistant to automatically discover and manage Rexense IoT Mesh devices, providing automated device discovery, real‑time sensor data, and switch control.

## Installation Instructions
1. **Enable default integrations**  
   In your `configuration.yaml`, add:
   ```yaml
   default_config:
   zeroconf:
   ```
2. **Restart Home Assistant**  
3. **Add Rexense**  
   - Go to **Settings → Devices & Services**  
   - Click **Add Integration**  
   - Search for **Rexense** and select it  
   - Follow the prompts to either auto‑discover your devices or enter **Host** and **Port** manually  

Once configured, HA will fetch `/rex/GetBasicInfo` over HTTP then upgrade to a WebSocket at `/rpc` for live updates.

## Configuration Options

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The Hostname or IP address of your Rexense device. You can find it via network scan or router UI."
Port:
  description: "Custom TCP port of the device for HTTP basic info. Defaults to 80."
{% endconfiguration_basic %}

## WebSocket Push Updates
After initial HTTP setup, the integration upgrades the connection to a WebSocket at `/rpc`. Devices push status updates in real time, and Home Assistant entities update immediately.

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

## Removal Instructions
To remove the Rexense integration:
1. Go to **Settings → Devices & Services**  
2. Locate **Rexense** and click the trash icon to **Delete**  
3. (If you previously ran as a custom component) Delete any `custom_components/rexense` folder  
4. Restart Home Assistant  

No further manual cleanup is required; Home Assistant will purge entities and registry entries automatically.

{% include integrations/remove_device_service.md %}
