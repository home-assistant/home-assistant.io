---
title: PiFace Digital I/O (PFIO)
description: Instructions on how to integrate the PiFace Digital I/O module into Home Assistant.
ha_category:
  - DIY
  - Binary Sensor
  - Switch
ha_release: 0.45
ha_iot_class: Local Push
ha_domain: rpi_pfio
ha_platforms:
  - binary_sensor
  - switch
---

The `rpi_pfio` integration is the base for all related [PiFace Digital I/O (PFIO)](http://www.piface.org.uk/) platforms in Home Assistant. There is no setup needed for the integration itself; for the platforms, please check their corresponding pages.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Switch](#switch)

Set the jumpers on the PiFace board for address 0 (JP1: 1-2, JP2: 1-2).

## Using with the Home Assistant Operating System

Note that the PiFace Digital 2 uses the Raspberry Pi SPI port, which is disabled by default when using the [Home Assistant Operating System](https://github.com/home-assistant/hassos).
You must mount the SD card on another computer and access the boot partition on the card. Edit the `config.txt` file and add the line `dtparam=spi=on` to the end.

This should enable SPI when the Home Assistant Operating System is booted to access the PiFace Digital 2 board.

## Binary Sensor

The `rpi_pfio` binary sensor platform allows you to read sensor values of the [PiFace Digital I/O](http://www.piface.org.uk/products/piface_digital/) .

To use your PiFace Digital I/O module in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rpi_pfio
    ports:
      0:
        name: PIR Office
        invert_logic: true
      1:
        name: Doorbell
        settle_time: 50
```

{% configuration %}
ports:
  description: List of used ports.
  required: true
  type: map
  keys:
    num:
      description: The port number.
      required: true
      type: map
      keys:
        name:
          description: The port name.
          required: true
          type: string
        settle_time:
          description: The time in milliseconds for port debouncing.
          required: false
          type: integer
          default: 20
        invert_logic:
          description: If `true`, inverts the output logic to ACTIVE LOW.
          required: false
          type: boolean
          default: "`false` (ACTIVE HIGH)"
{% endconfiguration %}

## Switch

The `rpi_pfio` switch platform allows you to control the [PiFace Digital I/O](http://www.piface.org.uk/products/piface_digital/) module.

To use your PiFace Digital I/O module in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_pfio
    ports:
      0:
        name: Doorlock
        invert_logic: true
      1:
        name: Light Desk
```

{% configuration %}
ports:
  description: Array of used ports.
  required: true
  type: list
  keys:
    num:
      description: Port number.
      required: true
      type: list
      keys:
        name:
          description: Port name.
          required: true
          type: string
        invert_logic:
          description: If true, inverts the output logic to ACTIVE LOW.
          required: false
          default: false
          type: boolean
{% endconfiguration %}
