---
title: Fritz!Box VPN
description: Control WireGuard VPN connections on AVM FRITZ!Box routers from Home Assistant.
ha_category:
  - Binary sensor
  - Sensor
  - Switch
ha_release: '2026.2'
ha_domain: fritzbox_vpn
ha_config_flow: true
ha_codeowners:
  - '@rosch100'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
  - switch
ha_ssdp: true
ha_integration_type: device
ha_quality_scale: gold
related:
  - docs: /integrations/fritz
    title: FRITZ!Box Tools
  - docs: /common-tasks/general/#enabling-or-disabling-entities
    title: Enabling or disabling entities
---

The **Fritz!Box VPN** {% term integration %} controls **WireGuard VPN** connections configured on an [AVM FRITZ!Box](https://en.fritz.com/products/fritzbox/) router. Each VPN connection appears as its own device with a switch, status sensors, and a connectivity binary sensor.

{% important %}
**TR-064** (_Permit access for apps_) must be enabled on the FRITZ!Box under **Home Network** > **Network** > **Network settings** > **Access Settings in the Home Network**. Without TR-064, login to the web UI API fails.

**UPnP** (_Transmit status information over UPnP_) on the same page is recommended for automatic discovery via SSDP. Manual setup by IP address still works when UPnP is disabled.
{% endimportant %}

## Supported devices

- **FRITZ!Box routers** with **WireGuard VPN** support in Fritz!OS (for example FRITZ!Box 7590, 7530 AX, 6690, 4060 when WireGuard is available in the web UI)
- **FRITZ!Repeater** and other non-router FRITZ! products are **not** discovered by this integration (only FRITZ!Box routers)

## Known limitations

- **WireGuard only** — IPsec or OpenVPN connections configured on the FRITZ!Box are not exposed by the API used here
- One config entry per FRITZ!Box router (unique by device UUID or host)

## Prerequisites

### Username

Create a dedicated user under **System** > **FRITZ!Box Users** > **Users** > **Add User** with permission **FRITZ!Box settings** (or use an existing user with web UI access).

{% note %}
From Fritz!OS 7.24 onward, the default admin user may have an auto-generated username (`fritz` followed by four digits) instead of `admin`. Find it under **System** > **FRITZ!Box Users** > **Users**.
{% endnote %}

If **FRITZ!Box Tools** (`fritz`) is already configured, this integration can reuse its credentials during setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: Hostname or IP address of the FRITZ!Box (for example `192.168.178.1` or `fritz.box`).
Username:
  description: FRITZ!Box user with web UI access (_see [Username](#username)_).
Password:
  description: Password for that user.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Host:
  description: Updated hostname or IP address of the FRITZ!Box.
Username:
  description: Updated username.
Password:
  description: Leave empty to keep the current password, or enter a new password.
Update interval:
  description: Polling interval in seconds (5–3600, default 30). Higher values reduce load on the router.
{% endconfiguration_basic %}

Options menu actions (no extra fields):

- **Remove unavailable entities** — removes entities whose VPN connection no longer exists on the FRITZ!Box, then reloads the integration
- **Repair entity ID suffixes** — renames entities that received a `_2`, `_3`, … suffix back to the base entity ID

## Supported functionality

For each WireGuard VPN connection on the router, the integration creates:

| Platform | Description |
| --- | --- |
| **{% term Switch %}** | Enable or disable the VPN connection |
| **{% term "Binary sensor" %}** | Connectivity (`connected`) |
| **{% term Sensor %}** | Textual status (`connected`, `enabled`, `disabled`, `unknown`) |
| **{% term Sensor %}** (disabled by default) | Connection UID and internal VPN UID (diagnostic) |
| **{% term Diagnostics %}** | Redacted config and VPN connection summary |

Switch attributes include `name`, `uid`, `vpn_uid`, `active`, `connected`, and `status`.

## Data updates

The integration polls the FRITZ!Box web UI on a configurable interval (default **30 seconds**, range 5–3600 seconds). After repeated fetch errors, retries are delayed by **5 minutes**. A single login session is reused per config entry to minimize router notifications.

## Use cases

- Enable a WireGuard VPN when leaving home and disable it when returning
- Send a notification when a VPN is enabled but no longer connected
- Display VPN status on a dashboard

## Example automation

Notify when a VPN should be connected but is not:

```yaml
alias: "FRITZ! VPN disconnected alert"
triggers:
  - trigger: state
    entity_id: binary_sensor.fritzbox_vpn_<connection_uid>_connected
    to: "off"
conditions:
  - condition: state
    entity_id: switch.fritzbox_vpn_<connection_uid>_switch
    state: "on"
actions:
  - action: notify.notify
    data:
      message: "VPN {{ states('sensor.fritzbox_vpn_<connection_uid>_status') }} is not connected"
```

Replace `<connection_uid>` with the value from the switch attributes or the **Connection UID** sensor.

## Actions

Available {% term actions %}:

- `fritzbox_vpn.remove_unavailable_entities`
- `fritzbox_vpn.repair_entity_id_suffixes`

Both accept an optional `config_entry_id` to limit the operation to one config entry.

### Action: Remove unavailable entities

Removes entity (and device) registry entries for VPN connections that no longer exist on the FRITZ!Box, then reloads the integration.

| Data attribute | Required | Description |
| --- | --- | --- |
| `config_entry_id` | no | Limit cleanup to this config entry; omit to process all Fritz!Box VPN entries |

### Action: Repair entity ID suffixes

Repairs entity IDs that received a numeric suffix after faulty deactivation (for example `switch.example_2` → `switch.example`).

| Data attribute | Required | Description |
| --- | --- | --- |
| `config_entry_id` | no | Limit repair to this config entry; omit to process all entries |

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| **Invalid authentication** | Username and password; TR-064 enabled; complete **Reauthenticate** when prompted |
| **Cannot connect** | Correct IP or hostname; Home Assistant can reach the FRITZ!Box; HTTPS vs HTTP |
| **No VPN entities** | WireGuard connections configured in the FRITZ!Box UI; reload the integration |
| **Entities unavailable** | VPN removed on the router — use **Remove unavailable entities** in options |
| **Entity IDs with `_2` suffix** | Use **Repair entity ID suffixes** in options |

Enable debug logging from the integration card (**⋮** → **Enable debug logging**), reproduce the issue, then disable debug logging to download logs.

## Removal

{% include integrations/remove_device_service.md %}

1. **Settings** > **Devices & services** > **Fritz!Box VPN** > delete the config entry
2. Remove leftover entities under **Entities** (filter by `fritzbox_vpn`) if needed
3. Restart Home Assistant if devices still appear
