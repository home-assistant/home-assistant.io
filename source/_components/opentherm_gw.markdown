---
layout: page
title: "OpenTherm Gateway Hub"
description: "Control your OpenTherm Gateway from Home Assistant."
date: 2018-10-07 16:23
sidebar: true
comments: false
sharing: true
footer: true
logo: opentherm.png
ha_category: Hub
ha_release: 0.81
ha_iot_class: "Local Push"
---

The `opentherm_gw` component is used to control the [OpenTherm Gateway](http://otgw.tclcode.com/) from Home Assistant.
When enabled, this component will automatically add its [`climate` entity](/components/climate.opentherm_gw) to Home Assistant.

# {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
opentherm_gw:
  device: /dev/ttyUSB0
```

{% configuration %}
device:
  description: "Path to OpenTherm Gateway device as supported by [PySerial](https://pythonhosted.org/pyserial/url_handlers.html)."
  required: true
  type: string
climate:
  description: "Settings for the `opentherm_gw` climate entity."
  required: false
  type: map
  keys:
    name:
      description: "The name for the device within Home Assistant."
      required: false
      type: string
      default: "OpenTherm Gateway"
    precision:
      description: "The desired precision for this device. Can be used to match your actual thermostat's precision. Supported values are `0.1`, `0.5` and `1.0`."
      required: false
      type: float
      default: "`0.5` for Celsius and `1.0` for Fahrenheit."
    floor_temperature:
      description: "Some thermostats round all temperatures down to the lower value according to their precision. Default behavior for Home Assistant is to round temperatures to the nearest value. Set this to `true` to override Home Assistant and round to the lower value according to the configured `precision`."
      required: false
      type: boolean
      default: false
monitored_variables:
  description: "A list of variables to expose as sensors."
  required: false
  type: list
  keys:
    burner_hours:
      description: Boiler flame on time.
    burner_starts:
      description: Number of burner starts.
    ch_pump_hours:
      description: Central heating pump running time.
    ch_pump_starts:
      description: Number of central heating pump starts.
    ch_water_pressure:
      description: Central heating water pressure.
    ch_water_temp:
      description: Central heating water temperature.
    ch_water_temp_2:
      description: Central heating 2 water temperature.
    control_setpoint:
      description: Central heating water target temperature.
    control_setpoint_2:
      description: Central heating 2 water target temperature.
    cooling_control:
      description: Cooling control signal value.
    dhw_burner_hours:
      description: Hot water flame on time.
    dhw_burner_starts:
      description: Number of hot water burner starts.
    dhw_flow_rate:
      description: Hot water flow rate.
    dhw_pump_hours:
      description: Hot water pump running time.
    dhw_pump_starts:
      description: Number of hot water pump starts.
    dhw_setpoint:
      description: Hot water target temperature.
    dhw_temp:
      description: Hot water temperature.
    dhw_temp_2:
      description: Hot water 2 temperature.
    exhaust_temp:
      description: Boiler exhaust temperature.
    master_ch2_enabled:
      description: Thermostat requests central heating 2 on.
    master_ch_enabled:
      description: Thermostat requests central heating on.
    master_cooling_enabled:
      description: Thermostat requests cooling.
    master_dhw_enabled:
      description: Thermostat requests hot water to be heated.
    master_memberid:
      description: Thermostat member ID.
    master_ot_version:
      description: Thermostat OpenTherm protocol version.
    master_otc_enabled:
      description: Thermostat is using outside temperature correction.
    master_product_type:
      description: Thermostat product type.
    master_product_version:
      description: Thermostat product version.
    max_ch_setpoint:
      description: Boiler maximum central heating water temperature.
    oem_diag:
      description: OEM diagnostic information.
    otgw_about:
      description: OpenTherm Gateway firmware version.
    otgw_build:
      description: OpenTherm Gateway firmware build date and time.
    otgw_clockmhz:
      description: OpenTherm Gateway firmware design clock speed.
    otgw_dhw_ovrd:
      description: OpenTherm Gateway hot water override status.
    otgw_gpio_a:
      description: OpenTherm Gateway GPIO port A operating mode.
    otgw_gpio_a_state:
      description: OpenTherm Gateway GPIO A state.
    otgw_gpio_b:
      description: OpenTherm Gateway GPIO port B operating mode.
    otgw_gpio_b_state:
      description: OpenTherm Gateway GPIO B state.
    otgw_ignore_transitions:
      description: OpenTherm Gateway ignores ripples in the signal during high/low transitions.
    otgw_led_a:
      description: OpenTherm Gateway LED A operating mode.
    otgw_led_b:
      description: OpenTherm Gateway LED B operating mode.
    otgw_led_c:
      description: OpenTherm Gateway LED C operating mode.
    otgw_led_d:
      description: OpenTherm Gateway LED D operating mode.
    otgw_led_e:
      description: OpenTherm Gateway LED E operating mode.
    otgw_led_f:
      description: OpenTherm Gateway LED F operating mode.
    otgw_mode:
      description: OpenTherm Gateway operating mode.
    otgw_ovrd_high_byte:
      description: OpenTherm Gateway overrides high byte with message ID 100.
    otgw_setback_temp:
      description: OpenTherm Gateway setback temperature for `away mode`.
    otgw_setpoint_ovrd_mode:
      description: OpenTherm Gateway central heating setpoint override mode.
    otgw_smart_pwr:
      description: OpenTherm Gateway smart power operating mode.
    otgw_thermostat_detect:
      description: OpenTherm Gateway automatic thermostat detection status.
    otgw_vref:
      description: OpenTherm Gateway voltage reference setting.
    outside_temp:
      description: Outside temperature as reported in the OpenTherm protocol.
    relative_mod_level:
      description: Relative modulation level.
    remote_rw_dhw:
      description: Boiler supports writing hot water setpoint.
    remote_rw_max_ch:
      description: Boiler supports writing maximum central heating setpoint.
    remote_transfer_dhw:
      description: Boiler supports reading hot water setpoint.
    remote_transfer_max_ch:
      description: Boiler supports reading maximum central heating setpoint.
    return_water_temp:
      description: Boiler return water temperature.
    room_setpoint:
      description: Room target temperature.
    room_setpoint_2:
      description: Room 2 target temperature.
    room_setpoint_ovrd:
      description: Room target temperature override value.
    room_temp:
      description: Current room temperature.
    rovrd_auto_prio:
      description: Programmed room setpoint change takes priority over remote override setting.
    rovrd_man_prio:
      description: Manual room setpoint change takes priority over remote override setting.
    slave_air_pressure_fault:
      description: Boiler reports air pressure fault.
    slave_ch2_active:
      description: Boiler reports central heating 2 active.
    slave_ch2_present:
      description: Boiler has a central heating 2 circuit.
    slave_ch_active:
      description: Boiler reports central heating active.
    slave_ch_max_setp:
      description: Maximum boiler supported central heating water target temperature.
    slave_ch_min_setp:
      description: Minimum boiler supported central heating water target temperature.
    slave_control_type:
      description: Boiler control type ('off' is modulating, 'on' is on/off).
    slave_cooling_active:
      description: Boiler reports cooling active.
    slave_cooling_supported:
      description: Boiler supports cooling.
    slave_dhw_active:
      description: Boiler reports hot water active.
    slave_dhw_config:
      description: Boiler hot water mode ('off' is instantaneous or unspecified, 'on' is storage tank).
    slave_dhw_max_setp:
      description: Maximum boiler supported hot water target temperature.
    slave_dhw_min_setp:
      description: Minimum boiler supported hot water target temperature.
    slave_dhw_present:
      description: Boiler reports hot water present.
    slave_diagnostic_indication:
      description: Boiler diagnostic indication.
    slave_fault_indication:
      description: Boiler fault indication.
    slave_flame_on:
      description: Boiler reports flame on.
    slave_gas_fault:
      description: Boiler reports gas fault.
    slave_low_water_pressure:
      description: Boiler reports low water pressure.
    slave_master_low_off_pump:
      description: Boiler supports low-off and pump control commands (this sensor is inverted, 'on' is not supported, 'off' is supported)
    slave_max_capacity:
      description: Maximum boiler capacity.
    slave_max_relative_modulation:
      description: Maximum boiler supported relative modulation.
    slave_memberid:
      description: Boiler member ID.
    slave_min_mod_level:
      description: Minimum boiler supported modulation level.
    slave_oem_fault:
      description: Boiler OEM fault indication.
    slave_ot_version:
      description: Boiler OpenTherm protocol version.
    slave_product_type:
      description: Boiler product type.
    slave_product_version:
      description: Boiler product version.
    slave_remote_reset:
      description: Boiler reports 'lockout-reset' supported.
    slave_service_required:
      description: Boiler reports service required.
    slave_water_overtemp:
      description: Boiler reports water overtemperature.
    solar_coll_temp:
      description: Solar collector temperature.
    solar_storage_temp:
      description: Solar storage unit temperature.
{% endconfiguration %}

## {% linkable_title Supported Variables %}
The list above contains all supported variables. Note that not all boilers and thermostats properly support all variables, so the fact that a variable is listed here and published by your system does not necessarily mean that you will get useful data out of it. To see which variables are published in your situation, enable debug logging for the `opentherm_gw` component and look for the status updates.

# {% linkable_title Services %}

### {% linkable_title Service `opentherm_gw.reset_gateway` %}

Reset the OpenTherm Gateway.

This service takes no parameters.

### {% linkable_title Service `opentherm_gw.set_clock` %}

Provide the time and day of week to the OpenTherm Gateway. The value provided here will be forwarded to the thermostat on the next date/time request from the thermostat. The OpenTherm Gateway does not have the ability to accurately keep track of time, so it will only retain the information provided here for a maximum of about 61 seconds.

| Service data attribute | Optional | Default | Description |
| ---------------------- | -------- | ------- | ----------- |
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
| `temperature` | no | The central heating setpoint. Values between `0.0` and `90.0` are accepted, but your boiler may not support the full range. Set to `0` to disable the override.

<p class='note'>
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.
</p>

### {% linkable_title Service `opentherm_gw.set_gpio_mode` %}

Configure the GPIO behavior on the OpenTherm Gateway.
For an explanation of the possible modes, see [GPIO modes](#gpio-modes)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `id` | no | The GPIO ID, `A` or `B`.
| `mode` | no | The GPIO mode to be set.

### {% linkable_title Service `opentherm_gw.set_led_mode` %}

Configure the function of the LEDs on the OpenTherm Gateway.
For a list of possible modes with explanation, see [LED modes](#led-modes)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
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
| `level` | no | The maximum modulation level. Accepted values are `-1` through `100`. Set to `-1` to disable the override.

<p class='note'>
Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.
</p>

### {% linkable_title Service `opentherm_gw.set_outside_temperature` %}

Provide the outside temperature to the thermostat.
If your thermostat is unable to display an outside temperature and does not support OTC (Outside Temperature Correction), this has no effect. Note that not all thermostats are able to display the full supported range.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `temperature` | no | The outside temperature to provide to the thermostat. Accepted values are `-40.0` through `64.0`. Any value above `64.0` will clear a previously configured value (suggestion: `99`).

### {% linkable_title Service `opentherm_gw.set_setback_temperature` %}

Configure the setback temperature on the OpenTherm Gateway.
The value you provide here will be used with the GPIO `home` (5) and `away` (6) modes.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `temperature` | no  | The setback temperature. Accepted values are `0.0` through `30.0`.


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

<p class='note'>
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
</p>

# {% linkable_title Example %}

A full configuration example with the OpenTherm Gateway connected to a remote host running `ser2net` looks like the one below.

```yaml
# Full example configuration.yaml entry
opentherm_gw:
  device: socket://otgw.example.org:2345
  climate:
    name: Thermostat
    precision: 0.5
    floor_temperature: true
  monitored_variables:
    - room_setpoint
    - room_temp
    - otgw_about
```
