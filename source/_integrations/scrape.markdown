---
title: Scrape
description: Instructions on how to integrate Web scrape sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.31
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fabaff'
  - '@gjohansson-ST'
ha_domain: scrape
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `scrape` sensor {% term integration %} scrapes information from websites. The sensor loads an HTML page, and allows you to search and extract specific values. As this is not a fully featured web scraper like [scrapy](https://scrapy.org/), it will work with simple web pages and it can be time-consuming to get the right section.

If you are not using Home Assistant Container or Home Assistant Operating System, this integration requires `libxml2` to be installed. On Debian based installs, run:

```bash
sudo apt install libxml2
```

Both UI and YAML setup is supported while YAML provides additional configuration possibilities.

{% include integrations/config_flow.md %}

To enable this {% term integration %} using YAML, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
scrape:
  - resource: https://www.home-assistant.io
    sensor:
      - name: "Current version"
        select: ".release-date"
```

{% configuration %}
resource:
  description: The resource or endpoint that contains the value.
  required: true
  type: string
resource_template:
  description: The resource or endpoint that contains the value with template support.
  required: true
  type: template
method:
  description: The method of the request. Either `POST` or `GET`.
  required: false
  type: string
  default: GET
payload:
  description: The payload to send with a POST request. Depends on the service, but usually formed as JSON.
  required: false
  type: string
verify_ssl:
  description: Verify the SSL certificate of the endpoint.
  required: false
  type: boolean
  default: True
timeout:
  description: Defines max time to wait data from the endpoint.
  required: false
  type: integer
  default: 10
authentication:
  description:  Type of the HTTP authentication. `basic` or `digest`.
  required: false
  type: string
username:
  description: The username for accessing the REST endpoint.
  required: false
  type: string
password:
  description: The password for accessing the REST endpoint.
  required: false
  type: string
headers:
  description: The headers for the requests.
  required: false
  type: [list, template]
params:
  description: The query params for the requests.
  required: false
  type: [list, template]
scan_interval:
  description: Define the refrequency to call the REST endpoint in seconds.
  required: false
  type: integer
  default: 600
encoding:
  description: The character encoding to use if none provided in the header of the shared data.
  required: false
  type: string
  default: UTF-8
sensor:
  description: A list of sensors to create from the shared data. All configuration settings that are supported by [RESTful Sensor](/integrations/sensor.rest#configuration-variables) not listed above can be used here.
  required: true
  type: map
  keys:
    name:
      description: Defines a template to get the name of the entity.
      required: false
      type: template
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
    value_template:
      description: Defines a template to get the state of the sensor.
      required: false
      type: template
    unique_id:
      description: An ID that uniquely identifies this entity. Will be combined with the unique ID of the configuration block if available. This allows changing the `name`, `icon` and `entity_id` from the web interface.
      required: false
      type: string
    icon:
      description: Defines a template for the icon of the entity.
      required: false
      type: template
    availability:
      description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that the string comparison not case sensitive; `"TrUe"` and `"yEs"` are allowed.
      required: false
      type: template
      default: true
    unit_of_measurement:
      description: "Defines the units of measurement of the sensor, if any. This will also display the value based on the user profile Number Format setting and influence the graphical presentation in the history visualization as a continuous value."
      required: false
      type: string
      default: None
    state_class:
      description: "The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor. This will also display the value based on the user profile Number Format setting and influence the graphical presentation in the history visualization as a continuous value."
      required: false
      type: string
      default: None
    picture:
      description: Defines a template for the entity picture of the sensor.
      required: false
      type: template
    device_class:
      description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
      required: false
      type: device_class
      default: None
{% endconfiguration %}

{% include integrations/using_templates.md %}

## Examples

In this section you find some real-life examples of how to use this sensor. There is also a [Jupyter notebook](https://nbviewer.jupyter.org/github/home-assistant/home-assistant-notebooks/blob/master/other/web-scraping.ipynb) available for this example to give you a bit more insight.

### Home Assistant

The current release Home Assistant is published on [homepage](/)

{% raw %}

```yaml
scrape:
# Example configuration.yaml entry
  - resource: https://www.home-assistant.io
    sensor:
      - name: Release
        select: ".release-date"
```

{% endraw %}

### Available implementations

Get the counter for all our implementations from the integrations page under {% my integrations title="**Settings** > **Devices & services**" %}.

{% raw %}

```yaml
# Example configuration.yaml entry
scrape:
  - resource: https://www.home-assistant.io/integrations/
    sensor:
      - name: Home Assistant impl.
        select: 'a[href="#all"]'
        value_template: '{{ value.split("(")[1].split(")")[0] }}'
```

{% endraw %}

### Get a value out of a tag

The German [Federal Office for Radiation protection (Bundesamt für Strahlenschutz)](https://www.bfs.de/) is publishing various details about optical radiation including an UV index. This example is getting the index for a region in Germany.

```yaml
# Example configuration.yaml entry
scrape:
  - resource: https://www.bfs.de/DE/themen/opt/uv/uv-index/prognose/prognose_node.html
    sensor:
      - name: Coast Ostsee
        select: "p"
        index: 19
        unit_of_measurement: "UV Index"
```

### IFTTT status

If you make heavy use of the [IFTTT](/integrations/ifttt/) web service for your automations and are curious about the [status of IFTTT](https://status.ifttt.com/) then you can display the current state of IFTTT in your frontend.

```yaml
# Example configuration.yaml entry
scrape:
  - resource: https://status.ifttt.com/
    sensor:
      - name: IFTTT status
        select: ".component-status"
```

### Get the latest podcast episode file URL

If you want to get the file URL for the latest episode of your [favorite podcast](https://hasspodcast.io/), so you can pass it on to a compatible media player.

```yaml
# Example configuration.yaml entry
scrape:
  - resource: https://hasspodcast.io/feed/podcast
    sensor:
      - name: Home Assistant Podcast
        select: "enclosure"
        index: 1
        attribute: url
```

### Energy price

This example tries to retrieve the price for electricity.

{% raw %}

```yaml
# Example configuration.yaml entry
scrape:
  - resource: https://elen.nu/dagens-spotpris/se3-stockholm/
    sensor:
      - name: Electricity price
        select: ".text-lg.font-bold"
        index: 1
        value_template: '{{ value | replace (",", ".") | float }}'
        unit_of_measurement: "öre/kWh"
```

{% endraw %}

### Container cleaning by CleanProfs in The Netherlands

This example gets the container type and container cleaning date for the next two cleanings.

```yaml
# Example configuration.yaml entry. Change postal code and house number to your own address.
scrape:
  - resource: https://crm.cleanprofs.nl/search/planning
    method: POST
    payload: zipcode=5624JW&street_number=17
    headers:
      Content-Type: application/x-www-form-urlencoded
    sensor:
      - name: "Type container 1"
        select: "div.nk-tb-item:nth-child(2) > div:nth-child(1) > span:nth-child(1)"
      - name: "Date container 1"
        select: "div.nk-tb-item:nth-child(2) > div:nth-child(3) > span:nth-child(1) > span:nth-child(1)"
      - name: "Type container 2"
        select: "div.nk-tb-item:nth-child(3) > div:nth-child(1) > span:nth-child(1)"
      - name: "Date container 2"
        select: "div.nk-tb-item:nth-child(3) > div:nth-child(3) > span:nth-child(1) > span:nth-child(1)"

```
