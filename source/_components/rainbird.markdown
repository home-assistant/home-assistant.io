---
layout: page
title: "Rainbird"
description: "Instructions on how to integrate your Rainbird WiFi LNK within Home Assistant."
date: 2017-08-25 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: rainbird.png
ha_category: Hub
ha_release: 0.50
ha_iot_class: "Local Polling"
---

This `Rainbird` components alows interacting with [WiFi LNK](http://www.rainbird.com/landscape/products/controllers/LNK-WiFi.htm) module of the Rainbird Irrigation system in Home Assistant.

To add the component to home assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rainbird:
  stickip: '1.1.1.1'
  password: 'secretpassword'
```

Configuration variables:

- **stickip** (*Required*): The IP address of your WiFi LNK Module.
- **password** (*Required*): The password for accessing the module.

The active zone (station) will be represented as a number in **rainbird.activestation**
- **0** No active irrigation 
- *[0-9]* Active zone (station)
- *-1* Error in communication with WiFi LNK module

You can then create UI elements with your own service calls to the **rainbird** service. 

**stop_irrigation** has no parameters and will stop any running irrigation
**start_irrigation** takes 2 parameters. To start the sprinkers in zone 2 for the duration of 10 minutes: { "station":2, "duration": 10 }

Please note that due to the implementation of the API within the LNK Module, there is a concurrency issue. For example, the rainbird app will give connection issues (like already a connection active).
The poll interval is set to 30 seconds.
