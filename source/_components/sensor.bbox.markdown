---
layout: page
title: "Bbox"
description: "How to integrate Bbox Bandwidth measure within Home Assistant."
date: 2016-10-22 01:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bbox.png
ha_category: Sensor
ha_release: 0.31
---

The `bbox` platform uses the [Bbox Modem Router](https://fr.wikipedia.org/wiki/Bbox/) from the French Internet provider Bouygues Telecom.
Sensors are mainly bandwidth measures (Details below)

<p class='note warning'>
Due to third party limitation, the sensors will only be available if the HomeAssistant and the Bbox are on the same local area network.
You can check this by going on the 192.168.1.254 address with your internet browser
</p>

To add Bbox sensors to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: bbox
  monitored_variables:
    - down_max_bandwidth
    - up_max_bandwidth
    - current_down_bandwidth
    - current_up_bandwidth
```

Configuration variables:

- **monitored_variables** array (*Required*): Sensors to display in the frontend.
  - **down_max_bandwidth**: Maximum bandwidth you can use for downloading.
  - **up_max_bandwidth**: Maximum bandwidth you can use for uploadinf.
  - **current_down_bandwidth**: Instant measure of the current used bandwidth for download.
  - **current_up_bandwidth**: Instant measure of the current used bandwidthfor upload.


