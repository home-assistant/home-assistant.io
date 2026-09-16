---
title: Zentraly
description: Instructions on how to integrate Zentraly devices with Home Assistant.
ha_category:
  - Climate
ha_release: 2026.10
ha_iot_class: Local Push
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@zentralySAU'
ha_domain: zentraly
ha_integration_type: hub
ha_platforms:
  - climate
ha_quality_scale: bronze
---

The **Zentraly** {% term integration %} lets you control supported thermostats from [Zentraly](https://zentraly.com), a manufacturer of smart home devices for heating, lighting, and electrical control.

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

## Configuration

Home Assistant discovers the thermostat automatically on your local network. To finish setting it up:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Under **Discovered**, find the Zentraly thermostat with your device ID and select **Configure**.
3. Enter the device password from the **About device** section in the Zentraly app.
4. Submit the form. Home Assistant verifies the connection and password before adding the thermostat.

{% configuration_basic %}
Password:
  description: "The device password shown in the Zentraly app. This is not your Zentraly account password."
{% endconfiguration_basic %}

The thermostat must be discovered before you can add it. Adding a thermostat manually by entering its IP address is not supported. If it does not appear, check that third-party connections are enabled and that Home Assistant and the thermostat are on the same local network.

## Supported devices

The integration currently supports the following Zentraly devices:

- ZTTIN wireless Wi-Fi thermostat

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

When the Away preset is selected, the thermostat reports its configured Away temperature as the target temperature, which Home Assistant displays. The climate entity does not provide a control for changing the configured Away temperature.

## Zentraly automation examples

You can use the Zentraly climate entity in Home Assistant automations. For example, you can automatically change the target temperature at a specific time.

{% include docs/paste_yaml_tip.md %}

### Automation: Set the target temperature at night

This example sets the target temperature of a Zentraly thermostat to 18 °C every day at 22:00. In the automation editor, use a time trigger and the **Set thermostat target temperature** action, selecting your thermostat as the target. Setting the target temperature selects manual mode.

For the YAML example, replace `climate.example` with your thermostat entity ID.

{% details "YAML example for setting the target temperature" %}

{% example %}
automation: |
  alias: "Set Zentraly temperature at night"
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

Home Assistant also reads the device state every five minutes as a synchronization fallback.

All communication between Home Assistant and the Zentraly device takes place over the local network.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
