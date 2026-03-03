---
title: Synology SRM
description: Instructions on how to integrate Synology SRM routers into Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.87
ha_codeowners:
  - '@aerialls'
ha_domain: synology_srm
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This {% term integration %} allows you to detect presence by looking at connected devices to a [Synology SRM](https://www.synology.com/srm) router.

## Configuration

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: synology_srm
    host: 192.168.1.254
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The Synology SRM router host or IP address, e.g., `192.168.1.1` or `router.mydomain.local`
  required: true
  type: string
port:
  description: The port to connect to the Synology SRM router.
  required: false
  default: 8001
  type: integer
username:
  description: The username of a user with administrative privileges.
  required: false
  default: admin
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
ssl:
  description: Use HTTPS instead of HTTP to connect.
  required: false
  default: true
  type: boolean
verify_ssl:
  description: Enable or disable SSL certificate verification.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

For instructions on creating multiple administrators on SRM, please refer to the [Synology Knowledge Center](https://kb.synology.com/en-id/SRM/tutorial/Create_multiple_administrator_accounts_on_Synology_Router).

List of models known to be supported:

- RT1900ac
- RT2600ac
- MR2200ac
- RT6600ax

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.
