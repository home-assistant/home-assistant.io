---
layout: page
title: "Concord232 Alarm Control Panel"
description: "Instructions how to integrate Interlogix/GE Concord4 with RS-232 Automation Control Module into Home Assistant."
date: 2016-10-11 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: networx.png
ha_category: Alarm
ha_release: 0.13
---

The `concord232` platform provides integration with GE,  Interlogix (and other brands) alarm panels that support the RS-232 Automation Control Panel interface module (or have it built in). Supported panels include Concord 4. Actual integration is done through [concord232](http://github.com/JasonCarter80/concord232) which is required for this to work.

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: concord232
```

Configuration variables:

- **host** (*Optional*): The host where the concord232 server process is running. Defaults to localhost.
- **port** (*Optional*): The port where the Alarm panel ist listening. Defaults to 5007.

