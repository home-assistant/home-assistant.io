---
title: OPNSense
description: Instructions on how to configure OPNsense integration
ha_category:
  - Hub
  - Presence detection
ha_release: 0.105
ha_codeowners:
  - '@mtreinish'
ha_domain: opnsense
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
ha_quality_scale: legacy
---

[OPNsense](https://opnsense.org/) is an open source FreeBSD based firewall
and routing platform. There is currently support for the following device types
within Home Assistant:

- [Presence detection](#presence-detection)

## Configuration

To configure OPNsense integration with Home Assistant add the following section
to your configuration.yaml:

```yaml
opnsense:
  url: https://router/api
  api_secret: API_SECRET
  api_key: API_KEY
```

Where the `api_key` and `api_secret` values are acquired from your OPNsense
router using the web interface. For more information on this procedure, refer
to the OPNsense [documentation](https://docs.opnsense.org/development/how-tos/api.html#creating-keys).

User with API Key requires privileges for Type: 

- GUI Name: Diagnostics: ARP Table
- GUI Name: Diagnostics: Network Insight

{% configuration %}
url:
  description: The URL for the OPNsense API endpoint of your router.
  type: string
  required: true
api_key:
  description: The API key used to authenticate with your OPNsense API endpoint.
  type: string
  required: true
api_secret:
  description: The API secret used to authenticate with your OPNsense API endpoint.
  type: string
  required: true
verify_ssl:
  description: Set to true to enable the validation of the OPNsense API SSL.
  type: boolean
  required: false
  default: false
tracker_interfaces:
  description: List of the OPNsense router's interfaces to use for tracking devices.
  type: list
  required: false
  default: []
{% endconfiguration %}


## Presence detection

This platform allows you to detect presence by looking at devices connected to an OPNsense router.
