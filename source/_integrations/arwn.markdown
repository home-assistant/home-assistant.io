---
title: Ambient Radio Weather Network
description: Instructions on how to integrate ARWN within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.31
ha_iot_class: Local Polling
ha_domain: arwn
ha_platforms:
  - sensor
---

The `arwn` sensor platform is a client for the [Ambient Radio Weather Network](https://github.com/sdague/arwn) project. This collects weather station data and makes it available in an MQTT subtree.

To use your ARWN setup, you must already have configured the [MQTT](/integrations/mqtt/) platform. Then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: arwn
```

Currently all temperatures, barometers, moisture, rain, and wind sensors will be displayed.
