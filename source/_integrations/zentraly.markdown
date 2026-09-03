---
title: Zentraly
description: Instructions on how to integrate Zentraly devices with Home Assistant.
ha_category:
  - Climate
ha_release: 2026.XX
ha_iot_class: Local Push
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@diazmanuel'
ha_domain: zentraly
ha_integration_type: hub
ha_platforms:
  - climate
ha_quality_scale: bronze
---

The **Zentraly** {% term integration %} allows you to integrate supported Zentraly devices with Home Assistant.

The integration communicates directly with Zentraly devices over the local network using a WebSocket connection and does not require a cloud service.

Zentraly devices are automatically discovered on the local network using Zeroconf.

## Prerequisites

Before setting up the integration:

1. Make sure the Zentraly device is powered on.
2. Make sure the Zentraly device is installed and registered in the Zentraly app, available from the Google Play Store and Apple App Store.
3. Make sure the Zentraly device is connected to the same local network as Home Assistant.
4. Enable third-party connections for the device from the advanced device settings in the Zentraly app.
5. Make sure the Zentraly device is reachable from the Home Assistant host.
6. Get the device password from the **About device** section in the Zentraly app. You need this password during setup.

{% include integrations/config_flow.md %}

Manual configuration is not currently supported.

## Supported devices

The integration currently supports the following Zentraly devices:

- ZTTIN thermostat

## Supported functionality

### ZTTIN thermostat

The ZTTIN thermostat is represented as a climate entity.

The integration supports:

- Current temperature
- Target temperature
- Current humidity
- Heating demand
- Manual operating mode
- Automatic operating mode
- Off mode
- Away preset

Changing the target temperature from Home Assistant puts the thermostat into manual mode.

When the Away preset is selected, Home Assistant displays the Away temperature configured on the thermostat. The Away temperature itself cannot be changed from Home Assistant.

## Zentraly automation examples

You can use the Zentraly climate entity in Home Assistant automations. For example, you can automatically change the target temperature at a specific time.

{% include docs/paste_yaml_tip.md %}

### Automation: Set the target temperature at night

This example sets the target temperature of a Zentraly thermostat to 18 °C every day at 22:00.

{% details "YAML example for setting the target temperature" %}
{% example %}
automation:
  - alias: "Set Zentraly temperature at night"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: climate.set_temperature
        target:
          entity_id: climate.example
        data:
          temperature: 18
{% endexample %}
{% enddetails %}

## Data updates

Zentraly uses a local WebSocket connection to receive state updates reported by the device.

Home Assistant also periodically reads the device state as a synchronization fallback.

All communication between Home Assistant and the Zentraly device takes place over the local network.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}