---
layout: page
title: "Environment Canada Component"
description: "Weather from Environment Canada."
date: 2017-07-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: environment_canada.png
ha_category: Weather
ha_release: 0.74
ha_iot_class: "Cloud Polling"
---

The `environment_canada` component uses [Environment Canada](https://weather.gc.ca/mainmenu/weather_menu_e.html) as a source for current meteorological data.

- This component creates the following entities with their default configurations:
  - `weather.environment_canada`
  - `sensor.environment_canada`
  - `camera.environment_canada` (radar imagery)

To add Environment Canada platforms to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
environment_canada:
```

This component has no configuration variables. To apply non-default settings to the platforms, they should be configured individually.
