---
layout: page
title: "OpenTherm Gateway"
description: "Control your OpenTherm Gateway from Home Assistant."
date: 2018-10-07 16:23
sidebar: true
comments: false
sharing: true
footer: true
logo: opentherm.png
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Sensor
ha_release: 0.81
ha_iot_class: Local Push
redirect_from:
  - /components/binary_sensor.opentherm_gw/
  - /components/climate.opentherm_gw/
  - /components/sensor.opentherm_gw/
---

The `opentherm_gw` component is used to control the [OpenTherm Gateway](http://otgw.tclcode.com/) from Home Assistant.

This component will add a single `climate` entity and multiple `sensor` and `binary_sensor` entities to Home Assistant for each configured gateway.

<p class='note'>
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
</p>

# {% linkable_title Configuration %}
In this example, one gateway is configured with `gateway_id` `living_room`.
```yaml
# Example configuration.yaml entry
opentherm_gw:
  living_room:
    device: /dev/ttyUSB0
```

Each configured gateway accepts the following configuration options.
{% configuration %}
device:
  description: "Path to OpenTherm Gateway device as supported by [PySerial](https://pythonhosted.org/pyserial/url_handlers.html)."
  required: true
  type: string
name:
  description: "The friendly name used for the entities added for the gateway."
  required: false
  type: string
  default: "The `gateway_id` of the gateway."
climate:
  description: "Settings for the `opentherm_gw` climate entity."
  required: false
  type: map
  keys:
    precision:
      description: "The desired precision for this device. Can be used to match your actual thermostat's precision. Supported values are `0.1`, `0.5` and `1.0`."
      required: false
      type: float
      default: "`0.5` for Celsius and `1.0` for Fahrenheit."
    floor_temperature:
      description: "Some thermostats round all temperatures down to the lower value according to their precision. Default behavior for Home Assistant is to round temperatures to the nearest value. Set this to `true` to override this behavior and round to the lower value according to the configured `precision`."
      required: false
      type: boolean
      default: false
{% endconfiguration %}

# {% linkable_title Services %}

### {% linkable_title Service `opentherm_gw.reset_gateway` %}

Reset the OpenTherm Gateway.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified in `configuration.yaml`.

### {% linkable_title Service `opentherm_gw.set_clock` %}

Provide the time and day of week to the OpenTherm Gateway. The value provided here will be forwarded to the thermostat on the next date/time request from the thermostat. The OpenTherm Gateway does not have the ability to accurately keep track of time, so it will only retain the information provided here for a maximum of about 61 seconds.

| Service data attribute | Optional | Default | Description |
| ---------------------- | -------- | ------- | ----------- |
| `gateway_id` | no | N/A | The `gateway_id` as specified in `configuration.yaml`.
| `date` | yes | Today's date | Date from which the day of week will be extracted. Format: `YYYY-MM-DD`.
| `time` | yes | Current time | Time in 24h format.

### {% linkable_title Service `opentherm_gw.set_control_setpoint` %}

<p class='note warning'>
Improper use of this service may continuously keep your central heating system active, resulting in an overheated house and a significant increase in gas and/or electricity consumption.
</p>

Set the central heating control setpoint override on the OpenTherm Gateway.
In a normal situation, the thermostat will calculate and control the central heating setpoint on the boiler. Setting this to any value other than 0 will enable the override and allow the OpenTherm Gateway to control this setting. While the override is active, the OpenTherm Gateway will also request your boiler to activate the central heating circuit. For your boiler's actual maximum and minimum supported setpoint value, please see the [`slave_ch_max_setp`](#slave_ch_max_setp) and [`slave_ch_min_setp`](#slave_ch_min_setp) variables. Due to the potential consequences of leaving this setting enabled for prolonged periods, the override will be disabled when Home Assistant is shut down or restarted.
**You will only need this if you are writing your own software thermostat.**

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified in `configuration.yaml`.
| `temperature` | no | The central heating setpoint. Values between `0.0` and `90.0` are accepted, but your boiler may not support the full range. Set to `0` to disable the override.

<p class='note'>
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.
</p>

### {% linkable_title Service `opentherm_gw.set_gpio_mode` %}

Configure the GPIO behavior on the OpenTherm Gateway.
For an explanation of the possible modes, see [GPIO modes](#gpio-modes)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified in `configuration.yaml`.
| `id` | no | The GPIO ID, `A` or `B`.
| `mode` | no | The GPIO mode to be set.

### {% linkable_title Service `opentherm_gw.set_led_mode` %}

Configure the function of the LEDs on the OpenTherm Gateway.
For a list of possible modes with explanation, see [LED modes](#led-modes)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified in `configuration.yaml`.
| `id` | no | The LED ID, accepted values are `A` through `F`.
| `mode` | no | The LED mode to be set.

### {% linkable_title Service `opentherm_gw.set_max_modulation` %}

<p class='note warning'>
Improper use of this service may impair the performance of your central heating system.
</p>

Set the maximum modulation level override on the OpenTherm Gateway.
In a normal situation, the thermostat will control the maximum modulation level on the boiler. Setting this to any value other than `-1` will enable the override and allow the OpenTherm Gateway to control this setting. Due to the potential consequences of leaving this setting enabled, the override will be disabled when Home Assistant is shut down or restarted.
**You will only need this if you are writing your own software thermostat.**

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified in `configuration.yaml`.
| `level` | no | The maximum modulation level. Accepted values are `-1` through `100`. Set to `-1` to disable the override.

<p class='note'>
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.
</p>

### {% linkable_title Service `opentherm_gw.set_outside_temperature` %}

Provide the outside temperature to the thermostat.
If your thermostat is unable to display an outside temperature and does not support OTC (Outside Temperature Correction), this has no effect. Note that not all thermostats are able to display the full supported range.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified in `configuration.yaml`.
| `temperature` | no | The outside temperature to provide to the thermostat. Accepted values are `-40.0` through `64.0`. Any value above `64.0` will clear a previously configured value (suggestion: `99`).

### {% linkable_title Service `opentherm_gw.set_setback_temperature` %}

Configure the setback temperature on the OpenTherm Gateway.
The value you provide here will be used with the GPIO `home` (5) and `away` (6) modes.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified in `configuration.yaml`.
| `temperature` | no  | The setback temperature. Accepted values are `0.0` through `30.0`.

## {% linkable_title Sensors %}

The following `sensor` entities will be created for each configured gateway. The `entity_id` of every sensor will have a suffix containing the `gateway_id` of the gateway to which it belongs.
<p class='note'>
Not all boilers and thermostats properly support all OpenTherm features, so not all of the sensors will have useful values.
</p>

- <b>burner_hours</b><br />
  Boiler flame on time.

- <b>burner_starts</b><br />
  Number of burner starts.

- <b>ch_pump_hours</b><br />
  Central heating pump running time.

- <b>ch_pump_starts</b><br />
  Number of central heating pump starts.

- <b>ch_water_pressure</b><br />
  Central heating water pressure.

- <b>ch_water_temp</b><br />
  Central heating water temperature.

- <b>ch_water_temp_2</b><br />
  Central heating 2 water temperature.

- <b>control_setpoint</b><br />
  Central heating water target temperature.

- <b>control_setpoint_2</b><br />
  Central heating 2 water target temperature.

- <b>cooling_control</b><br />
  Cooling control signal value.

- <b>dhw_burner_hours</b><br />
  Hot water flame on time.

- <b>dhw_burner_starts</b><br />
  Number of hot water burner starts.

- <b>dhw_flow_rate</b><br />
  Hot water flow rate.

- <b>dhw_pump_hours</b><br />
  Hot water pump running time.

- <b>dhw_pump_starts</b><br />
  Number of hot water pump starts.

- <b>dhw_setpoint</b><br />
  Hot water target temperature.

- <b>dhw_temp</b><br />
  Hot water temperature.

- <b>dhw_temp_2</b><br />
  Hot water 2 temperature.

- <b>exhaust_temp</b><br />
  Boiler exhaust temperature.

- <b>master_memberid</b><br />
  Thermostat member ID.

- <b>master_ot_version</b><br />
  Thermostat OpenTherm protocol version.

- <b>master_product_type</b><br />
  Thermostat product type.

- <b>master_product_version</b><br />
  Thermostat product version.

- <b>max_ch_setpoint</b><br />
  Boiler maximum central heating water temperature.

- <b>oem_diag</b><br />
  OEM diagnostic information.

- <b>otgw_about</b><br />
  OpenTherm Gateway firmware version.

- <b>otgw_build</b><br />
  OpenTherm Gateway firmware build date and time.

- <b>otgw_clockmhz</b><br />
  OpenTherm Gateway firmware design clock speed.

- <b>otgw_dhw_ovrd</b><br />
  OpenTherm Gateway hot water override status.

- <b>otgw_gpio_a</b><br />
  OpenTherm Gateway GPIO port A operating mode.

- <b>otgw_gpio_b</b><br />
  OpenTherm Gateway GPIO port B operating mode.

- <b>otgw_led_a</b><br />
  OpenTherm Gateway LED A operating mode.

- <b>otgw_led_b</b><br />
  OpenTherm Gateway LED B operating mode.

- <b>otgw_led_c</b><br />
  OpenTherm Gateway LED C operating mode.

- <b>otgw_led_d</b><br />
  OpenTherm Gateway LED D operating mode.

- <b>otgw_led_e</b><br />
  OpenTherm Gateway LED E operating mode.

- <b>otgw_led_f</b><br />
  OpenTherm Gateway LED F operating mode.

- <b>otgw_mode</b><br />
  OpenTherm Gateway operating mode.

- <b>otgw_setback_temp</b><br />
  OpenTherm Gateway setback temperature for `away mode`.

- <b>otgw_setpoint_ovrd_mode</b><br />
  OpenTherm Gateway central heating setpoint override mode.

- <b>otgw_smart_pwr</b><br />
  OpenTherm Gateway smart power operating mode.

- <b>otgw_thermostat_detect</b><br />
  OpenTherm Gateway automatic thermostat detection status.

- <b>otgw_vref</b><br />
  OpenTherm Gateway voltage reference setting.

- <b>outside_temp</b><br />
  Outside temperature as reported in the OpenTherm protocol.

- <b>relative_mod_level</b><br />
  Relative modulation level.

- <b>return_water_temp</b><br />
  Boiler return water temperature.

- <b>room_setpoint</b><br />
  Room target temperature.

- <b>room_setpoint_2</b><br />
  Room 2 target temperature.

- <b>room_setpoint_ovrd</b><br />
  Room target temperature override value.

- <b>room_temp</b><br />
  Current room temperature.

- <b>slave_ch_max_setp</b><br />
  Maximum boiler supported central heating water target temperature.

- <b>slave_ch_min_setp</b><br />
  Minimum boiler supported central heating water target temperature.

- <b>slave_dhw_max_setp</b><br />
  Maximum boiler supported hot water target temperature.

- <b>slave_dhw_min_setp</b><br />
  Minimum boiler supported hot water target temperature.

- <b>slave_max_capacity</b><br />
  Maximum boiler capacity.

- <b>slave_max_relative_modulation</b><br />
  Maximum boiler supported relative modulation.

- <b>slave_memberid</b><br />
  Boiler member ID.

- <b>slave_min_mod_level</b><br />
  Minimum boiler supported modulation level.

- <b>slave_oem_fault</b><br />
  Boiler OEM fault indication.

- <b>slave_ot_version</b><br />
  Boiler OpenTherm protocol version.

- <b>slave_product_type</b><br />
  Boiler product type.

- <b>slave_product_version</b><br />
  Boiler product version.

- <b>solar_coll_temp</b><br />
  Solar collector temperature.

- <b>solar_storage_temp</b><br />
  Solar storage unit temperature.


## {% linkable_title Binary Sensors %}

The following `binary_sensor` entities will be created for each configured gateway. The `entity_id` of every sensor will have a suffix containing the `gateway_id` of the gateway to which it belongs.
<p class='note'>
Not all boilers and thermostats properly support all OpenTherm features, so not all of the sensors will have useful values.
</p>

- <b>master_ch2_enabled</b><br />
  Thermostat requests central heating 2 on.

- <b>master_ch_enabled</b><br />
  Thermostat requests central heating on.

- <b>master_cooling_enabled</b><br />
  Thermostat requests cooling.

- <b>master_dhw_enabled</b><br />
  Thermostat requests hot water to be heated.

- <b>master_otc_enabled</b><br />
  Thermostat is using outside temperature correction.

- <b>otgw_gpio_a_state</b><br />
  OpenTherm Gateway GPIO A state.

- <b>otgw_gpio_b_state</b><br />
  OpenTherm Gateway GPIO B state.

- <b>otgw_ignore_transitions</b><br />
  OpenTherm Gateway ignores ripples in the signal during high/low transitions.

- <b>otgw_ovrd_high_byte</b><br />
  OpenTherm Gateway overrides high byte with message ID 100.

- <b>remote_rw_dhw</b><br />
  Boiler supports writing hot water setpoint.

- <b>remote_rw_max_ch</b><br />
  Boiler supports writing maximum central heating setpoint.

- <b>remote_transfer_dhw</b><br />
  Boiler supports reading hot water setpoint.

- <b>remote_transfer_max_ch</b><br />
  Boiler supports reading maximum central heating setpoint.

- <b>rovrd_auto_prio</b><br />
  Programmed room setpoint change takes priority over remote override setting.

- <b>rovrd_man_prio</b><br />
  Manual room setpoint change takes priority over remote override setting.

- <b>slave_air_pressure_fault</b><br />
  Boiler reports air pressure fault.

- <b>slave_ch2_active</b><br />
  Boiler reports central heating 2 active.

- <b>slave_ch2_present</b><br />
  Boiler has a central heating 2 circuit.

- <b>slave_ch_active</b><br />
  Boiler reports central heating active.

- <b>slave_control_type</b><br />
  Boiler control type ('off' is modulating, 'on' is on/off).

- <b>slave_cooling_active</b><br />
  Boiler reports cooling active.

- <b>slave_cooling_supported</b><br />
  Boiler supports cooling.

- <b>slave_dhw_active</b><br />
  Boiler reports hot water active.

- <b>slave_dhw_config</b><br />
  Boiler hot water mode ('off' is instantaneous or unspecified, 'on' is storage tank).

- <b>slave_dhw_present</b><br />
  Boiler reports hot water present.

- <b>slave_diagnostic_indication</b><br />
  Boiler diagnostic indication.

- <b>slave_fault_indication</b><br />
  Boiler fault indication.

- <b>slave_flame_on</b><br />
  Boiler reports flame on.

- <b>slave_gas_fault</b><br />
  Boiler reports gas fault.

- <b>slave_low_water_pressure</b><br />
  Boiler reports low water pressure.

- <b>slave_master_low_off_pump</b><br />
  Boiler supports low-off and pump control commands (this sensor is inverted, 'on' is not supported, 'off' is supported)

- <b>slave_remote_reset</b><br />
  Boiler reports 'lockout-reset' supported.

- <b>slave_service_required</b><br />
  Boiler reports service required.

- <b>slave_water_overtemp</b><br />
  Boiler reports water overtemperature.


## {% linkable_title GPIO modes %}

Possible modes and their meaning for the GPIO pins are listed here:
{% comment %}
    Bulletpoints and numbers to match the LED mode layout below.
{% endcomment %}

* 1\. No function, default for both ports on a freshly flashed chip.
* 2\. Ground - A permanently low output (0V). Could be used for a power LED.
* 3\. Vcc - A permanently high output (5V). Can be used as a short-proof power supply for some external circuitry used by the other GPIO port.
* 4\. LED E - An additional LED if you want to present more than 4 LED functions.
* 5\. LED F - An additional LED if you want to present more than 5 LED functions.
* 6\. Home - Set thermostat to setback temperature when pulled low.
* 7\. Away - Set thermostat to setback temperature when pulled high.
* 8\. DS1820 (GPIO port B only) - Data line for a DS18S20 or DS18B20 temperature sensor used to measure the outside temperature. A 4k7 resistor should be connected between GPIO port B and Vcc.

## {% linkable_title LED modes %}

Possible LED modes and their meaning are listed here:

* R. Receiving an Opentherm message from the thermostat or boiler.
* X. Transmitting an Opentherm message to the thermostat or boiler.
* T. Transmitting or receiving a message on the thermostat interface.
* B. Transmitting or receiving a message on the boiler interface.
* O. Remote setpoint override is active.
* F. Flame is on.
* H. Central heating is on.
* W. Hot water is on.
* C. Comfort mode (Domestic Hot Water Enable) is on.
* X. Transmission error has been detected.
* M. Boiler requires maintenance.
* P. Raised power mode active on thermostat interface.


# {% linkable_title Example %}

A full configuration example with two configured OpenTherm Gateways - one connected via USB, the other over the network - looks like the one below.

```yaml
# Full example configuration.yaml entry
opentherm_gw:
  living_room:
    device: /dev/ttyUSB0
    name: "Living"
  holiday_home:
    device: socket://otgw.example.org:2345
    name: "Holiday Home"
    climate:
      precision: 0.5
      floor_temperature: true
```
