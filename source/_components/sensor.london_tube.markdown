---
layout: page
title: "London Undergound Status"
description: "Display the current status of London underground lines within Home Assistant."
date: 2017-06-29 18:45
sidebar: true
comments: false
sharing: true
footer: true
logo: train.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 4.8
---


The `london_tube` sensor will display the status of London underground tube lines, as well as the Overground, DLR and Tfl rail.


```yaml
# Example configuration.yaml entry
sensor:
  - platform: london_tube
    line:
      - Bakerloo
      - Central
      - Circle
      - District
      - DLR
      - Hammersmith & City
      - Jubilee
      - London Overground
      - Metropolitan
      - Northern
      - Piccadilly
      - TfL Rail
      - Victoria
      - Waterloo & City
```

Configuration variables:

- **line** (*Required*): Enter the name of at least one line.

Powered by TfL Open Data [TFL](https://api.tfl.gov.uk/).
