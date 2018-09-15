---
layout: page
title: "EDP re:dy"
description: "Instructions on how to integrate the EDP re:dy platform into Home Assistant."
date: 2018-09-04 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: edp_redy.png
ha_category: Hub
ha_release: "0.79"
ha_iot_class: "Cloud Polling"
---

[EDP re:dy](https://www.edp.pt/particulares/servicos/redy/) is a Home Automation platform from Portuguese energy provider EDP, that allows control of appliances and other devices, as well as monitoring power consumption. This component allows integrating EDP re:dy into Home Assistant.

## {% linkable_title Configuration %}

You will need your re:dy login information (username and password) to use this component.

To set it up, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
edp_redy:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The username for accessing your re:dy account.
  required: true
  type: string
password:
  description: The password for accessing your re:dy account.
  required: true
  type: string
{% endconfiguration %}

After configuring the component, it will automatically add to Home Assistant:

* A switch per toggleable device (switch, plug, etc).
* A sensor per each device that reports power consumption (SmartMeter, plug, meter)
