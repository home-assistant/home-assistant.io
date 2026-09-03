---
title: TechnoVE
description: Instructions on how to integrate TechnoVE smart EV charging stations with Home Assistant.
ha_category:
  - Car
ha_release: 2024.2
ha_iot_class: Local Polling
ha_domain: technove
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@Moustachauve'
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - sensor
  - switch
ha_integration_type: device
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **TechnoVE** {% term integration %} lets you monitor and control your [TechnoVE](https://technove.ca/) smart EV charging station directly from Home Assistant using the station's local API. No cloud account or internet connection is required. Everything communicates over your local network.

Use case: If you have a TechnoVE charging station at home, you can automate your EV charging based on electricity prices, solar panel production, or time of day. For example, you could automatically start charging at night when electricity rates are lower, or pause charging when your home's power consumption is too high.

## Supported devices

The integration supports all Wi-Fi enabled EV charging stations released by the TechnoVE brand.

## Prerequisites

Before setting up this integration, make sure:

1. Your TechnoVE charging station is powered on and connected to your local network (Wi-Fi).
2. Your Home Assistant instance can reach the charging station over the network.
3. While Home Assistant will typically discover your station automatically on your network, if you need to add it manually, make sure you know the IP address or hostname of your TechnoVE station. You can find this in your router's connected devices list.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of your TechnoVE charging station. If not discovered automatically, you can find this in your router's connected devices list."
{% endconfiguration_basic %}

## Supported functionality

The **TechnoVE** integration provides the following entities.

### Binary sensors

- **Battery protected**
  - **Description**: Indicates whether battery protection mode is active on the station.

- **Conflict with power sharing mode**
  - **Description**: Indicates a configuration conflict in power sharing mode. This typically means that the power sharing settings between connected stations are not aligned.

- **Power sharing mode**
  - **Description**: Indicates whether the station is operating in power sharing mode, where multiple stations coordinate to share available electrical capacity.

- **Static IP**
  - **Description**: Indicates whether the station is configured with a static IP address.
  - **Enabled by default**: No

- **Update available**
  - **Description**: Indicates whether a firmware update is available for the station.

### Numbers

- **Maximum current**
  - **Description**: Sets the maximum current that the charging station is allowed to deliver to the vehicle. This value cannot be changed when the station is in power sharing mode.

### Sensors

- **Status**
  - **Description**: The current charging status of the station.
  - **Possible values**:
    - <abbr title="Electric Vehicle Supply Equipment">EVSE</abbr> fault
    - Ground fault
    - High tariff period
    - Out of activation period
    - Pilot fault
    - Plugged (waiting)
    - Plugged (charging)
    - Unplugged
    - Ventilation required

- **Current**
  - **Description**: The electrical current currently being delivered to the vehicle.

- **Input voltage**
  - **Description**: The voltage measured at the station's input.

- **Output voltage**
  - **Description**: The voltage measured at the station's output, going to the vehicle.

- **Max station current**
  - **Description**: The maximum current rating of the charging station hardware.

- **Total energy usage**
  - **Description**: The total energy consumed by the station since its installation.

- **Last session energy usage**
  - **Description**: The energy consumed during the most recent (or current) charging session.

- **Signal strength**
  - **Description**: The Wi-Fi signal strength (RSSI) of the station.
  - **Enabled by default**: No

- **Wi-Fi network name**
  - **Description**: The name (SSID) of the Wi-Fi network the station is connected to.
  - **Enabled by default**: No

### Switches

- **Auto-charge**
  - **Description**: When enabled, vehicles start charging automatically as soon as they are plugged in. When turned off, you need to manually start each charging session. Disabling auto-charge does not interrupt an ongoing charging session.

- **Charging enabled**
  - **Description**: Controls whether the station is allowed to charge a connected vehicle. You can disable this to pause or stop a charging session. This switch can only be used when auto-charge mode is disabled.

## Data updates

The **TechnoVE** integration {% term polling polls %} data from the charging station every 5 seconds over the local network. This frequent polling interval ensures that status changes (such as plugging in or unplugging the vehicle) are reflected promptly in Home Assistant.

## Examples

### Notify when charging is completed

Send a notification or execute custom actions when your electric vehicle finishes charging on your TechnoVE charging station:

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/technove_charging_completed_notification.yaml" %}

{% details "Example YAML" %}

{% example %}
automation: |
  alias: "Notify when charging is completed"
  triggers:
    - trigger: state
      entity_id: sensor.technove_station_status
      from: plugged_charging
      to: plugged_waiting
  actions:
    - action: notify.notify
      data:
        title: "EV charging completed"
        message: "Your vehicle has finished charging on the TechnoVE station."
{% endexample %}

{% enddetails %}

## Known limitations

- The integration communicates with the station over the local network only. If the station is on a different network segment or VLAN than Home Assistant, you may need to configure routing between the networks.
- The maximum current setting cannot be changed while the station is in power sharing mode. You need to disable power sharing first.
- Charging can only be manually started or stopped when auto-charge mode is disabled.
- The integration does not support firmware updates. Firmware updates must be performed through the TechnoVE app.

## Troubleshooting

### The station cannot be reached during setup

If you see a "Failed to connect" error when trying to add the integration:

1. Make sure your TechnoVE station is powered on and the status LEDs are active.
2. Verify the station is connected to your Wi-Fi network. Check your router's connected devices list to confirm it appears.
3. Make sure the IP address or hostname you entered is correct.
4. Try pinging the station from a computer on the same network to verify connectivity.
5. If the station is on a different VLAN or network segment than Home Assistant, make sure routing is configured between the networks.

### The station becomes unavailable intermittently

If the station keeps going unavailable and coming back:

1. Check the **Signal strength** sensor, if available. This entity may be disabled by default, so you might need to enable it first. If you don't see it, check your router, access point, or manufacturer tools to verify the station's Wi-Fi signal quality. A weak signal can cause intermittent connection issues.
2. Consider moving the station closer to your Wi-Fi access point or adding a Wi-Fi extender.
3. Make sure your network is not blocking local traffic between Home Assistant and the station.

### Cannot change the maximum current

If you receive an error when trying to change the maximum current:

- Make sure the station is not in power sharing mode. The maximum current cannot be changed while power sharing is active.

### Cannot enable or disable charging

If you receive an error when trying to toggle charging:

- Make sure auto-charge mode is disabled. The charging enabled switch only works when auto-charge mode is off.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
