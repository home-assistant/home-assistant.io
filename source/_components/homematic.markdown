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
---


The [Homematic](http://www.homematic.com/) component provides bi-directional communication of Homematic platforms with their real world counterparts. 

Device support is currently available for most of:

- Switch/Dimmer-actors
- Thermostats
- Rollershutters
- Sensors (shutter contacts, motion detectors, power meters and more)
- Simple remote controls

If you want to see if a specific device you have is supported, head over to the [pyhomematic](https://github.com/danielperna84/pyhomematic/tree/master/pyhomematic/devicetypes) repository and browse through the sourcecode. A dictionary with the device identifiers (e.g. HM-Sec-SC-2) can be found within the relevant modules near the bottom.

We automatically detect all devices we currently support and try to generate useful names. If you enable name-resolving, we try to fetch names from Metadata (Homegear) and the XML-API you may have installed on your CCU. Since this may fail you can disable this feature.
You can manually override the created entities be using using Home Assistants [Customizing](https://home-assistant.io/getting-started/customizing-devices/) feature. You probably want to do this, because some devices are not useful within the UI, so you can hide them this way.

To set up the component, add the following information to your `configuration.yaml` file:

```yaml
homematic:
  local_ip: 127.0.0.1
  local_port: 8943
  remote_ip: 127.0.0.1
  remote_port: 2001
```

Configuration variables:

- **local_ip** (*Required*): IP of device running Home Assistant
- **local_port** (*Optional*): Port for connection with Home Assistant. Defaults to 8943.
- **remote_ip** (*Required*): IP of CCU/Homegear
- **remote_port** (*Required*): Port of Homegear/CCU XML-RPC Server (usually 2001)
- **resolvenames** (*Optional*): <True/False> Try to fetch device names from HM-CFG-LAN metadata or XML-API on CCU. Defaults to `False`.
- **delay** (*Optional*): <Float> Delay fetching of current state per deivce. Useful to prevent overloading CCU when initially fetching device states. Defaults to 0.5.

To further explain the `resolvenames` option:
We use two approaches to fetch the names of devices. Either one assumes you have properly named your devices in your existing Homematic setup.

1. Using the metadata devices internally have. When using a HM-CFG-LAN interface, you typically use a configuration software ("HomeMatic-Komponenten konfigurieren" is the name of the shortcut on your desktop by default) to pair and configure your devices. If you have paired devices, you'll see them listed in a table. The leftmost column (Name) is prefilled with default names. You can click such a name and enter whatever you like. But you should Stick to ASCII. So rather use _Kueche_ instead of _Küche_. Which also makes sense because the entity-names in HA are ASCII as well.
2. If you use a regular CCU, there is an add-on called the "XML-API". With it installed, you are generally able to fetch all kinds of information from you CCU using XML-RPC. We can leverage this and fetch the names of devices set within the CCU. For some reason the CCU does NOT save the names to the metadata, so we have to use this workaround. Doing this via JSON-RPC (which all CCUs have) is planned for a future release.
