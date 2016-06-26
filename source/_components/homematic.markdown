---
layout: page
title: "Homematic"
description: "Instructions for how to integrate Homematic device into Home Assistant."
date: 2016-06-23 17:54
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Hub
ha_iot_class: "Local Push"
---


The [Homematic](http://www.homematic.com/) component provides bi-directional communication of Homematic platforms with their real world counterparts. Setting up this component is mandatory to make use of Homematic devices within Home Assistant.
Additionally, you will have to configure each of your devices. Further information on how to setup specific devices can be found in the corresponding platform-documentation for Homematic devices on the right.

Device support is currently available for most of:

- Switch/Dimmer-actors
- Thermostats
- Rollershutters
- Sensors (shutter contacts, motion detectors, power meters and more)
- Simple remote controls

If you want to see if a specific device you have is supported, head over to the [pyhomematic](https://github.com/danielperna84/pyhomematic/tree/master/pyhomematic/devicetypes) repository and browse through the sourcecode. A dictionary with the device identifiers (e.g. HM-Sec-SC-2) can be found within the relevant modules near the bottom.

There are some devices which expose multiple functionalities. For example: The HM-Sen-MDIR-WM55 motion detector can be configured as 6 individual entities within HA.

1. Motion detector ([/components/binary_sensor.homematic/](binary_sensor platform))
2. Button 1 short press ([/components/binary_sensor.homematic/](binary_sensor platform))
3. Button 1 long press ([/components/binary_sensor.homematic/](binary_sensor platform))
4. Button 2 short press ([/components/binary_sensor.homematic/](binary_sensor platform))
5. Button 2 long press ([/components/binary_sensor.homematic/](binary_sensor platform))
6. Brightness sensor ([/components/sensor.homematic/](sensor platform))

We also have experimental autodetection support. If you ONLY configure this homematic component and set autodetect to True, Home Assistant will try to automatically detect and configure each (supported) device paired to your CCU/Homegear. The resulting Home Assistant entities will be named in the fashion of _ADDRESS CHANNEL PARAMETER_. This will provide you with the information which of your devices are supported and may be explicitly configured manually for a more useful integration into Home Assistant. Beware, that autodetection may put heavy load on your CCU and may take some time to complete (maybe 2-3 minutes when a lot of devices are present). Keep an eye on the service messages on your CCU. If they show up while starting Home Assistant, increase the delay parameter in your configuration.
Afterwards you may incrementally configure each device the way you want. Manually configured devices will be handled first and won't be processed again when autodetection is still enabled.

To set up the component, add the following information to your `configuration.yaml` file:

```yaml
homematic:
  local_ip: 127.0.0.1
  local_port: 8943
  remote_ip: 127.0.0.1
  remote_port: 2001
  autodetect: False
```

Configuration variables:

- **local_ip** (*Required*): IP of device running Home Assistant
- **local_port** (*Optional*): Port for connection with Home Assistant. Defaults to 8943.
- **remote_ip** (*Required*): IP of CCU/Homegear
- **remote_port** (*Required*): Port of Homegear/CCU XML-RPC Server (usually 2001)
- **autodetect** (*Optional*): <True/False> experimental, detect all devices. Default to `False`.
- **resolvenames** (*Optional*): <True/False> Try to fetch device names from HM-CFG-LAN metadata or XML-API on CCU. Defaults to `False`.
- **delay** (*Optional*): <Float> Delay fetching of current state per deivce. Useful to prevent overloading CCU when initially fetching device states. Defaults to 0.5.

To further explain the `resolvenames` option:
We use two approaches to fetch the names of devices. Either one assumes you have properly named your devices in your existing Homematic setup.

1. Using the metadata devices internally have. When using a HM-CFG-LAN interface, you typically use a configuration software ("HomeMatic-Komponenten konfigurieren" is the name of the shortcut on your desktop by default) to pair and configure your devices. If you have paired devices, you'll see them listed in a table. The leftmost column (Name) is prefilled with default names. You can click such a name and enter whatever you like. But you should Stick to ASCII. So rather use _Kueche_ instead of _Küche_. Which also makes sense because the entity-names in HA are ASCII as well.
2. If you use a regular CCU, there is an add-on called the "XML-API". With it installed, you are generally able to fetch all kinds of information from you CCU using XML-RPC. We can leverage this and fetch the names of devices set within the CCU. For some reason the CCU does NOT save the names to the metadata, so we have to use this workaround.
