---
title: Cisco Mobility Express
description: Instructions on how to integrate Cisco Mobility Express wireless controllers into Home Assistant.
ha_category:
  - Presence detection
ha_release: '0.90'
ha_iot_class: Local Polling
ha_codeowners:
  - '@fbradyirl'
ha_domain: cisco_mobility_express
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This is a presence detection scanner for [Cisco](https://www.cisco.com) Mobility Express wireless controllers.

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: cisco_mobility_express
    host: CONTROLLER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your controller, e.g., 192.168.10.150.
  required: true
  type: string
username:
  description: The username of a user with administrative privileges.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
ssl:
  description: Use HTTPS instead of HTTP to connect.
  required: false
  type: boolean
  default: false
verify_ssl:
  description: Enable or disable SSL certificate verification. Set to false if you have a self-signed SSL certificate and haven't installed the CA certificate to enable verification.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
