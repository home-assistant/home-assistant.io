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
ha_iot_class: "Cloud Polling"
---


The `scrape` sensor platform is scraping information from websites. The sensor loads a HTML page and gives you the option to search and split out a value. As this is not a full-blown web scraper like [scrapy](https://scrapy.org/), it will most likely only work with simple web pages and it can be time-consuming to get the right section.

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
- **attribute** (*optional*): Get value of an attribute on the selected tag.
- **name** (*Optional*): Name of the sensor.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
- **authentication** (*Optional*): Type of the HTTP authentication. Either `basic` or `digest`.
- **username** (*Optional*): The username for accessing the website.
- **password** (*Optional*): The password for accessing the website.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor. There is also a [Jupyter notebook](http://nbviewer.jupyter.org/github/home-assistant/home-assistant-notebooks/blob/master/web-scraping.ipynb) available for this example to give you a bit more insight.

### {% linkable_title Home Assistant %}

The current release Home Assistant is published on [https://home-assistant.io/](https://home-assistant.io/)

{% raw %}
```yaml
sensor:
# Example configuration.yaml entry
  - platform: scrape
    resource: https://home-assistant.io
    name: Release
    select: ".current-version h1"
    value_template: '{{ value.split(":")[1] }}'
```
{% endraw %}

### {% linkable_title Available implementations %}

Get the counter for all our implementations from the [Component overview](/components/) page.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://home-assistant.io/components/
    name: Home Assistant impl.
    select: 'a[href="#all"]'
    value_template: '{{ value.split("(")[1].split(")")[0] }}'
```
{% endraw %}

### {% linkable_title Get a value out of a tag %}

The German [Federal Office for Radiation protection (Bundesamt für Strahlenschutz)](http://www.bfs.de/) is publishing various details about optical radiation including an UV index. This example is getting the index for a region in Germany.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: http://www.bfs.de/DE/themen/opt/uv/uv-index/prognose/prognose_node.html
    name: Coast Ostsee
    select: 'p:nth-of-type(19)'
    unit_of_measurement: 'UV Index'
```

### {% linkable_title IFTTT status %}

If you make heavy use of the [IFTTT](/components/ifttt/) web service for your automations and are curious about the [status of IFTTT](http://status.ifttt.com/) then you can display the current state of IFTTT in your frontend.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: http://status.ifttt.com/
    name: IFTTT status
    select: '.component-status'
```

### {% linkable_title Get the latest podcast episode file URL %}

If you want to get the file URL for the latest episode of your [favorite podcast](https://hasspodcast.io/), so you can pass it on to a compatible media player.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://hasspodcast.io/feed/podcast
    name: Home Assistant Podcast
    select: 'enclosure:nth-of-type(1)'
    attribute: url
```

### {% linkable_title Energy price %}

This example tries to retrieve the price for electricity.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://elen.nu/timpriser-pa-el-for-elomrade-se3-stockholm/
    name: Electricity price
    select: ".elspot-content"
    value_template: '{{ value.split(" ")[0] }}'
    unit_of_measurement: "öre/kWh"
```
{% endraw %}
