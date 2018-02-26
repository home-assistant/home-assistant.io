---
layout: page
title: "Dweet.io"
description: "Transfer events to Dweet.io."
date: 2016-05-07 07:08
sidebar: true
comments: false
sharing: true
footer: true
logo: dweet.png
ha_category: "History"
featured: false
ha_release: 0.19
---

The `dweet` component makes it possible to transfer details collected with Home Assistant to [Dweet.io](http://dweet.io/) and visualize them with [freeboard.io](https://freeboard.io). Keep in mind that your information will be public!

<p class='img'>
  <img src='{{site_root}}/images/screenshots/dweet-freeboard.png' />
</p>


<p class='note warning'>
  The publishing interval is limited to 1 second. This means that it's possible to miss fast changes.
</p>

To use the `dweet` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
dweet:
  name: HAExport
  whitelist:
    - input_number.brightness
    - input_boolean.notify_home
    - sensor.weather_temperature
    - sensor.cpu
```

Configuration variables:

- **name** (*Required*): Choose must choose an unique name.
- **whitelist** (*Required*): List of entity IDs you want to publish.

