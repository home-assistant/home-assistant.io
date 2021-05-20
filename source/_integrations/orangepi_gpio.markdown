---
title: Orange Pi GPIO
description: Instructions on how to integrate the GPIO capability of a Orange Pi into Home Assistant.
ha_category:
  - DIY
  - Binary Sensor
ha_release: 0.93
ha_iot_class: Local Push
ha_codeowners:
  - '@pascallj'
ha_domain: orangepi_gpio
ha_platforms:
  - binary_sensor
---

The `orangepi_gpio` integration is the base for all related GPIO platforms in Home Assistant. There is no setup needed for the integration itself, for the platforms please check their corresponding pages.

This integration provides the following platforms:

- Binary sensor: The `orangepi_gpio` binary sensor platform allows you to read sensor values of the GPIOs of your Orange Pi or NanoPi.

## Configuration

To use your Orange Pi's GPIO in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: orangepi_gpio
    pin_mode: pc
    ports:
      11: PIR Office
      12: PIR Bedroom
```

{% configuration %}
pin_mode:
  description: Type of pin mode to use. This depends on which device you are actually using ([Pin modes](#pin-modes)).
  required: true
  type: string
ports:
  description: List of used ports.
  required: true
  type: map
  keys:
    "port: name":
      description: The port numbers (physical pin numbers) and corresponding names.
      required: true
      type: string
invert_logic:
  description: If `true`, inverts the output logic to ACTIVE LOW.
  required: false
  type: boolean
  default: "`false` (ACTIVE HIGH)"
{% endconfiguration %}

Compared to the [Raspberry Pi GPIO](/integrations/rpi_gpio/) component, this integration does not support pull-up resistors or port debouncing. Use external pull-ups and external port-debouncing.

## Pin modes

As this platform supports different types of GPIO pinouts for difference Orange Pi or Nano Pi devices, we use the `pin_mode` value to specify which one to use. Enabled values are:

| Value | Description |
| ----- | ----------- |
| `lite` | Supports the Orange Pi Lite |
| `lite2` | Supports the Orange Pi Lite 2 |
| `one` | Supports the Orange Pi One |
| `oneplus` | Supports the Orange Pi One Plus |
| `pc` | Supports the Orange Pi PC |
| `pc2` | Supports the Orange Pi PC 2 |
| `pcplus` | Supports the Orange Pi PC Plus |
| `pi3` | Supports the Orange Pi 3 |
| `plus2e` | Supports the Orange Pi Plus 2E |
| `prime` | Supports the Orange Pi Prime |
| `r1` | Supports the Orange Pi R1 |
| `winplus` | Supports the Orange Pi WinPlus |
| `zero` | Supports the Orange Pi Zero |
| `zeroplus` | Supports the Orange Pi Zero Plus |
| `zeroplus2` | Supports the Orange Pi Zero Plus 2 |
| `duo` | Supports the NanoPi Duo |
| `neocore2` | Supports the NanoPi Neocore 2 |

## Additional steps

This integration uses the `SYSFS` filesystem to get control of the GPIOs. Therefore an operating system with `CONFIG_GPIO_SYSFS` is required. As far as I know, most out-of-the-box distributions still enable this by default.

As of Linux 4.8 sysfs-gpio is marked as obsolete. However as of today, the alternative GPIO character device is not widely used. Therefore we will use this until the new character device is more widely supported.

Normally the `/sys/class/gpio` path is owned by root, so Home Assistant does not have access. As we don't want to run Home Assistant as root, we will add the group `gpio` to have control over this path. I will assume you added the `homeassistant` user already to the `gpio` group as recommended in the [Manual installation guide](/docs/installation/raspberry-pi/)

Create a new file in `/etc/udev/rules.d/` named `10-gpio.rules` with the following contents:

```txt
SUBSYSTEM=="gpio*", PROGRAM="/bin/sh -c 'find -L /sys/class/gpio/ -maxdepth 2 -exec chown root:gpio {} \; -exec chmod 770 {} \; || true'"
```

Home Assistant will now be able to control your GPIO pins.

## Limitations

This integration uses interrupts to catch changes on your pins. However, it depends on the Allwinner chipset which pin banks support external interrupts. There is also a great difference between Orange Pi models which pins are routed to the GPIO connector. Therefore it greatly differs between devices which pins you can use for your sensors.

You can find the pinouts of all the supported Orange Pi devices [here](https://pascalroeleven.nl/2020/04/13/orange-pi-gpio-pinouts/). The pinouts for the [NanoPi Duo](http://wiki.friendlyarm.com/wiki/index.php/NanoPi_Duo) and [NanoPi NEO Core2](http://wiki.friendlyarm.com/wiki/index.php/NanoPi_NEO_Core2) can be found on the [FriendlyARM wiki](http://wiki.friendlyarm.com/). For example: If a pin is named PA01, the pin bank is PA. If this pin bank is in the following table after your chipset, this particular pin is supported.

| Chipset | Pin banks which support external interrupts |
| ------- | ------------------------------------------- |
| H2+ | PA, PG, PL |
| H3 | PA, PG, PL |
| H5 | PA, PF, PG, PL |
| H6 | PF, PG, PH, PL, PM |
| A64 | PB, PG, PH, PL |

In the table below you can see the number of usable pins for sensors per device.

| Device | Usable pins |
| ----- | ----------- |
| H2+ (R1, Zero) | 17/17 |
| H3 (Lite, One, PC, PC Plus, Plus 2E) | 21/28 |
| H5 (Zero Plus) | 17/17 |
| H5 (Zero Plus 2) | 15/17 |
| H5 (PC 2) | 22/28 |
| H5 (Prime) | 17/28 |
| H6 (Lite 2, One Plus) | 3/17 |
| H6 (PI 3) | 8/17 |
| A64 (Win Plus) | 18/28 |
