---
title: LANBON
description: Instructions on how to integrate LANBON devices with Home Assistant.
ha_category:
  - Switch
ha_release: "2026.8"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@LANBON2026"
ha_domain: lanbon
ha_zeroconf: true
ha_platforms:
  - diagnostics
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **LANBON** {% term integration %} connects Home Assistant to a LANBON panel on your LAN. Control uses the panel's local HTTP and WebSocket API on port **8765**.

This first Core release provides **switch** entities only.

The device **Open Integration** setting is the only master switch. Home Assistant does not add a separate enable control.

## Prerequisites

- A LANBON panel with **Open Integration** enabled, on the same network as Home Assistant
- The Bearer token shown on the device screen after Open Integration is enabled

Token is **not** advertised in mDNS TXT.

## Configuration

{% include integrations/config_flow.md %}

| Field | Description |
| --- | --- |
| Host | LAN IP of the panel |
| Port | Local API port (default `8765`) |
| Token | Bearer token from the device screen |

### Zeroconf discovery

If Home Assistant and the panel share a working mDNS path, a discovery notification appears for `_lanbon._tcp`. Confirm it and paste the token from the device. A `token=` field in TXT, if present, is ignored.

## Entities

This release creates **Switch** entities for LOIP components with type `switch`. Other device types are not part of this release.

## Removing the integration

{% include integrations/remove_device_service.md %}

Turning off **Open Integration** on the device stops discovery and control. No factory reset is required.

## Troubleshooting

- **Cannot connect**: enable Open Integration on the panel and confirm port `8765` is reachable on the LAN
- **Invalid token**: paste the current token from the device screen
- **Open Integration is off**: enable it on the panel, then retry
- **No discovery**: add the integration manually by IP; Docker, WSL2, and VLANs often block mDNS
