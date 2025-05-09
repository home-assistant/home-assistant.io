---
title: OpenTherm Gateway
description: Control your OpenTherm Gateway from Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Hub
  - Select
  - Sensor
ha_release: 0.81
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mvn23'
ha_domain: opentherm_gw
ha_platforms:
  - binary_sensor
  - button
  - climate
  - select
  - sensor
  - switch
ha_integration_type: integration
---

The `opentherm_gw` integration is used to control the [OpenTherm Gateway](https://otgw.tclcode.com/) from Home Assistant.

This integration will add three devices to Home Assistant for each configured gateway. The main control of the integration is a single `climate` entity which can be found on the added `OpenTherm Thermostat` device. All added devices have a collection of `sensor` and `binary_sensor` entities, which are disabled by default. To enable them, follow the steps on [enabling entities](/common-tasks/general/#enabling-or-disabling-entities).

{% note %}
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
{% endnote %}

{% include integrations/config_flow.md %}

The following configuration options are available:

{% configuration_basic %}
name:
  description: "The friendly name used for the OpenTherm Gateway and its entities. This is used to generate the display name of the created device and all related entities.<br/>Examples: `Thermostat`, `Living Room`"
path or url:
  description: "Path to the OpenTherm Gateway device as supported by [PySerial](https://pythonhosted.org/pyserial/url_handlers.html). This is usually either a path to a serial device in `/dev/` if the gateway is connected via serial or USB, or a URL in the form of `socket://[IP address]:[port]` if it is connected over the network.<br/>Examples: `/dev/ttyUSB0`, `socket://192.168.0.250:25238`"
id:
  description: "The `gateway_id` for this OpenTherm Gateway. This is used to identify this specific gateway in action and to generate the entity IDs for the entities related to this gateway. The entered value will be slugified, i.e. all spaces and special characters will be converted to underscores and any accents will be removed from their characters. The default value is the slugified version of the `name` given above.<br/>Examples: `thermostat`, `living_room`"
{% endconfiguration_basic %}

{% important %}
Please make sure no other device or application is connected to the OpenTherm Gateway at the same time as Home Assistant. This is not a supported scenario and may lead to unexpected results.
{% endimportant %}

{% note %}
The precision and floor_temperature settings that were supported in configuration.yaml entries have been lost upon import of the `configuration.yaml` entry into the Integrations panel. You can now configure them as per the following Options paragraph.
{% endnote %}

# Options

The OpenTherm Gateway can be further configured through the integration settings in the web interface.

The following options are available:
{% configuration_basic %}
Read Precision:
  description: "The desired read precision for this device. Used to display the current temperature on the climate entity. Can be used to match your actual thermostat's precision. Set to `0` to use the default value for your unit preference."
Set Precision:
  description: "The desired set precision for this device. Used as step size for setting temperature setpoint from the climate entity. Can be used to match your actual thermostat's precision. Set to `0` to use the default value for your unit preference."
Temporary Setpoint Override Mode:
  description: "The desired setpoint override mode. When Temporary Setpoint Override Mode is set to on, the thermostat will be able to cancel the setpoint override after a program change. When the option is set to off, the Setpoint Override Mode will be ‘Constant’ and a manual temperature adjustment on the thermostat is needed to cancel the setpoint override."
Floor Temperature:
  description: "Some thermostats round all temperatures down to the lower value according to their precision. Default behavior for Home Assistant is to round temperatures to the nearest value. Enable this setting to override this behavior and round to the lower value according to the configured precision."
{% endconfiguration_basic %}

## Entities

### Button

The integration adds the following buttons to your Home Assistant instance:

#### Cancel Room Setpoint Override

Pressing this button, which can be found on the `OpenTherm Thermostat` device, cancels an active room setpoint override. Note that it does not change the target temperature, it only returns control to the thermostat.

#### Restart

The restart button on the `OpenTherm Gateway` device can be used to restart the OpenTherm Gateway.

### Select

Several `select` configuration entities can be found on the `OpenTherm Gateway` device. These can be used to configure the LEDs and GPIO pins of the OpenTherm Gateway. More information about the available modes can be found in the sections [LED modes](#led-modes) and [GPIO modes](#gpio-modes) or in the [commands documentation](https://otgw.tclcode.com/firmware.html#configuration) of the OpenTherm Gateway.

## Actions

### Action `opentherm_gw.reset_gateway`

Reset the OpenTherm Gateway.

| Data attribute | Optional | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration. |

### Action `set_central_heating_ovrd`

Set the central heating override option on the gateway.
When overriding the control setpoint (via the [set_control_setpoint](#action-opentherm_gwset_control_setpoint) action with a temperature value other than `0`), the gateway automatically enables the central heating override to start heating. This action can then be used to control the central heating override status.
To return control of the central heating to the thermostat, use the [set_control_setpoint](#action-opentherm_gwset_control_setpoint) action with temperature value `0`.
**You will only need this if you are writing your own software thermostat.**

| Data attribute | Optional | Description                                                                              |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                      |
| `ch_override`          | no       | The desired value for the central heating override. Use `0` to disable or `1` to enable. |

{% warning %}
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.
{% endwarning %}

### Action `opentherm_gw.set_clock`

Provide the time and day of week to the OpenTherm Gateway. The value provided here will be forwarded to the thermostat on the next date/time request from the thermostat. The OpenTherm Gateway does not have the ability to accurately keep track of time, so it will only retain the information provided here for a maximum of about 61 seconds.

| Data attribute | Optional | Default      | Description                                                              |
| ---------------------- | -------- | ------------ | ------------------------------------------------------------------------ |
| `gateway_id`           | no       | N/A          | The `gateway_id` as specified during configuration.                      |
| `date`                 | yes      | Today's date | Date from which the day of week will be extracted. Format: `YYYY-MM-DD`. |
| `time`                 | yes      | Current time | Time in 24h format.                                                      |

### Action `opentherm_gw.set_control_setpoint`

{% caution %}
Improper use of this action may continuously keep your central heating system active, resulting in an overheated house and a significant increase in gas and/or electricity consumption.
{% endcaution %}

Set the central heating control setpoint override on the OpenTherm Gateway.
In a normal situation, the thermostat will calculate and control the central heating setpoint on the boiler. Setting this to any value other than 0 will enable the override and allow the OpenTherm Gateway to control this setting. While the override is active, the OpenTherm Gateway will also request your boiler to activate the central heating circuit. For your boiler's actual maximum and minimum supported setpoint value, please see the `slave_ch_max_setp` and `slave_ch_min_setp` [sensors](#sensors). Due to the potential consequences of leaving this setting enabled for prolonged periods, the override will be disabled when Home Assistant is shut down or restarted.
**You will only need this if you are writing your own software thermostat.**

| Data attribute | Optional | Description                                                                                                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                                             |
| `temperature`          | no       | The central heating setpoint. Values between `0.0` and `90.0` are accepted, but your boiler may not support the full range. Set to `0` to disable the override. |

{% warning %}
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.
{% endwarning %}

### Action `opentherm_gw.set_hot_water_ovrd`

Set the domestic hot water enable option on the OpenTherm Gateway.
Control the domestic hot water enable option. If the boiler has
been configured to let the room unit control when to keep a
small amount of water preheated, this command can influence
that.

| Data attribute | Optional | Description                                                                                                                                    |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                            |
| `dhw_override`         | no       | The domestic hot water override state. Value should be `0` or `1` to enable the override in off or on state, or `"A"` to disable the override. |

### Action `opentherm_gw.set_hot_water_setpoint`

Set the domestic hot water setpoint on the OpenTherm Gateway. Not all boilers support this feature.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                       |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                                                                                                                                               |
| `temperature`          | no       | The domestic hot water setpoint to set on the gateway. Values between `0` and `90` are accepted, but not all boilers support this range. Check the values of the `slave_dhw_min_setp` and `slave_dhw_max_setp` sensors to see the supported range on your boiler. |

### Action `opentherm_gw.set_gpio_mode`

Configure the GPIO behavior on the OpenTherm Gateway.
For an explanation of the possible modes, see [GPIO modes](#gpio-modes)

| Data attribute | Optional | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration. |
| `id`                   | no       | The GPIO ID; `A` or `B`.                            |
| `mode`                 | no       | The GPIO mode to be set.                            |

### Action `opentherm_gw.set_led_mode`

Configure the function of the LEDs on the OpenTherm Gateway.
For a list of possible modes with explanation, see [LED modes](#led-modes)

| Data attribute | Optional | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration. |
| `id`                   | no       | The LED ID, accepted values are `A` through `F`.    |
| `mode`                 | no       | The LED mode to be set.                             |

### Action `opentherm_gw.set_max_modulation`

{% warning %}
Improper use of this action may impair the performance of your central heating system.
{% endwarning %}

Set the maximum modulation level override on the OpenTherm Gateway.
In a normal situation, the thermostat will control the maximum modulation level on the boiler. Setting this to any value other than `-1` will enable the override and allow the OpenTherm Gateway to control this setting. Due to the potential consequences of leaving this setting enabled, the override will be disabled when Home Assistant is shut down or restarted.
**You will only need this if you are writing your own software thermostat.**

| Data attribute | Optional | Description                                                                                                |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                        |
| `level`                | no       | The maximum modulation level. Accepted values are `-1` through `100`. Set to `-1` to disable the override. |

{% warning %}
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.
{% endwarning %}

### Action `opentherm_gw.set_outside_temperature`

Provide the outside temperature to the thermostat.
If your thermostat is unable to display an outside temperature and does not support OTC (Outside Temperature Correction), this has no effect. Note that not all thermostats are able to display the full supported range.

| Data attribute | Optional | Description                                                                                                                                                                           |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                                                                                                                                   |
| `temperature`          | no       | The outside temperature to provide to the thermostat. Accepted values are `-40.0` through `64.0`. Any value above `64.0` will clear a previously configured value (suggestion: `99`). |

### Action `opentherm_gw.set_setback_temperature`

Configure the setback temperature on the OpenTherm Gateway.
The value you provide here will be used with the GPIO `home` (5) and `away` (6) modes.

| Data attribute | Optional | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                |
| `temperature`          | no       | The setback temperature. Accepted values are `0.0` through `30.0`. |

### Action `opentherm_gw.send_transparent_command`

<div class='note warning'>
Improper use of this action may impair the performance of your central heating system.
</div>

Send a transparent [command](https://otgw.tclcode.com/firmware.html) to the OpenTherm Gateway.

| Data attribute | Optional | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `gateway_id`           | no       | The `gateway_id` as specified during configuration.                |
| `transp_cmd`           | no       | The serial command to be sent to the OpenTherm Gateway.            |
| `transp_arg`           | no       | The serial command argument to be sent to the OpenTherm Gateway.   |

## GPIO modes

Possible modes and their meaning for the GPIO pins are listed here:
{% comment %}
    Bulletpoints and numbers to match the LED mode layout below.
{% endcomment %}

- 0\. Input - default for both ports on a freshly flashed chip.
- 1\. Ground - A permanently low output (0V). Could be used for a power LED.
- 2\. Vcc - A permanently high output (5V). Can be used as a short-proof power supply for some external circuitry used by the other GPIO port.
- 3\. LED E - An additional LED if you want to present more than 4 LED functions.
- 4\. LED F - An additional LED if you want to present more than 5 LED functions.
- 5\. Home - Set thermostat to setback temperature when pulled low.
- 6\. Away - Set thermostat to setback temperature when pulled high.
- 7\. DS1820 (GPIO port B only) - Data line for a DS18S20 or DS18B20 temperature sensor used to measure the outside temperature. A 4k7 resistor should be connected between GPIO port B and Vcc.

## LED modes

Possible LED modes and their meaning are listed here:

- R. Receiving an OpenTherm message from the thermostat or boiler.
- X. Transmitting an OpenTherm message to the thermostat or boiler.
- T. Transmitting or receiving a message on the thermostat interface.
- B. Transmitting or receiving a message on the boiler interface.
- O. Remote setpoint override is active.
- F. Flame is on.
- H. Central heating is on.
- W. Hot water is on.
- C. Comfort mode (Domestic Hot Water Enable) is on.
- E. Transmission error has been detected.
- M. Boiler requires maintenance.
- P. Raised power mode active on thermostat interface.

## Disabled configuration entities

{% warning %}
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering using the information in this section.
{% endwarning %}
For advanced control of your heating system, some `switch` configuration entities can be found on the added `OpenTherm Gateway` device.
These entities are disabled by default, as they can cause your heating system to run continuously and/or increase your energy consumption significantly if used improperly. In most setups, these entities are not needed and should be left disabled.
