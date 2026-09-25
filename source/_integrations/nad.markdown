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

The **NAD** {% term integration %} allows you to control an [NAD receiver](https://nadelectronics.com/) through RS232, TCP and Telnet from Home Assistant.

The RS232 interface is only tested with the NAD T748v2, but it should work with other NAD receivers.
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
  description: "Maps receiver source identifiers to names displayed in Home Assistant. Identifiers can be integers from `1` to `12`, or nonempty strings supported by your receiver, such as `OPT 1`, `OPT 2`, and `COAX 1`. Applies to `RS232` and `Telnet` connections."
  required: false
  type: map
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
Be aware that the user might need to log out and log on again to activate these permissions.
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

### Named sources

If your NAD receiver uses named sources instead of numeric identifiers, use the exact spelling, capitalization, and spacing expected by your receiver:

```yaml
# Example configuration.yaml entry for named sources
media_player:
  - platform: nad
    serial_port: /dev/ttyUSB0
    name: "NAD C390DD"
    sources:
      "OPT 1": "Kodi"
      "OPT 2": "TV"
      "COAX 1": "Nintendo"
```

Numeric source identifiers must be unquoted YAML integers, such as `2`, rather than strings such as `"2"`.

### Finding your source identifiers

For RS232 and Telnet connections, you can use debug logging to find the source identifiers reported by your receiver. Set up the NAD integration with your connection settings first. You can omit `sources` while finding the identifiers.

1. Add the following to your `configuration.yaml` file. If you already have a `logger:` section, merge these entries into its `logs:` mapping instead of adding another `logger:` section. Keep your other logging settings.

   ```yaml
   logger:
     logs:
       homeassistant.components.nad: debug
       nad_receiver: debug
   ```

2. [Restart Home Assistant](/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the logging settings.
3. Turn on your receiver. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and select **Home Assistant Core**. Enable **Show raw logs** to view the full log output.
4. Change the input using your receiver's remote control or front panel. Wait for Home Assistant's next poll, then look for a message like this:

   ```text
   [nad_receiver] sent: 'Main.Source?' reply: 'Main.Source=OPT 1'
   ```

5. Use the value after `Main.Source=` in the reply as the key in your `sources` mapping. For this example, use `"OPT 1"` and choose a display name, such as `"TV"`. If the reply is `Main.Source=2`, use the unquoted integer `2`. Repeat for each input you want to configure.
6. After updating `sources`, remove the temporary debug entries or restore their previous logging levels. Restart Home Assistant to apply the source mapping and logging changes.
