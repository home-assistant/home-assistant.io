---
title: Homewizard Climate
description: Home assistant integration for Homewizard Climate devices
ha_release: 2023.1
ha_category:
  - Climate
ha_iot_class: Cloud Pushing
ha_config_flow: true
ha_codeowners:
  - '@mepla'
ha_domain: homewizard_climate
ha_platforms:
  - climate
ha_integration_type: integration
---
  
This integration allows you to control your Homewizard Climate devices in Home assistant. There are a multitude of brands that use Homewizard apps for their smart controls.

  
### Supported Devices
This integration is in an early stage of development and only works for the following device types returned from the Homewizard Climate API:

- `heaterfan`

It has been tested on the following devices (even though it might work on others too):
- [Princess Smart Heating and Cooling Tower (01.347000.01.001)](https://www.princesshome.eu/en-gb/princess-01-347000-01-001-smart-heating-and-01.347000.01.001)
    
![](https://www.princesshome.eu/product/image/large/01.347000.01.001_3.jpg)

[//]: # (<img src="https://www.princesshome.eu/product/image/large/01.347000.01.001_3.jpg" alt="" width="200"/>)

### Configuration
When adding this integration, you need to provide the `username` and `password` you use to login to the Homewizard Climate app. 

### Entities
After configuration, this will create a [climate](/integrations/climate/) entity for each device registered in your Homewizard Climate cloud that has a [supported device type](#supported-devices):


| Service call      | Performed action                                                                                                                                                                                                                                                         |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| turn_on           | Turns the device on (retains previous `HVAC` mode)                                                                                                                                                                                                                       |
| turn_off          | Turns the device off                                                                                                                                                                                                                                                     |
| set_temperature   | Sets the target temperature <br/>(has no effect in `HVAC.COOL` mode)                                                                                                                                                                                                     |
| set_fan_mode      | `FAN_ON`: Turns the device on  <br/> `FAN_OFF`: Turns the device off<br/>`FAN_LOW`: Sets fan speed to 1 <br/>`FAN_MEDIUM`: Sets fan speed to 4 (when `HVAC.COOL`) or 2 (when `HVAC.HEAT`)<br/>`FAN_HIGH`: Sets fan speed to 8 (when `HVAC.COOL`) or 4 (when `HVAC.HEAT`) |
| set_hvac_mode     | `HVAC.OFF`: Turns off the device<br/>`HVAC.COOL`: Sets the device to cooling mode (turns it on if off)<br/>`HVAC.HEAT`: Sets the device to heating mode (turns it on if off)                                                                                             |
| set_swing_mode    | `SWING_HORIZONTAL`: Turns on oscillation<br/> `Other swing modes`: Turns off oscillation                                                                                                                                                                                 |
| set_preset_mode   | NOT IMPLEMENTED                                                                                                                                                                                                                                                          |
| turn_aux_heat_on  | NOT IMPLEMENTED                                                                                                                                                                                                                                                          |
| turn_aux_heat_off | NOT IMPLEMENTED                                                                                                                                                                                                                                                          |
| set_humidity      | NOT IMPLEMENTED                                                                                                                                                                                                                                                          |


### Limitations
- There's no easy way to set the fan speed to any number of your choosing (1-10 in `HVAC.COOL` and 1-4 in `HVAC.HEAT`). This will be resolved in a future update to add a `fan` entity alongside the `climate` one to provide full control.