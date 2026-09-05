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
ha_integration_type: device
ha_quality_scale: bronze
---

The **LaCrosse** {% term integration %} uses the [Jeelink](https://www.digitalsmarties.net/products/jeelink) USB dongle to receive sensor data. Alternatively, you can use an [Arduino sketch](https://svn.fhem.de/trac/browser/trunk/fhem/contrib/arduino/36_LaCrosse-LaCrosseITPlusReader.zip) to create your own receiver.

This integration creates temperature, humidity, and battery level sensors for each configured LaCrosse sensor.

## Prerequisites

You need a Jeelink USB dongle or an Arduino-based receiver to use this integration.

## Supported devices

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

For TX 29 DTH-IT sensors, you can also read the ID from the display and calculate it as follows: `hex2dec(ID_on_display) / 4`.

{% include integrations/config_flow.md %}

After obtaining the sensor ID you can start the setup of the lacrosse device. First configure the receiving USB stick.
Available USB devices are prefilled in the `device`dropdown. If auto detection did not find your USB stick you can
manually input the device path. The default baud rate should be sufficient for most devices. In case you use lacrosse
devices with different datarates you can configure the receiver to toggle between those every `n` seconds via the toggle mask and toggle interval.

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

Once the receiver is configured you can add one or more sensors either during setup or at a later stage. A sensor must either report humidity or temperature. 
Optionally it can report battery levels. Battery levels are limited to the values of `new` and `low` and not reported as percentage.
Additional sensors or additional values can be added at a later stage, e.g. if a sensors exposes humidity on top of the temperature just add the humidity sensor with the same sensor ID.

{% configuration_basic %}
  id:
    description: "The LaCrosse Id of the sensor. Calculate the ID with: `hex2dec(ID_on_display) / 4` if the device has a display."
  type:
    description: "The type of the sensor. Options: `battery`, `humidity`, `temperature`. At least either `humidity`or `temperature` need to be selected."    
  name:
    description: The name of the sensor.
  expire after:
    description: Timeout after which sensors are considered offline if no update telegram was received. Defaults to 300s.
  {% endconfiguration_basic %}

## Reconfiguration and Device Replacement

This integration supports reconfiguration, allowing you to make changes—such as updating the USB device path, adding more sensors or changing the sensor IDs after a powercycle-after a device has already been set up.

## Supported functionality

The **LaCrosse** integration provides the following entities:

- **Temperature sensor**: Displays the temperature reading from the LaCrosse sensor.
- **Humidity sensor**: Displays the humidity reading (available on compatible models like TX 29 DTH-IT).
- **Battery sensor**: Displays the battery status as either `new` or `low`.

## Known limitations

The LaCrosse devices randomly choose their ID when powered on or after a battery change. In some cases, a device may randomly select an ID that conflicts with another sensor. When this happens, you may receive readings from both sensors.

{% tip %}
To resolve ID conflicts, restart one of the sensors to force it to select a new ID.
{% endtip %}

## Troubleshooting

### No sensors are discovered

If your LaCrosse sensors are not being detected, verify the following:

- Ensure the Jeelink USB dongle is properly connected to your Home Assistant system.
- Confirm the correct USB device path is configured (usually `/dev/ttyUSB0` on Linux).
- Check that your sensors are powered on and within range of the receiver.
- Verify the baud rate setting matches your device's requirements (default is 57600).
- Try scanning for available sensor IDs using the `pylacrosse` command-line tool before configuring the integration.

### Sensors show offline

If sensors appear offline in Home Assistant, they may not be transmitting data. Verify:

- The sensor has fresh batteries and is powered on.
- The sensor is within range of the Jeelink receiver.
- The `expire after` timeout is set appropriately (default is 300 seconds).
- No interference is affecting the wireless signal.

### ID conflicts between sensors

If you have multiple sensors with the same ID, restart one of them to force it to select a new ID. See [known limitations](#known-limitations) for more information.

## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}