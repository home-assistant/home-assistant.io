---
description: Instructions on how to integrate 1-Wire sensors and switches into Home Assistant using owserver.
ha_release: 0.12
ha_domain: onewire
---

The **1-Wire** {% term integration %} brings devices on a 1-Wire bus into Home Assistant. 1-Wire is a low-cost bus that is popular for DIY projects. A single pair of wires can connect many temperature sensors, counters, and input/output chips.

The integration connects to an [owserver](https://owfs.org/) instance, which talks to your 1-Wire adapter. For example, you can:

- Monitor the temperature of rooms, freezers, aquariums, or heating pipes with DS18B20 sensors.
- Count pulses from water, gas, or electricity meters with a DS2423 counter.
- Switch relays and read contacts with DS2408 or DS2413 input/output chips.
- Measure humidity, pressure, or light with multisensors.

Every 1-Wire device has a globally unique ID. The first two characters are the device family, which tells the integration what kind of device it is. For example, `28.FF5C68521604` is a DS18B20 temperature sensor (family `28`).

## Supported devices

The following device families are supported:

- **`05`**: [DS2405](https://datasheets.maximintegrated.com/en/ds/DS2405.pdf) addressable switch
- **`10`**: [DS18S20](https://www.maximintegrated.com/en/products/sensors/DS18S20.html) temperature sensor
- **`12`**: [DS2406](https://datasheets.maximintegrated.com/en/ds/DS2406.pdf) dual addressable switch, also used in the TAI-8570 pressure sensor
- **`1D`**: [DS2423](https://datasheets.maximintegrated.com/en/ds/DS2423.pdf) dual counter
- **`1F`**: [DS2409](https://datasheets.maximintegrated.com/en/ds/DS2409.pdf) coupler for bus branching, which creates a device without entities
- **`20`**: [DS2450](https://datasheets.maximintegrated.com/en/ds/DS2450.pdf) quad analog-to-digital converter
- **`22`**: [DS1822](https://datasheets.maximintegrated.com/en/ds/DS1822.pdf) temperature sensor
- **`26`** and **`A6`**: [DS2438](https://datasheets.maximintegrated.com/en/ds/DS2438.pdf) smart battery monitor, often used as a multisensor
- **`28`**: [DS18B20](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf) temperature sensor
- **`29`**: [DS2408](https://datasheets.maximintegrated.com/en/ds/DS2408.pdf) 8-channel addressable switch
- **`30`**: [DS2760](https://pdfserv.maximintegrated.com/en/ds/DS2760.pdf) battery monitor, often used with a type K thermocouple
- **`3A`**: [DS2413](https://datasheets.maximintegrated.com/en/ds/DS2413.pdf) dual-channel addressable switch
- **`3B`**: [DS1825](https://datasheets.maximintegrated.com/en/ds/DS1825.pdf) temperature sensor
- **`42`**: [DS28EA00](https://datasheets.maximintegrated.com/en/ds/DS28EA00.pdf) temperature sensor
- **`7E`**: [Embedded Data Systems](https://www.embeddeddatasystems.com/assets/images/supportFiles/manuals/EN-UserMan%20%20OW-ENV%20Sensor%20v13.pdf) multisensors: EDS0065 (temperature and humidity), EDS0066 (temperature and pressure), and EDS0068 (temperature, humidity, pressure, and light)
- **`EF`**: Hobby Boards temperature and humidity sensor, moisture meter, and hub

Devices with family `01` (ID chips) and `81` (adapter ID chips) are recognized, but they do not provide any entities.

### Multisensors based on DS2438 and DS2760

The DS2438 and DS2760 are often used as general-purpose measurement chips. By adding standard components, they can measure humidity, pressure, light, or thermocouple temperatures. owserver provides ready-made conversions for these setups, and the integration reads them:

- **Humidity**: with a compatible Honeywell (HIH3600, HIH4000, HIH5030) or Humirel (HTM1735) sensor on a DS2438
- **Pressure**: with a B1-R1-A barometer on a DS2438
- **Illuminance**: with an S3-R1-A light sensor on a DS2438
- **Thermocouple temperature**: with a type K thermocouple on a DS2760

The raw measurements of these chips are also available as separate entities. For more details, refer to the owfs documentation for the [DS2438](https://owfs.org/index_php_page_ds2438.html) and the [DS2760](https://owfs.org/index_php_page_ds2760.html).

The TAI-8570 from AAG Electronica combines a DS2406 with a barometer and a temperature sensor. The integration can read its pressure and temperature.

Hobby Boards sold DIY 1-Wire boards. The company is no longer active, but the integration still supports its temperature and humidity sensor, moisture meter, and hub.

## Unsupported devices

The following devices are not supported:

- Device families and types that are not listed under [Supported devices](#supported-devices). The integration ignores them and writes a warning to the log.
- 1-Wire devices that are not available through owserver, such as sensors connected directly to the GPIO pins of a Raspberry Pi without owserver.

## Prerequisites

- A 1-Wire adapter, such as a USB, serial, or I2C adapter, with your devices connected to it.
- An owserver instance that can access the adapter. owserver is part of the [owfs 1-Wire file system](https://owfs.org/). You can run it on the same machine as Home Assistant or on another machine on your network. If you use {% term "Home Assistant Operating System" %}, you can install owserver as a community {% term app %}.
- The hostname or IP address and the port of owserver. The default port is `4304`.

{% include integrations/config_flow.md %}

Home Assistant can discover owserver automatically, either when it announces itself on your network or when it runs as an {% term app %}. In that case, confirm the setup when Home Assistant asks for it.

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your owserver instance. The default is `localhost`."
Port:
  description: "The port of your owserver instance. The default is `4304`."
{% endconfiguration_basic %}

## Configuration options

You can change the precision that the integration uses to read DS18B20 temperature sensors (family `28`). Lower precision makes the sensor respond faster, but less accurately. The selected precision is visible in the `device_file` attribute of the **Temperature** entity, for example `/28.FF5C68521604/temperature11`.

This option only changes how Home Assistant reads the sensor. To change the resolution stored in the sensor itself, use the **Temperature resolution** select entity instead.

To change the options, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **1-Wire**, and then select the cogwheel {% icon "mdi:cog-outline" %} on the entry. Home Assistant reloads the integration after you save the options.

{% configuration_basic %}
Reset all device customizations:
  description: "Resets the options of all devices to their default values."
Customize specific devices:
  description: "Select the DS18B20 sensors you want to configure. Home Assistant then asks for the **Sensor precision** of each selected sensor. If no DS18B20 sensors are connected, Home Assistant shows that no configurable devices were found."
Sensor precision:
  description: "The precision of the temperature reading: **Default**, **9 Bits**, **10 Bits**, **11 Bits**, or **12 Bits**. The default is **Default**, which uses the precision stored in the sensor."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device for each 1-Wire device it finds on the bus. Devices connected to a DS2409 coupler are linked to that coupler. Each entity has a `device_file` attribute with the path of the value in owserver, for example `/28.FF5C68521604/temperature`.

Many entities are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity), so that the integration does not read unnecessary data from the bus. You can turn them on from the device page.

### Binary sensors

All binary sensors are disabled by default.

- **Sensed**, **Sensed A**/**B**, and **Sensed 0**–**7**
  - **Description**: The state of an input channel
  - **Available for**: DS2405 (`05`), DS2406 (`12`), DS2408 (`29`), and DS2413 (`3A`)
- **Hub short on branch 0**–**3**
  - **Description**: Whether a short circuit is detected on a hub branch
  - **Available for**: Hobby Boards hub (`EF`)

### Selects

- **Temperature resolution**
  - **Description**: The resolution stored in the temperature sensor
  - **Options**: 9 bits (0.5°C, fastest, up to 93.75ms), 10 bits (0.25°C, up to 187.5ms), 11 bits (0.125°C, up to 375ms), 12 bits (0.0625°C, slowest, up to 750ms)
  - **Available for**: DS18B20 (`28`)
  - **Remarks**: This entity is disabled by default

### Sensors

- **Temperature**
  - **Description**: The measured temperature
  - **Available for**: Temperature sensors (`10`, `22`, `28`, `3B`, `42`), DS2406 with TAI-8570 (`12`), DS2438 (`26`, `A6`), DS2760 (`30`), Embedded Data Systems (`7E`), and Hobby Boards temperature and humidity sensor (`EF`)
  - **Remarks**: Disabled by default for the TAI-8570
- **Humidity**
  - **Description**: The measured relative humidity
  - **Available for**: DS2438 (`26`, `A6`), Embedded Data Systems EDS0065 and EDS0068 (`7E`), and Hobby Boards temperature and humidity sensor (`EF`)
  - **Remarks**: Disabled by default for the DS2438
- **HIH3600 humidity**, **HIH4000 humidity**, **HIH5030 humidity**, and **HTM1735 humidity**
  - **Description**: The relative humidity, converted for the humidity sensor connected to the DS2438
  - **Available for**: DS2438 (`26`, `A6`)
  - **Remarks**: These entities are disabled by default
- **Raw humidity**
  - **Description**: The relative humidity before correction
  - **Available for**: Hobby Boards temperature and humidity sensor (`EF`)
- **Pressure**
  - **Description**: The measured air pressure, in mbar
  - **Available for**: DS2406 with TAI-8570 (`12`), DS2438 with B1-R1-A (`26`, `A6`), and Embedded Data Systems EDS0066 and EDS0068 (`7E`)
  - **Remarks**: Disabled by default for the DS2406 and the DS2438
- **Illuminance**
  - **Description**: The measured light level, in lx
  - **Available for**: DS2438 with S3-R1-A (`26`, `A6`) and Embedded Data Systems EDS0068 (`7E`)
  - **Remarks**: Disabled by default for the DS2438
- **Counter A**/**B**
  - **Description**: The pulse count of each counter input
  - **Available for**: DS2423 (`1D`)
- **Voltage A**–**D** and **Latest voltage A**–**D**
  - **Description**: The voltage of each input
  - **Available for**: DS2450 (`20`)
  - **Remarks**: **Voltage** starts a new conversion, while **Latest voltage** reads the last converted value. The **Latest voltage** entities are disabled by default
- **VAD voltage**, **VDD voltage**, and **VIS voltage difference**
  - **Description**: The raw voltages measured by the DS2438
  - **Available for**: DS2438 (`26`, `A6`)
  - **Remarks**: These entities are disabled by default
- **Voltage**, **VIS voltage gradient**, and **Thermocouple K temperature**
  - **Description**: The raw voltages measured by the DS2760, and the temperature of a connected type K thermocouple
  - **Available for**: DS2760 (`30`)
  - **Remarks**: These entities are disabled by default
- **Moisture 0**–**3** or **Wetness 0**–**3**
  - **Description**: The soil moisture, in cbar, or the leaf wetness, in %, of each channel, depending on the sensor type configured for the channel
  - **Available for**: Hobby Boards moisture meter (`EF`)
  - **Remarks**: After you change the sensor type of a channel with the **Leaf sensor** or **Moisture sensor** switch, reload the integration to get the matching entity

### Switches

All switches are disabled by default.

- **Programmed input-output**, **Programmed input-output A**/**B**, and **Programmed input-output 0**–**7**
  - **Description**: Turns an output channel on or off
  - **Available for**: DS2405 (`05`), DS2406 (`12`), DS2408 (`29`), and DS2413 (`3A`)
- **Latch A**/**B** and **Latch 0**–**7**
  - **Description**: The activity latch of an input channel, which records whether the input changed
  - **Available for**: DS2406 (`12`) and DS2408 (`29`)
- **Current A/D control**
  - **Description**: Turns the current measurement of the DS2438 on or off
  - **Available for**: DS2438 (`26`, `A6`)
- **Hub branch 0**–**3**
  - **Description**: Turns a hub branch on or off
  - **Available for**: Hobby Boards hub (`EF`)
- **Leaf sensor 0**–**3** and **Moisture sensor 0**–**3**
  - **Description**: Sets the sensor type of each channel to leaf wetness or soil moisture
  - **Available for**: Hobby Boards moisture meter (`EF`)

## 1-Wire automation examples

1-Wire sensors and switches are often used to monitor and control things around the house.
Here are some ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when the freezer gets too warm

Use a DS18B20 temperature sensor in your freezer to send a notification to your phone when the temperature rises above -10°C for 10 minutes. Replace the entity IDs in the example with the entity IDs of your sensor and phone.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Your freezer's **Temperature** sensor
  - **Above**: `-10`
  - **For at least**: 10 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when the freezer gets too warm" %}

{% example %}
automation: |
  alias: "Notify when the freezer gets too warm"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.28_ff5c68521604_temperature
      above: -10
      for:
        minutes: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The freezer temperature is above -10°C."
{% endexample %}

{% enddetails %}

### Automation: Turn on a heater relay when the greenhouse gets cold

Use a temperature sensor and a relay connected to an output of a DS2413 to protect plants from frost. This example turns on the relay when the temperature drops below 5°C. The **Programmed input-output** switches are disabled by default, so enable the one you use first. Replace the entity IDs in the example with the entity IDs of your sensor and switch.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Your greenhouse **Temperature** sensor
  - **Below**: `5`
- **Action**: Turn on switch
  - **Target**: Your relay's **Programmed input-output A** switch

{% details "YAML example for turning on a heater relay when the greenhouse gets cold" %}

{% example %}
automation: |
  alias: "Turn on the greenhouse heater when it gets cold"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.28_a05966040000_temperature
      below: 5
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.3a_0b2c4e000000_programmed_input_output_a
{% endexample %}

{% enddetails %}

## Data updates

The **1-Wire** integration {% term polling polls %} each entity every 30 seconds.

The integration also scans the bus for new devices every 5 minutes. New devices and their entities are added automatically, so you do not need to reload the integration after you connect a new sensor. On DS2409 couplers, the integration searches both the `main` and the `aux` branches.

## Known limitations

- The integration only connects to owserver. It cannot read 1-Wire devices directly from an adapter or from the GPIO pins of a Raspberry Pi.
- Bus branching is only supported with DS2409 couplers.
- Only DS18B20 temperature sensors have configuration options.
- Devices that you disconnect from the bus are not removed automatically, because a device that is temporarily unreachable looks the same as a removed one. To remove a device you no longer use, see [Removing a device you no longer use](#removing-a-device-you-no-longer-use).
- When you connect a new device, it can take up to 5 minutes before it appears in Home Assistant.
- On the Hobby Boards moisture meter, a change of sensor type only takes effect after you reload the integration.

## Troubleshooting

{% details "Home Assistant cannot connect to owserver" %}

### Symptom: Setup fails with a connection error

When you set up the integration, you get an error that Home Assistant failed to connect. Or, after setup, the integration shows **Error communicating with the 1-Wire server** followed by the host and port.

#### Description

Home Assistant cannot reach owserver at the host and port you entered.

#### Resolution

If owserver is not reachable when Home Assistant starts, the integration retries automatically.

1. Check that owserver is running and that it can access your 1-Wire adapter.
2. Check the host and port. The default port is `4304`.
3. If owserver runs on another machine, check that it accepts connections from your network and not only from `localhost`.
4. If owserver moved to another address, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **1-Wire**, then the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**. Enter the new host and port.

{% enddetails %}

{% details "A device on the bus does not appear" %}

### Symptom: A connected device is missing in Home Assistant

A device is connected to the bus, but Home Assistant does not show it.

#### Description

The integration only adds devices from the [supported device families](#supported-devices), and it scans for new devices every 5 minutes. The device might also not be visible to owserver.

#### Resolution

1. Wait 5 minutes for the next scan.
2. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and look for a message that the integration ignores an unknown device family or type.
3. Check that the device appears in owserver, for example with the `owdir` command or in the owhttpd web interface.
4. Check the wiring of the device.

{% enddetails %}

{% details "Some entities are missing" %}

### Symptom: A device has fewer entities than listed on this page

A device appears in Home Assistant, but some of its entities are missing.

#### Description

Many entities are disabled by default, including all binary sensors and switches. Some entities only exist when the matching hardware is connected, such as the TAI-8570 sensors.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **1-Wire**.
2. Select the device.
3. Select **+N disabled entities**, where N is the number of disabled entities.
4. Select the entity, then select the cogwheel {% icon "mdi:cog-outline" %}.
5. Turn on **Enabled**, and select **Update**.

{% enddetails %}

{% details "An entity is unavailable" %}

### Symptom: An entity shows as unavailable

An entity shows as **Unavailable**, and {% my logs title="**Settings** > **System** > **Logs**" %} contains a message about an error fetching data.

#### Description

Home Assistant could not read the value from owserver. This usually happens when the device lost its connection to the bus.

#### Resolution

1. Check the wiring and the power of the device.
2. Check that the device still appears in owserver.

The entity recovers automatically on the next successful reading.

{% enddetails %}

{% details "A DS18B20 reports 85°C" %}

### Symptom: A DS18B20 temperature sensor reports 85°C

A DS18B20 temperature sensor suddenly reports 85°C, even though the real temperature is different.

#### Description

85°C is the power-on value of the DS18B20. The sensor reports it when it loses power during a measurement, for example because of a wiring problem or when it uses parasitic power. There is no way to distinguish a real 85°C reading from an incorrect one.

#### Resolution

1. Check the wiring of the sensor.
2. If possible, power the sensor with a separate supply wire instead of parasitic power.
3. If the problem remains, you can create a template sensor {% term helper %} that filters out the value. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, create a [template sensor](/integrations/template/), and use a state template such as:

   {% raw %}

   ```jinja
   {% if states('sensor.28_a05966040000_temperature') | float(0) != 85 %}
     {{ states('sensor.28_a05966040000_temperature') }}
   {% else %}
     None
   {% endif %}
   ```

   {% endraw %}

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

### Removing a device you no longer use

The integration does not remove devices that you disconnect from the bus. To remove one:

1. Disconnect the device from the bus.
2. Wait up to 5 minutes, until the next scan of the bus.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **1-Wire**.
4. Select the device, then select the three dots {% icon "mdi:dots-vertical" %} menu and select **Delete**.

You can only delete a device that the integration no longer finds on the bus. If you connect the device again later, it is added again on the next scan.
