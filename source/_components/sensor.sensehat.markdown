---
layout: page
title: "Sense HAT"
description: "Instructions how to integrate Sense HAT within Home Assistant."
date: 2016-12-05 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: sense-hat.png
ha_category: Sensor
ha_release: 0.35
ha_iot_class: "Local Push"
---


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
    is_hat_attached: True|False
```

Configuration variables:

- **display_options** (*Requires*) array: List of details to monitor. Defaults is `memory_free`.
  - 'temperature'
  - 'humidity'
  - 'pressure'
  is_hat_attached (Optional): True|False boolean; True declares the SenseHAT _is_ physically on the Raspberry Pi

### {% linkable_title Installation instruction for the All-In-One installer and HASSbian %}

Here are the steps to make the Sense HAT sensor work with a virtual environment.

Install SenseHAT package. Switch to the `homeassistant_venv` directory and activate the virtual environment.

```bash
$ sudo su -s /bin/bash homeassistant
$ source /srv/homeassistant/homeassistant_venv/bin/activate
```

Install the `sense-hat` module.

```bash
$ pip3 install sense-hat
```

Please be patient, this will take a long while...

Type `exit` to quit out of the _homeassistant_venv_ back to your `pi` environment. As all of the following steps should be under the `pi` user environment.

Install the [RTIMU](https://github.com/RPi-Distro/RTIMULib) Python module:

```bash
$ pip3 install rtimulib
```

Add symlink to RTIMU in `homeassistant_venv` directory. Create a symlink using the following command:

```bash
$ ln -s /usr/lib/python3/dist-packages/RTIMU.cpython-34m-arm-linux-gnueabihf.so /srv/homeassistant/homeassistant_venv/lib/python3.4/
```

Add `homeassistant` user to the `input` and the `i2c` groups.

```bash
$ sudo addgroup homeassistant input
$ sudo addgroup homeassistant i2c
```

Reboot Raspberry Pi to apply changes.

```bash
$ sudo reboot
```

### {% linkable_title Customizing the Sense HAT data %}

To format the sensor values, add the following to your `sensor` entry in your `configuration.yaml` file.

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
        value_template: '{% raw %}{{ states.sensor.temperature.state | round(1) }}{% endraw %}'
        unit_of_measurement: '°C'
      sensehat_pressure:
        value_template: '{% raw %}{{ states.sensor.pressure.state | round(1) }}{% endraw %}'
        unit_of_measurement: 'mb'
      sensehat_humidity:
        value_template: '{% raw %}{{ states.sensor.humidity.state | round(1) }}{% endraw %}'
        unit_of_measurement: '%'
```

Add the following to your `customize` section to set friendly names & icons for the values.

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

Create a group for your Sense HAT details by adding the following to your `groups` section.

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

Add the _sense_hat group_ a group (_Kitchen for example_)

```yaml
# Example configuration.yaml entry
group:
  kitchen:
    - group.sense_hat
```

