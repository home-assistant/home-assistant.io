---
title: Gardena Bluetooth
description: Instructions on how to integrate Gardena Bluetooth devices within Home Assistant.
ha_category:
  - Binary sensor
  - Number
  - Sensor
  - Switch
ha_release: '2023.8'
ha_iot_class: Local Polling
ha_codeowners:
  - '@elupus'
ha_domain: gardena_bluetooth
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - number
  - sensor
  - switch
  - valve
ha_integration_type: integration
---

The Gardena Bluetooth integration allows users to integrate their Gardena Bluetooth devices into Home Assistant.

See device section for support information: [water control](#water-control), [irrigation valves](#irrigation-valves), [lawn mowers](#lawn-mowers), [garden pumps](#gard-pumps)

{% include integrations/config_flow.md %}

## Water control

- Water Control Bluetooth ([01889-20](https://www.gardena.com/int/products/watering/water-controls/water-control-bluetooth/970481101.html))
- Soil Moisture Sensors ([1867-20](https://www.gardena.com/int/products/watering/water-controls/soil-moisture-sensor/967926801.html))

The paring of the device may require a [factory reset](#factory-reset) before it allows a connection.

### Limitations

- Control of offline scheduling settings is not supported.
- Use of the official Android application, sometimes locks out access to device until [factory reset](#factory-reset) is performed or Bluetooth is disabled in the Android device.

### Factory reset

1. Remove the battery.
2. Push and hold Man. button and reinsert the battery.
3. Hold the button for approx. 10 seconds.

## Irrigation valves

- Irrigation Valve 9 V Bluetooth ([1285-20](https://www.gardena.com/int/products/watering/sprinklersystem/irrigation-valve-9-v-bluetooth/970480401/))

### Limitations

Irrigation valves are currently untested, but expected to work.

## Lawn mowers

### Limitations

Gardena Bluetooth lawn mowers are currently not supported due to custom protocol on top of Bluetooth.

## Gard Pumps

- Garden Pump ([9058-61](https://www.gardena.com/de/produkte/bewasserung/pumpen/gartenpumpe-6300-silentcomfort/970645401/))
- Garden Pump ([9059-61](https://www.gardena.com/de/produkte/bewasserung/pumpen/gartenpumpe-6500-silentcomfort/970645601/))

### Limitations

Irrigation valves are currently untested, but expected to work.
