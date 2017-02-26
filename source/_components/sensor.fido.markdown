---
layout: page
title: Fido
description: "Instructions on how to set up Fido sensors within Home Assistant."
date: 2017-02-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.39
---

Get your current talk/text/data usage from your Fido (http://fido.ca) account

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fido
    username: YOUPHONENUMBER
    password: PASSWORD
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
     - talk
     - talk_limit
     - talt_remaining
     - talk_other
     - talk_other_limit
     - talt_other_remaining
```

Configuration options for the Fido Sensor:

- **username** (*Required*): Your phone number
- **password** (*Required*): The password for the given phone number.
