---
title: OpenTherm Gateway
description: Control your OpenTherm Gateway from Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Sensor
ha_release: 0.81
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mvn23'
ha_domain: opentherm_gw
ha_platforms:
  - binary_sensor
  - climate
  - sensor
---

The `opentherm_gw` integration is used to control the [OpenTherm Gateway](http://otgw.tclcode.com/) from Home Assistant.

The following device types are currently supported within Home Assistant:

- Binary Sensor
- Climate
- Sensor

This integration will add a single `climate` entity to Home Assistant for each configured gateway. Each gateway also has a collection of `sensor` and `binary_sensor` entities, which are disabled by default. These can be enabled from the `Devices` panel in the `Configuration` page of the web interface.

<div class='note'>
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
</div>

# Configuration

{% include integrations/config_flow.md %}

The following configuration options are available:

{% configuration_basic %}
name:
  description: "The friendly name used for the OpenTherm Gateway and its entities."
path:
  description: "Path to the OpenTherm Gateway device as supported by [PySerial](https://pythonhosted.org/pyserial/url_handlers.html)."
id:
  description: "The `gateway_id` for this OpenTherm Gateway's entity IDs and services. The entered value will be slugified."
{% endconfiguration_basic %}

<div class='note warning'>
Please make sure no other device or application is connected to the OpenTherm Gateway at the same time as Home Assistant. This is not a supported scenario and may lead to unexpected results.
</div>

<div class='note'>
The precision and floor_temperature settings that were supported in configuration.yaml entries have been lost upon import of the configuration.yaml entry into the Integrations panel. You can now configure them as per the following Options paragraph.
</div>

# Options

The OpenTherm Gateway can be further configured through the integration settings in the web interface
The following options are available:
{% configuration %}
Read Precision:
  description: "The desired read precision for this device. Used to display the current temperature on the climate entity. Can be used to match your actual thermostat's precision. Set to `0` to use the default value for your unit preference."
  required: false
  type: float
  default: "`0.5` for Celsius and `1.0` for Fahrenheit."
Set Precision:
  description: "The desired set precision for this device. Used as step size for setting temperature setpoint from the climate entity. Can be used to match your actual thermostat's precision. Set to `0` to use the default value for your unit preference."
  required: false
  type: float
  default: "`0.5` for Celsius and `1.0` for Fahrenheit."
Floor Temperature:
  description: "Some thermostats round all temperatures down to the lower value according to their precision. Default behavior for Home Assistant is to round temperatures to the nearest value. Enable this setting to override this behavior and round to the lower value according to the configured precision."
  required: false
  type: boolean
  default: Disabled
{% endconfiguration %}

## Services

### Service `opentherm_gw.reset_gateway`

Reset the OpenTherm Gateway.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.

### Service `set_central_heating_ovrd`

Set the central heating override option on the gateway.
When overriding the control setpoint (via a [set_control_setpoint](#service-opentherm_gwset_control_setpoint) service call with a temperature value other than 0), the gateway automatically enables the central heating override to start heating. This service can then be used to control the central heating override status.
To return control of the central heating to the thermostat, call the [set_control_setpoint](#service-opentherm_gwset_control_setpoint) service with temperature value 0.
**You will only need this if you are writing your own software thermostat.**

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `ch_override` | no | The desired value for the central heating override. Use `0` to disable or `1` to enable.

<div class='note'>

Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.

</div>

### Service `opentherm_gw.set_clock`

Provide the time and day of week to the OpenTherm Gateway. The value provided here will be forwarded to the thermostat on the next date/time request from the thermostat. The OpenTherm Gateway does not have the ability to accurately keep track of time, so it will only retain the information provided here for a maximum of about 61 seconds.

| Service data attribute | Optional | Default | Description |
| ---------------------- | -------- | ------- | ----------- |
| `gateway_id` | no | N/A | The `gateway_id` as specified during configuration.
| `date` | yes | Today's date | Date from which the day of week will be extracted. Format: `YYYY-MM-DD`.
| `time` | yes | Current time | Time in 24h format.

### Service `opentherm_gw.set_control_setpoint`

<div class='note warning'>
Improper use of this service may continuously keep your central heating system active, resulting in an overheated house and a significant increase in gas and/or electricity consumption.
</div>

Set the central heating control setpoint override on the OpenTherm Gateway.
In a normal situation, the thermostat will calculate and control the central heating setpoint on the boiler. Setting this to any value other than 0 will enable the override and allow the OpenTherm Gateway to control this setting. While the override is active, the OpenTherm Gateway will also request your boiler to activate the central heating circuit. For your boiler's actual maximum and minimum supported setpoint value, please see the `slave_ch_max_setp` and `slave_ch_min_setp` [sensors](#sensors). Due to the potential consequences of leaving this setting enabled for prolonged periods, the override will be disabled when Home Assistant is shut down or restarted.
**You will only need this if you are writing your own software thermostat.**

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `temperature` | no | The central heating setpoint. Values between `0.0` and `90.0` are accepted, but your boiler may not support the full range. Set to `0` to disable the override.

<div class='note'>

Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.

</div>

### Service `opentherm_gw.set_hot_water_ovrd`

Set the domestic hot water enable option on the OpenTherm Gateway.
Control the domestic hot water enable option. If the boiler has
been configured to let the room unit control when to keep a
small amount of water preheated, this command can influence
that.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `dhw_override` | no | The domestic hot water override state. Value should be 0 or 1 to enable the override in off or on state, or "A" to disable the override.

### Service `opentherm_gw.set_hot_water_setpoint`

Set the domestic hot water setpoint on the OpenTherm Gateway. Not all boilers support this feature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `dhw_override` | no | The domestic hot water setpoint to set on the gateway. Values between 0 and 90 are accepted, but not all boilers support this range. Check the values of the `slave_dhw_min_setp` and `slave_dhw_max_setp` sensors to see the supported range on your boiler.

### Service `opentherm_gw.set_gpio_mode`

Configure the GPIO behavior on the OpenTherm Gateway.
For an explanation of the possible modes, see [GPIO modes](#gpio-modes)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `id` | no | The GPIO ID, `A` or `B`.
| `mode` | no | The GPIO mode to be set.

### Service `opentherm_gw.set_led_mode`

Configure the function of the LEDs on the OpenTherm Gateway.
For a list of possible modes with explanation, see [LED modes](#led-modes)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `id` | no | The LED ID, accepted values are `A` through `F`.
| `mode` | no | The LED mode to be set.

### Service `opentherm_gw.set_max_modulation`

<div class='note warning'>
Improper use of this service may impair the performance of your central heating system.
</div>

Set the maximum modulation level override on the OpenTherm Gateway.
In a normal situation, the thermostat will control the maximum modulation level on the boiler. Setting this to any value other than `-1` will enable the override and allow the OpenTherm Gateway to control this setting. Due to the potential consequences of leaving this setting enabled, the override will be disabled when Home Assistant is shut down or restarted.
**You will only need this if you are writing your own software thermostat.**

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `level` | no | The maximum modulation level. Accepted values are `-1` through `100`. Set to `-1` to disable the override.

<div class='note'>

Please read [this information](http://otgw.tclcode.com/standalone.html) from the designer of the OpenTherm Gateway before considering to write your own software thermostat.

</div>

### Service `opentherm_gw.set_outside_temperature`

Provide the outside temperature to the thermostat.
If your thermostat is unable to display an outside temperature and does not support OTC (Outside Temperature Correction), this has no effect. Note that not all thermostats are able to display the full supported range.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `temperature` | no | The outside temperature to provide to the thermostat. Accepted values are `-40.0` through `64.0`. Any value above `64.0` will clear a previously configured value (suggestion: `99`).

### Service `opentherm_gw.set_setback_temperature`

Configure the setback temperature on the OpenTherm Gateway.
The value you provide here will be used with the GPIO `home` (5) and `away` (6) modes.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `gateway_id` | no | The `gateway_id` as specified during configuration.
| `temperature` | no  | The setback temperature. Accepted values are `0.0` through `30.0`.

## Sensors

The following `sensor` entities will be created for each configured gateway. The `entity_id` of every sensor will have a suffix containing the data source (`boiler`, `gateway` or `thermostat`) and the `gateway_id` of the gateway to which it belongs. All `sensor` entities are disabled by default.
<p class='note'>
Not all boilers and thermostats properly support all OpenTherm features, so not all of the sensors will have useful values.
</p>

- **burner_hours**
  Boiler flame on time.

- **burner_starts**
  Number of burner starts.

- **ch_pump_hours**
  Central heating pump running time.

- **ch_pump_starts**
  Number of central heating pump starts.

- **ch_water_pressure**
  Central heating water pressure.

- **ch_water_temp**
  Central heating water temperature.

- **ch_water_temp_2**
  Central heating 2 water temperature.

- **control_setpoint**
  Central heating water target temperature.

- **control_setpoint_2**
  Central heating 2 water target temperature.

- **cooling_control**
  Cooling control signal value.

- **dhw_burner_hours**
  Hot water flame on time.

- **dhw_burner_starts**
  Number of hot water burner starts.

- **dhw_flow_rate**
  Hot water flow rate.

- **dhw_pump_hours**
  Hot water pump running time.

- **dhw_pump_starts**
  Number of hot water pump starts.

- **dhw_setpoint**
  Hot water target temperature.

- **dhw_temp**
  Hot water temperature.

- **dhw_temp_2**
  Hot water 2 temperature.

- **exhaust_temp**
  Boiler exhaust temperature.

- **master_memberid**
  Thermostat member ID.

- **master_ot_version**
  Thermostat OpenTherm protocol version.

- **master_product_type**
  Thermostat product type.

- **master_product_version**
  Thermostat product version.

- **max_ch_setpoint**
  Boiler maximum central heating water temperature.

- **oem_diag**
  OEM diagnostic information.

- **otgw_about**
  OpenTherm Gateway firmware version.

- **otgw_build**
  OpenTherm Gateway firmware build date and time.

- **otgw_clockmhz**
  OpenTherm Gateway firmware design clock speed.

- **otgw_dhw_ovrd**
  OpenTherm Gateway hot water override status.

- **otgw_gpio_a**
  OpenTherm Gateway GPIO port A operating mode.

- **otgw_gpio_b**
  OpenTherm Gateway GPIO port B operating mode.

- **otgw_led_a**
  OpenTherm Gateway LED A operating mode.

- **otgw_led_b**
  OpenTherm Gateway LED B operating mode.

- **otgw_led_c**
  OpenTherm Gateway LED C operating mode.

- **otgw_led_d**
  OpenTherm Gateway LED D operating mode.

- **otgw_led_e**
  OpenTherm Gateway LED E operating mode.

- **otgw_led_f**
  OpenTherm Gateway LED F operating mode.

- **otgw_mode**
  OpenTherm Gateway operating mode.

- **otgw_setback_temp**
  OpenTherm Gateway setback temperature for `away mode`.

- **otgw_setpoint_ovrd_mode**
  OpenTherm Gateway central heating setpoint override mode.

- **otgw_smart_pwr**
  OpenTherm Gateway smart power operating mode.

- **otgw_thermostat_detect**
  OpenTherm Gateway automatic thermostat detection status.

- **otgw_vref**
  OpenTherm Gateway voltage reference setting.

- **outside_temp**
  Outside temperature as reported in the OpenTherm protocol.

- **relative_mod_level**
  Relative modulation level.

- **return_water_temp**
  Boiler return water temperature.

- **room_setpoint**
  Room target temperature.

- **room_setpoint_2**
  Room 2 target temperature.

- **room_setpoint_ovrd**
  Room target temperature override value.

- **room_temp**
  Current room temperature.

- **slave_ch_max_setp**
  Maximum boiler supported central heating water target temperature.

- **slave_ch_min_setp**
  Minimum boiler supported central heating water target temperature.

- **slave_dhw_max_setp**
  Maximum boiler supported hot water target temperature.

- **slave_dhw_min_setp**
  Minimum boiler supported hot water target temperature.

- **slave_max_capacity**
  Maximum boiler capacity.

- **slave_max_relative_modulation**
  Maximum boiler supported relative modulation.

- **slave_memberid**
  Boiler member ID.

- **slave_min_mod_level**
  Minimum boiler supported modulation level.

- **slave_oem_fault**
  Boiler OEM fault indication.

- **slave_ot_version**
  Boiler OpenTherm protocol version.

- **slave_product_type**
  Boiler product type.

- **slave_product_version**
  Boiler product version.

- **solar_coll_temp**
  Solar collector temperature.

- **solar_storage_temp**
  Solar storage unit temperature.


## Binary Sensors

The following `binary_sensor` entities will be created for each configured gateway. The `entity_id` of every sensor will have a suffix containing the data source (`boiler`, `gateway` or `thermostat`) and the `gateway_id` of the gateway to which it belongs. All `binary_sensor` entities are disabled by default.
<p class='note'>
Not all boilers and thermostats properly support all OpenTherm features, so not all of the sensors will have useful values.
</p>

- **master_ch2_enabled**
  Thermostat requests central heating 2 on.

- **master_ch_enabled**
  Thermostat requests central heating on.

- **master_cooling_enabled**
  Thermostat requests cooling.

- **master_dhw_enabled**
  Thermostat requests hot water to be heated.

- **master_otc_enabled**
  Thermostat is using outside temperature correction.

- **otgw_gpio_a_state**
  OpenTherm Gateway GPIO A state.

- **otgw_gpio_b_state**
  OpenTherm Gateway GPIO B state.

- **otgw_ignore_transitions**
  OpenTherm Gateway ignores ripples in the signal during high/low transitions.

- **otgw_ovrd_high_byte**
  OpenTherm Gateway overrides high byte with message ID 100.

- **remote_rw_dhw**
  Boiler supports writing hot water setpoint.

- **remote_rw_max_ch**
  Boiler supports writing maximum central heating setpoint.

- **remote_transfer_dhw**
  Boiler supports reading hot water setpoint.

- **remote_transfer_max_ch**
  Boiler supports reading maximum central heating setpoint.

- **rovrd_auto_prio**
  Programmed room setpoint change takes priority over remote override setting.

- **rovrd_man_prio**
  Manual room setpoint change takes priority over remote override setting.

- **slave_air_pressure_fault**
  Boiler reports air pressure fault.

- **slave_ch2_active**
  Boiler reports central heating 2 active.

- **slave_ch2_present**
  Boiler has a central heating 2 circuit.

- **slave_ch_active**
  Boiler reports central heating active.

- **slave_control_type**
  Boiler control type ('off' is modulating, 'on' is on/off).

- **slave_cooling_active**
  Boiler reports cooling active.

- **slave_cooling_supported**
  Boiler supports cooling.

- **slave_dhw_active**
  Boiler reports hot water active.

- **slave_dhw_config**
  Boiler hot water mode ('off' is instantaneous or unspecified, 'on' is storage tank).

- **slave_dhw_present**
  Boiler reports hot water present.

- **slave_diagnostic_indication**
  Boiler diagnostic indication.

- **slave_fault_indication**
  Boiler fault indication.

- **slave_flame_on**
  Boiler reports flame on.

- **slave_gas_fault**
  Boiler reports gas fault.

- **slave_low_water_pressure**
  Boiler reports low water pressure.

- **slave_master_low_off_pump**
  Boiler supports low-off and pump control commands (this sensor is inverted, 'on' is not supported, 'off' is supported)

- **slave_remote_reset**
  Boiler reports 'lockout-reset' supported.

- **slave_service_required**
  Boiler reports service required.

- **slave_water_overtemp**
  Boiler reports water overtemperature.

## GPIO modes

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

## LED modes

Possible LED modes and their meaning are listed here:

* R. Receiving an OpenTherm message from the thermostat or boiler.
* X. Transmitting an OpenTherm message to the thermostat or boiler.
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
