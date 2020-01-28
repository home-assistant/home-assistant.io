---
title: Kraken
description: Instructions on how to integrate Kraken.com sensors into Home Assistant.
logo: kraken.svg
ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.106
ha_config_flow: true
ha_codeowners:
  - '@eifinger'
---

The `kraken` integration allows you to monitor exchange rates on [kraken.com](https://www.kraken.com/).

## Configuration

Set up the integration through **Configuration -> Integrations -> Kraken** or use the following entry in your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
kraken:
```

{% configuration %}
name:
  description: A name with which all sensors are prefixed.
  required: false
  type: string
  default: kraken
{% endconfiguration %}

## Integration Entities

The integration will create sensors for each tradable pair it finds on kraken.com.

For example the sensor for the pair `ETH` and `EUR` will have the entity_id `sensor.kraken_eth_eur`.
