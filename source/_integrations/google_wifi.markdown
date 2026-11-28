---
description: Monitor the network status and firmware of a Google Wifi or OnHub router.
ha_release: '0.50'
ha_domain: google_wifi
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Google Wifi** {% term integration %} lets you monitor the status of a [Google Wifi or OnHub router](https://support.google.com/googlenest/). It creates sensors for the router's connection status, IP address, firmware versions, and restart information.

## Supported devices

- Google Wifi routers.
- Google OnHub routers.

## Configuration

To enable this {% term integration %}, add the following lines to your {% term "configuration.yaml" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: google_wifi
```

{% include integrations/restart_ha_after_config_inclusion.md %}

{% configuration %}
host:
  description: The IP address of the Google Wifi or OnHub router.
  required: false
  default: 192.168.86.1
  type: string
name:
  description: Prefix used for the names of the Google Wifi sensors.
  required: false
  default: google_wifi
  type: string
monitored_conditions:
  description: Sensors to create. By default, all available sensors are created.
  required: false
  type: list
  keys:
    current_version:
      description: The firmware version currently installed on the router.
    new_version:
      description: The latest available firmware version. Reports `Latest` when the router is up to date.
    last_restart:
      description: The date and time when the router last restarted.
    local_ip:
      description: The IP address reported for the router's WAN connection.
    status:
      description: Whether the router is online or offline.
{% endconfiguration %}

## Supported functionality

### Sensors

The sensor names start with the value of `name` (default `google_wifi`), followed by the condition:

- **google_wifi_current_version**: The firmware version installed on the router.
- **google_wifi_new_version**: The latest firmware version available. Reports **Latest** when the router is up to date.
- **google_wifi_last_restart**: The date and time when the router last restarted.
- **google_wifi_local_ip**: The IP address of the router's WAN connection.
- **google_wifi_status**: Whether the router is **Online** or **Offline**.

## Data updates

The integration polls the router every 30 seconds.

## Known limitations

The integration provides status sensors only. It does not provide controls for changing router settings.
