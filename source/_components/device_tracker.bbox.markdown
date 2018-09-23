---
layout: page
title: "Bbox"
description: "Instructions on how to integrate Bouygues Bbox routers into Home Assistant."
date: 2016-10-13 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bbox.png
ha_category: Presence Detection
ha_release: "0.31"
ha_iot_class: "Local Polling"
---


The `bbox` platform offers presence detection by looking at connected devices to a [Bbox](https://fr.wikipedia.org/wiki/Bbox) based router from [Bouygues](https://www.bouyguestelecom.fr/), which is one of the main Internet provider in France.

Bbox is a generic name for different hardware routers. The platform has been tested with the following devices:

- Sagem F@st 5330b

## {% linkable_title Configuration %}

To use an Bbox router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bbox
```

{% configuration %}
host:
  description: IP address of your Bbox device.
  required: false
  type: string
  default: 192.168.1.254
{% endconfiguration %}


<p class='note warning'>
For now and due to third party limitation, the Bbox must be on the same local network as the Home Assistant installation.
</p>

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

