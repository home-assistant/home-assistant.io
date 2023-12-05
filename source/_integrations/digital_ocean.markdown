---
title: Digital Ocean
description: Instructions on how to integrate the Digital Ocean within Home Assistant.
ha_category:
  - Binary sensor
  - Switch
  - System monitor
ha_release: '0.30'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@fabaff'
ha_domain: digital_ocean
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
---

The **Digital Ocean** {% term integration %} allows you to access and modify the information and services hosted on [Digital Ocean](https://www.digitalocean.com/) from within Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](/integrations/digital_ocean/#binary-sensor)
- [Switch](/integrations/digital_ocean/#switch)
- [DNS Service] (/integrations/digital_ocean/#dns-service)

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

## Binary sensor

The `digital_ocean` binary sensor platform allows you to monitor the status of your Digital Ocean droplets.

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


## DNS Service

This integration offers a service to execute {% term DNS %} record updates on any domain hosted on your [DigitalOcean Networking](https://cloud.digitalocean.com/networking/domains) section.

No additional configuration is required.

Currently only A and CNAME records are supported. The service can be called either from the Developer Tools UI, or from within integrations.


### Service Details

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ------- |
| `domain` | no | String indicating what domain you wish to update. | example.com |
| `record` | no | String what record, within this domain, to update. | home (for updating home.example.com) |
| `value` | no | String indicating the desired record value. This needs to be an {% term IPv4%} address or another domain. | 145.12.122.41 |
| `type` | yes | The type of record to update. A and CNAME are supported. Defaults to A | A |


### Examples

Example call within the Developer Tools UI:

![Service Call Example](/source/images/integration/service.png)

Sample call in YAML mode:

```yaml
service: digital_ocean.update_domain_record
data:
  domain: example.com
  record: home
  value: 145.12.122.41
  type: A
```
