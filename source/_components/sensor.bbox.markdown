---
layout: page
title: "Bbox Sensor"
description: "How to integrate Bbox Bandwidth measuring within Home Assistant."
date: 2016-10-22 01:00
sidebar: true
comments: false
sharing: true
footer: true
logo: bbox.png
ha_category: Sensor
ha_release: 0.31
ha_iot_class: "Local Push"
---

The `bbox` platform uses the [Bbox Modem Router](https://fr.wikipedia.org/wiki/Bbox/) from the French Internet provider Bouygues Telecom. Sensors are mainly bandwidth measures.

<p class='note warning'>
Due to third party limitation, the sensors will only be available if Home Assistant and the Bbox are on the same local area network. You can check this by going to 192.168.1.254 with your web browser.
</p>

To add Bbox sensors to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bbox
    monitored_variables:
      - down_max_bandwidth
      - up_max_bandwidth
      - current_down_bandwidth
      - current_up_bandwidth
```

Configuration variables:

- **monitored_variables** array (*Required*): Sensors to display in the frontend.
  - **down_max_bandwidth**: Maximum bandwidth available for download.
  - **up_max_bandwidth**: Maximum bandwidth available for upload.
  - **current_down_bandwidth**: Instant measure of the current used bandwidth for download.
  - **current_up_bandwidth**: Instant measure of the current used bandwidth for upload.

