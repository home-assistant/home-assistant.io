---
title: Midea
description: Instructions on how to integrate devices with Midea protocol into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Humidifier
  - Light
  - Number
  - Select
  - Switch
ha_release: 2026.8
ha_domain: midea
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
  - '@rokam'
  - '@caibinqing'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - fan
  - humidifier
  - light
  - number
  - select
  - sensor
  - switch
  - time
ha_integration_type: device
ha_quality_scale: bronze
---

The **Midea** {% term integration %} lets you monitor and control home appliances that use the Midea protocol, communicating with them directly over your local network. Because Midea also manufactures appliances for many other brands, this integration works with rebranded devices that speak the same protocol, not only those sold as "Midea".

All control and status updates happen locally. During setup, you select one of several supported cloud providers, which is only used when needed to obtain the token and key that protocol V3 devices require for their local connection. If you already have these credentials, you can enter them manually and skip the cloud entirely. Once setup is complete, the integration communicates only with the device on your local network.

## Use cases

- Keep a room comfortable automatically by starting your Midea air conditioner or heat pump when the temperature rises, then stopping it once the room has cooled down.
- Save energy by turning off climate control when a window or door is left open, and turning it back on when the room is closed up again.
- Hold a target humidity in a basement or bedroom by running your Midea dehumidifier or humidifier on a schedule, or based on the humidity reported by another sensor.
- Include Midea fans, lights, and the bathroom master in presence- or time-based automations so a room is ready before you walk in.
- Track diagnostic data such as filter life, water tank level, and energy use, and get notified when a filter needs cleaning or a tank needs emptying.

## Supported devices

There is support for the following device types within Home Assistant:

- **Air Box**
- **Air Conditioner**
- **Air Purifier**
- **Bathroom Master**
- **Clothes Dryer**
- **Dehumidifier**
- **Dish Sterilizer**
- **Dishwasher**
- **Electric Heater**
- **Electric Oven**
- **Electric Pressure Cooker**
- **Electric Rice Cooker**
- **Electric Slow Cooker**
- **Electric Water Heater**
- **Fan**
- **Fresh Air Appliance**
- **Front Load Washer**
- **Gas Stove**
- **Gas Water Heater**
- **Heat Pump Water Heater**
- **Heat Pump Wi-Fi Controller**
- **Heat Pump**
- **Humidifier**
- **Integrated Ceiling Fan**
- **Light**
- **MDV Wi-Fi Controller**
- **Microwave Oven**
- **Microwave Steam Oven**
- **Range Hood**
- **Refrigerator**
- **Sink Dishwasher**
- **Toaster**
- **Toilet**
- **Top Load Washer**
- **Water Drinking Appliance**

{% warning %}

This integration requires devices with protocol V1, V2, and V3.
It is based on **API v1** while some new devices are based on **API v2**.

{% endwarning %}

{% include integrations/config_flow.md %}

The integration offers automatic discovery and manual configuration.

{% configuration_basic %}
  name:
    description: The name of the device.
  appliance code:
    description: The code of the device. Needs to be retrieved from mobile app.
  type:
    description: The type of the device. See list above
  ip_address:
    description: The IP address of the device.
  port:
    description: The TCP/IP port of the device.
  protocol:
    description: The protocol version of the device. Can be V1, V2 or V3.
  model:
    description: The model of the device. Needs to be retrieved from mobile app.
  subtype:
    description: The subtype of the device. Needs to be retrieved from mobile app.
  token:
    description: The token of the device. Needs to be retrieved from mobile app.
  key:
    description: The key of the device. Needs to be retrieved from mobile app.
{% endconfiguration_basic %}

## Data updates

The integration pushes updates to Home Assistant upon changes for all main functions of the device.

## Supported functionality

The **Midea** {% term integration %} provides the following entities:

- Binary sensor: Door, Motion, Full dust, Salt, Tank full, etc.
- Button
- Climate
- Fan
- Humidifier
- Light
- Number
- Select
- Sensor: Various diagnostic sensors.
- Switch
- Time

## Examples

### Turn off climate control when a window or door opens

Heating or cooling a room while a window is open wastes energy. Use this blueprint to turn off a Midea climate device when a window or door opens, and turn it back on once everything is closed again.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/midea/midea_turn_off_climate_on_window_open.yaml" %}

### Cool a room when it gets too warm

Use this blueprint to start cooling with a Midea air conditioner when a temperature sensor rises above a threshold, and stop again once the room has cooled down.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/midea/midea_cool_room_when_too_warm.yaml" %}

## Known limitations

This integration requires devices with protocol V1, V2, and V3.
It is based on **API v1** while some new devices are based on **API v2**.

## Troubleshooting

### Device cannot be set up

#### Symptom

During setup, Home Assistant reports that it is unable to connect to the device.

#### Description

Midea devices typically accept only one local connection at a time, and protocol V3 devices require a valid token and key. Setup fails if another app is already connected, or if the token and key are missing or incorrect.

#### Resolution

1. Close the Midea mobile app, or any other tool that communicates with the device locally, and try again.
2. When adding the device manually, make sure the token and key match the ones retrieved from the mobile app, and that the protocol version is correct.
3. Confirm that the device is powered on and reachable on the same network as Home Assistant.

### Device becomes unavailable after some time

#### Symptom

A device that worked before shows as unavailable.

#### Description

The device's IP address has most likely changed after a DHCP lease renewal.

#### Resolution

1. If the device is on the same LAN as Home Assistant, local discovery finds the new address automatically after a minute. Wait, or reload the integration entry from {% my integrations title="**Settings** > **Devices & services**" %}.
2. If the device is on a separate LAN, discovery broadcasts do not reach it. Update the address manually by reconfiguring the integration entry, and assign a DHCP lease reservation or a fixed IP address to the device so it does not happen again.

### Some entities or features are missing

#### Symptom

The device is set up, but some controls or sensors you expected are not available.

#### Description

The entities that are created depend on the device type, model, and the capabilities the device reports. Devices based on API v2 are only partially supported.

#### Resolution

1. Make sure the device model and subtype entered during setup are correct.
2. Check the [list of supported devices](#supported-devices) for your device type.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
