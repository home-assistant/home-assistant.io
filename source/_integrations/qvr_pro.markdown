---
title: QVR Pro
description: Instructions on how to integrate QVR Pro within Home Assistant.
ha_category:
  - Camera
ha_iot_class: Local Polling
ha_release: 0.107
ha_domain: qvr_pro
ha_codeowners:
  - '@oblogic7'
ha_platforms:
  - camera
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[QVR Pro](https://www.qnap.com/en/software/qvr-pro) allows you to create 
an independent and expandable surveillance environment on your QNAP NAS. The 
`qvr_pro` integration allows you to view your QVR Pro channels in Home Assistant.

Currently, only cameras are supported by this integration.

## Configuration

To enable QVR Pro integration, add the following to your
{% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
qvr_pro:
  host: YOUR_HOST
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The IP address where QVR Pro is accessible.
  required: true
  type: string
username:
  description: The username for accessing your QVR account.
  required: true
  type: string
password:
  description: The password for accessing your QVR account.
  required: true
  type: string
port:
  description: The port where QVR accepts connections.
  required: false
  default: 8080
  type: integer
exclude_channels:
  description: Comma separated list of channel numbers to be excluded.
  required: false
  type: list
{% endconfiguration %}

Enabling the QVR Pro camera platform will add all QVR Pro channels by
default. Please see `exclude_channels` if you would like to exclude
specific channels from showing up in Home Assistant.

{% important %}
The QVR Pro user must have Surveillance Management permission.
{% endimportant %}
