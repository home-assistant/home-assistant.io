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

To set up the integration, you need your Tailnet name and an OAuth client from the [Tailscale admin console](https://login.tailscale.com/admin):

- **Tailnet name**: The name of your Tailscale network. You can find it in the top-left corner of the admin console, next to the Tailscale logo. It is usually an email address or an organization name.
- **OAuth client**: Create one under **Settings** > **OAuth clients** in the admin console. Select **Generate OAuth client**, grant it the **Devices** > **Core** > **Read** scope, then copy the client ID and client secret. The client secret is only shown once. OAuth clients do not expire, so you do not need to replace them periodically.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Tailnet:
  description: "The name of your Tailnet, such as an email address or organization name."
OAuth client ID:
  description: "The client ID of your Tailscale OAuth client."
OAuth client secret:
  description: "The client secret of your Tailscale OAuth client."
{% endconfiguration_basic %}

{% note %}
Earlier versions of this integration could also authenticate with a Tailscale API access token, which expires after 90 days. The integration now uses OAuth client credentials exclusively. If you set it up with an API access token, Home Assistant asks you to re-authenticate with an OAuth client after updating. Enter the client ID and secret once, and the integration keeps working without the recurring expiry.
{% endnote %}

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

## Troubleshooting

### Integration fails to connect

If setup fails with a connection or authentication error:

1. Make sure the OAuth client ID and secret are copied correctly, without extra spaces.
2. Check that the OAuth client has the **Devices** > **Core** > **Read** scope. Without it, Tailscale rejects the request.
3. Confirm that the Tailnet name matches the one shown in the top-left corner of the admin console.
4. Make sure your Home Assistant instance can reach the internet.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration does not revoke your Tailscale credentials. If you no longer need the OAuth client, revoke it under [**Settings** > **OAuth clients**](https://login.tailscale.com/admin/settings/oauth) in the Tailscale admin console.
