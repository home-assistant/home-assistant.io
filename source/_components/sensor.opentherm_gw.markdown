---
layout: page
title: "OpenTherm Gateway Sensor"
description: "Expose internal data from the OpenTherm Gateway."
date: 2018-10-10 12:23
sidebar: true
comments: false
sharing: true
footer: true
logo: opentherm.png
ha_category: Sensor
ha_release: 0.81
ha_iot_class: "Local Push"
---

The `opentherm_gw` sensor platform is used to expose internal data from the [OpenTherm Gateway](http://otgw.tclcode.com/) in Home Assistant.

# {% linkable_title Configuration %}

Configuration of this platform is achieved through the [OpenTherm Gateway Hub](/components/opentherm_gw/) configuration.

# {% linkable_title Supported Variables %}
The following is a list of all supported variables, in alphabetical order, which can be exported as sensors. Note that not all boilers and thermostats properly support all variables, so the fact that a variable is listed here and published by your system does not necessarily mean that you will get useful data out of it. To see which variables are published in your situation, enable debug logging for the `opentherm_gw` component and look for the status updates.

Most variable names are self-explanatory if you keep in mind that `master` is your thermostat, `slave` is your boiler, `otgw` is your OpenTherm Gateway, `ch` stands for 'central heating' and `dhw` for 'domestic hot water'.
* `burner_hours`
* `burner_starts`
* `ch_pump_hours`
* `ch_pump_starts`
* `ch_water_pressure`
* `ch_water_temp`
* `ch_water_temp_2`
* `control_setpoint`
* `control_setpoint_2`
* `cooling_control`
* `dhw_burner_hours`
* `dhw_burner_starts`
* `dhw_flow_rate`
* `dhw_pump_hours`
* `dhw_pump_starts`
* `dhw_setpoint`
* `dhw_temp`
* `dhw_temp_2`
* `exhaust_temp`
* `master_memberid`
* `master_ot_version`
* `master_product_type`
* `master_product_version`
* `max_ch_setpoint`
* `oem_diag`
* `otgw_about`
* `otgw_build`
* `otgw_clockmhz`
* `otgw_dhw_ovrd`
* `otgw_gpio_a`
* `otgw_gpio_b`
* `otgw_led_a`
* `otgw_led_b`
* `otgw_led_c`
* `otgw_led_d`
* `otgw_led_e`
* `otgw_led_f`
* `otgw_mode`
* `otgw_setback_temp`
* `otgw_setpoint_ovrd_mode`
* `otgw_smart_pwr`
* `otgw_thermostat_detect`
* `otgw_vref`
* `outside_temp`
* `relative_mod_level`
* `return_water_temp`
* `room_setpoint`
* `room_setpoint_2`
* `room_setpoint_ovrd`
* `room_temp`
* `slave_ch_max_setp`
* `slave_ch_min_setp`
* `slave_dhw_max_setp`
* `slave_dhw_min_setp`
* `slave_max_capacity`
* `slave_max_relative_modulation`
* `slave_memberid`
* `slave_min_mod_level`
* `slave_oem_fault`
* `slave_ot_version`
* `slave_product_type`
* `slave_product_version`
* `solar_coll_temp`
* `solar_storage_temp`

<p class='note'>
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
</p>
