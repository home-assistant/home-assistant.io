---
title: Scrape
description: Instructions on how to integrate Web scrape sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.31
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@gjohansson-ST'
ha_domain: scrape
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `scrape` sensor platform is scraping information from websites. The sensor loads an HTML page and gives you the option to search and split out a value. As this is not a full-blown web scraper like [scrapy](https://scrapy.org/), it will most likely only work with simple web pages and it can be time-consuming to get the right section.

{% include integrations/config_flow.md %}

## Examples

In this section you find some real-life examples of how to use this sensor. There is also a [Jupyter notebook](https://nbviewer.jupyter.org/github/home-assistant/home-assistant-notebooks/blob/master/other/web-scraping.ipynb) available for this example to give you a bit more insight.

### Home Assistant

The current release Home Assistant is published on [https://www.home-assistant.io/](/)

| Field | Value |
| Resource | https://www.home-assistant.io |
| Name | Release |
| Select | `.current-version h1` |
| Value Template | {% raw %}`{{ value.split(':')[1] }}`{% endraw %} |

### Available implementations

Get the counter for all our implementations from the [Component overview](/integrations/) page.

| Field | Value |
| Resource | https://www.home-assistant.io/integrations/ |
| Name | Home Assistant impl. |
| Select | `a[href="#all"]` |
| Value Template | {% raw %}`{{ value.split('(')[1].split(')')[0] }}`{% endraw %} |

### Get a value out of a tag

The German [Federal Office for Radiation protection (Bundesamt für Strahlenschutz)](http://www.bfs.de/) is publishing various details about optical radiation including an UV index. This example is getting the index for a region in Germany.

| Field | Value |
| Resource | http://www.bfs.de/DE/themen/opt/uv/uv-index/prognose/prognose_node.html |
| Name | Coast Ostsee |
| Select | `p` |
| Index | `19` |
| Unit of Measurement | `UV Index` |

### IFTTT status

If you make heavy use of the [IFTTT](/integrations/ifttt/) web service for your automations and are curious about the [status of IFTTT](https://status.ifttt.com/) then you can display the current state of IFTTT in your frontend.

| Field | Value |
| Resource | https://status.ifttt.com/ |
| Name | IFTTT status |
| Select | `.component-status` |

### Get the latest podcast episode file URL

If you want to get the file URL for the latest episode of your [favorite podcast](https://hasspodcast.io/), so you can pass it on to a compatible media player.

| Field | Value |
| Resource | https://hasspodcast.io/feed/podcast |
| Name | Home Assistant Podcast |
| Select | `enclosure` |
| Index | `1` |
| Attribute | `url` |

### Energy price

This example tries to retrieve the price for electricity.

| Field | Value |
| Resource | https://elen.nu/timpriser-pa-el-for-elomrade-se3-stockholm/ |
| Name | Electricity price |
| Select | `.text-lg:is(span)` |
| Index | `1` |
| Value Template | {% raw %}`{{ value | replace (',', '.') | float }}`{% endraw %} |
| Unit of Measurement | `öre/kWh` |
