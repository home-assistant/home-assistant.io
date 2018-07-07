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

![weather-forecast](https://user-images.githubusercontent.com/7738048/41775906-731ad130-762e-11e8-854f-d156a0ff56ef.png)

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `weather-forecast`
| entity | string | **Required** | Entity id of `weather` domain


**Example**

```yaml
- type: weather-forecast
  entity: weather.demo_weather_north
```
