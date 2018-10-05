---
layout: page
title: "SimpliSafe Alarm Control Panel"
description: "Instructions on how to integrate SimpliSafe into Home Assistant."
date: 2016-07-02 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: simplisafe.png
ha_release: 0.24
ha_category: Alarm
---

The `simplisafe` platform enables the ability to control a [SimpliSafe](http://simplisafe.com/) control panel.

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: simplisafe
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Username for the SimpliSafe account.
  required: true
  type: string
password:
  description: Password for SimpliSafe account.
  required: true
  type: string
name:
  description: The name of the alarm. Default is the SimpliSafe alarm id.
  required: false
  type: string
code:
  description: Specifies a code to enable or disable the alarm in the frontend.
  required: false
  type: string
{% endconfiguration %}
