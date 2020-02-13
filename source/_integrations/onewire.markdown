---
title: 1-Wire
description: Instructions on how to integrate One wire (1-wire) sensors into Home Assistant.
logo: onewire.png
ha_category:
  - DIY
ha_release: 0.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@garbled1'
---

The `onewire` platform supports sensors which are using the One wire (1-wire) bus for communication.

Each and every 1-wire device has a (globaly) unique ID that identifies the deivce on the bus. The first two digits identifies a device family and the last 14 digita are a globally unique number given to it during manufacturing. 

The differnt families have different functionality and can measure different quantities.

### Supported devices:

| Family | Device           | Physical Quantity  |
| -------|:-----|:-----|
| 10     | [DS18S20](https://www.maximintegrated.com/en/products/sensors/DS18S20.html)  | Temperature                     |
| 12     | [DS2406(TAI-8570)](https://datasheets.maximintegrated.com/en/ds/DS2406.pdf)  | Temperature (pressure when using TAI-8570[1]) |
| 1D     | [DS2423](https://datasheets.maximintegrated.com/en/ds/DS2423.pdf)            | Counter                         |
| 22     | [DS1822](https://datasheets.maximintegrated.com/en/ds/DS1822.pdf)            |                                 |
| 26     | [DS2438/B1-R1-A/S2-R1-A [2]](https://datasheets.maximintegrated.com/en/ds/DS2438.pdf)| Temperature, Voltage, Current, (pressure and humidity when using TAI-8570[1]) | 
| 28     | [DS18B20](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf)          | Temperature                     |
| 3B     | [DS1825](https://datasheets.maximintegrated.com/en/ds/DS1825.pdf)            | Temperature                     |
| 42     | [DS28EA00](https://datasheets.maximintegrated.com/en/ds/DS28EA00.pdf)        | Temperature                     |
| EF     | [HobbyBoard [3]](https://hobbyboards.com/)                                   | Temperature, Humidity, Moisture |  

#### Notes:
[1] The TAI-8570 Pressure Sensor is based on a 1-wire composite device by AAG Electronica. It contains, above 1-wire components, also barometer, hygrometer and illiminance sensors. This onewire platform can read and present values from that device.

[2] Each 1-wire component data sheet describes the different properties the component provides. The owfs software adds some extra toos to make it easier for diy implementers to use the component. By hobbyists it is quite common to use DS2438 Smart Battery Monitor as a multipurpose measurement node that can place temperature, humidity and luminosity on the 1-wire bus by just adding some standard componentes to the DS2438. For different component types there is ready made algorithms implemented in owfs. Those are exposed by the owfs softare and can be red by this platform. The B1-R1-A/pressure is exposed as a barrometric pressure sensor. S2-R1-A/illuminance is presented as an illuminance sensor. For a more detailed description on these properties referr to the [owfs documentation](https://owfs.org/index_php_page_ds2438.html).
For this component the more basic quantities temperature, VAD, VDD and IAD is exported as separate sensors.

[3] Hobbyboards is a company that have been selling diy boards of diffent kinds. The company has been away from the market for some, time so no reference to the boards can be made. This platform have implementation for some of those.

## Interfacing with the 1-wire bus

The 1-Wire bus can be connected directly to the IO pins of Raspberry Pi or by using a dedicated interface adapter, for example 
[DS9490R](https://datasheets.maximintegrated.com/en/ds/DS9490-DS9490R.pdf) or adapters based on [DS2482-100](https://datasheets.maximintegrated.com/en/ds/DS2482-100.pdf) that can be directly attached to the IO pins on the Raspberry Pi.

It is also possible for this platform to interface with a remote 1-wire host over a network connection using ofws and owserver.

## Raspberry Pi setup

In order to setup 1-Wire support on Raspberry Pi, you'll need to edit `/boot/config.txt` following [this documentation](https://www.waveshare.com/wiki/Raspberry_Pi_Tutorial_Series:_1-Wire_DS18B20_Sensor#Enable_1-Wire).
To edit `/boot/config.txt` on the Home Assistant Operating System, use [this documentation](https://developers.home-assistant.io/docs/en/hassio_debugging.html) to enable SSH and edit `/mnt/boot/config.txt` via `vi`.

When using the GPIO pins on Raspberry Pi directrly as a 1-wire bus, the description above uses two kernel modules. 1w_gpio that implements the 1-wire protocoll and 1w_therm that understands the DS18B20 (family 28) components inner structure and reports temperature. 
There are no support for other device types (families) and hence this onewire platform only supports temperature measurements from family 28 devices.

## Interface adapter setup

### owfs

When an interface adapter is used, sensors can be accessed on Linux hosts via [owfs 1-Wire file system](https://owfs.org/). When using an interface adapter and the owfs, the `mount_dir` option must be configured to correspond a directory, where owfs device tree has been mounted. On hass.io based systems, home-assistant runs in a docker container. `owfs` dont run in that environment and hence cannot not populate the `mount_dir`. Use the owserver method on these systems instead.

### owserver

When an interface adapter is used, you can also access sensors on a remote or local Linux host that is running owserver.  owserver by default runs on port 4304. Use the `host` option to specify the host or IP of the remote server, and the optional `port` option to change the port from the default.

## Configuration

To enable One wire sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: onewire
```

{% configuration %}
names:
  description: ID and friendly name of your sensors.
  required: false
  type: string
mount_dir:
  description: Location of device tree if owfs driver used.
  required: false
  type: string
host:
  description: Remote or local host running owserver.
  required: false
  type: string
port:
  description: "The port number of the owserver (requires `host`)."
  required: false
  type: integer
  default: 4304
{% endconfiguration %}

### Configuration Example

When `onewire` is added to Home Assistant, it will generate an ID for the sensor. You can specify a friendly name for the sensor with the name configuration option.

```yaml
# Named sensor configuration.yaml entry
sensor:
  - platform: onewire
    names:
      GENERATED_ID: FRIENDLY_NAME
```

### Entities and attributes

Upon startup of the platform, the 1-wire bus is searched for available 1-wire devices. For each device that this platform handles (see list of supported devices above) the platform adds one sensor for each physical quantity it measures. The name of the sensor is the device ID with the physical quantity it measures appended. 

`sensor.28.FF5C68521604_temperature`

Each sensor will present its value in the state variable and for presentation purposes rounded to one decimal for analog values and as integers for counts.

Each sensor also exposes some additional attirbutes.

```alpha
device_file: /28.FF5C68521604/temperature              << Device path in owfs file system (or on Rpi system directory)
raw_value: 31.9375                                     << The raw measurement numbers as red from device. Not rounded.
unit_of_measurement: °C                              
friendly_name: 28.FF5C68521604 Temperature
```

### Units with multiple sensors

This platform works with devices with multiple sensors which will cause a discontinuity in recorded values. Existing devices will receive a new ID and therefore show up as new devices.
If you wish to maintain continuity it can be resolved in the database by renaming the old devices to the new names.

Connect to your database using the instructions from [Database section](/docs/backend/database/). Check the names of sensors:

```sql
SELECT entity_id, COUNT(*) as count FROM states GROUP BY entity_id ORDER BY count DESC LIMIT 10;
```
Alter the names of sensors using the following examples:

```sql
UPDATE states SET entity_id='sensor.<sensor_name>_temperature' WHERE entity_id LIKE 'sensor.<sensor_name>%' AND attributes LIKE '%\u00b0C%';
UPDATE states SET entity_id='sensor.<sensor_name>_pressure' WHERE entity_id LIKE 'sensor.<sensor_name>%' AND attributes LIKE '%mb%';
UPDATE states SET entity_id='sensor.<sensor_name>_humidity' WHERE entity_id LIKE 'sensor.<sensor_name>%' AND attributes LIKE '%%%' ESCAPE '';
```

Remember to replace `<sensor_name>` with the actual name of the sensor as seen in the `SELECT` query.


