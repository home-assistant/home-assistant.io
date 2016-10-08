---
layout: page
title: "Paradox Alarm Control Panel"
description: "Instructions how to integrate Paradox alarms into Home Assistant."
date: 2016-10-07 12:17
sidebar: true
comments: false
sharing: true
footer: true
logo: paradox.png
ha_category: Alarm
ha_release: 0.31
ha_iot_class: "Local Push"
---

The `paradox` alarm control platform is a Home Assistant Component of the [Paradox hub](/components/paradox/) which provides integration with Paradox alarms utilizing the PRT3 module.

Setting up the hub allows you to enable this platform, which exposes all of your areas/partitions as alarm control panels. Doing so provides visibility of the areas through the Home Assistant interface as well as the ability to trigger automation actions when something happens like an area being armed/disarmed.

The PRT3 module have no way to indicate which areas/partitions are actually in use. It has to be controlled via the `configuration.yaml` file. Add only the areas/partitions you wish to be visible in the Home Assistant interface. Any areas not specified will simply be ignored.

An example `configuration.yaml` file, making area 1 and 2 visible in the UI will look something like this:


```yaml
# Example Paradox configuration.yaml entry
paradox:
  panel_type: EVO48
  port: /dev/ttyUSB0
  speed: 57600

  partitions:
    1:
      name: 'Home'
    2:
      name: 'Backyard'
```

Configuration variables:

- **panel_type** (*Required*): `EVO48` or `EVO192`, depending upon which model you have.
- **port** (*Optional*): Which USB port the PRT3 is connected to. Default: `/dev/ttyUSB0`
- **speed** (*Optional*): The baud-rate supported by the PRT3. Default: `57600`
- **[partition]number** (*Required*): This number must match the area number in use on the alarm panel.
- **[partition]name** (*Required*): Use this name to specify a name for the area/partition as you want to see it displayed in Home Assistant. It does not need to match the name of the area in the alarm panel.

Please refer to the [Paradox hub](/components/paradox/) for the functionality currently supported.


