---
layout: page
title: "Alarm.com Alarm Control Panel"
description: "Instructions on how to integrate Alarm.com into Home Assistant."
date: 2016-01-14 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: alarmdotcom.png
ha_category: Alarm
ha_release: 0.11
---

The `alarmdotcom` platform is consuming the information provided by [Alarm.com](https://www.alarm.com/).

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: alarmdotcom
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **username** (*Required*): Username for the Alarm.com account.
- **password** (*Required*): Password for Alarm.com account.
- **name** (*Optional*): The name of the alarm. Default is 'Alarm.com'.
- **code** (*Optional*): Specifies a code to enable or disable the alarm in the frontend.
