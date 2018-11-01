---
layout: page
title: "LCN"
description: "Instructions on how to integrate LCN components with Home Assistant."
date: 2018-11-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lcn.png
ha_category: Hub
ha_release: 0.82
ha_iot_class: "Local Push"
---


The `lcn` integration for Home Assistant allows you to connect to [LCN](http://www.lcn.eu) hardware devices.

The component requires one unused license of the coupling software LCN-PCHK (version >2.8) and a LCN hardware coupler. Alternatively a LCN-PKE coupler can be used which offers two PCHK licenses.
With this setup sending and receiving commands to and from LCN modules is possible.


There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/components/binary_sensor.lcn)
- [Cover](/components/cover.lcn)
- [Sensor](/components/sensor.lcn)
- [Switch](/components/switch.lcn)
- [Light](/components/light.lcn)

<p class='note'>
  Please note: Besides the implemented platforms the `lcn` component offers a variety of [service calls](#services).
  These service calls cover functionalities of the LCN system which cannot be represented by the platform implementations.
  They are ideal to be used in automation scripts or for the `template` platforms.
</p>


## {% linkable_title Configuration %}

To use your LCN system in your installation, add the following lines to your `configuration.yaml` file.
You have to specify at least one ip/port with login credentials for a PCHK host.
Consider to store your credentials in a [secrets.yaml](/docs/configuration/secrets).


```yaml
lcn:
  connections:
    - name: myhome
      host: "192.168.2.41"
      port: 4114
      username: lcn
      password: lcn
```

{% configuration %}
connections:
  description: List of your connections
  required: true
  type: map
  keys:
    host:
      description: IP address of the LCN-PCHK host.
      type: string
    port:
      description: Port of the LCN-PCHK host.
      type: integer
    username:
      description: Login username for the LCN-PCHK host.
      type: string
    password:
      description: Login password for the LCN-PCHK host.
      type: string
    name:
      description: Optional connection identifier. If omited, the connections will be named consecutively as _pchk_, _pchk1_, _pchk2_, ...
      required: false
      default: pchk
      type: string
    sk_num_tries:
      description: Segment coupler scans. Increase this number if you have at least one segment coupler in your system.
      required: false
      default: 0
      type: integer
    dim_mode:
      description: "Dimming mode for connected modules. The operation mode is programmed into the LCN modules by the LCN-PRO software and depends on their firmware. If you experience unexpected dimming behavior, the connection is probably in the wrong operation mode. Possible values: _steps50_, _steps200_"
      requried: false
      default: steps50
      type: string
{% endconfiguration %}



## {% linkable_title LCN Addresses %}
LCN hardware devices connected to the LCN bus are called _modules_. LCN modules are addressed by their numeric id in the range (5..254).

Modules can be arranged in _segments_. Segments can be addressed by their numeric id (5..128) or 0 (= no segment exist) or 3 (= target all segments).

LCN Modules within the _same_ segment can be grouped by their group id (5..254) or 3 (= target all groups.)

The LCN component allow the connection to more than one hardware coupler. In this case it has to be specified which hardware coupler should be used for addressing the specified module.

Whenever the address of a module or a group has to be specified, it can be addressed using one of the following syntaxes:

Example for modules:
```
connid.s000.m007
connid.s0.m7
s0.m7
0.7
```

Example for groups:
```
connid.s000.g007
connid.s0.g7
s0.g7
0.g7
```

Leading zeroes in the segment id or module/group id can be omitted. If the `connection_id` is omitted, the first connection defined in the [configuration](#configuration) will be used.


## {% linkable_title LCN Constants %}
The platforms and service calls use several predefined constants as parameters.

#### {% linkable_title Ports %}

| Constant | Values |
| -------- | ------ |
| OUTPUT_PORT | `output1`, `output2`, `output3`, `output4` |
| RELAY_PORT | `relay1`, `relay2`, `relay3`, `relay4`, `relay5`, `relay6`, `relay7`, `relay8` |
| MOTOR_PORT | `motor1`, `motor2`, `motor3`, `motor4` |
| LED_PORT | `led1`, `led2`, `led3`, `led4`, `led5`, `led6`, `led7`, `led8`, `led9`, `led10`, `led11`, `led12` |
| LOGICOP_PORT | `logicop1`, `logicop2`, `logicop3`, `logicop4` |
| BINSENSOR_PORT | `binsensor1`, `binsensor2`, `binsensor3`, `binsensor4`, `binsensor5`, `binsensor6`, `binsensor7`, `binsensor8` |

#### {% linkable_title Variables and Units %}

| Constant | Values |
| -------- | ------ |
| VARIABLE | `var1`, `var2`, `var3`, `var4`, `var5`, `var6`, `var7`, `var8`, `var9`, `var10`, `var11`, `var12`, `tvar`, `r1var`, `r2var` |
| SETPOINT | `r1varsetpoint`, `r2varsetpoint` |
| THRESHOLD | `thrs1`, `thrs2`, `thrs3`, `thrs4`, `thrs5`, `thrs2_1`, `thrs2_2`, `thrs2_3`, `thrs2_4`, `thrs3_1`, `thrs3_2`, `thrs3_3`, `thrs3_4`, `thrs4_1`, `thrs4_2`, `thrs4_3`, `thrs4_4` |
| S0_INPUT | `s0input1`, `s0input2`, `s0input3`, `s0input4` |
| VAR_UNIT | `native`, `celsius`, `kelvin`, `fahrenheit`, `lux_t`, `lux_i`, `m/s`, `%`, `ppm`, `volt`, `ampere`, `degree` |
| TIME_UNIT | `seconds`, `minutes`, `hours`, `days` |
| RELVARREF | `current`, `prog` |

#### {% linkable_title States %}:

| Constant | Values |
| -------- | ------ |
| LED_STATE | `on`. `off`, `blink`, `flicker` |
| LOGICOP_STATE | `not`. `or`, `and` |
| SENDKEYCOMMANDS | `hit`, `make`, `break`, `dontsend` |

#### {% linkable_title Keys %}:

Whenever a key has to be provided, it is defined by a joint string consisting of the table identifier (`a`, `b`, `c`, `d`) and the corresponding key number.
Examples: `a1`, `a5`, `d8`.


## {% linkable_title Services %}

In order to directly interact with the LCN system, and invoke commands which are not covered by the implemented platforms, the following service calls can be used.
Refer to the (Services Calls)[/docs/scripts/service-calls] page for examples on how to use them. 

### {% linkable_title Service `output_abs` %}

Set absolute brightness of output port in percent.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `output` | No | Output port of module | [OUTPUT_PORT](#ports) | 
| `brightness` | Yes | Absolute brightness in percent | 0..100 | 
| `transition` | Yes | Transition (ramp) time in seconds | 0..486 | 


### {% linkable_title Service `output_rel` %}

Set relative brightness of output port in percent.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `output` | No | Output port of module | [OUTPUT_PORT](#ports) | 
| `brightness` | Yes | Relative brightness in percent | -100..100 | 
| `transition` | Yes | Transition (ramp) time in seconds | 0..486 | 


### {% linkable_title Service `output_toggle` %}

Toggle output port.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `output` | No | Output port of module | [OUTPUT_PORT](#ports) | 
| `transition` | Yes | Transition (ramp) time in seconds | 0..486 | 


### {% linkable_title Service `relays` %}

Set the relays status. The relays states are defined as a string with eight characters.
Each character represents the state change of a relay (1=on, 0=off, t=toggle, -=nochange).

Example states:  `t---001-`

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `state` | No | Relay states as string |


### {% linkable_title Service `led` %}

Set the led status.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `state` | No | Led state as string | [LED_STATE](#states) |


### {% linkable_title Service `var_abs` %}

Set the absolute value of a variable or setpoint.
If `value` is not defined, it is assumed to be 0.
If `unit_of_measurement` is not defined, it is assumed to be `native`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `variable` | No | Variable name | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units) |
| `value` | Yes | Variable value | _any positive number_ |
| `unit_of_measurement` | Yes | Variable unit | [VAR_UNIT](#variables-and-units) |

<p class='note'>
  Ensure that the LCN module is configured properly to provide acces to the defined variable.
  Otherwise the module might show unexpected behaviors or return error messages.
</p>


### {% linkable_title Service `var_rel` %}

Set the relative value of a variable or setpoint.
If `value` is not defined, it is assumed to be 0.
If `unit_of_measurement` is not defined, it is assumed to be `native`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `variable` | No | Variable name | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units), [THRESHOLD](#variables-and-units) |
| `value` | Yes | Variable value | _any positive or negative number_ |
| `unit_of_measurement` | Yes | Variable unit | [VAR_UNIT](#variables-and-units) |

<p class='note'>
  Ensure that the LCN module is configured properly to provide acces to the defined variable.
  Otherwise the module might show unexpected behavior or return error messages.
</p>


### {% linkable_title Service `var_reset` %}

Reset value of variable or setpoint.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `variable` | No | Variable name | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units) |

<p class='note'>
  Ensure that the LCN module is configured properly to provide acces to the defined variable.
  Otherwise the module might show unexpected behavior or return error messages.
</p>


### {% linkable_title Service `lock_regulator` %}

Locks a regulator setpoint.
If `state` is not defined, it is assumed to be `False`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `setpoint` | No | Setpoint name | [SETPOINT](#variables-and-units) |
| `state` | Yes | Setpoint name | [SETPOINT](#variables-and-units) |


### {% linkable_title Service `send_keys` %}

Send keys (which executes bound commands).
The keys attribute is a string with one or more key identifiers. Example: `a1a5d8`
If `state` is not defined, it is assumed to be `hit`.
The command allow the sending of keys immediately or deferred. For a deferred sendig the attributes `time` and `time_unit` have to be specified. For deferred sending the only key state allowed is `hit`.
If `time_unit` is not defined, it is assumed to be `seconds`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `keys` | No | Keys string |
| `state` | Yes | Keys state | [SENDKEYCOMMANDS](#states) |
| `time` | Yes | Deferred time | 0.. |
| `time_unit` | Yes | Time unit | [TIME_UNIT](#variables-and-units)


### {% linkable_title Service `lock_keys` %}

Locks keys.
If table is not defined, it is assumend to be table `a`.
The key lock states are defined as a string with eight characters. Each character represents the state change of a key lock (1=on, 0=off, t=toggle, -=nochange).
The command allows the locking of keys for a specified time period. For a time period the attributes `time` and `time_unit` have to be specified. For a time period only tabley `a` is allowed.
If `time_unit` is not defined, it is assumed to be `seconds`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `table` | Yes | Table with keys to lock |
| `state` | No | Key lock states as string | [SENDKEYCOMMANDS](#states) |
| `time` | Yes | Time period to lock | 0.. |
| `time_unit` | Yes | Time unit | [TIME_UNIT](#variables-and-units)


### {% linkable_title Service `dyn_text` %}

Send dynamic text to LCN-GTxD displays.
The displays support four rows for text messages.
Each row can be set independently and can store up to 60 characters (encoded in UTF-8).


| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `row` | No | Text row 1..4 |
| `text` | No | Text to send for the specified row |


### {% linkable_title Service `pck` %}

Send arbitrary PCK command. Only the command part of the PCK command has to be specified in the `pck` string.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `pck` | No | PCK command |
