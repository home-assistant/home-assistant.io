---
layout: page
title: "Nexia"
description: "This component provides unofficial support for Nexia climate devices."
date: 2019-06-13 07:06
sidebar: true
comments: false
sharing: true
footer: true
logo: nexia.png
ha_category:
  - Sensor
  - Binary Sensor
  - Climate
featured: true
ha_release: 0.9
ha_iot_class: Cloud Push
redirect_from:
  - /components/sensor.nexia/
  - /components/binary_sensor.nexia/
  - /components/climate.nexia/
---

The `nexia` component lets you control thermostats connected to [Nexia (Trane/American Standard)](https://www.nexiahome.com/).

By connecting this component, you will have access to all thermostats and zones in your associated home.

## {% linkable_title Configuration %}

To add the Nexia component to Home Assistant, add the following information to your [`configuration.yaml`](/docs/configuration/) file:

You can get ```YOUR_HOUSE_ID``` by logging into [Nexia](https://www.nexiahome.com/), going to the climate section,
and then getting the number that comes between ```https://www.mynexia.com/houses/``` and ```/climate```. 

```
https://www.mynexia.com/houses/YOUR_HOUSE_ID/climate
```

You will put ```YOUR_HOUSE_ID``` into the configuration as a number and not a string.

```yaml
# Example configuration.yaml entry
nexia:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
  id: YOUR_HOUSE_ID
  scan_interval: (optional) SECONDS_BETWEEN_UPDATES
   
climate:
  - platform: nexia
    
binary_sensor:
  - platform: nexia
    
sensor:
  - platform: nexia

```

[Restart Home Assistant](https://www.home-assistant.io/docs/configuration/#reloading-changes) for the changes to take effect.

### {% linkable_title Concepts %}

The Nexia Thermostat supports the following key concepts.



## {% linkable_title Attributes %}

The following attributes are provided by the Nexia Thermostat
`aux_heat`, `away_mode`, `current_humidity`, `current_temperature`, 
`fan_list`, `fan_mode`, `firmware`, `friendly_name`, `hold_mode`, `humidity`, 
`max_humidity`, `max_temp`, `min_humidity`, `min_temp`, `model`, `operation_list`, 
`operation_mode`, `setpoint_status`, `target_temp_high`, `target_temp_low`, 
`target_temp_step`, `temperature`, `thermostat_id`, `thermostat_name`, `zone_id`, 
`zone_status`

### {% linkable_title Attribute `aux_heat` %}

Indicates whether or not aux heat / emergency heat is enabled. 

| Attribute type | Description | 
| -------------- | ----------- |
| String | 'on' or 'off' |

### {% linkable_title Attribute `away_mode` %}

Indicates whether the 'away' preset is selected. 

| Attribute type | Description | 
| -------------- | ----------- |
| String | 'on' or 'off' |

### {% linkable_title Attribute `current_humidity` %}

Provides you with the main thermostat's relative humidity. Outdoor humidity or zone specific 
humidity is not currently available via Nexia's published data. 

| Attribute type | Description | 
| -------------- | ----------- |
| Float | current humidity |

### {% linkable_title Attribute `current_temperature` %}

Provides you with the current zone's temperature. 

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | current temperature |

### {% linkable_title Attribute `fan_list` %}

This is a list of all available fan modes you can select, separated by commas. 

| Attribute type | Description | 
| -------------- | ----------- |
| String | 'auto,on,circulate' |

### {% linkable_title Attribute `fan_mode` %}

The currently selected fan mode.

| Attribute type | Description | 
| -------------- | ----------- |
| String | 'auto', 'on', or 'circulate' |

### {% linkable_title Attribute `firmware` %}

Provides you with the current firmware version of the main thermostat.

| Attribute type | Description | 
| -------------- | ----------- |
| String | firmware version |

### {% linkable_title Attribute `hold_mode` %}

Indicates if a hold is currently in place on this zone. Examples of such are 'away', 
'home', 'sleep', or 'evening'

| Attribute type | Description | 
| -------------- | ----------- |
| String | hold mode |

### {% linkable_title Attribute `humidity` %}

The target dehumidify set point (%) of the system. 

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | dehumidify setpoint as an integer |

### {% linkable_title Attribute `max_humidity` %}

Hard-coded value indicating the maximum dehumidify set point (%) you can set, as an integer.  

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | maximum humidity set point, always 65 |

### {% linkable_title Attribute `max_temp` %}

The maximum temperature set point of the zone. This can change based on the thermostat's settings.

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | maximum temperature, such as 90 |

### {% linkable_title Attribute `min_humidity` %}

Hard-coded value indicating the minimum dehumidify set point (%) you can set, as an integer.  

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | minimum humidity set point, always 35  |

### {% linkable_title Attribute `min_temp` %}

The minimum temperature set point of the zone. This can change based on the thermostat's settings.

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | minimum temperature, such as 55 |

### {% linkable_title Attribute `model` %}

The thermostat model, such as 'TZON1050AC52ZAA'

| Attribute type | Description | 
| -------------- | ----------- |
| String | thermostat model |

### {% linkable_title Attribute `operation_list` %}

List of available operation modes such as 'AUTO,COOL,HEAT,OFF'

| Attribute type | Description | 
| -------------- | ----------- |
| String | operation modes |

### {% linkable_title Attribute `operation_mode` %}

The current operation mode, such as 'AUTO', 'COOL', 'HEAT', or 'OFF'

| Attribute type | Description | 
| -------------- | ----------- |
| String | operation mode |

### {% linkable_title Attribute `setpoint_status` %}

This provides you with a system set point status, such as 'Holding Permanently', 
'Following Schedule - Away', or 'Following Schedule - Home'. This is not an exhaustive list. 

| Attribute type | Description | 
| -------------- | ----------- |
| String | set point status |

### {% linkable_title Attribute `target_temp_high` %}

The target cooling (upper-bound) temperature for the current zone. 

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | upper-bound target temperature |

### {% linkable_title Attribute `target_temp_low` %}

The target heating (lower-bound) temperature for the current zone.

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | lower-bound target temperature |

### {% linkable_title Attribute `target_temp_step` %}

The step at which the temperature can be increased or decreased. For Fahrenheit, 
this is 1.0 degrees per step, and for Celsius, this is 0.5 degrees per step.

| Attribute type | Description | 
| -------------- | ----------- |
| Float | step |

### {% linkable_title Attribute `temperature` %}

Based on the current system mode, this is the target temperature for the zone. 

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | target temperature |
 
### {% linkable_title Attribute `thermostat_id` %}

This is the main thermostat's ID, here for reference. This will match up with the 'id'
in the JSON data provided by Nexia.

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | thermostat ID |

### {% linkable_title Attribute `thermostat_name` %}

The name of the system. This will be shared across all zones of your Trane / American Standard
system. 

| Attribute type | Description | 
| -------------- | ----------- |
| String | thermostat name|

### {% linkable_title Attribute `zone_id` %}

The zone ID for this particular zone, here for reference. This will match up with the 'id' 
in the JSON data provided by Nexia under the 'zones' list. 

| Attribute type | Description | 
| -------------- | ----------- |
| Integer | zone ID |

### {% linkable_title Attribute `zone_status` %}

The status of the zone, such as 'Cooling', or 'Heating"

| Attribute type | Description | 
| -------------- | ----------- |
| String | zone status |
 
 
## {% linkable_title Services %}

The following `climate` services are provided by the Nexia Thermostat:
`set_aux_heat`, `set_away_mode`, `set_fan_mode`, `set_hold_mode`, `set_humidity`, 
`set_operation_mode`, `set_temperature`, `turn_on`, `turn_off`

The service `set_swing_mode` offered by the [Climate component](/components/climate/)
is not implemented for this thermostat.

The following `nexia` climate service is provided by the Nexia Thermostat:
`set_aircleaner_mode`

### {% linkable_title Service `set_aux_heat` %}

Enable the aux / emergency heat for the system. This is a system-wide setting.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `away_mode` | no | 'on' or 'off'

### {% linkable_title Service `set_away_mode` %}

Turns the away mode on or off for the thermostat.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `away_mode` | no | 'on' or 'off'

### {% linkable_title Service `set_fan_mode` %}

Sets the fan mode for the system. See the `fan_list` attribute for options. This is a system-wide setting. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `fan_mode` | no | 'auto', 'on', or 'circulate'


### {% linkable_title Service `set_hold_mode` %}

Puts the thermostat into the given hold mode. For 'home', 'away', 'sleep',
and any other hold based on a reference climate, the
target temperature is taken from the reference climate.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `hold_mode` | no | `home`, `away`, `sleep`

### {% linkable_title Service `set_humidity` %}

Sets the dehumidify set point of the system. Range from 35-65. This is a system-wide setting.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `humidity` | no | The dehumidify setpoint, like 50.  

### {% linkable_title Service `set_temperature` %}

Puts the thermostat into a temporary hold at the given temperature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `target_temp_low` | no | Desired heating target temperature (when in auto mode)
| `target_temp_high` | no | Desired cooling target temperature (when in auto mode)
| `temperature` | no | Desired target temperature (when not in auto mode)

Only the target temperatures relevant for the current operation mode need to
be provided.

### {% linkable_title Service `set_operation_mode` %}

Sets the current operation mode of the thermostat. See attribute `operation_list` for options. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `operation_mode` | no | 'AUTO', 'COOL', 'HEAT', or 'OFF'

### {% linkable_title Service `turn_on` %}

Turns the zone on. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.

### {% linkable_title Service `turn_off` %}

Turns the zone off. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.

### {% linkable_title Service `set_aircleaner_mode` %}

Part of the `nexia.` services. Sets the air cleaner mode. Options include 'AUTO', 'QUICK', and 
'ALLERGY'. This is a system-wide setting. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `aircleaner_mode` | no | 'AUTO', 'QUICK', or 'ALLERGY'
