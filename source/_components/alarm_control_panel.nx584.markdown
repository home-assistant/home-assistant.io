---
layout: component
title: "NX584 Alarm Control Panel"
description: "Instructions how to integrate NX584 into Home Assistant."
date: 2016-02-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Alarm
---

The `nx584` platform is consuming the information provided by a [Alarm.com](https://www.alarm.com/).

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: nx584
  host: IP_ADDRESS
```

Configuration variables:

- **host** (*Optional*): The IP address of the pynx584 backend server. Defaults to `localhost:5007`.

