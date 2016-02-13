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
---

The `nx584` platform provides integration with GE, Caddx, Interlogix (and other brands) alarm panels that support the NX584 interface module (or have it built in). Supported panels include NX4/6/8/8E. Actual integration is done through [pynx584](http://github.com/kk7ds/pynx584) which is required for this to work.


To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: nx584
  host: ADDRESS
```

Configuration variables:

- **host** (*Optional*): This is the host connection string (host:port) for the nx584 server process. If unset, it is assumed to be `localhost:5007`, which will work if the server process is running on the same system as home-assistant.

