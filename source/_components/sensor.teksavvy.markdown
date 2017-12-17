---
layout: page
title: "TekSavvy"
description: "Instructions how to integrate TekSavvy data usage within Home Assistant."
date: 2017-12-17 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: teksavvy.png
ha_category: Sensor
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---

Integrate your [TekSavvy](https://myaccount.teksavvy.com/) account information into Home Assistant.

You can get your API key from 
https://myaccount.teksavvy.com/ApiKey/ApiKeyManagement

To use your TekSavvy sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: teksavvy
    api_key: API_KEY
    total_bandwidth: 400
    monitored_variables:
     - usage
     - usage_gb
     - limit
     - onpeak_download
     - onpeak_upload
     - onpeak_total
     - offpeak_download
     - offpeak_upload
     - offpeak_total
     - onpeak_remaining
```

Configuration variables:

- **api_key** (*Required*): Your TekSavvy API key.
- **total_bandwidth** (*Required*): Your bandwidth limit in Gigabit.
- **monitored_variables** array (*Required*): Variables to monitor.
  - **usage**: Percent usage
  - **usage_gb**: Gigabit usage
  - **limit**: Montly bandwidth limit (Gigabit)
  - **onpeak_download**: Download used outside the unmetered period
  - **onpeak_upload**: Upload used outside the unmetered period
  - **onpeak_total**: Total data used outside the unmetered period
  - **offpeak_download**: Download offpeak usage
  - **offpeak_upload**: Upload offpeak usage
  - **offpeak_total**: Total offpeak usage
  - **onpeak_remaining**: Remaining Gigabit
