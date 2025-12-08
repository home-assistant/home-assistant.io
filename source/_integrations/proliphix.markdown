---
title: Proliphix
description: Instructions on how to integrate Proliphix thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 0.11
ha_iot_class: Local Polling
ha_domain: proliphix
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

The `proliphix` climate platform let you control Proliphix thermostats from Home Assistant.

Currently supported and tested thermostats:

- NT10e

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:

```yaml
climate:
  - platform: proliphix
    host: IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: Address of your thermostat, e.g., 192.168.1.32.
  required: true
  type: string
username:
  description: Username for the thermostat.
  required: true
  type: string
password:
  description: Password for the thermostat.
  required: true
  type: string
{% endconfiguration %}

The Proliphix NT Thermostat series are Ethernet connected thermostats. They have a local HTTP interface that is based on get/set
of OID values. A complete collection of the API is available in this [API documentation](https://github.com/sdague/thermostat.rb/blob/master/docs/PDP_API_R1_11.pdf).
