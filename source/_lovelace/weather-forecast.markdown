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

Weather forecast is a card to display the weather. Very useful to include on interfaces that people display on the wall. 

<p class='img'>
<img src='/images/lovelace/lovelace_weather.png' alt='Screenshot of the weather card'>
Screenshot of the weather card.
</p>

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `weather-forecast`
| entity | string | **Required** | Entity id of `weather` domain


**Example**

```yaml
- type: weather-forecast
  entity: weather.demo_weather_north
```
