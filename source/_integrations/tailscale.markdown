---
title: Tailscale
description: Instructions on how to integrate Tailscale within Home Assistant.
ha_category:
  - Binary sensor
  - Network
  - Sensor
ha_release: 2021.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: tailscale
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: hub
---

The **Tailscale** {% term integration %} connects to the [Tailscale](https://www.tailscale.com) API to monitor devices in your Tailscale network (Tailnet). Use this integration to create automations based on device connectivity, track usage patterns, or receive notifications when devices go online or offline.

Tailscale is a VPN service that creates secure point-to-point connections between your devices using WireGuard technology. This integration monitors your Tailnet but doesn't provide VPN connectivity itself.

{% important %}
This integration monitors your Tailscale network but **does not provide VPN access** to Home Assistant.

To access Home Assistant remotely via Tailscale:
1. Install Tailscale directly on your Home Assistant device
2. Follow the [Tailscale installation guide](https://tailscale.com/kb/)
3. Configure port forwarding or use Tailscale's subnet routes if needed
{% endimportant %}

## Prerequisites

**Required information:**

1. **API Access Token**: Create one in the [Tailscale Admin Panel](https://login.tailscale.com/admin/settings/keys)
   - Navigate to **Settings** > **Keys**
   - Click **Generate access token**
   - Select appropriate expiration and permissions

2. **Tailnet Name**: Found in the top-left corner of the [Admin Panel](https://login.tailscale.com/admin/machines)
   - Usually in the format: `user@domain.com` or `organization-name`
   - Also visible in the URL when browsing your admin panel

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Key:
  description: "Your Tailscale API access token from the Admin Panel."
Tailnet:
  description: "Your Tailnet name (organization name or email address)."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides sensors for monitoring your Tailscale network:

#### Device information sensors

- **Device count**: Total number of devices in your Tailnet
- **Connected devices**: Number of currently online devices  
- **Disconnected devices**: Number of currently offline devices

#### Per-device sensors

For each device in your Tailnet:

- **Connection status**: Whether the device is online or offline
- **Last seen**: Timestamp when the device was last active
- **Operating system**: Device OS (Windows, macOS, Linux, iOS, Android)
- **Tailscale version**: Version of Tailscale client running
- **IP addresses**: Both Tailscale IP and external IP
- **Location**: Approximate geographic location (if available)

### Binary sensors

The integration creates binary sensors for:

#### Network status

- **Tailnet health**: Overall network connectivity status
- **Device reachability**: Per-device online/offline status

#### Security monitoring

- **Key expiration warnings**: Alerts when auth keys are approaching expiration
- **Unauthorized access**: Notifications for new device connections (if configured)

## Examples

### Automated backups based on device availability

Start backups when specific devices are online:

```yaml
automation:
  - alias: "Start backup when work laptop connects"
    triggers:
      - trigger: state
        entity_id: binary_sensor.work_laptop_tailscale
        from: "off"
        to: "on"
    conditions:
      - condition: time
        after: "18:00:00"  # Only after work hours
        before: "23:00:00"
    actions:
      - action: script.start_network_backup
      - action: notify.admin
        data:
          message: "Starting automated backup - work laptop detected"
```


## Data updates

The Tailscale integration polls the Tailscale API every minute to check device status and network information.

## Troubleshooting

### Integration fails to connect

#### Symptom: "Unable to connect to Tailscale API" error

**Solutions:**

1. **Verify API key**:
  
   - Ensure the key is copied correctly (no extra spaces)
   - Check key hasn't expired in the Tailscale admin panel
   - Verify key has appropriate permissions

2. **Network connectivity**:
   - Ensure Home Assistant can reach Tailscale's API servers
   - Check firewall rules if running in restricted environments

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removal:

1. Your Tailscale API key remains active
2. Consider revoking the key in the Tailscale admin panel if no longer needed
3. Your Tailscale network and devices continue operating normally
