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

Beside HTTP POST requests, MQTT is the quickest way (from the author's point of view) to publish information with DIY devices. You have to make a decision: Do you want to pull or to poll? For slowly changing values like temperature it's perfectly fine to wait a couple of seconds to retrieve the value. If it's a motion detector the state change should be available instantly. This means the sensor must take initiative. 

For pulling [aREST] is a great way to work with the ESP8266 based units if you want to work with the Ardunio IDE. 

One disatantavege of the ESP8266 boards is that there is only one analog input. If you are using DHT11, Dallas 18S20, or 

You can find simple examples for publishing and subscribing for [MQTT](https://github.com/micropython/micropython-lib/tree/master/umqtt.simple) in the [MicroPython](https://github.com/micropython/micropython-lib) library overview. 

[@davea](https://github.com/davea) created [sonoff-mqtt](https://github.com/davea/sonoff-mqtt). This code will work on ESP8622 too. Below you find an example based on the work of [@davea](https://github.com/davea). 


```python
import machine
import time
import ubinascii as binascii
import webrepl

from umqtt.simple import MQTTClient

# These defaults are overwritten with the contents of /config.json by load_config()
CONFIG = {
    "broker": "10.100.0.31",
    "sensor_pin": 0, 
    "client_id": b"esp8266_" + binascii.hexlify(machine.unique_id()),
    "topic": b"home",
    "state_topic": b"state",
}

client = sensor_pin = None

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

def setup():
    load_config()
    setup_pins()

def main():
    client = MQTTClient(CONFIG['client_id'], CONFIG['broker'])
    client.connect()
    print("Connected to {}".format(CONFIG['broker']))
    while True:
        data = sensor_pin.read()
        client.publish(b'{}/{}/{}'.format(CONFIG['topic'],
                                          CONFIG['client_id'],
                                          CONFIG['state_topic']),
                                          bytes(str(data), 'utf-8'))
        print('Sensor state: {}'.format(data))
        time.sleep(5)

if __name__ == '__main__':
    setup()
    main()
```




