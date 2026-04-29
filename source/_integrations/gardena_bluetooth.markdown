---
title: Gardena Bluetooth
description: Instructions on how to integrate Gardena Bluetooth devices within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Number
  - Select
  - Sensor
  - Switch
  - Text
  - Valve
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
  - select
  - sensor
  - switch
  - text
  - valve
ha_integration_type: device
---

The **Gardena Bluetooth** {% term integration %} allows users to integrate their Gardena Bluetooth devices into Home Assistant.

See device section for support information: [water control](#water-control), [irrigation valves](#irrigation-valves), [lawn mowers](#lawn-mowers), [garden pumps](#gard-pumps), [aqua contours](#aqua-contours).

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

- Irrigation valves are currently untested, but expected to work.
- Irrigation Valve 9 V Bluetooth requires firmware version 1.7.23.29 or newer (update via Gardena Bluetooth App).

## Lawn mowers

### Limitations

Gardena Bluetooth lawn mowers are currently not supported due to custom protocol on top of Bluetooth.

## Gard Pumps

- Garden Pump ([9058-61](https://www.gardena.com/int/products/pumps/watering-pumps/garden-pump-6300-silentcomfort/970645301.html))
- Garden Pump ([9059-61](https://www.gardena.com/int/products/pumps/watering-pumps/garden-pump-6500-silentcomfort/970645501.html))

## Aqua Contours

- Aqua Precise Overground ([16000-20](https://www.gardena.com/int/products/watering/sprinklersystem/aquaprecise-solar-powered-lawn-irrigation-system/970746801.html))
- Aqua Precise Underground ([16001-20](https://www.gardena.com/int/products/watering/sprinklersystem/aquaprecise-solar-powered-lawn-pipeline-irrigation-system/970746901.html))

### Limitations

Configuration of contours is not supported and must be set up using the official application.
