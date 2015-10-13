---
layout: page
title: "Manual alarm support"
description: "Instructions how to integrate manual alarms into Home Assistant."
date: 2015-10-13 19:10
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/preferences-system-privacy.png' class='brand pull-right' />
This platform enables you to set manual alarms in Home Assistant.

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: manual
  name: "HA Alarm"
  code: PASSCODE
  pending_time: 60
  trigger_time: 120
```

Configuration variables:

- **name** (*Optional*): The name of the alarm. Default is 'HA Alarm'.
- **code** (*Optional*): If defined, specifies a code to enable or disable the alarm in the frontend.
- **pending_time** (*Optional*): The time in seconds of the pending time before arming the alarm. Default is 60 seconds.
- **trigger_time** (*Optional*): The time in seconds of the trigger time in which the alarm is firing. Default is 120 seconds.

