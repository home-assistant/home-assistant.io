---
layout: page
title: "QwikSwitch QSUSB Hub"
description: "Instructions how to integrate the QwikSwitch QSUSB Hub into Home Assistant."
date: 2016-05-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: qwikswitch.png
ha_category: Hub
featured: true
---


The `qwikswitch` component is the main component to integrate various [QwikSwitch](http://www.qwikswitch.co.za/) devices with Home Assistant.

Loading the `qwikswitch` component will automatically add all devices from the QS Mobile application. QS Mobile controls the QSUSB Modem device.

Currently QwikSwitch Relays and LED Dimmers are supported (tested). QwikSwitch Relay devices can be Switches or [Lights](/components/qwikswitch/lights/) in Home-Assistant. If the device name in the QSUSB app ends with ` Switch` it will be created as a Switch, otherwise a Light.

Example configuration:

```yaml
# Example configuration.yaml entry
qwikswitch:
   url: 'http://127.0.0.1:2020'
```

{% linkable_title QwikSwitch Buttons %}

QwikSwitch devices (i.e. Tranmitter Buttons) will fire events on the Home Assistant bus. These events can then be used as triggers for any `automation` action, as follows:

```yaml
automation:
  - alias: Action - Respond to button press
    trigger:
      platform: event
      event_type: qwikswitch.button.@12df34
```

`event_type` names should be in the format **qwikswitch.button.@__ID__**. where **@__ID__** will be captured in the Home Assistant log when pressing the button. Alternatively, you can also access the listen API call by going to 'http://127.0.0.1:2020/&listen' and then pressing the button.

Currently Event will be created for the following commands (cmd) value in the Listen packet:
- `TOGGLE` - Normal QwikSwitch Transmitter button
- `SCENE EXE` - QwikSwitch Scene Transmitter buttons
- `LEVEL` - QwikSwitch OFF Tranmitter buttons

Technically this could work for Keyfobs, Door Sensors and PIR Tranmitters as well.
