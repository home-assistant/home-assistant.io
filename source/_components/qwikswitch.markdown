---
layout: page
title: "QwikSwitch QSUSB Hub"
description: "Instructions on how to integrate the QwikSwitch QSUSB Hub into Home Assistant."
date: 2016-05-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: qwikswitch.png
ha_category: Hub
featured: false
ha_release: "0.20"
---


The `qwikswitch` component is the main component to integrate various [QwikSwitch](http://www.qwikswitch.co.za/) devices with Home Assistant.

Loading the `qwikswitch` component automatically adds all devices from the QS Mobile application. QS Mobile controls the QSUSB Modem device.

Currently QwikSwitch relays and LED dimmers are supported (tested). QwikSwitch relay devices can be [switches](/components/switch.qwikswitch/) or [lights](/components/light.qwikswitch/) in Home-Assistant. If the device name in the QSUSB app ends with ` Switch` it will be created as a switch, otherwise as a light.

Example configuration:

```yaml
# Example configuration.yaml entry
qwikswitch:
   url: http://127.0.0.1:2020
```

Configuration variables:

- **url** (*Required*): The URL including the port of your QwikSwitch hub.
- **dimmer_adjust** (*Optional*): A decimal value to adjust the brightness of the dimmer exponentially. Increasing this value allows dimmers that reaches full brightness with low values in QS Mobile to appear more linear in Home Assistant. Recommended values between 1 and 2 and the default is 1.
- **button_events** (*Optional*): A comma separated list of button types that will generate events. Details below.

### {% linkable_title QwikSwitch Buttons %}

QwikSwitch devices (i.e. transmitter buttons) will fire events on the Home Assistant bus. These events can then be used as triggers for any `automation` action, as follows:

```yaml
automation:
  - alias: Action - Respond to button press
    trigger:
      platform: event
      event_type: qwikswitch.button.@12df34
```

`event_type` names should be in the format **qwikswitch.button.@__ID__**. where **@__ID__** will be captured in the Home Assistant log when pressing the button. Alternatively, you can also get the device ID from the QS Mobile application or using the listen API call by browsing to `http://127.0.0.1:2020/&listen` and then pressing the button.

By default events will be fired if the value in the command (cmd) field of the listen packet equals:
- `TOGGLE` - Normal QwikSwitch Transmitter button
- `SCENE EXE` - QwikSwitch Scene Transmitter buttons
- `LEVEL` - QwikSwitch OFF Transmitter buttons

The list of recognized commands can be extended for Keyfobs, door sensors, and PIR transmitters with the **button_events** configuration option. **button_events** contain a comma separated list of commands that will fire Home Assistant events. By default it is: TOGGLE,SCENE EXE,LEVEL. 

If you would like to add an event point your browser at  `/&listen` and note the value in `{"cmd": "NEW.CMD", ...}`. You have to include the `NEW.CMD` with the defaults:
```
qwikswitch:
  url: ...
  button_events: TOGGLE,SCENE EXE,LEVEL,NEW.CMD
```

On some QS Mobile servers button events are only generated for switches added to the QS Mobile application, so it might be best to test button presses through the `/&listen` API
