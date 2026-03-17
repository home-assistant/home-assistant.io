---
title: Pilight
description: Instructions on how to setup Pilight within Home Assistant.
ha_category:
  - Binary sensor
  - DIY
  - Sensor
  - Switch
ha_release: 0.26
ha_iot_class: Local Push
ha_domain: pilight
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[Pilight](https://www.pilight.org/) is a modular and open source solution to communicate with 433 MHz devices and runs on various small form factor computers. A lot of common [protocols](https://manual.pilight.org/protocols/) are already available.

This pilight hub connects to the [pilight-daemon](https://manual.pilight.org/programs/daemon.html) via a socket connection to receive and send codes. Thus Home Assistant does not have to run on the computer in charge of the RF communication.

The received and supported RF codes are put on the event bus of Home Assistant and are therefore directly usable by other integrations (e.g., automation). Additionally a send action is provided to send RF codes.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Sensor](#sensor)
- [Switch](#switch)
- [Light](#light)

## Configuration

To integrate pilight into Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
pilight:
```

{% configuration %}
host:
  description: The IP address of the computer running the pilight-daemon, e.g., 192.168.1.32.
  required: false
  default: 127.0.0.1
  type: string
port:
  description: "The network port to connect to, see also: (https://manual.pilight.org/development/socket/)."
  required: false
  default: 5001
  type: integer
send_delay:
  description: You can define a send delay as a fraction of seconds if you experience transmission problems when you try to switch multiple switches at once. This can happen when you use a [pilight USB Nano](https://github.com/pilight/pilight-usb-nano) as hardware and switches a whole group of multiple switches on or off. Tested values are between 0.3 and 0.8 seconds depending on the hardware.
  required: false
  default: 0.0
  type: float
whitelist:
  description: You can define a whitelist to prevent that too many unwanted RF codes (e.g., the neighbors weather station) are put on your HA event bus. All defined subsections have to be matched. A subsection is matched if one of the items are true.
  required: false
  type: string
{% endconfiguration %}

In this example only received RF codes using a daycom or Intertechno protocol are put on the event bus and only when the device id is 42. For more possible settings please look at the receiver section of the pilight [API](https://manual.pilight.org/development/).

A full configuration sample could look like the sample below:

```yaml
# Example configuration.yaml entry
pilight:
  host: 127.0.0.1
  port: 5000
  send_delay: 0.4
  whitelist:  # optional
    protocol:
      - daycom
      - intertechno
    id:
      - 42
```

## Binary sensor

The `pilight` binary sensor platform implements the [pilight hub](#configuration) binary sensor functionality. There are two types of Pilight binary sensor configuration: a normal sensor which sends the on and off cyclical state and a trigger sensor which sends only a trigger when an event happened (for example lots of cheap PIR motion detectors).

To enable a Pilight binary sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pilight
    variable: "state"
```

{% configuration %}
variable:
  description: The variable name in the data stream that defines the sensor value.
  required: true
  type: string
payload:
  description: >
    Message payload identifiers.
    Only if all identifiers are matched the sensor value is set.
  required: true
  type: string
name:
  description: Name of the sensor.
  required: false
  type: string
payload_on:
  description: "Variable `on` value. The integration will recognize this as logical '1'."
  required: false
  type: [string, float, integer]
payload_off:
  description: "Variable `off` value. The integration will recognize this as logical '0'."
  required: false
  type: [string, float, integer]
disarm_after_trigger:
  description: Configure sensor as trigger type.
  required: false
  type: boolean
  default: false
reset_delay_sec:
  description: >
    Seconds before the sensor is disarmed if
    `disarm_after_trigger` is set to true.
  required: false
  type: integer
  default: 30
{% endconfiguration %}

### Full example

A full configuration example could look like this:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: pilight
    name: "Motion"
    variable: "state"
    payload:
      unitcode: 371399
    payload_on: "closed"
    disarm_after_trigger: true
    reset_delay_sec: 30
```

## Sensor

This `pilight` sensor platform for 433 MHz devices uses a value in the message payload as the sensor value. Unique identifiers (e.g., _uuid_) can be set to distinguish between multiple pilight devices. To use a pilight sensor the pilight Home Assistant hub has to be set up.

To use your sensor via pilight, make sure it is [supported](https://manual.pilight.org/protocols/index.html) and add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pilight
    variable: temperature
    payload:
      uuid: "0000-b8-27-eb-f447d3"
```

{% configuration %}
variable:
  description: The variable name in the data stream that defines the sensor value.
  required: true
  type: string
payload:
  description: Message payload identifiers. Only if all identifiers are matched the sensor value is set.
  required: true
  type: string
name:
  description: Name of the sensor.
  required: false
  default: Pilight Sensor
  type: string
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
{% endconfiguration %}

### Example: Weather station

This section shows a real life example how to use values of a weather station.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pilight
    name: "Temperature"
    variable: "temperature"
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: "°C"
  - platform: pilight
    name: "Humidity"
    variable: "humidity"
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: "%"
  - platform: pilight
    name: "Battery"
    variable: "battery"
    payload:
      uuid: 0000-b8-27-eb-f1f72e
    unit_of_measurement: "%"
```

## Switch

The `pilight` switch platform is issuing 433 MHz commands using [pilight](https://www.pilight.org/) to turn a 433 MHz device on or off. The Pilight Home Assistant hub has to be set up.

Additionally, RF commands can be defined that trigger this switch to turn on and off. This allows you to also use the remote shipped with your 433 MHz switch without mixing up the Home Assistant states. You can even define several on/off commands, thus several RF remotes to toggle this switch.

To be really sure that Home Assistant knows the actual state of your device it is recommended to use the RF remote with codes unknown to any of your 433 MHz devices. Thus you use the remote to trigger this switch to send the correct RF code to the device.

To define a Pilight switch, add the following lines to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
switch:
  - platform: pilight
    switches:
      Bed light:
        on_code:
          protocol: intertechno_old
          'on': 1
        off_code:
          protocol: intertechno_old
          'off': 1
```

{% configuration %}
switches:
  description: The list that contains all command switches.
  required: true
  type: string
  keys:
    entry:
      description: Name of the command switch. Multiple entries are possible.
      required: true
      type: list
      keys:
        on_code:
          description: The code to turn the device on.
          required: true
          type: list
        off_code:
          description: The code to turn the device off.
          required: true
          type: list
        on_code_receive:
          description: If given, this command will turn the switch on if it is received by pilight.
          required: false
          type: list
        off_code_receive:
          description: If given, this command will turn the switch off if it is received by pilight.
          required: false
          type: list
{% endconfiguration %}

Variables for the different codes (`on_code` and `off_code`):

- **protocol** (*Required*): Protocol to use, e.g., `intertechno_old` or `daycom`.
- **systemcode** (*Optional*): The systemcode of the device.
- **unit** (*Optional*): The unit to use (is equivalent to `pilight-send --unit`).
- **unitcode** (*Optional*): The unitcode to use (is equivalent to `pilight-send --unitcode`).
- **id** (*Optional*): ID of the device
- **state** (*Optional*): `'on'` or `'off'` has to be in apostrophes to be parsed correctly.
- **'off'** (*Optional*): `1` or `0`
- **'on'** (*Optional*): `1` or `0`

For possible code entries, look at the [pilight API](https://manual.pilight.org/development/). All commands allowed by [pilight-send](https://manual.pilight.org/programs/send.html) can be used. Which means that if, for a certain protocol, there are different parameters used, you should be able to replace the variables above by the proper ones required by the specific protocol. When using the `elro_800_switch` or `mumbi` protocol, for example, you will have to replace the variable `unit` with `unitcode` or there will be errors occurring.

Variables for the different receive codes (`on_code_receive` and `off_code_receive`):

- **echo** (*Optional*) Set to `true` if the on-/off-code should be sent if the given code was received.

This is useful if you have paired your sender directly with the receiver to prevent sending the signal twice.

### Examples

```yaml
switch:
  - platform: pilight
    switches:
      Bed light:
        on_code:
          protocol: intertechno_old
          unit: 3
          id: 4
          'on': 1
        off_code:
          protocol: intertechno_old
          unit: 3
          id: 4
          'off': 1
        on_code_receive:
          protocol: daycom
          systemcode: 14462
          unit: 6
          id: 34
          state: "on"
        off_code_receive:
          protocol: daycom
          systemcode: 14462
          unit: 6
          id: 34
          state: "off"
```

## Light

Pilight dimmer devices, which can have different brightness values, can be used as a light. 
The configuration parameters are the same for dimmers and switches, but dimmers support a minimum and maximum dimming level.

The `dimlevel_min` and `dimlevel_max` settings are to be set in the range of `0` to `15`, as used by pilight. Any dimming performed by Home Assistant (most likely in a `0` to `100` range) will be converted as a percentage of the available configured range in Pilight.

{% configuration %}
lights:
  description: The list that contains all command lights.
  required: true
  type: string
  keys:
    entry:
      description: Name of the command light, which are the same like for switches. Multiple entries are possible.
      required: true
      type: list
{% endconfiguration %}

### Example

```yaml
light:
  - platform: pilight
    lights:
      test2:
        dimlevel_min: 2
        dimlevel_max: 14
        on_code:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          'on': 1
        off_code:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          'off': 1
        on_code_receive:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          state: "on"
        off_code_receive:
          protocol: kaku_dimmer
          id: 23298822
          unit: 10
          state: "off"
```

## Troubleshooting

- A list of tested RF transceiver hardware is available [here](https://manual.pilight.org/electronics/). This might be useful before buying.
- Sending commands is simple when the protocol is known by pilight, but receiving commands can be rather difficult. It can happen that the code is not correctly recognized due to different timings in the sending hardware or the RF receiver. If this happens follow these steps:

1. [Install](https://manual.pilight.org/installation.html) pilight from source (do not worry that is very easy) and only activate the protocols you are expecting in the pop up menu. This reduces false positives.
2. Check the real timings of your device + RF receiver by running `pilight-debug`. Remember the `pulslen` parameter.
3. Go to the `libs/pilight/protocols/433.92` subfolder of the pilight source code and open the .c file of your protocol. Search for `MIN_PULSE_LENGTH`, `MAX_PULSE_LENGTH ` and `AVG_PULSE_LENGTH`. Change the pulse lengths to match your measured one. Recompile and install pilight by re-running `$ sudo ./setup.sh`.
