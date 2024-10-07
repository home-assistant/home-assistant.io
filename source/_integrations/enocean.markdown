---
title: EnOcean
description: Connect EnOcean devices to Home Assistant
ha_category:
  - Binary sensor
  - Hub
  - Light
  - Sensor
  - Switch
ha_release: 0.21
ha_iot_class: Local Push
ha_codeowners:
  - '@bdurrer'
ha_domain: enocean
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The [EnOcean](https://en.wikipedia.org/wiki/EnOcean) standard is supported by many different vendors. There are switches and sensors of many different kinds, and typically they employ energy harvesting to get power such that no batteries are necessary.

The EnOcean integration adds support for some of these devices. You will need a controller like the [USB300](https://www.enocean.com/product/usb-300/) in order for it to work.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor) - Wall switches
- [Sensor](#sensor) - Power meters, temperature sensors, humidity sensors and window handles
- [Light](#light) - Dimmers
- [Switch](#switch)

However, due to the wide range of message types, not all devices will work without code changes.
The following devices have been confirmed to work out of the box:

- Eltako FUD61 dimmer
- Eltako FT55 battery-less wall switch
- Jung ENOA590WW battery-less wall switch
- Omnio WS-CH-102-L-rw battery-less wall switch
- Permundo PSC234 (switch and power monitor)
- EnOcean STM-330 temperature sensor
- Hoppe SecuSignal window handle from Somfy

If you own a device not listed here, please check whether your device can talk in one of the listed [EnOcean Equipment Profiles](https://www.enocean-alliance.org/specifications/) (EEP). If it does, it will most likely work. The available profiles are usually listed somewhere in the device manual.

Support for tech-in messages is not implemented.

{% include integrations/config_flow.md %}

Despite the UI-based configuration of the hub, the entities are still configured using YAML see next chapters).

## Binary sensor

This can typically be one of those batteryless wall switches.
Tested with:

- Eltako FT55 which uses the EnOcean PTM 215 module
- [TRIO2SYS Wall switches](https://www.trio2sys.fr/index.php/produits-enocean-sans-fil-sans-pile-interoperable/emetteur-sans-fils-sans-pile-interoperable-enocean) which uses the EnOcean PTM210 DB module
- Omnio WS-CH-102

The following [EnOcean Equipment Profiles](https://www.enocean-alliance.org/specifications/) are supported:

- F6-02-01 (Light and Blind Control - Application Style 1)
- F6-02-02 (Light and Blind Control - Application Style 2)

To use your EnOcean device, you first have to set up your EnOcean hub and then add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

{% configuration %}
id:
  description: The ID of the device. This is the 4 bytes long number written on the dimmer.
  required: true
  type: list
name:
  description: An identifier for the switch in the frontend.
  required: false
  type: string
  default: EnOcean binary sensor
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: device_class
{% endconfiguration %}

EnOcean binary sensors have no state, they only generate 'button_pressed' events. The event data has following fields:

- **id**: The ID of the device (see configuration).
- **pushed**: `1` for a button press, `0` for a button release.
- **which**: Always `0` when using the single rocket.  `0` or `1` when using the dual rocket switch.
- **onoff**: `0` or `1` for either side of the rocket.

## Automation example

Sample automation to switch lights on and off:

{% raw %}

```yaml
# Example automation to turn lights on/off on button release
automation:
  - alias: "Hall light switches"
    triggers:
      - trigger: event
        event_type: button_pressed
        event_data:
          id: [0xYY, 0xYY, 0xYY, 0xYY]
          pushed: 0
    actions:
      - action: "{% if trigger.event.data.onoff %} light.turn_on {% else %} light.turn_off {%endif %}"
        target:
          entity_id: "{% if trigger.event.data.which == 1 %} light.hall_left {% else %} light.hall_right {%endif %}"
```

{% endraw %}

You can find the `event_data` `id` by going to {% my developer_events title="Developer Tools -> Events" %} and listening to “button_pressed” events. Then hit a button on the device and you should see an event.

## Light

An EnOcean light can take many forms. Currently only one type has been tested: Eltako FUD61 dimmer.

To use your EnOcean device, you first have to set up your EnOcean hub and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
light:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
    sender_id: [0xFF,0xC6,0xEA,0x04]
```

{% configuration %}
id:
  description: The ID of the device. This is the 4 bytes long number written on the dimmer.
  required: true
  type: list
sender_id:
  description: The Sender ID of the device. This is a 4 bytes long number.
  required: true
  type: list
name:
  description: An identifier for the light in the frontend.
  required: false
  default: EnOcean Light
  type: string
{% endconfiguration %}

## Sensor

The EnOcean sensor platform currently supports the following device types:

- [power sensor](#power-sensor)
- [humidity sensor](#humidity-sensor)
- [temperature sensor](#temperature-sensor)
- [window handle](#window-handle)
 
To use your EnOcean device, you first have to set up your EnOcean hub and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - name: Television
    platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

{% configuration %}
id:
  description: The ID of the device. This is the 4 bytes long identifier of your device.
  required: true
  type: list
name:
  description: An identifier for the sensor in the frontend.
  required: false
  type: string
  default: EnOcean sensor
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: device_class
  default: powersensor
{% endconfiguration %}

### Power sensor

This has been tested with a Permundo PSC234 switch, but any device sending EEP **A5-12-01** messages will work.

Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - name: Television
    platform: enocean
    id: [0x01,0x90,0x84,0x3C]
    device_class: powersensor
```

### Humidity sensor

The following [EnOcean Equipment Profiles](https://www.enocean-alliance.org/specifications/) are supported:

- Any profile that contains the humidity value at position **DB2.7** to **DB2.0**
- **A5-04-01** - Temp. and Humidity Sensor, Range 0°C to +40°C and 0% to 100%
- **A5-04-02** - Temp. and Humidity Sensor, Range -20°C to +60°C and 0% to 100%
- **A5-10-10** to **A5-10-14** - Room Operating Panels

Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - name: Bathroom
    platform: enocean
    id: [0x01,0x90,0x84,0x3C]
    device_class: humidity
```

### Temperature sensor

This sensor has been tested with a generic STM-330 sensor, which is used in most indoor temperature sensor devices. 

The following [EnOcean Equipment Profiles](https://www.enocean-alliance.org/specifications/) are supported:

- Any profile that contains an 8-bit temperature at position DB1.7 to DB1.0. 10-bit is not supported.
- **A5-02-01** to **A5-02-1B** - Temperature Sensor with various temperature ranges
- **A5-10-01** to **A5-10-14** - Room Operating Panels
- **A5-04-01** - Temp. and Humidity Sensor, Range 0°C to +40°C and 0% to 100%
- **A5-04-02** - Temp. and Humidity Sensor, Range -20°C to +60°C and 0% to 100%
- **A5-10-03** - Temp. Sensor, Set point control
- **A5-10-10** - Temp. and Humidity Sensor and Set Point
- **A5-10-12** - Temp. and Humidity Sensor, Set Point and Occupancy Control

Check the manual of your temperature sensor to figure out what EEP it uses. 
If you do not know, make an educated guess and check the reported values. It's easiest to validate the temperature at the boundaries of the range, so maybe put the sensor into the fridge for a while. 

Add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - name: Living Room
    platform: enocean
    id: [0x01,0x90,0x84,0x3C]
    device_class: temperature
```

The temperature sensor supports these additional configuration properties.

{% configuration %}
min_temp:
  description: The minimal temperature in °C your sensor supports.
  required: false
  type: integer
  default: 0
max_temp:
  description: The maximum temperature in °C your sensor supports.
  required: false
  type: integer
  default: 40
range_from:
  description: The range value your sensor reports for `min_temp`
  required: false
  type: integer
  default: 255
range_to:
  description: The range value your sensor reports for `max_temp`
  required: false
  type: integer
  default: 0
{% endconfiguration %}

Note that the default configuration values of _range_from_ and _range_to_ are not typos, the range is backwards for most sensors.
However, some EEPs have a different, inverted range, which goes from 0 to 250. This includes the following EEPs:

- **A5-04-01**
- **A5-04-02**
- **A5-10-10** to **A5-10-14**
- **A5-20-01** - Battery powered actuator (bi-dir)

Adapt the {% term "`configuration.yaml`" %} for those sensors:

```yaml
# Example configuration.yaml entry for EEP A5-10-10
sensor:
  - name: Living Room
    platform: enocean
    id: [0x01,0x90,0x84,0x3C]
    device_class: temperature
    range_from: 0
    range_to: 250
```

### Window handle

As of now, the Hoppe SecuSignal window handle from Somfy has been successfully tested. However, any mechanical window handle that follows the EnOcean RPS telegram spec F6 10 00 (Hoppe AG) is supported.

To configure a window handle, add the following code to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry for window handle EEP F6-10-00
sensor:
  - name: Living Room Window Handle
    platform: enocean
    id: [0xDE,0xAD,0xBE,0xEF]
    device_class: windowhandle
```

The configuration does not have any optional parameters.

The window handle sensor can have the following states:

- **closed**: The window handle is in closed position (typically down, or 6 o'clock)
- **open**: The window handle is in open position (typically left or right, or 3 o'clock or 9 o'clock)
- **tilt**: The window handle is in tilt position (typically up or 12 o'clock)

## Switch

An EnOcean switch can take many forms. Currently, only a few types have been tested: Permundo PSC234 and Nod On SIN-2-1-01.

To use your EnOcean device, you first have to set up your EnOcean hub and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

{% configuration %}
id:
  description: The ID of the device. This is a 4 bytes long number.
  required: true
  type: list
name:
  description: An identifier for the switch.
  required: false
  default: EnOcean Switch
  type: string
channel:
  description: The number of the channel (typically 0 or 1) for the output channel to switch.
  required: false
  default: 0
  type: integer
{% endconfiguration %}

```yaml
# Example entries for a switch with 2 outputs (channels), e.g., the Nod On SIN-2-1-01
switch nodon01_0:
  - platform: enocean
    id: [0x05,0x04,0x03,0x02]
    name: enocean_nodon01_0
    channel: 0

switch nodon01_1:
  - platform: enocean
    id: [0x05,0x04,0x03,0x02]
    name: enocean_nodon01_1
    channel: 1
```
