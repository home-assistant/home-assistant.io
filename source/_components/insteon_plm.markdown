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
package.  It is known to work with the [2413U] USB and [2412S] RS242 flavors
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
     - address: ADDRESS
       cat: CATEGORY
       subcat: SUBCATEGORY
       firmware: FIRMWARE
       product_key: PRODUCT_KEY
```
Configuration variables:
- **port** (*Required*): The port for your device, e.g. `/dev/ttyUSB0`
- **device_override** (*Optional*): Override the default device definition
  - *ADDRESS* is found on the device itself in the form 1A.2B.3C or 1a2b3c
  - *CATEGORY* is found in the back of the device's User Guide in the form of
    0x00 - 0xff
  - *SUBCATEGORY* is found in the back of the device's User Guide in the form 
    of 0x00 - 0xff
  - *FIRMWARE* and *PRODUCT_KEY* are more advanced options and will typically 
    not be used.

### {% linkable_title Autodiscovery %}

The first time autodiscovery runs, the duration may require up to 20 seconds 
per device. Subsequent startups will occur much quicker using cached device
information. If a device is not recognized during autodiscovery, you can add
the device to the **device_override** configuration. 

In order for a device to be discovered it must be linked to the PLM as either
a responder or a controller. 

### {% linkable_title Linking Devices to the PLM %}

In order for any two Insteon devices to talk with one another, they must be 
linked. For an overview of device linking please read the Insteon page on
[understanding linking]. The Insteon PLM module supports All-Linking through 
[Development Tools] service calls. The following services are available:

In order for any two Insteon devices to talk with one another, they must be 
linked. For an overview of device linking please read the Insteon page on
[understanding linking]. The Insteon PLM module supports All-Linking through 
[Development Tools] service calls. The following services are available:
- **insteon_plm.add_all_link**: Tells the Insteom Modem (IM) start All-Linking 
mode. Once the IM is in All-Linking mode, press the link button on the device 
to complete All-Linking.
- **insteon_plm.delete_all_link**: Tells the Insteon Modem (IM) to remove an 
All-Link record from the All-Link Database of the IM and a device. Once the IM 
is set to delete the link, press the link button on the corresponding device 
to complete the process.
- **insteon_plm.load_all_link_database**: Load the All-Link Database for a 
device. WARNING - Loading a device All-LInk database is very time consuming 
and inconsistant. This may take a LONG time and may need to be repeated to 
obtain all records.
- **insteon_plm.print_all_link_database**: Print the All-Link Database for a 
device. Requires that the All-Link Database is loaded into memory.
- **insteon_plm.print_im_all_link_database**: Print the All-Link Database for 
the INSTEON Modem (IM).

If you are looking for more advanced options, you can use the 
[insteonplm_interactive] command line tool that is distributed with the 
[insteonplm] Python module. Please see the documentation on the [insteonplm] 
GitHub site. Alternatively, you can download [HouseLinc] which runs on any 
Windows PC, or you can use [Insteon Terminal] which is open source and runs 
on most platforms. HouseLinc is no longer supported by SmartHome but it still 
works. Insteon Terminal is a very useful tool but please read the disclaimers 
carefully, they are important.

[understanding linking]: http://www.insteon.com/support-knowledgebase/2015/1/28/understanding-linking
[Development Tools]: https://www.home-assistant.io/docs/tools/dev-tools/
[HouseLinc]: https://www.smarthome.com/houselinc.html
[Insteon Terminal]: https://github.com/pfrommerd/insteon-terminal
[insteonplm_interactive]: https://github.com/nugget/python-insteonplm#command-line-interface

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
most sense given the model and features of the hardware. The features of the 
INSTEON device are built into the Home Assistant platform. Changing the 
platform is not recommended. There are two primary uses for the 
**device_override** feature.
- Devices that do not respond during autodiscovery. This is common for battery
  operated devices.
- Devices that have not been fully developed. This allows an unknown device to
  be mapped to a device that operates similarly to another device.

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
### {% linkable_title What NOT to do %}
Insteon PLM is a top level component and device discovery will identify 
the Home Assistant platform the device belongs in. As such, do not 
declare Insteon devices in other platforms. For example, this configuration
will NOT work:

```yaml
light:
  - platform: insteon_plm
    address: 1a2b3c
```
