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

{% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: weather-forecast
  type: string
entity:
  required: true
  description: "Entity id of `weather` domain"
  type: string
{% endconfiguration %}

{% linkable_title Example %}

```yaml
- type: weather-forecast
  entity: weather.demo_weather_north
```
