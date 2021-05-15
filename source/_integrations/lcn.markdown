---
title: LCN
description: Instructions on how to integrate LCN components with Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Cover
  - Light
  - Scene
  - Sensor
  - Switch
ha_release: 0.85
ha_iot_class: Local Push
ha_codeowners:
  - '@alengwenus'
ha_domain: lcn
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - scene
  - sensor
  - switch
---

The `lcn` integration for Home Assistant allows you to connect to [LCN](https://www.lcn.eu/) hardware devices.

The integration requires one unused license of the coupling software LCN-PCHK (version >2.8) and an LCN hardware coupler. Alternatively, an LCN-PKE coupler can be used which offers two PCHK licenses.
With this setup sending and receiving commands to and from LCN modules is possible.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Light](#light)
- [Scene](#scene)
- [Sensor](#sensor)
- [Switch](#switch)

<div class='note'>

  Please note: Besides the implemented platforms, the `lcn` integration offers a variety of [service calls](#services).
  These service calls cover functionalities of the LCN system, which cannot be represented by the platform implementations.
  They are ideal to be used in automation scripts or for the `template` platforms.

</div>

## Configuration

To use your LCN system in your installation, add the following lines to your `configuration.yaml` file.
You have to specify at least one IP/port with login credentials for a PCHK host.
Consider to store your credentials in a [`secrets.yaml`](/docs/configuration/secrets).

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

  climates:
    - name: Temperature bedroom
      address: myhome.s0.m7
      source: var1
      setpoint: r1varsetpoint
      min_temp: 17.
      max_temp: 30.
      lockable: true
      unit_of_measurement: °C

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

  scenes:
    - name: Romantic
      address: myhome.s0.m7
      register: 1
      scene: 4
      outputs: [output1, output2, relais1, relais3, relais4]
      transition: 5

  sensors:
    - name: Temperature
      address: myhome.s0.m7
      source: var3
      unit_of_measurement: °C

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
      description: Optional connection identifier. If omitted, the connections will be named consecutively as _pchk_, _pchk1_, _pchk2_, ...
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
      description: "[Address](#lcn-addresses) of the module/group."
      required: true
      type: string
    source:
      description: "Sensor source ([BINSENSOR](#ports), [SETPOINT](#variables-and-units), [KEYS](#keys))."
      required: true
      type: string

climates:
  description: List of your climate devices.
  required: false
  type: map
  keys:
    name:
      description: "Name of the climate controller."
      required: true
      type: string
    address:
      description: "[Address](#lcn-addresses) of the module/group."
      required: true
      type: string
    source:
      description: "Current temperature source ([VARIABLE](#variables-and-units))."
      required: true
      type: string
    setpoint:
      description: "Setpoint for target temperature ([VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units))."
      required: true
      type: string
    unit_of_measurement:
      description: "Measurement unit ([VAR_UNIT](#variables-and-units))."
      required: false
      type: string
      default: "celsius"
    min_temp:
      description: "Minimum target temperature."
      required: false
      type: float
      default: 7.
    max_temp:
      description: "Maximum target temperature."
      required: false
      type: float
      default: 35.
    lockable:
      description: "Climate control can be locked."
      required: false
      type: boolean
      default: false

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
      description: "[Address](#lcn-addresses) of the module/group."
      required: true
      type: string
    motor:
      description: "Motor port ([MOTOR_PORT](#ports))."
      required: true
      type: string
    reverse_time:
      description: "Reverse time ([REVERSE_TIME](#variables-and-units), see also [Cover](#cover))."
      required: false
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
      description: "[Address](#lcn-addresses) of the module/group."
      required: true
      type: string
    output:
      description: "Light source ([OUTPUT_PORT](#ports), [RELAY_PORT](#ports))."
      required: true
      type: string
    dimmable:
      description: Enable the dimming feature for this light.
      required: false
      type: boolean
      default: false
    transition:
      description: Transition (ramp) time in seconds.
      required: false
      type: integer
      default: 0

scenes:
  description: List of your scenes.
  required: false
  type: map
  keys:
    name:
      description: "Name of the scene."
      required: true
      type: string
    address:
      description: "[Address](#lcn-addresses) of the module/group."
      required: true
      type: string
    register:
      description: Number of scene register (0..9).
      required: true
      type: integer
    scene:
      description: Number of scene (0..9).
      required: true
      type: integer
    outputs:
      description: "List of ports ([OUTPUT_PORT](#ports), [RELAY_PORT](#ports))."
      required: false
      type: list
    transition:
      description: Transition (ramp) time in seconds.
      required: false
      type: integer
      default: None

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
      description: "[Address](#lcn-addresses) of the module/group."
      required: true
      type: string
    source:
      description: "Sensor source ([VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units), [THRESHOLD](#variables-and-units), [S0_INPUT](#variables-and-units), [LED_PORT](#ports), [LOGICOP_PORT](#ports))."
      required: true
      type: string
    unit_of_measurement:
      description: "Measurement unit ([VAR_UNIT](#variables-and-units))."
      required: false
      type: string
      default: "native"

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
      description: "[Address](#lcn-addresses) of the module/group."
      required: true
      type: string
    output:
      description: "Switch source ([OUTPUT_PORT](#ports), [RELAY_PORT](#ports))."
      required: true
      type: string
{% endconfiguration %}

## LCN Addresses

LCN hardware devices connected to the LCN bus are called _modules_. LCN modules are addressed by their numeric id in the range (5..254).

Modules can be arranged in _segments_. Segments can be addressed by their numeric id (5..128) or 0 (= no segment exist) or 3 (= target all segments).

LCN Modules within the _same_ segment can be grouped by their group id (5..254) or 3 (= target all groups.)

The LCN integration allows the connection to more than one hardware coupler. In this case, it has to be specified which hardware coupler should be used for addressing the specified module.

Whenever the address of a module or a group has to be specified, it can be addressed using one of the following syntaxes:

Example for modules:

```txt
connid.s000.m007
connid.s0.m7
s0.m7
0.7
```

Example for groups:

```txt
connid.s000.g007
connid.s0.g7
s0.g7
0.g7
```

Leading zeroes in the segment id or module/group id can be omitted. If the `connection_id` is omitted, the first connection defined in the [configuration](#configuration) will be used.

## LCN Constants

The platforms and service calls use several predefined constants as parameters.

### Ports

| Constant | Values |
| -------- | ------ |
| OUTPUT_PORT | `output1`, `output2`, `output3`, `output4` |
| RELAY_PORT | `relay1`, `relay2`, `relay3`, `relay4`, `relay5`, `relay6`, `relay7`, `relay8` |
| MOTOR_PORT | `motor1`, `motor2`, `motor3`, `motor4`, `outputs` |
| LED_PORT | `led1`, `led2`, `led3`, `led4`, `led5`, `led6`, `led7`, `led8`, `led9`, `led10`, `led11`, `led12` |
| LOGICOP_PORT | `logicop1`, `logicop2`, `logicop3`, `logicop4` |
| BINSENSOR_PORT | `binsensor1`, `binsensor2`, `binsensor3`, `binsensor4`, `binsensor5`, `binsensor6`, `binsensor7`, `binsensor8` |

The [MOTOR_PORT](#ports) values specify which hardware relay or outputs configuration will be used:

| Motor    | Relay on/off | Relay up/down |
| :------: | :----------: | :-----------: |
| `motor1` | `relay1`     | `relay2`      |
| `motor2` | `relay3`     | `relay4`      |
| `motor3` | `relay5`     | `relay6`      |
| `motor4` | `relay7`     | `relay8`      |

| Motor     | Output up | Output down |
| :-------: | :-------: | :---------: |
| `outputs` | `output1` | `output2`   |


### Variables and Units

| Constant | Values |
| -------- | ------ |
| VARIABLE | `var1`, `var2`, `var3`, `var4`, `var5`, `var6`, `var7`, `var8`, `var9`, `var10`, `var11`, `var12`, `tvar`, `r1var`, `r2var` |
| SETPOINT | `r1varsetpoint`, `r2varsetpoint` |
| THRESHOLD | `thrs1`, `thrs2`, `thrs3`, `thrs4`, `thrs5`, `thrs2_1`, `thrs2_2`, `thrs2_3`, `thrs2_4`, `thrs3_1`, `thrs3_2`, `thrs3_3`, `thrs3_4`, `thrs4_1`, `thrs4_2`, `thrs4_3`, `thrs4_4` |
| S0_INPUT | `s0input1`, `s0input2`, `s0input3`, `s0input4` |
| VAR_UNIT | `native`, `°C`, `°K`, `°F`, `lux_t`, `lux_i`, `m/s`, `%`, `ppm`, `volt`, `ampere`, `degree` |
| TIME_UNIT | `seconds`, `minutes`, `hours`, `days` |
| RELVARREF | `current`, `prog` |
| REVERSE_TIME | `rt70`, `rt600`, `rt1200` |

### States:

| Constant | Values |
| -------- | ------ |
| LED_STATE | `on`, `off`, `blink`, `flicker` |
| LOGICOP_STATE | `none`, `some`, `all` |
| KEY_STATE | `hit`, `make`, `break`, `dontsend` |

### Keys:

Whenever a key has to be provided, it is defined by a joint string consisting of the table identifier (`a`, `b`, `c`, `d`) and the corresponding key number.
Examples: `a1`, `a5`, `d8`.

## Platforms

### Binary Sensor

The `lcn` binary sensor platform allows the monitoring of the following [LCN](https://www.lcn.eu/) binary data sources:

- Binary hardware sensors
- Lock state of regulator setpoints
- Lock state of keys

The binary sensor can be used in automation scripts or in conjunction with `template` platforms.

### Climate

The `lcn` climate platform allows the control of the [LCN](https://www.lcn.eu/) climate regulators.
This platform depends on the correct configuration of the module's regulators, which has to be done in the LCN-PRO programming software.
You need to specify at least the variable for the current temperature and a setpoint variable for the target temperature.
If the control is set lockable, the regulator can be turned on/off.

<div class='note'>

If you intend to leave the regulation to Home Assistant, you should consider using the [Generic Thermostat](/integrations/generic_thermostat/) in conjunction with [LCN Sensor](#sensor) and [LCN Switch](#switch).

</div>

### Cover

The `lcn` cover platform allows the control of [LCN](https://www.lcn.eu/) relays and output ports which have been configured as motor controllers.

Only for the module with firmware earlier than 190C:<br>
The configuration allows the optional definition of reverse time. This is the time which is waited during the switching of the motor currents.
The reverse time should only be defined when using the [MOTOR_PORT](#ports) value `OUTPUTS`. For all other configuration, the reverse time has to be defined in the LCN Pro software.
For the reverse time, you may choose one of the following constants: `RT70` (70ms), `RT600` (600ms), `RT1200` (1,2s).

<p class='note'>
If you are using the module's output ports for motor control, ensure that you have configured the output ports as motor controllers in the LCN Pro software!
Otherwise, the output ports are not mutually interlocked and you run the risk of destroying the motor.
</p>


### Light

The `lcn` light platform allows the control of the following [LCN](https://www.lcn.eu/) ports:

- (Dimmable) output ports
- Relays

### Scene

The `lcn` scene platform allows the activation of previously programmed [LCN](https://www.lcn.eu/) scenes.

### Sensor

The `lcn` sensor platform allows the monitoring of the following [LCN](https://www.lcn.eu/) data sources:

- Variables
- Regulator setpoints
- Thresholds
- S0 inputs
- LED states
- Logic operation states

The sensor can be used in automation scripts or in conjunction with `template` platforms.

<div class='note'>
  Ensure that the LCN module is configured properly to provide the requested value.
  Otherwise, the module might show unexpected behavior or return error messages.
</div>

### Switch

The `lcn` switch platform allows the control of the following [LCN](https://www.lcn.eu/) ports:

- Output ports
- Relays

## Services

In order to directly interact with the LCN system, and invoke commands which are not covered by the implemented platforms, the following service calls can be used.
Refer to the (Services Calls)[/docs/scripts/service-calls] page for examples on how to use them.

### Service `output_abs`

Set absolute brightness of output port in percent.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `output` | No | Output port of module | [OUTPUT_PORT](#ports) |
| `brightness` | Yes | Absolute brightness in percent | 0..100 |
| `transition` | Yes | Transition (ramp) time in seconds | 0..486 |

Example:

```yaml
service: output_abs
data:
  address: myhome.0.7
  output: output1
  brightness: 100
  transition: 0
```

### Service `output_rel`

Set relative brightness of output port in percent.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `output` | No | Output port of module | [OUTPUT_PORT](#ports) |
| `brightness` | Yes | Relative brightness in percent | -100..100 |
| `transition` | Yes | Transition (ramp) time in seconds | 0..486 |

Example:

```yaml
service: output_rel
data:
  address: myhome.0.7
  output: output1
  brightness: 30
```

### Service `output_toggle`

Toggle output port.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `output` | No | Output port of module | [OUTPUT_PORT](#ports) |
| `transition` | Yes | Transition (ramp) time in seconds | 0..486 |

Example:

```yaml
service: output_toggle
data:
  address: myhome.0.7
  output: output1
  transition: 0
```

### Service `relays`

Set the relays status. The relays states are defined as a string with eight characters.
Each character represents the state change of a relay (1=on, 0=off, t=toggle, -=nochange).

Example states:  `t---001-`

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `state` | No | Relay states as string |

Example:

```yaml
service: relays
data:
  address: myhome.0.7
  state: t---001-
```

### Service `led`

Set the LED status.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `state` | No | LED state as string | [LED_STATE](#states) |

Example:

```yaml
service: led
data:
  address: myhome.0.7
  led: led6
  state: blink
```

### Service `var_abs`

Set the absolute value of a variable or setpoint.
If `value` is not defined, it is assumed to be 0.
If `unit_of_measurement` is not defined, it is assumed to be `native`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `variable` | No | Variable name | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units) |
| `value` | Yes | Variable value | _any positive number_ |
| `unit_of_measurement` | Yes | Variable unit | [VAR_UNIT](#variables-and-units) |

Example:

```yaml
service: var_abs
data:
  address: myhome.0.7
  variable: var1
  value: 75
  unit_of_measurement: %
```

<div class='note'>
  Ensure that the LCN module is configured properly to provide acces to the defined variable.
  Otherwise the module might show unexpected behaviors or return error messages.
</div>

### Service `var_rel`

Set the relative value of a variable or setpoint.
If `value` is not defined, it is assumed to be 0.
If `unit_of_measurement` is not defined, it is assumed to be `native`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `variable` | No | Variable name | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units), [THRESHOLD](#variables-and-units) |
| `value` | Yes | Variable value | _any positive or negative number_ |
| `unit_of_measurement` | Yes | Variable unit | [VAR_UNIT](#variables-and-units) |

Example:

```yaml
service: var_rel
data:
  address: myhome.0.7
  variable: var1
  value: 10
  unit_of_measurement: %
```

<div class='note'>
  Ensure that the LCN module is configured properly to provide access to the defined variable.
  Otherwise the module might show unexpected behavior or return error messages.
</div>

### Service `var_reset`

Reset value of variable or setpoint.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `variable` | No | Variable name | [VARIABLE](#variables-and-units), [SETPOINT](#variables-and-units) |

Example:

```yaml
service: var_reset:
data:
  address: myhome.0.7
  variable: var1
```

<div class='note'>
  Ensure that the LCN module is configured properly to provide access to the defined variable.
  Otherwise the module might show unexpected behavior or return error messages.
</div>

### Service `lock_regulator`

Locks a regulator setpoint.
If `state` is not defined, it is assumed to be `False`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `setpoint` | No | Setpoint name | [SETPOINT](#variables-and-units) |
| `state` | Yes | Lock state | true, false |

Example:

```yaml
service: lock_regulator
data:
  address: myhome.0.7
  setpoint: r1varsetpoint
  state: true
```

### Service `send_keys`

Send keys (which executes bound commands).
The keys attribute is a string with one or more key identifiers. Example: `a1a5d8`
If `state` is not defined, it is assumed to be `hit`.
The command allows the sending of keys immediately or deferred. For a deferred sending the attributes `time` and `time_unit` have to be specified. For deferred sending, the only key state allowed is `hit`.
If `time_unit` is not defined, it is assumed to be `seconds`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `keys` | No | Keys string |
| `state` | Yes | Keys state | [KEY_STATE](#states) |
| `time` | Yes | Deferred time | 0.. |
| `time_unit` | Yes | Time unit | [TIME_UNIT](#variables-and-units)

Examples:

Send keys immediately:
```yaml
service: send_keys
data:
  address: myhome.0.7
  keys: a1a5d8
  state: hit
```

Send keys deferred:
```yaml
service: send_keys
data:
  address: myhome.0.7
  keys: a1a5d8
  time: 5
  time_unit: s
```

### Service `lock_keys`

Locks keys.
If the table is not defined, it is assumed to be table `a`.
The key lock states are defined as a string with eight characters. Each character represents the state change of a key lock (1=on, 0=off, t=toggle, -=nochange).
The command allows the locking of keys for a specified time period. For a time period, the attributes `time` and `time_unit` have to be specified. For a time period, only table `a` is allowed.
If `time_unit` is not defined, it is assumed to be `seconds`.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `table` | Yes | Table with keys to lock |
| `state` | No | Key lock states as string | [KEY_STATE](#states) |
| `time` | Yes | Time period to lock | 0.. |
| `time_unit` | Yes | Time unit | [TIME_UNIT](#variables-and-units)

Examples:

Lock keys forever:
```yaml
service: lock_keys
data:
  address: myhome.0.7
  table: a
  state: 1---t0--
```

Lock keys for a specified time period:
```yaml
service: lock_keys
data:
  address: myhome.0.7
  state: 1---t0--
  time: 10
  time_unit: s
```

### Service `dyn_text`

Send dynamic text to LCN-GTxD displays.
The displays support four rows for text messages.
Each row can be set independently and can store up to 60 characters (encoded in UTF-8).


| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `row` | No | Text row 1..4 |
| `text` | No | Text to send for the specified row |

Example:

```yaml
service: dyn_text
data:
  address: myhome.0.7
  row: 1
  text: "text in row 1"
```

### Service `pck`

Send arbitrary PCK command. Only the command part of the PCK command has to be specified in the `pck` string.

| Service data attribute | Optional | Description  | Values |
| ---------------------- | -------- | -----------  | ------ |
| `address` | No | [LCN address](#lcn-addresses) |
| `pck` | No | PCK command |

Example:

```yaml
service: pck
data:
  address: myhome.0.7
  pck: PIN4
```
