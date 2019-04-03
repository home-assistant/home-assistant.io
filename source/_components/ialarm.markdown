---
layout: page
title: "Antifurto365 iAlarm Control Panel"
description: "Instructions on how to integrate iAlarms alarms into Home Assistant."
date: 2017-11-30 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: antifurto365-ialarm.png
ha_category: Alarm
ha_release: "0.60"
---

The `ialarm` platform provides connectivity with the [Antifurto365](https://www.antifurtocasa365.it/) iAlarm alarm systems.

This platform supports the following services: `alarm_arm_away`, `alarm_arm_home` and `alarm_disarm`.

## {% linkable_title Configuration %}

To enable this, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: ialarm
    host: ALARM_SYSTEM_IP
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address of the iAlarm device on your home network.
  required: true
  type: string
username:
  description: Username used to sign into the iAlarm web client (should be admin by default).
  required: true
  type: string
password:
  description: Password used to sign into the iAlarm web client. If it has a leading zero you need to put the password within quotes.
  required: true
  type: string
name:
  description: Name of device in Home Assistant.
  required: false
  type: string
code:
  description: Specifies a code to enable or disable the alarm in the frontend.
  required: false
  type: integer
{% endconfiguration %}

This platform has also been confirmed to work with the alarm system brands Meian and Emooluxr.
