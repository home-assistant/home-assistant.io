---
title: "Linksys Access Points"
description: "Instructions on how to integrate Linksys Access Points into Home Assistant."
ha_category:
  - Presence Detection
logo: linksys.png
ha_release: 0.37
redirect_from:
 - /components/device_tracker.linksys_ap/
---

<div class="note warning">

This integration is deprecated and will be removed in Home Assistant 0.100.0.

For more information see [Architecture Decision Record: 0004](https://github.com/home-assistant/architecture/blob/master/adr/0004-webscraping.md).

</div>

The `linksys_ap` platform offers presence detection by looking at connected devices to a Linksys based access point.

It was tested with a LAPAC1750 AC1750 Dual Band Access Point.

## Configuration

To use a Linksys Access Point in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: linksys_ap
    host: 192.168.1.1
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
host:
  description: The hostname or IP address of your access point, e.g., `192.168.1.1`.
  required: true
  type: string
username:
  description: The username of an user with administrative privileges (read-only is sufficient).
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
verify_ssl:
  description: Verify SSL certificate for HTTPS request.
  required: false
  default: true
  type: boolean
{% endconfiguration %}

## Example

Example for all configuration options:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: linksys_ap
    host: 192.168.1.1
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    verify_ssl: true
    scan_interval: 6
    consider_home: 12
```

See the [device tracker integration page](/components/device_tracker/) for instructions how to configure the people to be tracked.
