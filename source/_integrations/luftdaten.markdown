---
title: Sensor.Community
description: Instructions on how to add Sensor.Community sensors to Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.82
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@frenck'
ha_domain: luftdaten
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **Sensor.Community** {% term integration %} brings readings from the [Sensor.Community](https://sensor.community) open data air quality network into Home Assistant. Sensor.Community (formerly known as luftdaten.info) is a global citizen science project that maps air quality and environmental data from thousands of do-it-yourself (DIY) sensor stations around the world.

Use cases for this integration include:

- Tracking air quality in your neighborhood using a nearby public sensor.
- Displaying readings from your own [DIY Sensor.Community sensor](https://sensor.community/en/sensors/) without running its web interface.
- Triggering automations, such as closing windows or turning on an air purifier, when particulate matter levels rise.
- Comparing outdoor air quality against indoor sensors on a single dashboard.

## Prerequisites

You need the **sensor ID** of the Sensor.Community sensor you want to track. The ID is a numeric value, not the sensor type.

To find a sensor ID:

1. Open the [Sensor.Community map](https://maps.sensor.community/).
2. Select the sensor you want to track on the map.
3. The sensor ID is shown in the sidebar with a `#` in front of it, for example, `#12345`.

Each physical sensor station usually has multiple sensor IDs, one for each sensor type (particulate matter, temperature, humidity, pressure). Add the integration once per sensor ID you want to track.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Sensor ID:
  description: "The numeric ID of the Sensor.Community sensor you want to track. You can find it on the [Sensor.Community map](https://maps.sensor.community/)."
Show on map:
  description: "When enabled, the sensor's latitude and longitude are added as attributes so the sensor can be placed on the map dashboard. Disabled by default."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration creates sensor entities based on the data that the selected Sensor.Community sensor reports. Not every sensor reports every measurement. Sensors that the selected sensor does not provide are not created.

- **PM10 particulate matter**
  - **Description**: Concentration of particulate matter up to 10 micrometers in diameter, in µg/m³.
  - **Device class**: PM10
- **PM2.5 particulate matter**
  - **Description**: Concentration of particulate matter up to 2.5 micrometers in diameter, in µg/m³.
  - **Device class**: PM2.5
- **Temperature**
  - **Description**: Ambient temperature reported by the sensor, in °C.
  - **Device class**: Temperature
- **Humidity**
  - **Description**: Relative humidity reported by the sensor, in %.
  - **Device class**: Humidity
- **Pressure**
  - **Description**: Atmospheric pressure at the sensor location, in Pa.
  - **Device class**: Pressure
- **Pressure at sea level**
  - **Description**: Atmospheric pressure adjusted to sea level, in Pa.
  - **Device class**: Pressure

Each sensor includes the Sensor.Community sensor ID as an attribute. When the **Show on map** option is enabled, the sensor's latitude and longitude are also added as attributes so the entity appears on the map dashboard.

## Data updates

The integration polls the Sensor.Community API every 10 minutes over the internet for new readings. This matches how often most Sensor.Community stations upload new data.

## Examples

### Warn when PM2.5 levels are unhealthy

Send a notification when the PM2.5 concentration exceeds 35 µg/m³. You can adjust this example threshold to match the air quality guidance or standard you want to follow:

```yaml
alias: "Unhealthy air quality alert"
triggers:
  - trigger: numeric_state
    entity_id: sensor.sensor_12345_pm25
    above: 35
    for:
      minutes: 15
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Air quality"
      message: >
        PM2.5 is currently {{ states('sensor.sensor_12345_pm25') }} µg/m³.
        Consider closing windows.
```

### Turn on an air purifier based on outdoor air quality

Automatically turn on an indoor air purifier when outdoor particulate matter rises above a threshold:

```yaml
alias: "Air purifier on high PM"
triggers:
  - trigger: numeric_state
    entity_id: sensor.sensor_12345_pm10
    above: 50
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.living_room_air_purifier
```

## Known limitations

- The integration is read-only and relies on data that Sensor.Community stations upload to the public API. If a station stops uploading, the sensors become unavailable.
- Each Sensor.Community station usually has separate sensor IDs per sensor type. To track particulate matter and temperature from the same station, set up the integration once per sensor ID.
- The 10-minute polling interval is fixed and matches the upload frequency of most stations. Polling more often does not give you fresher data.

## Troubleshooting

### Sensor not available or invalid

If you see a "Sensor not available or invalid" error during setup, verify that:

1. The Sensor ID you entered is correct. The ID is the number with `#` in front of it on the [Sensor.Community map](https://maps.sensor.community/), not the sensor's physical location or name.
2. The sensor is still online and uploading data to Sensor.Community. Check its recent values on the map.
3. Your Home Assistant instance can reach the internet.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
