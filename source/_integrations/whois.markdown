---
title: Whois
description: Instructions on how to integrate WHOIS lookup sensor within Home Assistant.
ha_category:
  - Network
ha_release: 0.57
ha_iot_class: Cloud Polling
ha_domain: whois
ha_platforms:
  - sensor
---

The `whois` sensor platform allows you to perform daily WHOIS lookups against your owned domains. This provides you with information such as `expiration_date`, `name_servers` and `registrar` details.

## Configuration

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: whois
    domain: example.net
```

{% configuration %}
  domain:
    description: The domain you want to perform WHOIS lookups against.
    required: true
    type: string
  name:
    description: Name to use in the frontend.
    required: false
    default: Whois
    type: string
{% endconfiguration %}
