---
layout: page
title: "Snips.ai"
description: "Enhance your Hass.io installation with a local voice assistant."
date: 2018-03-22 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

[Snips.ai] is an AI-powered voice assistant that runs on the Raspberry Pi 3 and x86 platforms. It runs on-device and is Private by Design.

The Snips add on depends on the Mosquitto add on to bridge to Home Assistannt, so make sure that is installed.

HomeAssistant comes with certaion Intents builtin to handle common tasks. A complete list of Intents can be found in this wiki [Hass Snips Bundle](https://github.com/tschmidty69/hass-snips-bundle-intents/wiki).

The Snips addon by default comes with an assistant that allows you to turn on lights or switches, open covers, or add and list items to a shopping list if that component is enabled.

If using a USB microphone and speakers plugged into the raspberry pi output, Snips will work without any change to the configuration. Trying saying things like:
```
Turn on kitchen light
Open garage door
What is on my shopping list
```

To get started creating your own configuratiom, follow [their tutorial](https://github.com/snipsco/snips-platform-documentation/wiki/2.-Create-an-assistant-using-an-existing-bundle) to create an assistant and download the training data. You can add the HomeAssistant bundle to your assistant to enable the built in intents, and add or create your own intents to do more complex tasks.

Now install and activate the [Samba] add-on so you can upload your training data. Connect to the "share" Samba share and copy your training data over. Name the file `assistant.zip`.

Now it's time to start Snips for the first time. When the Snips add-on starts, it will output your audio devices. If you using a USB mic and the raspberry pi output, you won't need to change anything:

```text
**** List of PLAYBACK Hardware Devices ****
card 0: ALSA [bcm2835 ALSA], device 0: bcm2835 ALSA [bcm2835 ALSA]
  Subdevices: 8/8
  Subdevice #0: subdevice #0
  Subdevice #1: subdevice #1
  Subdevice #2: subdevice #2
  Subdevice #3: subdevice #3
  Subdevice #4: subdevice #4
  Subdevice #5: subdevice #5
  Subdevice #6: subdevice #6
  Subdevice #7: subdevice #7
card 0: ALSA [bcm2835 ALSA], device 1: bcm2835 ALSA [bcm2835 IEC958/HDMI]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

You need to use this information to point the add-on at the right speakers and microphone. The information describes different cards and devices. On a Raspberry Pi 3, card 0 - device 0 is the built-in headset port, card 0 - device 1 is the HDMI port. In the example above, the USB microphone showed up as card 1 - device 0.

Find the microphone and speakers that you want to use and note down their device and card number. We will need that to configure the add-on options `mic` (microphone to use) and `speaker` (speaker to use). The format for these options is `<card #>,<device #>`. Change the configuration options and click save.

Now start the add-on.

### Add-On configuration

```json
{
  "mic": "1,0",
  "speaker": "1,0",
  "assistant": "assistant.zip",
  "mqtt_bridge": {
    "active": true,
    "host": "172.17.0.1",
    "port": 1883,
    "user": "",
    "password": ""
  },
}
```

Configuration variables:

- **mqtt_bridge** : Snips uses MQTT to communicate and defaults to their own broker. Use this config option to bridge their broker to your the Mosquitto add on.
- **mic**: This is the hardware address of your microphone. Look at the Snips output if you are using different hardware.

### {% linkable_title Home Assistant configuration %}

Use the Home Assistant [Snips.ai component][comp] to integrate the add-on into Home Assistant.

```yaml
snips:
```

[Snips.ai]: https://snips.ai/
[their tutorial]: https://github.com/snipsco/snips-platform-documentation/wiki/2.-Create-an-assistant-using-an-existing-bundle
[Samba]: /addons/samba/
[comp]: /components/snips/
