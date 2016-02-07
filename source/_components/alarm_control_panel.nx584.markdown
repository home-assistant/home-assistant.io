---
layout: page
title: "NX584 Alarm Control Panel"
description: "Instructions how to integrate NX584 into Home Assistant."
date: 2016-02-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Alarm
---

The `nx584` platform is consuming the information provided by a NetworX-based alarm panels and should work for any such panel equipped with a NX584 serial interface module like Caddx, GE, or Interlogix. This includes NX-4/6/8/8E, where the NX8E has this interface built-in.

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: nx584
  host: IP_ADDRESS
```

Configuration variables:

- **host** (*Optional*): The IP address of the pynx584 backend server. Defaults to `localhost:5007`.

