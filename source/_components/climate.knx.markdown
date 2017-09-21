---
layout: page
title: "KNX Climate"
description: "Instructions on how to integrate KXN thermostats with Home Assistant."
date: 2016-06-24 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: knx.png
ha_category: Climate
ha_release: 0.25
ha_iot_class: "Local Polling"
---


The `knx` climate platform is used as in interface with KNX thermostats.

The `knx` component must be configured correctly, see [KNX Component](/components/knx).

To use your KNX thermostats in your installation, add the following lines to your `configuration.yaml` file:

```yaml
climate:
   - platform: knx
     name: HASS-Kitchen.Temperature
     temperature_address: '6/2/1'
     setpoint_address: '5/1/2'
     target_temperature_address: '5/1/1'
     operation_mode_address: '5/1/3'
```

Alternatively, if your device has dedicated binary group addresses for frost/night/comfort mode:

```yaml
climate:
   - platform: knx
     name: HASS-Kitchen.Temperature
     temperature_address: '6/2/1'
     setpoint_address: '5/1/2'
     target_temperature_address: '5/1/1'
     operation_mode_frost_protection_address: '5/1/3'
     operation_mode_night_address: '5/1/4'
     operation_mode_comfort_address: '5/1/5'
```


* **name** (*Optional*): A name for this device used within Home Assistant.
* **temperature_address**: KNX group address for reading current room temperature from KNX bus.
* **target_temperature_address**: KNX group address for reading current target temperature from KNX bus.
* **setpoint_address**: KNX group address for basis setpoint

* **operation_mode_address** (*Optional*) KNX address for operation mode (Frost protection/night/comfort).
* **operation_mode_state_address** (*Optional*) Explicit KNX address for reading operation mode
* **controller_status_address** (*Optional*) KNX address for HVAC controller status (in accordance with KNX AN 097/07 rev 3)
* **controller_status_state_address** (*Optional*) Explicit KNX address for reading HVAC controller status

* **operation_mode_frost_protection_address** (*Optional*) KNX address for switching on/off frost/heat protection mode.
* **operation_mode_night_address** (*Optional*) KNX address for switching on/off night nmode.
* **operation_mode_comfort_address** (*Optional*) KNX address for switching on/off comfort mode.

`operation_mode_frost_protection_address` / `operation_mode_night_address` / `operation_mode_comfort_address` are not necessary if `operation_mode_address` was specified.


