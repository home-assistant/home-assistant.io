---
layout: page
title: "Homematic"
description: "Instructions for integrating Homematic into Home Assistant."
date: 2016-06-28 23:25
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Hub
ha_iot_class: "Local Push"
featured: false
---


The [Homematic](http://www.homematic.com/) component provides bi-directional communication of Homematic platforms with their real world counterparts. This implementation does in no way modify your existing setup. Instead it queries your setup for its devices and subscribes to them to send and receive events.

Device support is currently available for most of:

- Switch/Dimmer-actors
- Thermostats
- Rollershutters
- Sensors (shutter contacts, motion detectors, power meters and more)
- Simple remote controls

If you want to see if a specific device you have is supported, head over to the [pyhomematic](https://github.com/danielperna84/pyhomematic/tree/master/pyhomematic/devicetypes) repository and browse through the sourcecode. A dictionary with the device identifiers (e.g. HM-Sec-SC-2) can be found within the relevant modules near the bottom.

We automatically detect all devices we currently support and try to generate useful names. If you enable name-resolving, we try to fetch names from Metadata (Homegear), via JSON-RPC or the XML-API you may have installed on your CCU. Since this may fail this is disabled by default.
You can manually override the created entities be using Home Assistants [Customizing](https://home-assistant.io/getting-started/customizing-devices/) feature. With it you are able to hide entities you don't need to see within the UI.

To set up the component, add the following information to your `configuration.yaml` file:

```yaml
homematic:
  local_ip: 127.0.0.1
```

Configuration variables:

- **local_ip** (*Required*): IP of device running Home Assistant
- **local_port** (*Optional*): Port for connection with Home Assistant. Defaults to 8943.
- **remote_ip** (*Required*): IP of CCU/Homegear
- **remote_port** (*Optional*): Port of Homegear/CCU XML-RPC Server (usually 2001)
- **resolvenames** (*Optional*): <metadata, json, xml> Try to fetch device names. Defaults to `False` if not specified.
- **username** (*Optional*): When fetching names via JSON-RPC, you need to specify a user with guest-access to the CCU.
- **password** (*Optional*): When fetching names via JSON-RPC, you need to specify the password of the user you have configured above.
- **delay** (*Optional*): <Float> Delay fetching of current state per deivce on startup. Used to prevent overloading of the CCU. Defaults to 0.5.
- **variables** (*Optional*): True or False if you want use CCU2/Homegear variables. Default False.

To further explain the `resolvenames` option:
We use three approaches to fetch the names of devices. Each assumes you have properly named your devices in your existing Homematic setup. As a general advice: Use ASCII for your devices names. Home Assistant won't include non-ASCII characters in entity-names.

1. The CCU allows to fetch details of the paired devices via JSON-RPC. For this to work you need to add valid credentials to your component-configuration. Guest-access is sufficient to query for device names.
2. If you use a regular CCU, there is an add-on called the "XML-API". With it installed, you are able to fetch all kinds of information from you CCU using XML-RPC. We can leverage this and fetch the names of devices set within the CCU. We don't support authentication with this method.
3. Homegear provides device-names through the metadata devices internally have. When using an HM-CFG-LAN interface, you typically use a configuration software ("HomeMatic-Komponenten konfigurieren" is the name of the shortcut on your desktop by default) to pair and configure your devices. If you have paired devices, you'll see them listed in a table. The leftmost column (Name) is prefilled with default names. You can click such a name and enter whatever you like.

Resolving names can take some time. So when you start Home Assistant you won't see you devices at first. For a setup with 20+ devices it can take up to a minute until all devices show up in the UI.

**Devices with buttons**

Devices with buttons (e.g. HM-Sen-MDIR-WM55, remote controls) may not be fully visible in the UI. This is intended, as buttons don't serve any value here and all they do is trigger events.
As an example:
The HM-Sen-MDIR-WM55 motion detector will be displayed as 2 entities. A motion sensor and a brightness sensor. On top of that we have 2 sets (one set per button) of 4 events: PRESS_SHORT, PRESS_LONG, PRESS_CONT, PRESS_LONG_RELEASE. Be aware, that there are devices which don't provide all of these events. But in general: if you can press it, it at least has PRESS_SHORT.
Here's an example of how to use these events for automations:

```yaml
automation:
   trigger:
     platform: event
     event_type: homematic.keypress
     event_data:
       name: Kitchen Switch
       channel: 1
       param: PRESS_SHORT
   action:
     service: switch.turn_on
     entity_id: switch.Kitchen_Ambience

```

The channel parameter is equal to the channel of the button you are configuring the automation for. You can view the available channels in the UI you use to pair your devices.
The name depends on if you chose to resolve names or not. If not, it will be the device ID (e.g. LEQ1234657). If you chose to resolve names (and that is successful), it will be the name you have set in your CCU or in the metadata (e.g. "Kitchen Switch").

**Other events**

*homematic.keypress*: See above.

*homematic.impulse*: For impulse sensors with event_data 'name' and 'channel'.

**Service**

*homematic/virtualkey*: Simulate a keypress on CCU/Homegear with device or virtual keys.

```yaml
...

action:
  service: homematic.virtualkey
  data:
    address: BidCoS-RF
    channel: 1
    param: PRESS_LONG
```

*homematic/set_value*: Set the value of a system variable.

```yaml
...

action:
  service: homematic.set_value
  data:
    entity_id: homematic.varname_bool
    value: true
```
