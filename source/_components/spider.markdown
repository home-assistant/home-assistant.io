---
layout: page
title: "Spider"
description: "Instructions on how to setup the Spider hub within Home Assistant."
date: 2018-07-17 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: spider.png
ha_category: Hub
ha_iot_class: "Cloud Polling"
ha_release: 0.75
---

The `spider` component is the main component to integrate all [Itho Daalderop Spider](https://www.ithodaalderop.nl/spider-thermostaat) related platforms. You will need your Spider account information (username, password) to discover and control devices which are related to your account.

## {% linkable_title Configuration %}

To add your Spider devices into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
spider:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Account username of mijn.ithodaalderop.nl
  required: true
  type: string
password:
  description: Account password of mijn.ithodaalderop.nl
  required: true
  type: string
scan_interval:
  description: How frequently to query for new data. Defaults to 120 seconds.
  required: false
  type: int
{% endconfiguration %}

<p class='note warning'>
This component is not affiliated with Itho Daalderop Spider and retrieves data from the endpoints of the mobile application. Use at your own risk.
</p>
