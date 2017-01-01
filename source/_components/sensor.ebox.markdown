---
layout: page
title: "EBox"
description: "Instructions how to integrate EBox data usage within Home Assistant."
date: 2017-02-15 17:17
sidebar: true
comments: false
sharing: true
footer: true
logo: ebox.jpg
ha_category: Sensor
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---


Integrate your [EBox](https://client.ebox.ca/) account information into Home Assistant.

```yaml
# Example configuration.yaml entry
ensor:
  - platform: ebox
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - before_offpeak_download
     - before_offpeak_upload
     - before_offpeak_total
     - offpeak_download
     - offpeak_upload
     - offpeak_total
     - download
     - upload
     - total
     - balance
     - limit
     - usage
```

Configuration variables:

- **username** (*Required*): Your EBox username.
- **password** (*Required*): Your EBox password.
- **monitored_variables** array (*Required*): Variables to monitor.
  - **before_offpeak_download**: Download before offpeak usage
  - **before_offpeak_upload**: Upload before offpeak usage
  - **before_offpeak_total**: Total before offpeak usage
  - **offpeak_download**: Download offpeak usage
  - **offpeak_upload**: Upload offpeak usage
  - **offpeak_total**: Total offpeak usage
  - **download**: Download usage
  - **upload**: Upload usage
  - **total**: Total usage
  - **balance**: Account balance
  - **limit**: Limit usage
  - **usage**: Percent Usage
