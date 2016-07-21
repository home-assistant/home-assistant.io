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
So, part 1 of [ESP8266 and MicroPython]() was pretty lame, right? Instead of get information out of Home Assistant we are going a step forward. Some of the buzz words are "Sensor", "MQTT", and "Button". 

<!--more-->

Beside HTTP POST requests, MQTT is the quickest way (from the author's point of view) to publish information with DIY devices. 

You have to make a decision: Do you want to pull or to poll? For slowly changing values like temperature it's perfectly fine to wait a couple of seconds to retrieve the value. If it's a motion detector the state change should be available instantly. This means the sensor must take initiative. 

An example for pulling is [aREST](/components/sensor.arest/). This is a great way to work with the ESP8266 based units and the Ardunio IDE. 

Let's do a HTTP POST first with MicroPython. The `curl` command should a new value `"value=23"` as POST to an API endpoint called `/sensor2`.

```bash
$ curl -X POST -d "value=23" http://192.168.1.18:5000/sensor2
```

The conversion of the `curl` command to use with `urequests` is very simple. Basically it's a one-liner but splitted to be easier to read.
 
```python
>>> import urequests
>>> url = 'http://192.168.1.18:5000/sensor2'
>>> headers = {'content-type': 'application/json'}
>>> data = '{"value": 23}'
>>> resp = urequests.post(url, data=data, headers=headers)
>>> print(resp.json())
{'name': 'Sensor2', 'value': 23}
>>> resp1 = urequests.get(url, headers=headers)
>>> print(resp1.json())
{'name': 'Sensor2', 'value': 23}
```

I think that with this piece of information you should be able to use the [Home Assistant RESTful API](/developers/rest_api/).

Now, MQTT. You can find simple examples for publishing and subscribing for MQTT in the [MicroPython](https://github.com/micropython/micropython-lib) library overview in the section for [umqtt](https://github.com/micropython/micropython-lib/tree/master/umqtt.simple). 

[@davea](https://github.com/davea) created [sonoff-mqtt](https://github.com/davea/sonoff-mqtt). This code will work on ESP8622 based devices too. The example below is adopted from the work of [@davea](https://github.com/davea) as we don't want to re-invent the wheel.


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

One disadvantage of the ESP8266 boards is that there is only one analog input. If you are using DHT11, Dallas 18S20, or other sensors you can work out this limitation.

