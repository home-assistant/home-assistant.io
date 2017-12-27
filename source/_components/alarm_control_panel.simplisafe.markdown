---
layout: page
title: "SimpliSafe Alarm Control Panel"
description: "Instructions how to integrate SimpliSafe into Home Assistant."
date: 2016-07-02 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: simplisafe.png
ha_release: 0.24
ha_category: Alarm
requirement: hardware
---

The `simplisafe` platform enables the ability to control a SimpliSafe control panel. [simplisafe.com](http://simplisafe.com/).

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: simplisafe
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **username** (*Required*): Username for the SimpliSafe account.
- **password** (*Required*): Password for SimpliSafe account.
- **name** (*Optional*): The name of the alarm. Default is the SimpliSafe alarm id.
- **code** (*Optional*): Specifies a code to enable or disable the alarm in the frontend.

