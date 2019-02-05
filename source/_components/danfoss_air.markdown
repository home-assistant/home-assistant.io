---
layout: page
title: "Danfoss Air"
description: "How to integrate Danfoss Air HRV in Home Assistant."
date: 2019-01-14 20:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Climate
ha_release: "0.87"
logo: danfoss_air.png
ha_iot_class: "Local Polling"
---

The `danfoss_air` component allows you to access information from your Danfoss Air HRV unit.

*Note*: Danfoss Air CCM only accepts one TCP connection at a time. Due to this the component
will not work while you have the HRV PC-Tool open.

```yaml
# Example configuration.yaml entry
danfoss_air:
  host: IP_ADDRESS_OF_CCM
```

{% configuration %}
host:
  description: Danfoss Air CCM IP.
  required: true
  type: string
{% endconfiguration %}

