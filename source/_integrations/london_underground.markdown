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
ha_codeowners:
  - '@jpbede'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `london_underground` {% term integration %} will display the status of London underground lines, as well as the Overground and DLR.

To enable this {% term integration %}, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
      - Elizabeth line
      - Hammersmith & City
      - Jubilee
      - Metropolitan
      - Northern
      - Piccadilly
      - Victoria
      - Waterloo & City
      - Liberty
      - Lioness
      - Mildmay
      - Suffragette
      - Weaver
      - Windrush
```

{% configuration %}
line:
  description: Enter the name of at least one line.
  required: true
  type: list
{% endconfiguration %}

Powered by TfL Open Data [TFL](https://api.tfl.gov.uk/).
