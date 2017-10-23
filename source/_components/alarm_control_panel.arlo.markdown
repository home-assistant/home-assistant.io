---
layout: page
title: "Arlo Control Panel"
description: "Instructions how to setup the Netgear Arlo Base Stations as a control panel within Home Assistant."
date: 2017-10-05 17:45
sidebar: true
comments: false
sharing: true
footer: true
logo: arlo.png
ha_category: Alarm
ha_release: 0.56
ha_iot_class: "Cloud Polling"
---


The `arlo` control panel platform allows you to control your [Arlo](https://arlo.netgear.com/) base stations.

To get your [Arlo](https://arlo.netgear.com/) base stations working within Home Assistant, please follow the instructions for the general [Arlo component](/components/arlo).

Once you have enabled the [Arlo component](/components/arlo), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: arlo
```

Configuration variables:

- **home_mode_name**: (*Optional*): Arlo base station does not have a built-in home mode. You can map one of your custom modes to home assistant's home mode by setting the name of the custom mode in this configuration variable. The name of the custom mode should match exactly as you set it up in the Arlo app.
- **away_mode_name**: (*Optional*): Like the home mode, the Arlo base station does not have a built-in away mode, however, you can map a custom mode from the Arlo app to Home Assistant with this variable, just make sure the name matches exactly what you have set up in the Arlo app.
