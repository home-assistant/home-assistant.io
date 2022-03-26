---
title: Synology SRM
description: Instructions on how to integrate Synology SRM routers into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: 0.87
ha_codeowners:
  - '@aerialls'
ha_domain: synology_srm
ha_platforms:
  - device_tracker
---

This platform allows you to detect presence by looking at connected devices to a [Synology SRM](https://www.synology.com/en-us/srm) router.

## Configuration

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

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

It's not possible to create another account in SRM with admin permissions. You'll need to use your admin account (or the one you renamed at creation) for this connection.

List of models known to be supported:

- RT1900ac
- RT2600ac
- MR2200ac

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.
