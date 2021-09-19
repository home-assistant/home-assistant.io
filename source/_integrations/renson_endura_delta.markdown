---
title: Renson Endura Delta
description: Instructions on how to integrate Integration Sensor into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.87
ha_iot_class: Local Poll
ha_quality_scale: internal
ha_codeowners:
  - '@jimmyd-be'
ha_domain: integration
ha_platforms:
  - sensor
---

The `integration` platform provides the data from the Renson Endura delta application for Android en IOS. Also the integration provides some services to control the ventilation unit.

## Configuration

### Using UI

The integration can be configured using the UI and this is the required method to configure the integration.

### Manual

To enable Integration Sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: reson_endura_delta
    host: HOST
```

{% configuration %}
host:
  description: The hostname or IP address of the Renson endura delta.
  required: true
  type: string
{% endconfiguration %}
