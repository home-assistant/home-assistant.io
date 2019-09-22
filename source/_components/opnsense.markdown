---
title: "OPNsense"
description: "Instructions on how to configure OPNsense integration"
logo: opnsense.png
ha_category:
  - Hub
  - Presence Detection
ha_release: 0.100
redirect_from:
  - /components/device_tracker.opensense/
---

[OPNsense](https://opnsense.org/) is an open source HardenedBSD based firewall
and routing platform. There is currently support for the following device types
within Home Assistant:

- [Presence Detection](#presence-detection)

## Configuration

To configure OPNsense integration with Home Assistant add the following section
to your configuration.yaml:

```yaml
opnsense:
  url: http://router/api
  api_secret: APIsecret
  api_key: apiKEY
```

Where the `api_key` and `api_secret` values are aquired from your OPNsense
router using the web interface. For more inforation on this procedure refer
to the OPNsense [documentation](https://docs.opnsense.org/development/how-tos/api.html#creating-keys)

{% configuration %}
url:
  description: The url for the OPNsense api endpoint of your router
  type: string
  required: true
  default: None
api_key:
  description: The API key used to authenticate with your OPNsense API endpoint
  type: string
  required: true
  default: None
api_secret:
  description: The API secret used to authenticate with your OPNsense API endpoint
  type: string
  required: true
  default: None
verify_ssl:
  description: Set to true to enable the validation of the OPNsense API's SSL
  type: boolean
  required: false
  default: false
tracker_interfaces:
  description: List of the OPNsense router's interfaces to use for tracking devices
  type: list
  required: false
  default: None
{% endconfiguration %}


## Presence detection

This platform allows you to detect presence by looking at devices connected to an OPNsense router
