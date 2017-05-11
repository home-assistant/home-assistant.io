---
layout: page
title: "URLWatch Binary Sensor"
description: "Instructions how to integrate URLWatch binary sensor into Home Assistant."
date: 2017-05-11 19:34
sidebar: true
comments: false
sharing: true
footer: true
logo: homeassistant.png
ha_category: Binary Sensor
ha_release: 0.45
---

The `urlwatch` binary sensor fetches web content from a configured URL and calculates and stores a hash from it.
It will compare this hash against future calculated hashes for that URL, if it detects a different one it's state switches to on.
It currently only compares the html content, no headers.

To use your the `urlwatch` binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: urlwatch
    resource: http://domain.name/webpage
```
Configuration variables:

- **resource** (*Required*): URL of the content you want to monitor.
- **name** (*Optional*): Let you overwrite the the name of the device. By default *URLWatch* is used.

<p class='note warning'>
Make sure that the URL exactly matches your endpoint or resource.
</p>
