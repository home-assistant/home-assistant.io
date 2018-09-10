---
layout: page
title: "Weather Forecast Card"
sidebar_label: Weather Forecast
description: "The Weather card allows you a visual card to display the weather."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The weather forecast is a card to display the weather. Very useful to include on interfaces that people display on the wall.

<p class='img'>
<img src='/images/lovelace/lovelace_weather.png' alt='Screenshot of the weather card'>
Screenshot of the weather card.
</p>

{% configuration %}
type:
  required: true
  description: weather-forecast
  type: string
entity:
  required: true
  description: "The `entity_id` of the `weather` platform to use."
  type: string
{% endconfiguration %}

{% linkable_title Example %}

```yaml
- type: weather-forecast
  entity: weather.demo_weather_north
```

<p class="note">
  This card works only with platforms that define a `weather` entity.
  
  E.g., it works with [Dark Sky](https://www.home-assistant.io/components/weather.darksky/) but not [Dark Sky Sensor](https://www.home-assistant.io/components/sensor.darksky/)
</p>
