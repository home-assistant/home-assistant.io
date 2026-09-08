---
title: LaCrosse
description: Instructions on how to integrate LaCrosse sensor data received from Jeelink into Home Assistant.
ha_category:
  - DIY
ha_release: 0.58
ha_config_flow: true
ha_iot_class: Local Push
ha_domain: lacrosse
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: legacy
---

The **LaCrosse** {% term integration %} uses the [Jeelink](https://www.digitalsmarties.net/products/jeelink) USB dongle to receive sensor data. Alternatively, you can use an [Arduino sketch](https://svn.fhem.de/trac/browser/trunk/fhem/contrib/arduino/36_LaCrosse-LaCrosseITPlusReader.zip) to create your own receiver.

This integration creates temperature, humidity, and battery level sensors for each configured LaCrosse sensor.

## Supported devices

- Technoline TX 29 IT (temperature only)
- Technoline TX 29 DTH-IT (including humidity)
- TFA Dostmann LaCrosse sensors (type 30.3147.IT)

## Prerequisites

You need a Jeelink USB receiver or an Arduino-based receiver to use this integration.

## Setup

Since the sensors choose a new ID after each power cycle or battery change you can check what sensor IDs are available by using the command-line tool `pylacrosse` from the pylacrosse package.

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

### Required manual input

After obtaining the sensor's ID you can start the configuration of the LaCrosse receiver.
If your receiver is connected via USB, you can select it from the `device` dropdown. If autodetection does not find your receiver, you can manually enter the correct path. The default baud rate of 57600 works for most sensors, but you can optionally change it via the `baud` input.

{% configuration_basic %}
Device:
   description: Select the Jeelink receiver connected via USB.
Baud rate:
   description: The serial baud rate.
{% endconfiguration_basic %}

### Optional input

By default, the receiver uses an 868.95 MHz frequency with a 17.241 kbps data rate. Optionally, you can change the frequency in 5 kHz steps via `frequency`.
 If you have LaCrosse sensors using a different data rate, you can configure the receiver to toggle between them every `toggle_interval` seconds by setting `toggle_mask` and `toggle_interval`.
 The LED of the receiver is off by default. If you want to enable it, select the `led` checkbox.

{% configuration_basic %}
LED:
  description: Activate or deactivate the Jeelink LED.
Frequency:
  description: Initial frequency of 868,9500Mhz. Can be changed in 5kHz steps.
Data rate:
  description: "Set the data rate in kbps. Special values for well-known settings are: `1`: 17.241 kbps, `2`: 9.579 kbps, `4`: 8.842 kbps."
Toggle mask:
  description: "The following values can be combined bitwise: `1` = 17.241 kbps, `2` = 9.579 kbps, `4` = 8.842 kbps"
Toggle interval:
  description: Enable the toggle mode and set the interval in seconds.
{% endconfiguration_basic %}

### Adding a sensor

Once the receiver is configured, you can add one or more sensors either during setup or later. A sensor must report either humidity or temperature.
 Optionally, it can report battery level. Battery level is limited to **new** and **low**, and it is not reported as a percentage.
 If a sensor reports humidity as well as temperature, you can add the humidity sensor later and use the same sensor ID.

{% configuration_basic %}
ID:
  description: "The LaCrosse Id of the sensor. Calculate the ID with: `hex2dec(ID_on_display) / 4` if the sensor has a display."
Type:
  description: "The type of the sensor. Options: `battery`, `humidity`, `temperature`. At least either `humidity`or `temperature` need to be selected."
Name:
  description: The name of the sensor.
Expire after:
  description: Timeout after which sensors are considered offline if no update telegram was received. If empty the library default of 300s will be used.
{% endconfiguration_basic %}

## Reconfiguration and device replacement

This integration supports reconfiguration, allowing you to make changes—such as updating the receiver path, adding more sensors or changing the sensor ID after a power cycle.

## Supported functionality

The **LaCrosse** integration provides the following entities:

- **Temperature sensor**: Displays the temperature reading from the LaCrosse sensor.
- **Humidity sensor**: Displays the humidity reading (available on compatible models like TX 29 DTH-IT).
- **Battery sensor**: Displays the battery status as either **new** or **low**.

## Known limitations

The LaCrosse sensors randomly choose their ID when powered on or after a battery change. In some cases, a sensor may randomly select an ID that conflicts with another sensor. When this happens, you may receive readings from both sensors.

{% tip %}
To resolve ID conflicts, restart one of the sensors to force it to select a new ID.
{% endtip %}

## Troubleshooting

### No sensors are discovered

If your LaCrosse sensors are not being detected, verify the following:

- Ensure the Jeelink receiver dongle is properly connected to your Home Assistant system.
- Confirm the correct receiver device path is configured (usually `/dev/ttyUSB0` on Linux).
- Check that your sensors are powered on and within range of the receiver.
- Verify the baud rate setting matches your sensor's requirements (default is 57600).
- Try scanning for available sensor IDs using the `pylacrosse` command-line tool before configuring the integration.

### Sensors show offline

If sensors appear offline in Home Assistant, they may not be transmitting data. Verify:

- The sensor has fresh batteries and is powered on.
- The sensor is within range of the Jeelink receiver.
- The **Expire after** timeout is set appropriately (default is 300 seconds).
- No interference is affecting the wireless signal.

### ID conflicts between sensors

If you have multiple sensors with the same ID, restart one of them to force it to select a new ID. See [known limitations](#known-limitations) for more information.

## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}