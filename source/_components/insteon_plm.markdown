---
layout: page
title: "Insteon PLM"
description: "Instructions how to setup an Insteon USB PLM locally within Home Assistant."
date:  2017-02-19 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Hub
ha_iot_class: "Local Push"
ha_version: 0.39
---

This component adds "local push" support for INSTEON PowerLinc Modems allowing
linked INSTEON devices to be used within Home Assistant as lights, switches,
and binary sensors.  Device support is provided by the underlying [insteonplm]
package.  It is known to work with both the [2413U] USB and [2412S]
RS242 flavors of PLM.  This component does not work with the IP-based hub
products.  For that, you'll want the "Insteon (Local)" component instead.

[insteonplm]: https://github.com/nugget/python-insteonplm
[2413U]: https://www.insteon.com/powerlinc-modem-usb
[2412S]: https://www.insteon.com/powerlinc-modem-serial


```yaml
# insteon_plm supported configuration variables
insteon_plm:
  port: SERIAL_PORT
  device_override:
     - address: INSTEON_ADDRESS
       platform: DEVICE_PLATFORM
```

Configuration variables:
- **port** (*Required*): The port for your device, e.g. `/dev/ttyUSB0`
- **device_override** (*Optional*): Override the default device platform
  

### {% linkable_title Customization %} 

The only configuration item that is absolutely necessary is the port so that
Home Assistant can connect to the PLM.  This will expose all the supported INSTEON
devices which exist in the modem's ALL-Link database.  However, devices will
only be shown by their INSTEON hex address (e.g. "1A.2B.3C") which can be a bit
unwieldy.  As you link and unlink devices using the 'Set' buttons, they'll be
added and removed from Home Assistant automatically.

You can use the normal Home Assistant [device customization] section of your
configuration to assign friendly names and special icons to your devices.  This
is especially useful for setting device_class on your binary_sensor INSTEON
devices.

[device customization]: /getting-started/customizing-devices/

### {% linkable_title Device Overrides %} 

INSTEON devices are added to Home Assistant using the platform(s) that make the
most sense given the model and features of the hardware.  In most cases this is
unambiguous, but sometimes the component will not be able to guess the actual
usage of the device.  For example, there might be a table lamp plugged into an
INSTEON appliance relay module.  By default, this will show as a 'switch'
device in Home Assistant, but it really should be a 'light' device.  For
exceptions like this, the component supports a device platform override.  You
can set any device (by address) to explicitly use a specific platform if the
default is not correct.

### {% linkable_title Example Configuration with Options%} 

```yaml
# Full example of insteon_plm configuration with customizations and overrides

homeassistant:
  customize:
    light.a1b2c3:
      friendly_name: Bedside Lamp
    binary_sensor.a2b3c4:
      friendly_name: Garage Door
      device_class: opening

insteon_plm:
  port: /dev/ttyUSB0
  device_override:
    - address: a1b2c3  # Icon Appliance Module for bedside lamp
      platform: light  # make it a light instead of a switch
```

