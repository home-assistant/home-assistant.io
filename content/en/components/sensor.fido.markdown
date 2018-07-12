---
layout: page
title: "Fido"
description: "Instructions on how to integrate Fido data usage within Home Assistant."
date: 2017-01-01 17:17
sidebar: true
comments: false
sharing: true
footer: true
logo: fido.png
ha_category: Sensor
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---


Integrate your [Fido](https://www.fido.ca/) account information into Home Assistant.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fido
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - fido_dollar
     - balance
     - data_used
```

Configuration variables:

- **username** (*Required*): You Fido username (your Fido phone number or your email).
- **password** (*Required*): Your Fido password.
- **number** (*Optional*): Your Fido phone number (it will use your username if empty).
- **monitored_variables** array (*Required*): Variables to monitor.
  - **fido_dollar**: Your Fido dollar balance
  - **balance**: Your account balance
  - **data_used**: Current data used
  - **data_limit**: Current data limit
  - **data_remaining**: Current data remaining
  - **text_used**: SMS sent
  - **text_limit**: SMS limit
  - **text_remaining**: SMS remaining
  - **mms_used**: MMS sent
  - **mms_limit**: MMS limit
  - **mms_remaining**: MMS remaining
  - **text_int_used**: International SMS sent
  - **text_int_limit**: International SMS limit
  - **text_int_remaining**: International SMS remaining
  - **talk_used**: Talk time used
  - **talk_limit**: Talk time limit
  - **talt_remaining**: Talk time remaining
  - **other_talk_used**: Other talk time used (It could be international calls)
  - **other_talk_limit**: Other talk time limit
  - **other_talt_remaining**: Other talk time remaining
