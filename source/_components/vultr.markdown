---
layout: page
title: "Vultr"
description: "Instructions on how to integrate Vultr within Home Assistant."
date: 2017-10-17 21:00
sidebar: true
comments: false
sharing: true
footer: true
featured: false
ha_category: Hub
ha_release: "0.57"
logo: vultr.png
ha_iot_class: "Cloud Polling"
---


The `vultr` component allows you to access information about and interact with your [Vultr](https://www.vultr.com) subscriptions (Virtual Private Servers) from Home Assistant.

Obtain your API key from your [Vultr Account](https://my.vultr.com/settings/#settingsapi).

<p class='note'>
Ensure you allow the public IP of Home Assistant under the Access Control heading.
</p>

To integrate your Vultr subscriptions with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
vultr:
  api_key: ABCDEFG12345
```

Configuration variables:

- **api_key** (*Required*): Your Vultr API key.
