---
layout: page
title: "TMDB Sensor"
description: "How to integrate The Movie Database sensor into Home Assistant."
date: 2018-03-13 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tmdb.png
ha_category: Sensor
ha_release: 0.91
ha_iot_class: "Cloud Polling"
---

The TMDB sensor integrates data from [The Movie Database]([https://reddit.com/](https://www.themoviedb.org/)) to keep track of movies and television shows.

## {% linkable_title Setup %}

To set up this sensor, you will need to get an `api_key` which you can get [here](https://www.themoviedb.org/documentation/api).

## {% linkable_title Configuration %}

To enable this platform, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tmdb
    api_key: !secret api_key
    movie_lists:
      - upcoming
      - now_playing
      - popular
      - top_rated
    tv_lists:
      - upcoming
      - now_playing
      - popular
      - top_rated
```

{% configuration %}
api_key:
  description: Your TMDB account api key.
  required: true
  type: string
movie_lists:
  description: Which lists of movies you want.
  required: false
  type: list
tv_lists:
  description: Which lists of television shows you want.
  required: false
  type: list
{% endconfiguration %}