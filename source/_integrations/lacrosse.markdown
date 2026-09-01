---
title: LaCrosse
description: Instructions on how to integrate LaCrosse sensor data received from Jeelink into Home Assistant.
ha_category:
  - DIY
ha_release: 0.58
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: lacrosse
ha_platforms:
  - sensor
ha_integration_type: hub
---

The **LaCrosse** {% term integration %} is using the data provided by a [Jeelink](https://www.digitalsmarties.net/products/jeelink) USB dongle or this [Arduino sketch](https://svn.fhem.de/trac/browser/trunk/fhem/contrib/arduino/36_LaCrosse-LaCrosseITPlusReader.zip).

## Tested devices

- Technoline TX 29 IT (temperature only)
- Technoline TX 29 DTH-IT (including humidity)
- TFA Dostmann LaCrosse sensors (type 30.3147.IT)

## Setup

Since the sensor change their ID after each powercycle/battery change you can check what sensor IDs are available by using the command-line tool `pylacrosse` from the pylacrosse package.

```bash
sudo pylacrosse -d /dev/ttyUSB0 scan
```

Or, when using Docker containers:

```bash
docker exec -it <containername> pylacrosse -d /dev/ttyUSB0 scan
```

If you are using the Home Assistant OS, these methods are not available for you. The use of an additional computer to figure
out the ID is advised.

For TX 29 DTH-IT sensors you can also read the ID from the display and calculate the ID as followed: `hex2dec(ID_on_display) / 4`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
  device:
    description: The serial device. Select via dropdown.
    default: /dev/ttyUSB0
  baud:
    description: The serial baudrate.
    default: 57600
  led:
    description: Activate or deactivate the Jeelink LED.
    default: false
  frequency:
    description: Initial frequency in 5kHz steps.
  datarate:
    description: "Set the data rate in kbps. Special values for well-known settings are: `0`: 17.241 kbps, `1`: 9.579 kbps, `2`: 8.842 kbps."
  toggle_mask:
    description: "The following values can be combined bitwise: `1` = 17.241 kbps, `2` = 9.579 kbps, `4` = 8.842 kbps"
  toggle_interval:
    description: Enable the toggle mode and set the interval in seconds.
{% endconfiguration_basic %}

For each JeeLink device you can add multiple sensor either during setup or at a later stage

{% configuration_basic %}
  name:
    description: The name of the sensor.
  type:
    description: "The type of the sensor. Options: `battery`, `humidity`, `temperature`. At least either `humidity`or `temperature` need to be selected."
  id:
    description: "The LaCrosse Id of the sensor. Calculate the ID with: `hex2dec(ID_on_display) / 4` if the device has a display."
{% endconfiguration_basic %}

## Reconfiguration and Device Replacement

This integration supports reconfiguration, allowing you to make changes—such as updating the USB device path, adding more sensors or changing the sensor IDs after a powercycle-after a device has already been set up.

## Known limitations

The LaCrosse devices choose their ID randomly on each start see [setup](#setup). In some cases devices choose an ID from another sensor and you get readings from both sensors.

{% tip %}
The only workaround is to restart one of the sensors to force it to choose a new ID.
{% endtip %}

## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}