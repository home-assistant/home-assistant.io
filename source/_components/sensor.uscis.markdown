---
layout: page
title: USCIS Sensor
description: "Instructions on how to set up USCIS within Home Assistant."
date: 2018-03-21 08:00
sidebar: false
comments: false
sharing: true
footer: true
logo: uscis.jpg
ha_category: Sensor
ha_release: 0.68
ha_iot_class: "Cloud Polling"
---

The `uscis` sensor component allows you to monitor the cost of Washington Dominion Energy.

## Example for `configuration.yaml` :

```yaml
sensor:
  - platform: uscis
    case_id: REQUIRED_CASE_NUMBER
    name: OPTIONAL_NAME
```

{% configuration %}
friendly_name:
  description: Name of the sensor in Home Assistant.
  required: false
  default: USCIS
  type: string
case_id:
  description: Case Number used to get the case details from USCIS web client.
  required: true
  type: string
{% endconfiguration %}

All the data will be fetch from  [USCIS](https://egov.uscis.gov/casestatus/displayLogon.do) using your Case number.
