---
layout: page
title: "Fido"
description: "Instructions how to integrate Fido data usage within Home Assistant."
date: 2017-01-01 17:17
sidebar: true
comments: false
sharing: true
footer: true
logo: fido.jpg
ha_category: Sensor
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---


Integrate your [Fido](https://www.fido.ca/) account information into Home Assistant.

```yaml
# Example configuration.yaml entry
ensor:
  - platform: fido
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - fido_dollar
     - balance
     - data_used
     - data_limit
     - data_remaining
     - text_used
     - text_limit
     - text_remaining
     - mms_used
     - mms_limit
     - mms_remaining
     - text_int_used
     - text_int_limit
     - text_int_remaining
     - talk_used
     - talk_limit
     - talt_remaining
     - other_talk_used
     - other_talk_limit
     - other_talt_remaining
```

Configuration variables:

- **username** (*Required*): You Fido username (your Fido phone number).
- **password** (*Required*): Your Fido password.
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
  - **other_talk_used**: Other talk time used (It could be internation calls)
  - **other_talk_limit**: Other talk time limit
  - **other_talt_remaining**: Other talk time remaining
