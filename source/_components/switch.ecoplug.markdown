---
layout: page
title: EcoPlug/Wion Switch
description: "Instructions on how to set up an EcoPlug-Compatible switch within Home Assistant."
date: 2018-06-25 14:04
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.71
ha_iot_class: "Local Polling"
---

This allows you to control and monitor EcoPlugs on your network. Devices are auto-discovered and added. Names are pulled from their setup names in the EcoPlugs app.

To enable this switch, you first have to set up your devices in the EcoPlug App, and add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ecoplug
 ```

Configuration variables:

- **scan_interval** (*Optional*): Amount of time (in seconds) before checking device's state on the network. Default is 5.
