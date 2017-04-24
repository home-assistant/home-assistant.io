---
layout: page
title: "Scrape Sensor"
description: "Instructions how to integrate Web scrape sensors into Home Assistant."
date: 2016-10-12 09:10
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: 0.31
---


The `scrape` sensor platform is scraping information from websites. The sensor loads a HTML page and gives you the option to search and split out a value. As this is not a full-blown web scraper like [scrapy](https://scrapy.org/). It will most likely only work with simple webpages and it can be time-consuming to get the right section.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://home-assistant.io
    select: ".current-version h1"
```

Configuration variables:

- **resource** (*Required*): The URL to the website that contains the value.
- **select** (*Required*): Defines the HTML tag to search for. Check Beautifulsoup's [CSS selectors](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#css-selectors) for details.
- **name** (*Optional*): Name of the sensor.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor. There is also a [Jupyter notebook](http://nbviewer.jupyter.org/github/home-assistant/home-assistant-notebooks/blob/master/web-scraping.ipynb) available for this example to give you a bit more insight.

### {% linkable_title Home Assistant %}

The current release Home Assistant is published on [https://home-assistant.io/](https://home-assistant.io/)

```yaml
sensor:
# Example configuration.yaml entry
  - platform: scrape
    resource: https://home-assistant.io
    name: Release
    select: ".current-version h1"
    value_template: '{% raw %}{{ value.split(":")[1] }}{% endraw %}'
```

### {% linkable_title Available implementations %}

Get the counter for all our implementations from the [Component overview](/components/) page.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://home-assistant.io/components/
    name: Home Assistant impl.
    select: 'a[href="#all"]'
    value_template: '{% raw %}{{ value.split("(")[1].split(")")[0] }}{% endraw %}'
```

### {% linkable_title Get a value out of a tag %}

The German [Federal Office for Radiation protection (Bundesamt für Strahlenschutz)](http://www.bfs.de/) is publishing various details about optical radiation including an UV index. This example is getting the index for a region in Germany. 

```yaml
sensor:
# Example configuration.yaml entry
  - platform: scrape
    resource: http://www.bfs.de/DE/themen/opt/uv/uv-index/prognose/prognose_node.html
    name: Coast Ostsee
    select: 'p:nth-of-type(19)'
    unit_of_measurement: 'UV Index'
```

### {% linkable_title IFTTT status %}

If you make heavy use of the [IFTTT](/components/ifttt/) web service for your automations and are curious about the [status of IFTTT](http://status.ifttt.com/) then you can display the current state of IFTTT in your frontend.

```yaml
sensor:
# Example configuration.yaml entry
  - platform: scrape
    resource: http://status.ifttt.com/
    name: IFTTT status
    select: '.component-status'
```

