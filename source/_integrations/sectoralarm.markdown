---
title: "Sector Alarm"
description: "Instructions on how to integrate Sector Alarm within Home Assistant."
ha_category:
  - Alarm
  - Sensor
ha_release: 0.101
ha_iot_class: Cloud Polling
---

The `Sector Alarm` component adds all of your temperature sensors and a panel that lets you control your alarm from Home Assistant.

This has currencly only been testet on norwegian installations, but it should work for other countries as well.

## Configuration

Go to [minside.sectoralarm.no/](https://minside.sectoralarm.no/) and login to find your panel id. After you login it should be a part of the URL. Example: https://minside.sectoralarm.no/#!/systems/**012345678**

To add Sector Alarm sensors and alarm to your installation, add the following to your `configuration.yaml` file:

```yaml
sector_alarm:
  email: EMAIL_ADDRESS
  password: PASSWORD
  alarm_id: ALARM_ID
  code: ALARM_CODE
```

{% configuration %}
email:
  description: Your Sector Alarm login email.
  required: true
  type: string
password:
  description: Your Sector Alarm login password.
  required: true
  type: string
alarm_Id:
  description: Your Sector Alarm panel id that you can find in the URL after you have logged in.
  required: true
  type: integer
code:
  description: Your Sector Alarm code for turning the alarm on/off.
  required: true
  type: integer
{% endconfiguration %}
