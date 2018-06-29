---
layout: page
title: "Sense HAT"
description: "Instructions on how to integrate Sense HAT within Home Assistant."
date: 2018-06-03 11:30
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
```

Configuration variables:

- **display_options** (*Requires*) array: List of details to monitor. Defaults is `memory_free`.
  - 'temperature'
  - 'humidity'
  - 'pressure'
  is_hat_attached (Optional): True|False boolean; Default value is True declaring that the SenseHAT _is_ physically on the Raspberry Pi


#### Customizing the Sense HAT data

**Format the sensor values**
Add the following to your `sensor`

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

**Give the values friendly names & icons**
Add the following to your `customize`

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

**Create a group**
Add the following to your `groups`

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


### Directions for installing on Raspberry Pi All-In-One installer and HASSbian:
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

###### Install _RTIMU_

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

Unfortunately enabling the SenseHAT Sensor component for a Virtual Environment install of Home-Assistant fails with errors.
_(The Raspberry Pi All-In-One installer and HASSbian both run Home-Assistant in an virtual environment)._
These issues have been discussed in the repository issue (#5093)[https://github.com/home-assistant/home-assistant/issues/5093)

This fix has been tested with a clean install of:

* [Raspbian Jessie - version January 2017](https://downloads.raspberrypi.org/raspbian/images/raspbian-2017-01-10/)

and

* [Home-Assistant 0.37.1](/getting-started/installation-raspberry-pi-all-in-one/)

For setting up the Sense HAT's RGB LED matrix as lights within Home Assistant, please see the [Sense HAT light component](/components/light.sensehat/).
