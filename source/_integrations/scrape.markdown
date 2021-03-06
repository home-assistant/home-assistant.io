---
title: Scrape
description: Instructions on how to integrate Web scrape sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.31
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fabaff'
ha_domain: scrape
ha_platforms:
  - sensor
---

The `scrape` sensor platform is scraping information from websites. The sensor loads a HTML page and gives you the option to search and split out a value. As this is not a full-blown web scraper like [scrapy](https://scrapy.org/), it will most likely only work with simple web pages and it can be time-consuming to get the right section.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://www.home-assistant.io
    select: ".current-version h1"
```

{% configuration %}
resource:
  description: The URL to the website that contains the value.
  required: true
  type: string
select:
  description: "Defines the HTML tag to search for. Check Beautifulsoup's [CSS selectors](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#css-selectors) for details."
  required: true
  type: string
attribute:
  description: Get value of an attribute on the selected tag.
  required: false
  type: string
index:
  description: Defines which of the elements returned by the CSS selector to use.
  required: false
  default: 0
  type: integer
name:
  description: Name of the sensor.
  required: false
  default: Web scrape
  type: string
value_template:
  description: Defines a template to get the state of the sensor.
  required: false
  type: template
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
authentication:
  description: Type of the HTTP authentication. Either `basic` or `digest`.
  required: false
  type: string
verify_ssl:
  description: Enables/disables verification of SSL-certificate, for example if it is self-signed.
  required: false
  type: boolean
  default: true
username:
  description: The username for accessing the website.
  required: false
  type: string
password:
  description: The password for accessing the website.
  required: false
  type: string
headers:
  description: Headers to use for the web request.
  required: false
  type: string
scan_interval:
  description: Interval at which to retrieve updated data from the website in seconds
  required: false
  type: integer
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this sensor. There is also a [Jupyter notebook](https://nbviewer.jupyter.org/github/home-assistant/home-assistant-notebooks/blob/master/other/web-scraping.ipynb) available for this example to give you a bit more insight.

### Home Assistant

The current release Home Assistant is published on [https://www.home-assistant.io/](/)

{% raw %}

```yaml
sensor:
# Example configuration.yaml entry
  - platform: scrape
    resource: https://www.home-assistant.io
    name: Release
    select: ".current-version h1"
    value_template: '{{ value.split(":")[1] }}'
```

{% endraw %}

### Available implementations

Get the counter for all our implementations from the [Component overview](/integrations/) page.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://www.home-assistant.io/integrations/
    name: Home Assistant impl.
    select: 'a[href="#all"]'
    value_template: '{{ value.split("(")[1].split(")")[0] }}'
```

{% endraw %}

### Get a value out of a tag

The German [Federal Office for Radiation protection (Bundesamt für Strahlenschutz)](http://www.bfs.de/) is publishing various details about optical radiation including an UV index. This example is getting the index for a region in Germany.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: http://www.bfs.de/DE/themen/opt/uv/uv-index/prognose/prognose_node.html
    name: Coast Ostsee
    select: "p"
    index: 19
    unit_of_measurement: "UV Index"
```

### IFTTT status

If you make heavy use of the [IFTTT](/integrations/ifttt/) web service for your automations and are curious about the [status of IFTTT](https://status.ifttt.com/) then you can display the current state of IFTTT in your frontend.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://status.ifttt.com/
    name: IFTTT status
    select: ".component-status"
```

### Get the latest podcast episode file URL

If you want to get the file URL for the latest episode of your [favorite podcast](https://hasspodcast.io/), so you can pass it on to a compatible media player.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://hasspodcast.io/feed/podcast
    name: Home Assistant Podcast
    select: "enclosure"
    index: 1
    attribute: url
```

### Energy price

This example tries to retrieve the price for electricity.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: https://elen.nu/timpriser-pa-el-for-elomrade-se3-stockholm/
    name: Electricity price
    select: ".elspot-content"
    value_template: '{{ ((value.split(" ")[0]) | replace (",", ".")) }}'
    unit_of_measurement: "öre/kWh"
```

{% endraw %}

### BOM Weather

The Australian Bureau of Meteorology website returns an error if the User Agent header is not sent.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: scrape
    resource: http://www.bom.gov.au/vic/forecasts/melbourne.shtml
    name: Melbourne Forecast Summary
    select: ".main .forecast p"
    value_template: "{{ value | truncate(255) }}"
    # Request every hour
    scan_interval: 3600
    headers:
      User-Agent: Mozilla/5.0
```

{% endraw %}
