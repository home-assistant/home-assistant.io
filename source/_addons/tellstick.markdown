---
title: "TellStick"
description: "Telldus TellStick service enabler and tools."
---

Setting up the [Tellstick](http://telldus.com) service and tools contained in the [telldus-core](http://developer.telldus.com/) package and adding configuration to enable Tellstick and Tellstick Duo to work on your Hass.io.

To use this add-on, you first install it from the list of Built-in add-ons in Hass.io.
After installation you are presented with a default and example configuration, to alter this you must follow both the JSON format and also be aligned with the [valid parameters for Tellstick configuration file (tellstick.conf)](http://developer.telldus.com/wiki/TellStick_conf).

After any changes have been made to the configuration, you need to restart the add-on for the changes to take effect.

You will need to add internal communication details to `configuration.yaml` to enable the integration from Hass.io and the add-on.

```yaml
# Example configuration.yaml entry
tellstick:
    host: core-tellstick
    port: [50800, 50801]
```

To add [lights](/integrations/tellstick#light), [sensors](/integrations/tellstick#sensor) and [switches](/integrations/tellstick#switch) you follow the guidelines for each type individually that is [described for Home Assistant](/integrations/tellstick/)

The add-on will also enable you to interact with the `tdtool` via a Home Assistant services call, see example below for self-learning device.

## Examples

Example for adding more devices in the add-on configuration (note the comma separator between devices):

```json
{
  "devices": [
    {
      "id": 1,
      "name": "Outdoor light",
      "protocol": "everflourish",
      "model": "selflearning-switch",
      "house": "A",
      "unit": "1"
    },
    {
      "id": 2,
      "name": "Hallway dimmer",
      "protocol": "risingsun",
      "model": "selflearning-dimmer",
      "house": "A",
      "unit": "2"
    }
  ]
}
```

{% configuration %}
id:
  description: A number and must be unique for each device.
  required: true
  type: integer
name:
  description: A name for easy identification of the device.
  required: true
  type: string
protocol:
  description: This is the protocol the device uses. More on the different protocols later down.
  required: true
  type: string
model:
  description: The model parameter is only used by some protocols where there exists different types of devices using the same protocol. This can be dimmers versus non-dimmers, codeswitch versus self-learning, etc.
  required: false
  type: string
house:
  description: Depending on protocol the values here can vary a lot to identify or group per house or type.
  required: false
  type: string
unit:
  description: Unit identifier, in most cases a value between 1 to 16 and often used in combination with the house.
  required: false
  type: integer
fade:
  description: Fade is either `true` or `false` and tells a dimmer if it should fade smooth or instant between values (only for IKEA protocol as it seems).
  required: false
  type: boolean
  default: false
code:
  description: A number series based on ones and zeroes often used for dip-switch based devices.
  required: false
  type: string
{% endconfiguration %}

For more information about the configuration including protocols, see the [telldus documentation](http://developer.telldus.com/wiki/TellStick_conf).

## Service calls

If you wish to teach a self-learning device in your TellStick configuration:

Go to Home Assistant service call in Developer tools and select.

- Service: `hassio.addon_stdin`
- Enter service Data:
  `{"addon":"core_tellstick","input":{"function":"learn","device":"1"}}`

Replace `1` with the corresponding ID of the device in your TellStick configuration.

You can also use this to list devices or sensors and read the output in the add-on log:
`{"addon":"core_tellstick","input":{"function":"list-sensors"}}`

### Supported service commands

- `"function":"list"`: List currently configured devices with name and device id and all discovered sensors.

- `"function":"list-sensors"`
- `"function":"list-devices"`: Alternative devices/sensors listing: Shows devices and/or sensors using key=value format (with tabs as separators, one device/sensor per line, no header lines.)

- `"function":"on","device":"x"`: Turns on device. ’x’ could either be an integer of the device-id, or the name of the device.

- `"function":"off","device":"x"`: Turns off device. ’x’ could either be an integer of the device-id, or the name of the device.

- `"function":"bell","device":"x"`: Sends bell command to devices supporting this. ’x’ could either be an integer of the device-id, or the name of the device.

- `"function":"learn","device":"x"`: Sends a special learn command to devices supporting this. This is normally devices of ’selflearning’ type. ’x’ could either be an integer of the device-id, or the name of the device.
