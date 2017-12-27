---
layout: page
title: "NX584 Alarm Control Panel"
description: "Instructions how to integrate NX584 into Home Assistant."
date: 2016-02-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: networx.png
ha_category: Alarm
ha_release: 0.13
requirement: hardware
---

The `nx584` platform provides integration with GE, Caddx, Interlogix (and other brands) alarm panels that support the NX584 interface module (or have it built in). Supported panels include NX4/6/8/8E. Actual integration is done through [pynx584](http://github.com/kk7ds/pynx584) which is required for this to work.

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: nx584
```

Configuration variables:

- **host** (*Optional*): The host where the nx584 server process is running. Defaults to `localhost`.
- **port** (*Optional*): The port where the Alarm panel is listening. Defaults to `5007`.

