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

## Known limitations

This integration requires devices with protocol V1, V2, and V3.
It is based on **API v1** while some new devices are based on **API v2**.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
