---
title: Digital Ocean
description: Instructions on how to integrate the Digital Ocean within Home Assistant.
ha_category:
  - Binary sensor
  - Switch
  - System monitor
ha_release: '0.30'
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: digital_ocean
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Digital Ocean** {% term integration %} allows you to access the information about your [Digital Ocean](https://www.digitalocean.com/) droplets from Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](/integrations/digital_ocean/#binary-sensor)
- [Switch](/integrations/digital_ocean/#switch)

## Setup

Obtain your API key from your [Digital Ocean dashboard](https://cloud.digitalocean.com/settings/api/tokens).

## Configuration

To integrate your Digital Ocean droplets with Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
digital_ocean:
  access_token: YOUR_API_KEY
```

{% configuration %}
access_token:
  description: Your Digital Ocean API access token.
  required: true
  type: string
{% endconfiguration %}

## Binary sensor

The `digital_ocean` binary sensor platform allows you to monitor your Digital Ocean droplets.

### Configuration

To use your Digital Ocean droplets, you first have to set up your [Digital Ocean hub](/integrations/digital_ocean/) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: digital_ocean
    droplets:
      - 'fedora-512mb-nyc3-01'
      - 'coreos-512mb-nyc3-01'
```

{% configuration %}
droplets:
  description: List of droplets you want to monitor.
  required: true
  type: list
{% endconfiguration %}

## Switch

The `digital_ocean` switch platform allows you to control (start/stop) your Digital Ocean droplets.

### Configuration

To use your Digital Ocean droplets, you first have to set up your [Digital Ocean hub](/integrations/digital_ocean/) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: digital_ocean
    droplets:
      - 'fedora-512mb-nyc3-01'
      - 'coreos-512mb-nyc3-01'
```

{% configuration %}
droplets:
  description: List of droplets you want to control.
  required: true
  type: list
{% endconfiguration %}
