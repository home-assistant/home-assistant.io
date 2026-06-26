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

The **Tailscale** {% term integration %} monitors the devices in your [Tailscale](https://www.tailscale.com) network (Tailnet) from Home Assistant. Tailscale is a VPN service that creates secure connections between your devices using WireGuard.

For each device in your Tailnet, the integration shows details such as when the device was last seen, its Tailscale IP address, when its key expires, and whether a client update is available. You can use this to keep an eye on your network, or to get notified when a device needs attention, such as an update or an expiring key.

{% important %}
This integration monitors your Tailscale network. It does not make Home Assistant itself reachable over Tailscale.

To reach Home Assistant remotely through Tailscale, install Tailscale on your Home Assistant device by following the [Tailscale installation guide](https://tailscale.com/kb/).
{% endimportant %}

## Prerequisites

To set up the integration, you need two things from the [Tailscale admin console](https://login.tailscale.com/admin):

- **API access token**: Create one under **Settings** > **Keys** in the admin console. Select **Generate access token**, then copy the token. Tailscale API access tokens are valid for 90 days, after which Home Assistant asks you to enter a new one.
- **Tailnet name**: The name of your Tailscale network. You can find it in the top-left corner of the admin console, next to the Tailscale logo. It is usually an email address or an organization name.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "Your Tailscale API access token from the admin console."
Tailnet:
  description: "The name of your Tailnet, such as an email address or organization name."
{% endconfiguration_basic %}

## Supported functionality

The integration creates a device in Home Assistant for each device in your Tailnet, with the following entities.

### Sensors

- **Last seen**: The date and time the device was last seen on your Tailnet.
- **IP address**: The Tailscale IP address of the device.
- **Expires**: The date and time the device's key expires.

### Binary sensors

- **Client**: Whether a Tailscale client update is available for the device.
- **Key expiry disabled**: Whether key expiry is turned off for the device, meaning its key does not expire.
- **Supports IPv6**: Whether the device's client supports IPv6.
- **Supports UDP**: Whether the device's client supports UDP.
- **Supports UPnP**: Whether the device's client supports UPnP.
- **Supports NAT-PMP**: Whether the device's client supports NAT-PMP.
- **Supports PCP**: Whether the device's client supports PCP.

## Examples

### Notify when a Tailscale client update is available

Send a notification when an update becomes available for one of your devices, so you can keep your Tailscale clients up to date:

```yaml
alias: "Tailscale update available"
triggers:
  - trigger: state
    entity_id: binary_sensor.work_laptop_client
    to: "on"
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Tailscale"
      message: "A Tailscale client update is available for the work laptop."
```

## Data updates

The integration {% term polling polls %} the Tailscale API every minute for the latest device and network information.

## Known limitations

- The integration is read-only. You cannot change devices or your Tailnet from Home Assistant.
- There is no online or offline sensor for devices. To tell whether a device is currently connected, use the **Last seen** sensor.
- Tailscale API access tokens are valid for 90 days. When a token expires, the integration stops updating and asks you to enter a new token.

## Troubleshooting

### Integration fails to connect

If setup fails with a connection or authentication error:

1. Make sure the API access token is copied correctly, without extra spaces.
2. Check that the token has not expired. Tailscale API access tokens are valid for 90 days. Create a new one in the [Tailscale admin console](https://login.tailscale.com/admin/settings/keys) if needed.
3. Confirm that the Tailnet name matches the one shown in the top-left corner of the admin console.
4. Make sure your Home Assistant instance can reach the internet.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration does not revoke your Tailscale API access token. If you no longer need it, revoke it in the [Tailscale admin console](https://login.tailscale.com/admin/settings/keys).
