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
package.  It is known to work with the [2413U] USB and [2412S] RS242 favors
of PLM and the [2448A7] USB stick.  This component does not work with the 
IP-based hub products.  For that, you'll want the "Insteon (Local)" component 
instead.

[insteonplm]: https://github.com/nugget/python-insteonplm
[2413U]: https://www.insteon.com/powerlinc-modem-usb
[2412S]: https://www.insteon.com/powerlinc-modem-serial
[2448A7]: https://www.smarthome.com/insteon-2448a7-portable-usb-adapter.html


```yaml
# insteon_plm supported configuration variables
insteon_plm:
  port: SERIAL_PORT
  device_override:
     - address: INSTEON_ADDRESS
       cat: DEVICE_CATEGORY
	   subcat: DEVICE_SUBCATEGORY
	   firmware: DEVICE_FIRMWARE
	   product_key: DEVICE_PRODUCT_KEY
```
Configuration variables:
- **port** (*Required*): The port for your device, e.g. `/dev/ttyUSB0`
- **device_override** (*Optional*): Override the default device platform
  INSTEON_ADDRESS is found on the device itself in the form 1A.2B.3C or 1a2b3c
  DEVICE_CATEGORY and DEVICE_FIRMWARE are in the back of the Insteon User Guide 
  in the form of 0x00 - 0xff
  DEVICE_FIRMWARE and DEVICE_PRODUCT_KEY are more advanced options and will 
  typically not be used.

### {% linkable_title Linking Devices to the PLM %}

In order for any two Insteon devices to talk with one another, they must be 
linked. For an overview of device linking please read the Insteon page on
[understanding linking]. Currently Insteon PLM does not support software
linking of devices. If you need software that can link your devices (if you 
are using a USB Stick PLM for example), you can download [HouseLinc] which runs
on any Windows PC, or you can use [Insteon Terminal] which is open source and 
runs on most platforms. HouseLinc is no longer supported by SmartHome but it 
still works. Insteon Terminal is a very useful tool but please read the 
disclaimers carefully, they are important.

[understanding linking]: http://www.insteon.com/support-knowledgebase/2015/1/28/understanding-linking
[HouseLinc]: https://www.smarthome.com/houselinc.html
[Insteon Terminal]: https://github.com/pfrommerd/insteon-terminal

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
exceptions like this, the component supports a device plaform override.  You
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
    - address: a1b2c3  # Hidden Door Sensor [2845-222]
      cat: 0x10        
	  subcat: 0x11     
```
### {% linkable_tile What NOT to do %}
Insteon PLM is a top level platform and device discovery will identify 
the Home Assistant platform the device belongs in. As such, do not 
declare Insteon devices in other platforms. For example, this configuration
will NOT work:

```yaml
light:
  - platform: insteon_plm
    address: 1a2b3c
	...

```

