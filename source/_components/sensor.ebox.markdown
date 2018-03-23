---
layout: page
title: "EBox"
description: "Instructions on how to integrate EBox data usage within Home Assistant."
date: 2017-02-15 17:17
sidebar: true
comments: false
sharing: true
footer: true
logo: ebox.png
ha_category: Sensor
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---

Integrate your [EBox](https://client.ebox.ca/) account information into Home Assistant.

To use your EBox sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ebox
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - before_offpeak_download
     - before_offpeak_upload
     - before_offpeak_total
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
  - **usage**: Percent usage
