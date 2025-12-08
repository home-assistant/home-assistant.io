---
title: NAD
description: Instructions on how to integrate NAD receivers into Home Assistant.
ha_category:
  - Media player
ha_release: 0.36
ha_iot_class: Local Polling
ha_domain: nad
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `nad` {% term integration %} allows you to control an [NAD receiver](https://nadelectronics.com/) through RS232, TCP and Telnet from Home Assistant.

Please note that the RS232 interface is only tested with the NAD T748v2, but it should work with other NAD receivers.
The Telnet interface has been tested with the NAD T787 and the NAD C658.

## Configuration

To add an NAD receiver to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry for RS232 configuration
media_player:
  - platform: nad
    serial_port: /dev/ttyUSB0
```

```yaml
# Example configuration.yaml entry for Telnet configuration
media_player:
  - platform: nad
    type: Telnet
    host: "IP_ADDRESS"
```

```yaml
# Example configuration.yaml entry for TCP configuration
media_player:
  - platform: nad
    type: TCP
    host: "IP_ADDRESS"
```

{% configuration %}
type:
  description: Type of communication. Valid types are `RS232`, `Telnet` or `TCP`
  required: false
  default: RS232
  type: string
serial_port:
  description: The serial port. (for `RS232` type only)
  required: false
  default: /dev/ttyUSB0
  type: string
host:
  description: The IP address of your amplifier. (for `TCP` and `Telnet` types)
  required: false
  type: string
port:
  description: The port number of the device. (for `Telnet` type only)
  required: false
  default: 53
  type: integer
name:
  description: Name of the device.
  required: false
  default: NAD Receiver
  type: string
min_volume:
  description: Minimum volume in dB to use with the slider.
  required: false
  default: -92
  type: integer
max_volume:
  description: Maximum volume in dB to use with the slider.
  required: false
  default: -20
  type: integer
sources:
  description: A list of mappings from source to source name. Valid sources are `1 to 12`. (for `RS232` and `Telnet` types)
  required: false
  type: [list, string]
volume_step:
  description: The amount in dB you want to increase the volume with when pressing volume up/down. (for `TCP` type only)
  required: false
  default: 4
  type: integer
{% endconfiguration %}

The `min_volume` and `max_volume` options are there to protect you against misclicks on the slider so you will not blow up your speakers when you go from -92dB to +20dB. You can still force higher or lower volumes than the values set by using the plus and minus buttons.

{% important %}
On Linux the user running Home Assistant needs `dialout` permissions to access the serial port.
This can be added to the user by doing `sudo usermod -a -G dialout <username>`.
Be aware that the user might need to logout and logon again to activate these permissions.
{% endimportant %}

An example of a full configuration:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: nad
    serial_port: /dev/ttyUSB0
    name: "NAD Receiver"
    min_volume: -60
    max_volume: -20
    sources:
      1: "Kodi"
      2: "TV"
```
