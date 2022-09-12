---
title: "ESP8266 and MicroPython - Part 2"
description: "Using MicroPython and MQTT on ESP8266 based devices and Home Assistant."
date: 2016-08-31 06:17:25 +0200
date_formatted: "August 31, 2016"
author: Fabian Affolter
categories: How-To MQTT ESP8266 Micropython
og_image: /images/blog/2016-07-micropython/social.png
---

<img src='/images/blog/2016-07-micropython/micropython.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
So, part 1 of [ESP8266 and MicroPython](/blog/2016/07/28/esp8266-and-micropython-part1/) was pretty lame, right? Instead of getting information out of Home Assistant we are going a step forward and create our own sensor which is sending details about its state to a Home Assistant instance.

<!--more-->

Beside [HTTP POST](https://en.wikipedia.org/wiki/POST_(HTTP)) requests, MQTT is the quickest way (from the author's point of view) to publish information with DIY devices.

You have to make a decision: Do you want to pull or to [poll](https://en.wikipedia.org/wiki/Polling_(computer_science)) the information for the sensor? For slowly changing values like temperature it's perfectly fine to wait a couple of seconds to retrieve the value. If it's a motion detector the state change should be available instantly in Home Assistant or it could be missed. This means the sensor must take initiative and send the data to Home Assistant.

An example for pulling is [aREST](/integrations/arest#sensor). This is a great way to work with the ESP8266 based units and the Ardunio IDE.

## MQTT

You can find a simple examples for publishing and subscribing with MQTT in the [MicroPython](https://github.com/micropython/micropython-lib) library overview in the section for [umqtt](https://github.com/micropython/micropython-lib/tree/master/micropython/umqtt.simple).

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

Subscribe to the topic `home/#` or create a [MQTT sensor](/integrations/sensor.mqtt/) to check if the sensor values are published.

```bash
mosquitto_sub -h 192.168.1.19 -v -t "home/#"
```

```yaml
sensor:
  - platform: mqtt
    state_topic: "home/esp8266_[last part of the MAC address]"
    name: "MicroPython"
```

[@davea](https://github.com/davea) created [sonoff-mqtt](https://github.com/davea/sonoff-mqtt). This code will work on ESP8622 based devices too and shows how to use a button to control a relay.
