---
layout: page
title: "Linode"
description: "Instructions on how to set up Linode within Home Assistant."
date: 2017-10-20 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: linode.png
ha_release: 0.57
ha_iot_class: "Cloud Polling"
---

The `linode` component allows you to access the information about your [Linode](https://linode.com) systems from Home Assistant.

## {% linkable_title Setup %}

Obtain your oAuth2 Access Token from Linode account.

* <http://cloud.linode.com>
* Log in
* Select API Tokens
* Create a Personal Access Token,
* Assigned scope (Please choose the least possible access required.)

## {% linkable_title Configuration %}

To integrate Linode with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
linode:
  access_token: YOUR_ACCESS_TOKEN
```

{% configuration %}
  access_token:
    description: The Linode access token.
    required: true
    type: string
{% endconfiguration %}
