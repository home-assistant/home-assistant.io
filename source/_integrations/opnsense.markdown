---
title: OPNsense
description: Instructions on how to integrate OPNsense firewalls and routers into Home Assistant.
ha_category:
  - Hub
  - Presence detection
ha_release: 2026.4
ha_codeowners:
  - "@Snuffy2"
ha_domain: opnsense
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
  - sensor
ha_integration_type: hub
ha_quality_scale: silver
---

[OPNsense](https://opnsense.org/) is an open source firewall and routing platform based on FreeBSD. The Home Assistant OPNsense integration connects to the OPNsense REST API and can expose basic router telemetry and device tracking.

{% important %}
This integration requires OPNsense firmware `26.1.1` or later. The older plugin-based and XML-RPC-based setup is no longer supported.
{% endimportant %}

## Supported functionality

In this step, the integration provides:

- Sensors for basic system telemetry
- Device tracking based on the OPNsense ARP table

## Before you begin

- Create or choose an OPNsense user for Home Assistant
- Generate an API key and API secret for that user in OPNsense
- Decide whether you want to use a full administrator account or a restricted account with granular permissions

{% note %}
The simplest and recommended setup is to use an administrator account. Granular permissions are optional and are mainly useful when you want to limit the API user to only the categories you sync and the actions you call.
{% endnote %}

## Configuration

The integration is configured from the Home Assistant UI.

1. In Home Assistant, go to **Settings** > **Devices & services**.
2. Select **Add Integration** and search for **OPNsense**.
3. Enter:
   - The full OPNsense URL, for example `https://192.168.1.1`
   - The API key
   - The API secret
   - Whether to verify the SSL certificate
   - An optional custom firewall name
4. Optionally enable **Granular Sync Options** during setup if you want to choose which categories Home Assistant should fetch.

If you are using a self-signed certificate on OPNsense, you may need to disable SSL verification during setup.

## Integration options

After setup, open the integration and select **Configure** to change options.

| Option | Default | Description |
| --- | --- | --- |
| Scan interval | `30` seconds | Polling interval for the main integration data |
| Device tracker mode | Disabled | Disable device tracking, track all detected devices, or track only selected devices |
| Device tracker scan interval | `60` seconds | Polling interval for the ARP table used by device trackers |
| Device tracker consider home | `0` seconds | Delay before marking a missing device as away |
| Granular Sync Options | Disabled | Lets you choose which OPNsense categories are synced |

## Device tracker behavior

The device tracker uses the current OPNsense ARP table.

- **Disabled**: No device tracker entities are created
- **Track all detected devices**: Home Assistant creates trackers for all currently detected devices and disables those entities by default
- **Track only selected devices**: Home Assistant shows recently detected devices and also lets you add devices manually by MAC address

Only recently seen devices appear automatically in the picker because the source is the live ARP table.

## Permissions

### Base permissions

These permissions are required for the integration itself, even when granular sync is enabled:

| OPNsense permission |
| --- |
| `Lobby: Dashboard` |
| `Status: Interfaces` |
| `System: Firmware` |

### Granular sync permissions

If you enable **Granular Sync Options**, add the permissions needed for each category you enable.

| Category | Required OPNsense permissions |
| --- | --- |
| Basic telemetry data | `Lobby: Dashboard` |
| Device trackers | `Diagnostics: ARP Table` |

### Action permissions

No integration actions are exposed in this step.

## Actions

No Home Assistant actions are exposed in this step.

## Migration notes

- If you previously used the older built-in OPNsense integration, remove any legacy YAML configuration from `configuration.yaml`.
- If you previously used the `hass-opnsense` custom integration, remove the custom component before using the built-in integration.
- If Home Assistant still shows stale entities or devices from an older setup, remove the old integration first and then add the built-in integration again.

## Removing the integration

1. In Home Assistant, go to **Settings** > **Devices & services**.
2. Select **OPNsense**.
3. Open the three-dot menu and select **Delete**.
4. If you no longer need the dedicated API user or API credentials, remove or rotate them in OPNsense.

## Known issue

If you partially or fully change the OPNsense hardware, remove and reinstall the integration so Home Assistant can rebuild the device, interface, gateway, and service entities against the new hardware state.
