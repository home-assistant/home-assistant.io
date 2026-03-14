---
title: UniFi Access
description: Instructions on how to integrate UniFi Access with Home Assistant.
ha_category:
  - Lock
ha_release: 2026.4
ha_domain: unifi_access
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - "@imhotep"
  - "@RaHehl"
ha_platforms:
  - lock
ha_integration_type: hub
---

The **UniFi Access** {% term integration %} allows you to control and monitor [Ubiquiti UniFi Access](https://ui.com/door-access) devices from Home Assistant.

UniFi Access is a modern, IP-based door access control system by [Ubiquiti](https://ui.com). It supports a range of access readers, door locks, and hubs that can be managed through a local UniFi Access controller (such as a UniFi Dream Machine Pro or a dedicated UniFi Access application host).

This integration communicates with the UniFi Access controller over the local network using its REST API and WebSocket interface, providing real-time door status updates without polling.

## Prerequisites

Before setting up this integration, make sure you have the following:

- A running UniFi Access controller (for example, on a UniFi Dream Machine Pro or Cloud Key Gen2 Plus with the Access application installed).
- An API token generated from the UniFi Access controller settings:
  1. Open the UniFi Access web interface.
  2. Navigate to **Settings** > **Advanced**.
  3. Under **API Token**, select **Create Token**.
  4. Give the token a descriptive name (for example, *Home Assistant*) and save it.
  5. Copy the generated token — you will need it during setup.
- Your Home Assistant instance must be able to reach the UniFi Access controller on your local network.

{% include integrations/config_flow.md %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the UniFi Access controller."
API Token:
  description: "The API token generated in the UniFi Access controller settings."
Verify SSL:
  description: "Whether to verify the SSL certificate of the controller. Disable this if you are using a self-signed certificate."
{% endconfiguration_basic %}

## Supported devices

This integration supports any door managed by a UniFi Access controller, including doors equipped with:

- UniFi Access Reader (UA Reader, UA Reader Pro, UA Reader Lite)
- UniFi Access Lock (UA Lock)
- UniFi Access Hub (UA Hub, UA Hub Ultra)

## Data updates

The integration uses a local push architecture via WebSocket. When a door's lock or position status changes, the UniFi Access controller pushes updates to Home Assistant in real time. No {% term polling %} is performed.

## Supported functionality

### Entities

The **UniFi Access** integration provides the following entities.

#### Locks

Each door registered in your UniFi Access controller is represented as a **lock** entity in Home Assistant.

- **Unlock**: Triggers the configured door lock relay to open the door for its configured duration.
- **Open**: Opens the door (same as unlock).

## Known limitations

- **No remote lock command**: The UniFi Access API only supports unlocking doors.
- **Single controller**: Each configuration entry connects to one UniFi Access controller. If you have multiple controllers, add a separate integration entry for each.

## Troubleshooting

### Cannot connect to the controller

#### Symptom: "Could not connect" error during setup

When trying to set up the integration, the form shows a connection error.

##### Description

This means your Home Assistant instance cannot reach the UniFi Access controller on the network.

##### Resolution

To resolve this issue, try the following steps:

1. Verify that the UniFi Access controller is reachable from your Home Assistant instance (check the host or IP address).
2. Make sure no firewall is blocking the connection.
3. Ensure the UniFi Access application is running on the controller.

### Invalid authentication

#### Symptom: "Invalid authentication" error during setup

The integration reports invalid authentication when trying to connect.

##### Description

The API token may have been revoked, expired, or entered incorrectly.

##### Resolution

To resolve this issue, try the following steps:

1. Verify that the API token has not been revoked or expired in the UniFi Access controller settings.
2. Re-enter the token or generate a new one.
3. If the integration was already set up, use the **Reconfigure** option in the integration settings.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removal, you may also want to revoke the API token in your UniFi Access controller settings.
