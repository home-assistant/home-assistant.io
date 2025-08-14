---
title: De Lijn
description: Instructions on how to integrate De Lijn (Flemish public transport company) departure times into Home Assistant.
ha_release: 0.97
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bollewolle'
  - '@Emilv2'
ha_domain: delijn
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `delijn` {% term integration %} will give you the departure time of the next bus, tram or subway at a specific stop of the De Lijn public transport network in Flanders (Belgium).

## Setup

Create a developer account at [De Lijn Open Data portal](https://data.delijn.be/) to get a free API subscription key.
For valid stop IDs check for the 6 digits at the physical stops or visit the [stops page](https://www.delijn.be/en/haltes/) of the De Lijn website.

## Configuration

To enable this sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: delijn
    api_key: "API_SUBSCRIPTION_KEY"
    next_departure:
    - stop_id: 'STOP_ID'
```

{% configuration %}
api_key:
  description: "API Subscription key needed to access De Lijn APIs."
  required: true
  type: string
next_departure:
  description: One or multiple departure sensors.
  required: true
  type: list
  keys:
    stop_id:
      description: "ID of the stop, e.g.,  `200552`."
      required: true
      type: string
    number_of_departures:
      description: "Specify the maximum number of departures/passages at a stop to retrieve"
      required: false
      default: 5
      type: integer
{% endconfiguration %}

## Examples

### Full configuration

The example below shows a full configuration with two sensors, only the abcdefg needs to be replaced with an actual API subscription key. The first stop_id will return the default next 5 passages, the second stop_id has been forced to return the next 20 passages.

```yaml
# Example configuration.yaml entry
sensor:
  # De Lijn public transport
  - platform: delijn
    api_key: "abcdefg"
    next_departure:
    - stop_id: '200018'
    - stop_id: '201169'
      number_of_departures: 20
```

## Custom dashboard card

Works best with the following custom dashboard card: <https://github.com/bollewolle/delijn-card>
