---
title: Niko Home Control
description: Instructions on how to integrate Niko Home Control lights into Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.82
ha_domain: niko_home_control
ha_platforms:
  - light
ha_integration_type: integration
---

The `niko_home_control` platform allows you to integrate your [Niko Home Control](https://www.niko.eu/enus/products/niko-home-control) into Home Assistant.

## Configuration

To enable this lights, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
light:
  - platform: niko_home_control
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of the Niko Home light.
  required: false
  type: string
{% endconfiguration %}
