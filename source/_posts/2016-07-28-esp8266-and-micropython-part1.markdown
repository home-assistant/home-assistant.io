---
title: "ESP8266 and MicroPython - Part 1"
description: "Using MicroPython on ESP8266 based devices and Home Assistant."
date: 2016-07-28 06:00:00 +0200
date_formatted: "July 28, 2016"
author: Fabian Affolter
categories: How-To ESP8266 Micropython
og_image: /images/blog/2016-07-micropython/social.png
---

<img src='/images/blog/2016-07-micropython/micropython.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
The first release of Micropython for ESP8266 was delivered a couple of weeks ago. The [documentation](http://docs.micropython.org/en/latest/) covers a lot of ground. This post is providing only a little summary which should get you started.

Until a couple of weeks ago, the pre-built MicroPython binary for the ESP8266 was only available to backers of the Kickstarter campaign. This has changed now and it is available to the public for [download](https://micropython.org/download/#esp8266).

<!--more-->

The easiest way is to use [esptool.py](https://github.com/espressif/esptool) for firmware handling tasks. First erase the flash:

```bash
$ sudo python esptool.py --port /dev/ttyUSB0 erase_flash
esptool.py v1.0.2-dev
Connecting...
Erasing flash (this may take a while)...
```

and then load the firmware. You may adjust the file name of the firmware binary.

```bash
$ sudo python esptool.py --port /dev/ttyUSB0 --baud 460800 write_flash --flash_size=8m 0 esp8266-2016-07-10-v1.8.2.bin
esptool.py v1.2-dev
Connecting...
Running Cesanta flasher stub...
Flash params set to 0x0020
Writing 540672 @ 0x0... 540672 (100 %)
Wrote 540672 bytes at 0x0 in 13.1 seconds (330.8 kbit/s)...
Leaving...
```

Now reset the device. You should then be able to use the [REPL (Read Evaluate Print Loop)](http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/repl.html#getting-a-micropython-repl-prompt). On Linux there is `minicom` or `picocom`, on a Mac you can use `screen` (eg. `screen /dev/tty.SLAB_USBtoUART 115200`), and on Windows there is Putty to open a serial connection and get the REPL prompt.

The [WebREPL](http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/repl.html#webrepl-a-prompt-over-wifi) work over a wireless connection and allows easy access to a prompt in your browser. An instance of the WebREPL client is hosted at [http://micropython.org/webrepl](http://micropython.org/webrepl). Alternatively, you can create a local clone of their [GitHub repository](https://github.com/micropython/webrepl). This is necessary if your want to use the command-line tool `webrepl_cli.py` which is mentionend later in this post.

```bash
$ sudo minicom -D /dev/ttyUSB0
#4 ets_task(4020e374, 29, 3fff70e8, 10)
WebREPL daemon started on ws://192.168.4.1:8266
Started webrepl in setup mode
could not open file 'main.py' for reading

#5 ets_task(4010035c, 3, 3fff6360, 4)
MicroPython v1.8.2-9-g805c2b9 on 2016-07-10; ESP module with ESP8266
Type "help()" for more information.
>>>
```

{% note %}

The public build of the firmware may be different than the firmware distributed to the backers of the Kickstarter campaign. Especially in regard of the [available modules](http://docs.micropython.org/en/latest/esp8266/quickref.html), turned on debug messages, and alike. Also, the WebREPL may not be started by default.

{% endnote%}

Connect a LED to pin 5 (or another pin of your choosing) to check if the ESP8266 is working as expected.

```python
>>> import machine
>>> pin = machine.Pin(5, machine.Pin.OUT)
>>> pin.high()
```

You can toogle the LED by changing its state with `pin.high()` and `pin.low()`.

Various ESP8266 development board are shipped with an onboard photocell or a light dependent resistors (LDR) connected to the analog pin of your ESP8266 check if you are able to obtain a value.

```python
>>> import machine
>>> brightness = machine.ADC(0)
>>> brightness.read()
```

Make sure that you are familiar with REPL and WebREPL because this will be needed soon. Keep in mind the password for the WebREPL access.

Read the [instructions](http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/network_basics.html) about how to setup your wireless connection. Basically you need to upload a `boot.py` file to the microcontroller and this file is taking care of the connection setup. Below you find a sample which is more or less the same as shown in the [documentation](http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/network_basics.html#configuration-of-the-wifi).

```python
def do_connect():
    import network

    SSID = 'SSID'
    PASSWORD = 'PASSWORD'

    sta_if = network.WLAN(network.STA_IF)
    ap_if = network.WLAN(network.AP_IF)
    if ap_if.active():
        ap_if.active(False)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(SSID, PASSWORD)
        while not sta_if.isconnected():
            pass
    print('Network configuration:', sta_if.ifconfig())
```

Upload this file with `webrepl_cli.py` or the WebREPL:

```bash
python webrepl_cli.py boot.py 192.168.4.1:/boot.py
```

If you reboot, you should see your current IP address in the terminal.

```bash
>>> Network configuration: ('192.168.0.10', '255.255.255.0', '192.168.0.1', '192.168.0.1')
```

First let's create a little consumer for Home Assistant sensor's state. The code to place in `main.py` is a mixture of code from above and the [RESTful API](https://developers.home-assistant.io/docs/api/rest/) of Home Assistant. If the temperature in the kitchen is higher than 20 °C then the LED connected to pin 5 is switched on. 

{% warning %}

If a module is missing then you need to download it from the [MicroPython Library overview](https://github.com/micropython/micropython-lib) and upload it to the ESP8266 with `webrepl_cli.py` manually.

{% endwarning %}

```python
# Sample code to request the state of a Home Assistant entity.

API_PASSWORD = 'YOUR_PASSWORD'
URL = 'http://192.168.0.5:8123/api/states/'
ENTITY = 'sensor.kitchen_temperature'
TIMEOUT = 30
PIN = 5

def get_data():
    import urequests
    url = '{}{}'.format(URL, ENTITY)
    headers = {'x-ha-access': API_PASSWORD,
               'content-type': 'application/json'}
    resp = urequests.get(URL, headers=headers)
    return resp.json()['state']

def main():
    import machine
    import time

    pin = machine.Pin(PIN, machine.Pin.OUT)
    while True:
        try:
            if int(get_data()) >= 20:
                pin.high()
            else:
                pin.low()
        except TypeError:
            pass
        time.sleep(TIMEOUT)

if __name__ == '__main__':
    print('Get the state of {}'.format(ENTITY))
    main()
```

Upload `main.py` the same way as `boot.py`. After a reboot (`>>> import machine` and `>>> machine.reboot()`) or power-cycling your physical notifier is ready.

If you run into trouble, press "Ctrl+c" in the REPL to stop the execution of the code, enter `>>> import webrepl` and `>>> webrepl.start()`, and upload your fixed file.
