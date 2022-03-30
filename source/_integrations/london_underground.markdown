---
title: London Underground
description: Display the current status of London underground & overground lines within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.49
ha_domain: london_underground
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `london_underground` sensor will display the status of London underground lines, as well as the Overground, DLR and Tfl rail.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: london_underground
    line:
      - Bakerloo
      - Central
      - Circle
      - District
      - DLR
      - Hammersmith & City
      - Jubilee
      - London Overground
      - Metropolitan
      - Northern
      - Piccadilly
      - TfL Rail
      - Victoria
      - Waterloo & City
```

{% configuration %}
line:
  description: Enter the name of at least one line.
  required: true
  type: list
{% endconfiguration %}

Powered by TfL Open Data [TFL](https://api.tfl.gov.uk/).
