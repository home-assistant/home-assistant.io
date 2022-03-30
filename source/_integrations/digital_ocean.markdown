---
title: Digital Ocean
description: Instructions on how to integrate the Digital Ocean within Home Assistant.
ha_category:
  - Binary Sensor
  - Switch
  - System Monitor
ha_release: '0.30'
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: digital_ocean
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
---

The `digital_ocean` integration allows you to access the information about your [Digital Ocean](https://www.digitalocean.com/) droplets from Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](/integrations/digital_ocean/#binary-sensor)
- [Switch](/integrations/digital_ocean/#switch)

## Setup

Obtain your API key from your [Digital Ocean dashboard](https://cloud.digitalocean.com/settings/api/tokens).

## Configuration

To integrate your Digital Ocean droplets with Home Assistant, add the following section to your `configuration.yaml` file:

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

## Binary Sensor

The `digital_ocean` binary sensor platform allows you to monitor your Digital Ocean droplets.

### Configuration

To use your Digital Ocean droplets, you first have to set up your [Digital Ocean hub](/integrations/digital_ocean/) and then add the following to your `configuration.yaml` file:

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

To use your Digital Ocean droplets, you first have to set up your [Digital Ocean hub](/integrations/digital_ocean/) and then add the following to your `configuration.yaml` file:

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
