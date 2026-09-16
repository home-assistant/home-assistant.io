---
title: Qingping
description: Instructions on how to integrate Qingping devices into Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
ha_bluetooth: true
ha_release: 2022.9
ha_iot_class: Local Push
ha_codeowners:
  - '@bdraco'
  - '@tengfeili-qingping'
ha_domain: qingping
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Qingping** {% term integration %} lets you monitor [Qingping](https://qingping.co/) environmental sensors directly over Bluetooth Low Energy. No cloud account or hub is required: the devices broadcast their readings and Home Assistant listens passively.

## Supported devices

- [Air Monitor Lite](https://www.qingping.co/air-monitor-lite/overview) (CGDN1)
- [Alarm Clock](https://www.qingping.co/bluetooth-alarm-clock/overview) (CGD1)
- [BT Clock Lite](https://www.qingping.co/bluetooth-clock/overview) (CGC1)
- [CO2 Temp RH](https://www.qingping.co/co2-temp-rh-monitor/overview) (CGP22C)
- [Door/Window Sensor](https://www.qingping.co/door-window-sensor/overview) (CGH1)
- [LEE GUITARS Thermo-Hygrometer](https://www.qingping.co/lee-guitars-thermo-hygrometer/overview) (CGM1)
- [Motion & Ambient Light Sensor](https://www.qingping.co/motion-light-sensor/overview) (CGPR1)
- [Temp RH M](https://www.qingping.co/temp-rh-monitor/overview#mi) (CGG1, CGG3)
- [Temp RH Pro E](https://www.qingping.co/temp-rh-monitor-pro-e/overview) (CGF1W)
- [Temp & RH Monitor Pro](https://www.qingping.co/temp-rh-monitor-pro-s/overview) (CGP23W)
- Qingping Temp RH Baro (CGP1W)

## Prerequisites

This integration requires a working [Bluetooth](/integrations/bluetooth/) setup, either a local Bluetooth adapter or an [ESPHome Bluetooth proxy](/integrations/esphome/).

{% include integrations/config_flow.md %}

The Qingping integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth/) integration is enabled and functional.

## Data updates

The devices broadcast their readings in Bluetooth advertisements, and Home Assistant passively listens for them. Bluetooth-only devices send an advertisement at least once every few seconds, even when running on battery. Devices with Wi-Fi broadcast about once a second while powered over USB. The integration does not poll and never connects to the device, so no data leaves your network and the device battery is not drained by Home Assistant. {% term Entities %} update whenever a new advertisement is received.

On battery, devices with Wi-Fi save power by keeping their radio off most of the time and broadcast only around their scheduled network connections. Their updates arrive in bursts and can be spaced further apart. Once a device has been seen, its entities keep their last value instead of becoming unavailable, and resume updating with the next advertisement. For steady updates over Bluetooth, keep these devices powered over USB.

## Supported functionality

All devices provide the following diagnostic entities:

- **Battery**: the device battery percentage.
- **Signal strength**: the Bluetooth signal strength (disabled by default).

Depending on the model, the devices provide the following entities:

- **Temperature** and **Humidity**: temperature and relative humidity (CGDN1, CGD1, CGC1, CGM1, CGG1, CGG3, CGF1W, CGP23W, CGP1W, CGP22C).
- **Pressure**: the atmospheric pressure (CGP1W).
- **Carbon dioxide**: the CO₂ concentration in ppm (CGDN1, CGP22C).
- **PM2.5** and **PM10**: particulate matter concentrations in µg/m³ (CGDN1).
- **Illuminance**: the ambient light level (CGPR1).
- **Motion**: motion detected (binary sensor, CGPR1).
- **Door**: a door or window is open (binary sensor, CGH1).
- **Problem**: the door has been left open (binary sensor, CGH1).

## Use cases

- **Air quality**: combine the CO₂, PM2.5, and PM10 readings of an Air Monitor Lite with automations to ventilate a room and keep particle levels low.
- **Instrument storage**: track temperature and humidity for instruments with the LEE GUITARS Thermo-Hygrometer and get an alert when conditions leave the safe range.
- **Occupancy and access**: use the Motion & Ambient Light Sensor and the Door/Window Sensor for presence-driven lighting and door-open notifications.
- **Multi-room climate**: place Temp RH monitors in several rooms and compare conditions at a glance on a dashboard.

## Examples

In the following examples, replace the entity names with those of your devices.

### Turn on ventilation when the CO₂ level is high

```yaml
automation:
  - alias: Ventilate when CO₂ is high
    triggers:
      - trigger: numeric_state
        entity_id: sensor.co2_temp_rh_1234_carbon_dioxide
        above: 1000
        for:
          minutes: 5
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.ventilation
```

### Get notified when a door is left open

```yaml
automation:
  - alias: Door left open
    triggers:
      - trigger: state
        entity_id: binary_sensor.door_window_sensor_1234_door
        to: "on"
        for:
          minutes: 10
    actions:
      - action: notify.notify
        data:
          message: The door has been open for 10 minutes
```

## Known limitations

The integration is passive and read-only. It reports the values the devices broadcast, but cannot change device settings, alarm thresholds, or display content. Those features require the Qingping app.

Device names are taken from the Bluetooth advertisement and can only be changed in the Qingping app.

## Troubleshooting

- **Device is not discovered**: make sure the device is awake and broadcasting, your Bluetooth adapter or proxy is in range of the device, and the [Bluetooth](/integrations/bluetooth/) integration is set up and working. If the device has Wi-Fi and runs on battery, plug it into power, or press and hold the button on the device to enter pairing mode: it then broadcasts rapidly for about 30 seconds and can be discovered.
- **Values stop updating**: the device saves battery by pausing broadcasts; entities keep the last value and resume when the next advertisement arrives. If the device has Wi-Fi and runs on battery, plug it into power for steady updates. If values stay stale for a long time, check the device battery.
- **Motion or door events are delayed**: events are delivered in the next advertisement, so a short delay of a few seconds is normal. Longer gaps usually mean the device is out of range.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
