---
title: Flu Near You
description: Instructions on how to use Flu Near You data within Home Assistant
ha_category:
  - Health
ha_release: 0.83
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bachya'
ha_domain: flunearyou
ha_config_flow: true
---

The `flunearyou` sensor platform allows users in the United States and its
territories to get information regarding reported flu symptoms from [Flu Near
You](https://flunearyou.org/). The platform can return user-reported information as well reports from the
Center for Disease Control (CDC).

## Configuration

To enable the platform, add the following lines to your `configuration.yaml`
file:

```yaml
sensor:
  - platform: flunearyou
```

{% configuration %}
monitored_conditions:
  description: The sensor categories to display.
  required: false
  type: list
  default: ['cdc_report', 'user_report']
latitude:
  description: The latitude of the location to monitor.
  required: false
  type: float
  default: The latitude defined under the `homeassistant` key in `configuration.yaml`.
longitude:
  description: The longitude of the location to monitor.
  required: false
  type: float
  default: The longitude defined under the `homeassistant` key in `configuration.yaml`.
{% endconfiguration %}

## Sensor Types

### User Report

* Number of reported cases of [Avian Flu](https://www.cdc.gov/flu/avianflu/index.htm) symptoms
* Number of reported cases of [Dengue](https://www.cdc.gov/dengue/index.html) symptoms
* Number of reported cases of [Flu](https://www.cdc.gov/flu/) symptoms
* Number of reported cases of [Flu-like](https://en.wikipedia.org/wiki/Influenza-like_illness) symptoms
* Number of reported cases of [Leptospirosis](https://www.cdc.gov/leptospirosis/index.html) symptoms
* Total number of reported cases with symptoms
* Number of reported cases with no symptoms

### CDC Report

* Current CDC level for the state
* Current CDC "Level 2" for the state
