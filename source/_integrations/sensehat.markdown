---
title: Sense HAT
description: Instructions on how to setup Sense HAT LED lights within Home Assistant.
ha_category:
  - DIY
  - Light
  - Sensor
ha_iot_class: Assumed State
ha_release: 0.44
ha_domain: sensehat
ha_platforms:
  - light
  - sensor
---

There is currently support for the following device types within Home Assistant:

- [Light](#light)
- [Sensor](#sensor)

## Light

The `sensehat` light platform lets you control the [Sense HAT](https://www.raspberrypi.org/products/sense-hat/) board's 8x8 RGB LED matrix on your Raspberry Pi from within Home Assistant.

To add `sensehat` light to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: sensehat
```

## Sensor

The `sensehat` sensor platform allows you to display information collected by a [Sense HAT](https://www.raspberrypi.org/products/sense-hat/) add-on board for Raspberry Pi.

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sensehat
    display_options:
      - temperature
      - humidity
      - pressure
```

{% configuration %}
display_options:
  description: List of details to monitor.
  required: true
  default: "`memory_free`"
  type: list
  keys:
    temperature:
      description: Temperature
    humidity:
      description: Humidity
    pressure:
      description: Pressure
name:
  description: Change the name of te sensor, for in the frontend.
  required: false
  type: string
is_hat_attached:
  description: Declaring that the SenseHAT _is_ physically on the Raspberry Pi.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

### Customizing the Sense HAT data

#### Format the sensor values

Add the following to your `sensor`:

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sensehat
    display_options:
        - temperature
        - humidity
        - pressure

  - platform: template
    sensors:
      sensehat_temperature:
        value_template: "{{ states('sensor.temperature') | round(1) }}"
        unit_of_measurement: "°C"
      sensehat_pressure:
        value_template: "{{ states('sensor.pressure') | round(1) }}"
        unit_of_measurement: "mb"
      sensehat_humidity:
        value_template: "{{ states('sensor.humidity') | round(1) }}"
        unit_of_measurement: "%"
```

{% endraw %}

#### Give the values friendly names & icons

Add the following to your `customize`:

```yaml
# Example configuration.yaml entry
customize:
  sensor.sensehat_temperature:
    icon: mdi:thermometer
    friendly_name: "Temperature"
  sensor.sensehat_humidity:
    icon: mdi:weather-rainy
    friendly_name: "Humidity"
  sensor.sensehat_pressure:
    icon: mdi:gauge
    friendly_name: "Pressure"
```

#### Create a group

Add the following to your `groups`:

```yaml
# Example configuration.yaml entry
group:
  sense_hat:
    name: Sense HAT
    entities:
      - sensor.sensehat_temperature
      - sensor.sensehat_humidity
      - sensor.sensehat_pressure
```

Add the sense_hat group (_Kitchen for example_)

```yaml
# Example configuration.yaml entry
group:
  kitchen:
    - group.sense_hat
```

### Directions for installing on Raspberry Pi Raspbian Based installation:

Here are the steps to make the _SenseHAT_ sensor work _successfully_ with the virtual environment versions.

#### Install SenseHAT package to _homeassistant_venv_

```bash
# switch to the homeassistant_venv environment
sudo -u homeassistant -H -s
source /srv/homeassistant/homeassistant_venv/bin/activate

# install the sense-hat lib
pip3 install sense-hat
# be patient, this will take a long while
```

#### Return to `pi`

Type `exit` to quit out of the _homeassistant_venv_ back to your `pi` environment.

As all of the following steps should be under the `pi` user environment.

#### Install _RTIMU_

```bash
# pi user environment: Install RTIMU
pip3 install rtimulib

# pi user environment: Add _homeassistant_ user to the _input_, _video_ and the _i2c_ groups
sudo addgroup homeassistant input
sudo addgroup homeassistant i2c
sudo addgroup homeassistant video

# HA environment: Add symlink to RTIMU
ln -s /usr/lib/python3/dist-packages/RTIMU.cpython-35m-arm-linux-gnueabihf.so /srv/homeassistant/lib/python3.5/site-packages/

# pi user environment: Reboot Raspberry Pi to apply changes
sudo reboot
```

Unfortunately enabling the SenseHAT Sensor integration for a Virtual Environment install of Home Assistant fails with errors.
_(The Raspberry Pi All-In-One installer run Home Assistant in an virtual environment)._
These issues have been discussed in the repository issue [#5093](https://github.com/home-assistant/home-assistant/issues/5093)

This fix has been tested with a clean install of:

* [Raspbian Jessie - version January 2017](https://downloads.raspberrypi.org/raspbian/images/raspbian-2017-01-10/)

and

* Home Assistant 0.37.1

For setting up the Sense HAT's RGB LED matrix as lights within Home Assistant, please see the [Sense HAT light component](#light).
