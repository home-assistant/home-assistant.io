---
title: "Home Assistant and The Things Network (TTN)"
description: "How to use transfer MQTT messages from The Things Network (TTN) to a local broker."
date: 2017-11-10 14:00:00 +0200
date_formatted: "November 10, 2017"
author: Fabian Affolter
author_twitter: fabaff
categories: How-To
og_image: /images/blog/2017-11-mqtt-ttn/social-ha-ttn.png
---

The Home Assistant integration for [The Things Network (TTN)](https://www.thethingsnetwork.org/) uses their [Storage](https://www.thethingsnetwork.org/docs/applications/storage/) feature to get the sensor data. The easiest way to observe TTN sensors would be [MQTT](https://www.thethingsnetwork.org/docs/applications/mqtt/) as it doesn't requires any additional configuration.

At the moment Home Assistant only supports one [MQTT broker](/docs/mqtt/). This means that you can't subscribe to topics which are located on different brokers.

<!--more-->

## Subscribe to the TTN Broker

To check what your devices are sending, subscribe to the topic `+/devices/+/up` with a command-line tool like `mosquitto_sub`. The `<Region>` is the postfix of the **Handler** entry in your **Application overview**. `<AppID>` is the **Application ID** and `<AppKey>` is your access key. 

```bash
$ mosquitto_sub -v -h <Region>.thethings.network -t '+/devices/+/up' -u '<AppID>' -P '<AppKey>'
{
    "app_id": "ha-demo",
    "dev_id": "device01",
    "hardware_serial": "AJDJENDNHRBFBBT",
    "port": 1,
    [...]
```

The payload contains details about the device itself and the sensor data. The sensor data is stored in `payload_fields`. Depending on the device configuration it may contain a single value or multiple values.

## The relay

To be able to work locally with the MQTT data that is received from the devices connected to TTN, we need to transfer it to the local broker. With this simple script below all messages from a given device are re-published on your local MQTT broker after they are received. Modify the script with your details as outlined in the previous section.

```python
"""Relay MQTT messages from The Things Network to a local MQTT broker."""
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

DEVICE_NAME = '<DeviceID>'

TTN_BROKER = '<Region>.thethings.network'
TTN_USERNAME = '<AppID>'
TTN_PASSWORD = '<AppKey>'
TTN_TOPIC = '+/devices/{}/up'.format(DEVICE_NAME)

LOCAL_BROKER = '192.168.0.2'
LOCAL_TOPIC = 'home/ttn/garden_temp'


def on_connect(client, userdata, flags, rc):
    """Subscribe to topic after connection to broker is made."""
    print("Connected with result code", str(rc))
    client.subscribe(TTN_TOPIC)


def on_message(client, userdata, msg):
    """Relay message to a different broker."""
    publish.single(
        LOCAL_TOPIC, payload=msg.payload, qos=0, retain=False,
        hostname=LOCAL_BROKER, port=1883, client_id='ttn-local',
        keepalive=60, will=None, auth=None, tls=None, protocol=mqtt.MQTTv311)


client = mqtt.Client()
client.username_pw_set(TTN_USERNAME, password=TTN_PASSWORD)
client.on_connect = on_connect
client.on_message = on_message
client.connect(TTN_BROKER, 1883, 60)

client.loop_forever()
```

Save it and run it. As soon as a MQTT message is received from your device you should see it on your local broker (here 192.168.0.2) if you subscribe to `#` or the topic given in the script above `home/ttn/garden_temp`.

```bash
mosquitto_sub -h 192.168.0.2 -t "#" -d
```

## The sensor

All we would need now, is a [`mqtt` sensor](/integrations/sensor.mqtt/) with a `value_template`. With a sophisticated custom sensor it would be possible to displaying a little more than just the state. The device is only sending the temperature `{"temperature": 7.5}` but there are other details available which the sensor should show.

```python
"""Support for The Things Network MQTT sensors."""
import asyncio
from datetime import timedelta
import json
import logging

import voluptuous as vol

import homeassistant.components.mqtt as mqtt
from homeassistant.components.mqtt import CONF_STATE_TOPIC
from homeassistant.const import CONF_NAME, CONF_UNIT_OF_MEASUREMENT
from homeassistant.core import callback
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.entity import Entity

_LOGGER = logging.getLogger(__name__)

DEFAULT_NAME = 'MQTT TTN Sensor'
DEFAULT_FORCE_UPDATE = False
DEPENDENCIES = ['mqtt']

PLATFORM_SCHEMA = mqtt.MQTT_RO_PLATFORM_SCHEMA.extend({
    vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
    vol.Optional(CONF_UNIT_OF_MEASUREMENT): cv.string,

})


@asyncio.coroutine
def async_setup_platform(hass, config, async_add_devices, discovery_info=None):
    """Set up the TTN MQTT Sensor."""
    async_add_devices([MqttTtnSensor(
        config.get(CONF_NAME), config.get(CONF_STATE_TOPIC),
        config.get(CONF_UNIT_OF_MEASUREMENT))
    ])


class MqttTtnSensor(Entity):
    """Representation of a sensor."""

    def __init__(self, name, state_topic, unit_of_measurement):
        """Initialize the sensor."""
        self._state = None
        self._name = name
        self._unit_of_measurement = unit_of_measurement
        self._attributes = {}
        self._state_topic = state_topic

    def async_added_to_hass(self):
        """Subscribe to MQTT events."""
        @callback
        def message_received(topic, payload, qos):
            """Handle new MQTT messages."""

            try:
                data = json.loads(payload)
            except json.JSONDecodeError:
                _LOGGER.error("Invalid JSON data received: %s", data)

            self._state = data['payload_fields'][next(
                iter(data['payload_fields']))]
            self._attributes = data
            del self._attributes['payload_fields']
            del self._attributes['metadata']
            self.async_schedule_update_ha_state()

        return mqtt.async_subscribe(
            self.hass, self._state_topic, message_received, 0)

    @property
    def should_poll(self):
        """No polling needed."""
        return False

    @property
    def name(self):
        """Return the name of the sensor."""
        return self._name

    @property
    def unit_of_measurement(self):
        """Return the unit this state is expressed in."""
        return self._unit_of_measurement

    @property
    def state_attributes(self):
        """Return the attributes of the entity."""
        return self._attributes

    @property
    def state(self):
        """Return the state of the entity."""
        return self._state
```

Store it in `<config_dir>/custom_components/sensor/mqtt_ttn.py` and it will handle the messages.

## The configuration

Now create the [`mqtt_ttn` sensor](/integrations/sensor.mqtt/) entry for your device.

```yaml
sensor:
  - platform: mqtt_ttn
    name: TTN Sensor
    state_topic: "home/ttn/garden_temp"
```

This solution is not production-ready, scalable or stable but it could fill the gape till Home Assistant is able to connect to multiple MQTT brokers. If you have multiple devices relay all messages to your local broker and add a configuration variable to `mqtt_ttn` sensor which allows you to select the device.
