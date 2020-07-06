---
title: Gree
description: Instructions on how to integrate Gree Smart devices within Home Assistant.
ha_category:
  - Climate
ha_release: 0.113
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@cmroche'
ha_domain: gree
---

The `gree` platform allows you to control a [Gree Smart HVAC](http://global.gree.com/).

### Setup

Go to the integrations page in your configuration and click on **new integration** -> **Gree**.

Gree Smart compatible devices are detected and added automatically.

### YAML Configuration

YAML configuration is around for people that prefer YAML.
To use this integration, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
gree:
```

{% configuration %}
hosts:
  description: List with your Gree devices.
  required: false
  type: list
  keys:
    host:
      description: The IP address or hostname of the HVAC.
      required: true
      type: string
discovery:
  description: If discovered devices should be automatically added.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

### Supported models

Any Gree Smart device working with the Gree+ app should be supported, including non-Gree branded devices including some sold by Trane.
