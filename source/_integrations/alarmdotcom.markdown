---
title: Alarm.com
description: Instructions on how to integrate Alarm.com into Home Assistant.
logo: alarmdotcom.png
ha_category:
  - Alarm
ha_release: 0.11
---

The `alarmdotcom` platform is consuming the information provided by [Alarm.com](https://www.alarm.com/).

## Configuration

To enable this, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  platform: alarmdotcom
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Username for the Alarm.com account.
  required: true
  type: string
password:
  description: Password for the Alarm.com account.
  required: true
  type: string
name:
  description: The name of the alarm.
  required: false
  default: Alarm.com
  type: string
code:
  description: Specifies a code to enable or disable the alarm in the frontend.
  required: false
  type: integer
{% endconfiguration %}

<div class='note warning'>
  Please make sure that your alarm.com language is set to English before open any issue.
</div>
