---
layout: page
title: "Scrape Sensor"
description: "Instructions how to integrate Web scrap sensors into Home Assistant."
date: 2016-10-12 09:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.31
---


The `scrape` sensor platform is scraping information from websites. The sensor loads the body of a HTML page and gives you the option to search and split out a value. As this is not a full-blown web scraper like [scrapy](https://scrapy.org/) it will most likely only works with simple webpage and it can be time-consuming to get the right section.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://home-assistant.io
    filter: h1
```

Configuration variables:

- **resource** (*Required*): The URl to the website that contains the value.
- **filter** (*Required*): Defines the HTML tag to filter for, eg. `h1`, `span`, etc.
- **name** (*Optional*): Name of the sensor.
- **element** (*Optional*): Number of the element in the output.
- **before** (*Optional*): Count of chars to remove before the value.
- **after** (*Optional*): Count of chars to remove after the value.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Home Assistant %}

The current release Home Assistant is published on [https://home-assistant.io/](https://home-assistant.io/)

```yaml
sensor:
# Example configuration.yaml entry
  - platform: scrape
    resource: https://home-assistant.io
    name: Release
    filter: h1
    element: 1
    before: 17
    after: 25
```

### {% linkable_title Users in our from Github %}

Check how many user in our main [Gitter chatroom](https://gitter.im/home-assistant/home-assistant) are.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://gitter.im/home-assistant/home-assistant
    filter: '#text'
    element: 9
    before: 2059
    after: 2063
```

There is also a Jupyther notebook available for this example to give you a bit more insight.

### {% linkable_title Get a value out of a tag %}

The German [Federal Office for Radiation protection (Bundesamt für Strahlenschutz)](http://www.bfs.de/) is publishing various details about optical radiation including an UV index. This example is getting the index for a region in Germany. 

```yaml
sensor:
# Example configuration.yaml entry
  - platform: scrape
    resource: http://www.bfs.de/DE/themen/opt/uv/uv-index/prognose/prognose_node.html
    name: Coast Ostsee
    filter: 'p'
    element: 14
    unit_of_measurement: 'UV Index'
```
