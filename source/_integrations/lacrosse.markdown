---
title: LaCrosse
description: Instructions on how to integrate LaCrosse sensor data received from Jeelink into Home Assistant.
ha_category:
  - DIY
ha_release: 0.58
ha_iot_class: Local Polling
ha_domain: lacrosse
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `lacrosse` sensor {% term integration %} is using the data provided by a [Jeelink](https://www.digitalsmarties.net/products/jeelink) USB dongle or this [Arduino sketch](https://svn.fhem.de/trac/browser/trunk/fhem/contrib/arduino/36_LaCrosse-LaCrosseITPlusReader.zip).

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

If you are using the Home Assistant OS or Supervised installation method, these
methods are not available for you. The use of an additional computer to figure
out the ID is advised.

For TX 29 DTH-IT sensors you can also read the ID from the display and calculate the ID as followed: `hex2dec(ID_on_display) / 4`.

## Configuration

To use your `lacrosse` compatible sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lacrosse
    sensors:
      sensor_identifier:
        type: SENSOR_TYPE
        id: SENSOR_ID
```

{% configuration %}
  device:
    description: The serial device.
    required: true
    type: string
    default: /dev/ttyUSB0
  baud:
    description: The serial baudrate.
    required: true
    type: integer
    default: 57600
  led:
    description: Activate or deactivate the Jeelink LED.
    required: false
    type: boolean
    default: false
  frequency:
    description: Initial frequency in 5kHz steps.
    required: false
    type: integer
  datarate:
    description: "Set the data rate in kbps. Special values for well-known settings are: `0`: 17.241 kbps, `1`: 9.579 kbps, `2`: 8.842 kbps."
    required: false
    type: integer
  toggle_mask:
    description: "The following values can be combined bitwise: `1` = 17.241 kbps, `2` = 9.579 kbps, `4` = 8.842 kbps"
    required: false
    type: integer
  toggle_interval:
    description: Enable the toggle mode and set the interval in seconds.
    required: false
    type: integer
  sensors:
    description: A list of your sensors.
    required: true
    type: map
    keys:
      name:
        description: The name of the sensor.
        required: false
        type: string
      type:
        description: "The type of the sensor. Options: `battery`, `humidity`, `temperature`"
        required: true
        type: string
      id:
        description: The LaCrosse Id of the sensor.
        required: true
        type: integer
{% endconfiguration %}

## Examples

To setup a LaCrosse sensor with multiple sensors, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lacrosse
    device: /dev/ttyUSB0
    baud: 57600
    sensors:
      kitchen_humidity:
        name: Kitchen Humidity
        type: humidity
        id: 72
      kitchen_temperature:
        name: Kitchen Temperature
        type: temperature
        id: 72
      kitchen_lacrosse_battery:
        name: Kitchen Sensor Battery
        type: battery
        id: 72
```
