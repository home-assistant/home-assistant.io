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
ha_category:
  - Hub
  - Cover
  - Light
  - Sensor
  - Switch
ha_release: 0.85
ha_iot_class: Local Push
redirect_from:
  - /components/light.lcn/
  - /components/switch.lcn/
  - /components/cover.lcn/
---

The `lcn` integration for Home Assistant allows you to connect to [LCN](http://www.lcn.eu) hardware devices.

The component requires one unused license of the coupling software LCN-PCHK (version >2.8) and a LCN hardware coupler. Alternatively a LCN-PKE coupler can be used which offers two PCHK licenses.
With this setup sending and receiving commands to and from LCN modules is possible.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary_sensor)
- [Cover](#cover)
- [Light](#light)
- [Sensor](#sensor)
- [Switch](#switch)

## {% linkable_title Configuration %}

To use your LCN system in your installation, add the following lines to your `configuration.yaml` file.
You have to specify at least one ip/port with login credentials for a PCHK host.
Consider to store your credentials in a [secrets.yaml](/docs/configuration/secrets).

```yaml
lcn:
  connections:
    - name: myhome
      host: 192.168.2.41
      port: 4114
      username: lcn
      password: lcn

  binary_sensors:
    - name: Kitchen window
      address: myhome.s0.m7
      source: binsensor1

  covers:
    - name: Living room cover
      address: myhome.s0.m7
      motor: motor1

  lights:
    - name: Bedroom light
      address: myhome.s0.m7
      output: output1
      dimmable: true
      transition: 5

  sensors:
    - name: Temperature
      address: myhome.s0.m7
      source: var3
      unit_of_measuremnt: °C
  
  switches:
    - name: Sprinkler switch
      address: myhome.s0.m7
      output: relay1
```

{% configuration %}
connections:
  description: List of your connections.
  required: true
  type: map
  keys:
    host:
      description: IP address of the LCN-PCHK host.
      required: true
      type: string
    port:
      description: Port of the LCN-PCHK host.
      required: true
      type: integer
    username:
      description: Login username for the LCN-PCHK host.
      required: true
      type: string
    password:
      description: Login password for the LCN-PCHK host.
      required: true
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
      required: false
      default: steps50
      type: string

binary_sensors:
  description: List of your binary sensors.
  required: false
  type: map
  keys:
    name:
      description: "Name of the sensor."
      required: true
      type: string
    address:
      description: "[Address](/components/lcn#lcn-addresses) of the module/group."
      required: true
      type: string
    source:
      description: "Sensor source ([BINSENSOR](/components/lcn#ports), [SETPOINT](/components/lcn#variables-and-units), [KEYS](/components/lcn#keys))."
      required: true
      type: string

covers:
  description: List of your covers.
  required: false
  type: map
  keys:
    name:
      description: Name of the cover.
      required: true
      type: string
    address:
      description: "[Address](/components/lcn#lcn-addresses) of the module/group."
      required: true
      type: string
    motor:
      description: "Motor port ([MOTOR_PORT](/components/lcn#ports))."
      required: true
      type: string

lights:
  description: List of your lights.
  required: true
  type: map
  keys:
    name:
      description: Name of the light.
      required: true
      type: string
    address:
      description: "[Address](/components/lcn#lcn-addresses) of the module/group."
      required: true
      type: string
    output:
      description: "Light source ([OUTPUT_PORT](/components/lcn#ports), [RELAY_PORT](/components/lcn#ports))."
      required: true
      type: string
    dimmable:
      description: Enable the dimming feature for this light.
      required: false
      type: bool
      default: false
    transition:
      description: Transition (ramp) time in seconds.
      required: false
      type: int
      default: 0

sensors:
  description: List of your sensors.
  required: false
  type: map
  keys:
    name:
      description: "Name of the sensor."
      required: true
      type: string
    address:
      description: "[Address](/components/lcn#lcn-addresses) of the module/group."
      required: true
      type: string
    source:
      description: "Sensor source ([VARIABLE](/components/lcn#variables-and-units), [SETPOINT](/components/lcn#variables-and-units), [THRESHOLD](/components/lcn#variables-and-units), [S0_INPUT](/components/lcn#variables-and-units), [LED_PORT](/components/lcn#ports), [LOGICOP_PORT](/components/lcn#ports))."
      required: true
      type: string
    unit_of_measurement:
      description: "Measurement unit ([VAR_UNIT](/components/lcn#variables-and-units))."
      required: false
      type: string
      default: 'native'

switches:
  description: List of your switches.
  required: false
  type: map
  keys:
    name:
      description: "Name of the switch."
      required: true
      type: string
    address:
      description: "[Address](/components/lcn#lcn-addresses) of the module/group."
      required: true
      type: string
    output:
      description: "Switch source ([OUTPUT_PORT](/components/lcn#ports), [RELAY_PORT](/components/lcn#ports))."
      required: true
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

### {% linkable_title Ports %}

| Constant | Values |
| -------- | ------ |
| OUTPUT_PORT | `output1`, `output2`, `output3`, `output4` |
| RELAY_PORT | `relay1`, `relay2`, `relay3`, `relay4`, `relay5`, `relay6`, `relay7`, `relay8` |
| MOTOR_PORT | `motor1`, `motor2`, `motor3`, `motor4` |
| LED_PORT | `led1`, `led2`, `led3`, `led4`, `led5`, `led6`, `led7`, `led8`, `led9`, `led10`, `led11`, `led12` |
| LOGICOP_PORT | `logicop1`, `logicop2`, `logicop3`, `logicop4` |
| BINSENSOR_PORT | `binsensor1`, `binsensor2`, `binsensor3`, `binsensor4`, `binsensor5`, `binsensor6`, `binsensor7`, `binsensor8` |

The [MOTOR_PORT](/components/lcn#ports) values specify which hardware relay configuration will be used:

| Motor    | Relay on/off | Relay up/down |
| :------: | :----------: | :-----------: |
| `motor1` | `relay1`     | `relay2`      |
| `motor2` | `relay3`     | `relay4`      |
| `motor3` | `relay5`     | `relay6`      |
| `motor4` | `relay7`     | `relay8`      |

### {% linkable_title Variables and Units %}

| Constant | Values |
| -------- | ------ |
| VARIABLE | `var1`, `var2`, `var3`, `var4`, `var5`, `var6`, `var7`, `var8`, `var9`, `var10`, `var11`, `var12`, `tvar`, `r1var`, `r2var` |
| SETPOINT | `r1varsetpoint`, `r2varsetpoint` |
| THRESHOLD | `thrs1`, `thrs2`, `thrs3`, `thrs4`, `thrs5`, `thrs2_1`, `thrs2_2`, `thrs2_3`, `thrs2_4`, `thrs3_1`, `thrs3_2`, `thrs3_3`, `thrs3_4`, `thrs4_1`, `thrs4_2`, `thrs4_3`, `thrs4_4` |
| S0_INPUT | `s0input1`, `s0input2`, `s0input3`, `s0input4` |
| VAR_UNIT | `native`, `°C`, `°K`, `°F`, `lux_t`, `lux_i`, `m/s`, `%`, `ppm`, `volt`, `ampere`, `degree` |

### {% linkable_title States %}:

| Constant | Values |
| -------- | ------ |
| LED_STATE | `on`. `off`, `blink`, `flicker` |
| LOGICOP_STATE | `not`. `or`, `and` |

### {% linkable_title Keys %}:

Whenever a key has to be provided, it is defined by a joint string consisting of the table identifier (`a`, `b`, `c`, `d`) and the corresponding key number.
Examples: `a1`, `a5`, `d8`.

## {% linkable_title Platforms %}

### {% linkable_title Binary Sensor %}

The `lcn` binary sensor platform allows the monitoring of the following [LCN](http://www.lcn.eu) binary data sources:

- Binary hardware sensors
- Lock state of regulator setpoints
- Lock state of keys

The binary sensor can be used in automation scripts or in conjunction with `template` platforms.

### {% linkable_title Cover %}

The `lcn` cover platform allows the control of [LCN](http://www.lcn.eu) relays which have been configured as motor controllers.

### {% linkable_title Light %}

The `lcn` light platform allows the control of the following [LCN](http://www.lcn.eu) ports:

- (Dimmable) output ports
- Relays

### {% linkable_title Sensor %}

The `lcn` sensor platform allows the monitoring of the following [LCN](http://www.lcn.eu) data sources:

- Variables
- Regulator setpoints
- Thresholds
- S0 inputs
- LED states
- Logic operation states

The sensor can be used in automation scripts or in conjunction with `template` platforms.

<p class='note'>
  Ensure that the LCN module is configured properly to provide the requested value.
  Otherwise the module might show unexpected behavior or return error messages.
</p>

### {% linkable_title Switch %}

The `lcn` switch platform allows the control of the following [LCN](http://www.lcn.eu) ports:

- Output ports
- Relays
