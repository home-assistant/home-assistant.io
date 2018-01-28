---
layout: page
title: UpCloud
description: Instructions how to integrate UpCloud within Home Assistant.
date: 2018-01-28 20:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.63
logo: upcloud.png
ha_iot_class: Cloud Polling
---


The `upcloud` component allows you to access the information about your [UpCloud](https://www.upcloud.com/) servers from Home Assistant.

Set up your API user credentials in your [UpCloud control panel](https://my.upcloud.com/).

To integrate your UpCloud servers with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
upcloud:
  username: YOUR_API_USERNAME
  password: YOUR_API_PASSWORD
```

{% configuration %}
username:
  description: Your UpCloud API username.
  required: true
  type: string
password:
  description: Your UpCloud API user password.
  required: true
  type: string
{% endconfiguration %}
