---
layout: page
title: "Huawei LTE Routers"
description: "Instructions on how to integrate Huawei LTE routers with Home Assistant."
date: 2018-09-08 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: huawei.svg
ha_category: Network
ha_release: 0.79
---

The Huawei LTE router integration for Home Assistant allows you to observe
and control [Huawei LTE routers](https://consumer.huawei.com/en/smart-home/).

The integration provides:

* a sensor with device, signal, and traffic information
* a device tracker for connected devices

## {% linkable_title Configuration %}

To enable the component, add the following lines to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
huawei_lte:
  - url: http://192.168.100.1/
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
url:
    description: URL of the router web interface.
    required: true
    type: url
username:
    description: The username used for the router web interface.
    required: true
    type: string
password:
    description: The password used for the router web interface.
    required: true
    type: string
{% endconfiguration %}

### {% linkable_title Tested routers %}

Routers we know to be working with this component based on the documentation of used libraries and reports by users:

- Huawei B310s-22
- Huawei B525s-23a
- Huawei E5186s-22a
- Huawei B618

This is not a complete list. The component can probably connect to other Huawei LTE routers running similar firmware.
