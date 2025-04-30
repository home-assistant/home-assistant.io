---
title: Raspberry Pi Remote GPIO
description: Instructions on how to integrate the GPIO capability of a remote Raspberry Pi into Home Assistant.
ha_category:
  - Binary sensor
  - DIY
  - Switch
ha_release: 0.94
ha_iot_class: Local Push
ha_domain: remote_rpi_gpio
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `remote_rpi_gpio` {% term integration %} is the base for all related GPIO platforms in Home Assistant. For the platform configurations, please check their corresponding sections.

The remote Raspberry Pi, and the control computer where Home Assistant is running must be configured to be able to run `remote_rpi_gpio`, see [Configuring Remote GPIO](https://gpiozero.readthedocs.io/en/stable/remote_gpio.html) for more details. Unfortunately, this setup is not currently possible with remote, Raspberry Pi 5 hosts, [due to a lack of support in pigiod](https://github.com/joan2937/pigpio/issues/586).

Note that for virtual environments, you may need to set an environment variable when starting the environment to set the pin factory, for example:

`Environment = GPIOZERO_PIN_FACTORY=pigpio PIGPIO_ADDR=YOUR_RPi_IP_ADDRESS`

## Binary sensor

The `remote_rpi_gpio` binary sensor {% term integration %} allows you to read sensor values of the GPIOs of a remote [Raspberry Pi](https://www.raspberrypi.org/).

To use your remote Raspberry Pi's GPIO in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: remote_rpi_gpio
    host: IP_ADDRESS_OF_REMOTE_PI
    ports:
      11: PIR Office
      12: PIR Bedroom
```

{% configuration %}
host:
  description: IP Address of remote Raspberry Pi.
  required: true
  type: string
ports:
  description: List of used ports.
  required: true
  type: map
  keys:
    "port: name":
      description: The port numbers (BCM mode pin numbers) and corresponding names.
      required: true
      type: string
invert_logic:
  description: If `true`, inverts the output logic
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
pull_mode:
  description: >
    Type of internal pull resistor to use.
    Options are `UP` - pull-up resistor and `DOWN` - pull-down resistor.
    Pull-Up defaults to active LOW and Pull-down defaults to active HIGH. This can be adjusted with invert_logic
  required: false
  type: string
  default: "`UP`"
{% endconfiguration %}

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#J8_header_and_general_purpose_input-output_(GPIO)) about the Raspberry Pi.

## Switch

The `remote_rpi_gpio` switch platform allows you to control the GPIOs of a [Remote Raspberry Pi](https://www.raspberrypi.org/).

To use your remote Raspberry Pi's GPIO in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: remote_rpi_gpio
    host: IP_ADDRESS_OF_REMOTE_PI
    ports:
      11: Fan Office
      12: Light Desk
```

{% configuration %}
host:
  description: IP Address of remote Raspberry Pi.
  required: true
  type: string
ports:
  description: Array of used ports.
  required: true
  type: list
  keys:
    port:
      description: Port numbers and corresponding names (GPIO #).
      required: true
      type: [integer, string]
invert_logic:
  description: If true, inverts the output logic to ACTIVE LOW.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

For more details about the GPIO layout, visit the Wikipedia [article](https://en.wikipedia.org/wiki/Raspberry_Pi#J8_header_and_general_purpose_input-output_(GPIO)) about the Raspberry Pi.

{% note %}
Note that a pin managed by Home Assistant is expected to be exclusive to Home Assistant.
{% endnote %}

A common question is what does port refer to? This number is the actual GPIO #, not the pin #.
For example, if you have a relay connected to pin 11 its GPIO # is 17.

```yaml
# Example configuration.yaml entry
switch:
  - platform: remote_rpi_gpio
    host: 192.168.0.123
    ports:
      17: Speaker Relay
```

### Troubleshooting

If you receive an error such as `gpiozero.exc.BadPinFactory: Unable to load any default pin factory!` try changing the `GPIOZERO_PIN_FACTORY` environment variable from `pigpio` to `mock`, as this addresses a [known issue](https://forums.raspberrypi.com/viewtopic.php?p=1417922).
