---
layout: post
title: "ESP8266 and MicroPython - Part 2"
description: "Export, process, and visualize data stored by Home Assistant."
date: 2016-07-25 06:00:00 +0200
date_formatted: "July 25, 2016"
author: Fabian Affolter
comments: true
categories: How-To
og_image: /images/blog/2016-07-micropython/social.png
---

<img src='/images/blog/2016-07-micropython/micropython.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
So, part 1 of [ESP8266 and MicroPython]() was pretty lame, right? Instead of getting information out of Home Assistant we are going a step forward and create our own sensor which is sending details about its state to a Home Assistant instance.

<!--more-->

Beside HTTP POST requests, MQTT is the quickest way (from the author's point of view) to publish information with DIY devices. 

You have to make a decision: Do you want to pull or to poll? For slowly changing values like temperature it's perfectly fine to wait a couple of seconds to retrieve the value. If it's a motion detector the state change should be available instantly. This means the sensor must take initiative. 

An example for pulling is [aREST](/components/sensor.arest/). This is a great way to work with the ESP8266 based units and the Ardunio IDE. 

#### {% linkable_title HTTP POST %}

A [HTTP sensor](/components/sensor.http/) is the perfect starting point because there is no configuration needed for Home Assistant. The sensor's name is `sensor.kitchen_temperature` which will give us the endpoint `http://IP_ADDRESS:8123/api/states/sensor.kitchen_temperature`. For 

The `curl` command will update the temperature or create the HTTP sensor.

```bash
$ curl -X POST -H "x-ha-access: YOUR_PASSWORD" \
       -H "Content-Type: application/json" \
       -d '{"state": "23", "attributes": {"friendly_name": "Kitchen Temperature", "unit_of_measurement": "°C"}}' \
       http://IP_ADDRESS:8123/api/states/sensor.kitchen_temperature
```

If your ESP8266 is still running with the code from Part 1 then the LED should be set to high. 

Let's do a HTTP POST with MicroPython. The conversion of the `curl` command to use with `urequests` is very simple. Basically it's a one-liner but splitted to be easier to read and identical to Python's [Requests](http://docs.python-requests.org/en/latest/) module.
 
```python
>>> import urequests
>>> url = 'http://IP_ADDRESS:8123/api/states/sensor.kitchen_temperature'
>>> headers = {'x-ha-access': API_PASSWORD, 'content-type': 'application/json'}
>>> data = '{"state": "15", "attributes": {"friendly_name": "Kitchen Temperature", "unit_of_measurement": "°C"}}'
>>> resp = urequests.post(url, data=data, headers=headers)
>>> print(resp.json())

Bääähhhh: NotImplementedError: Redirects not yet supported
```

For additional information check the [Home Assistant RESTful API documentation](/developers/rest_api/).

### {% linkable_title MQTT %}

You can find simple examples for publishing and subscribing with MQTT in the [MicroPython](https://github.com/micropython/micropython-lib) library overview in the section for [umqtt](https://github.com/micropython/micropython-lib/tree/master/umqtt.simple). 

The example below is adopted from the work of [@davea](https://github.com/davea) as we don't want to re-invent the wheel. The configuration feature is crafty and simplyfies the code with the usage of a file called `/config.json` which stores the configuration details. The ESP8266 device will send the value of a pin every 5 seconds.


```python
import machine
import time
import ubinascii
import webrepl

from umqtt.simple import MQTTClient

# These defaults are overwritten with the contents of /config.json by load_config()
CONFIG = {
    "broker": "192.168.1.19",
    "sensor_pin": 0, 
    "client_id": b"esp8266_" + ubinascii.hexlify(machine.unique_id()),
    "topic": b"home",
}

client = None
sensor_pin = None

def setup_pins():
    global sensor_pin
    sensor_pin = machine.ADC(CONFIG['sensor_pin'])

def load_config():
    import ujson as json
    try:
        with open("/config.json") as f:
            config = json.loads(f.read())
    except (OSError, ValueError):
        print("Couldn't load /config.json")
        save_config()
    else:
        CONFIG.update(config)
        print("Loaded config from /config.json")

def save_config():
    import ujson as json
    try:
        with open("/config.json", "w") as f:
            f.write(json.dumps(CONFIG))
    except OSError:
        print("Couldn't save /config.json")

def main():
    client = MQTTClient(CONFIG['client_id'], CONFIG['broker'])
    client.connect()
    print("Connected to {}".format(CONFIG['broker']))
    while True:
        data = sensor_pin.read()
        client.publish('{}/{}'.format(CONFIG['topic'],
                                          CONFIG['client_id']),
                                          bytes(str(data), 'utf-8'))
        print('Sensor state: {}'.format(data))
        time.sleep(5)

if __name__ == '__main__':
    load_config()
    setup_pins()
    main()
```

Subscribe to the topic `home/#` or create a [MQTT sensor](/components/sensor.mqtt/) to check if the sensor values are published.

```bash
$ mosquitto_sub -h 192.168.1.19 -v -t "home/#"
```

```yaml
sensor:
  - platform: mqtt
    state_topic: "home/esp8266_[last part of the MAC address]"
    name: "MicroPython"
```

[@davea](https://github.com/davea) created [sonoff-mqtt](https://github.com/davea/sonoff-mqtt). This code will work on ESP8622 based devices too and shows how to use a button to control a relay.

