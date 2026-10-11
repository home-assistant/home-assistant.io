---
title: FortiOS
description: Instructions on how to use Fortinet FortiOS to track devices in Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.97
ha_domain: fortios
ha_config_flow: true
ha_platforms:
  - device_tracker
ha_codeowners:
  - '@kimfrellsen'
ha_integration_type: hub
related:
  - docs: /integrations/device_tracker/
    title: Device tracking
ha_quality_scale: legacy
---

The FortiOS {% term integration %} tracks the presence of clients reported by a [Fortinet](https://www.fortinet.com/) FortiGate. You can set up and manage the integration from the Home Assistant interface.

## Supported devices

You need a FortiGate running FortiOS 6.4.3 or newer with access to its HTTPS REST API. The integration checks the firmware version and the FortiGate serial number during setup.

## Prerequisites

Create a REST API administrator on your FortiGate using Fortinet's [REST API administrator instructions](https://docs.fortinet.com/document/fortigate/7.2.5/administration-guide/399023/rest-api-administrator).

- Assign a read-only administrator profile that permits reading system status and detected clients in the `root` virtual domain. The integration does not require write permissions.
- Restrict the administrator's trusted hosts to the address Home Assistant uses to connect to the FortiGate.
- Save the generated API token securely. FortiGate displays it only once.
- Make sure Home Assistant can reach the FortiGate's HTTPS management port.

Fortinet recommends read permissions for monitoring and restricting access with trusted hosts. See [Using APIs](https://docs.fortinet.com/document/fortigate/7.6.6/administration-guide/940602/using-apis) for details.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The FortiGate hostname or IP address. You can include a custom port, such as `192.168.1.1:8443`. Enclose IPv6 addresses in brackets, such as `[2001:db8::1]:8443`. The default port is 443."
API token:
  description: "The token generated for your read-only REST API administrator."
Verify SSL certificate:
  description: "Enabled by default. Home Assistant verifies the FortiGate's HTTPS certificate. If you use a self-signed certificate that Home Assistant cannot verify, you can turn off this setting."
{% endconfiguration_basic %}

## Migrating an existing YAML configuration

If you already configured FortiOS under `device_tracker` in `configuration.yaml`, Home Assistant imports that configuration when it starts. The import preserves the host, API token, SSL verification setting, and `consider_home` grace period.

The integration uses a fixed 12-second polling interval. The legacy `interval_seconds` setting is not imported, and previously stored `scan_interval` values do not change this interval.

1. Keep your FortiOS YAML configuration until a FortiOS entry appears under {% my integrations title="**Settings** > **Devices & services**" %} and the import succeeds.
2. Remove only the FortiOS platform block from `configuration.yaml` after confirming that the import succeeded. Keep unrelated device tracker configurations.
3. If a repair identifies matching tracked entries in `known_devices.yaml`, review their use in person assignments and automations. Remove only the entries identified by the repair, then restart Home Assistant.
4. Open the integration's entity list and enable the trackers you want to use. Update person assignments and automation references if entity IDs differ from your previous configuration.

If the import fails, keep the YAML configuration. Correct the firmware, host, API token, or SSL verification setting indicated by the repair, then restart Home Assistant to retry. FortiOS 6.4.3 or newer is required. A successful import removes the import-failure repair.

## Supported functionality

### Device trackers

Home Assistant creates a tracker when a client is first reported online. Clients that are only reported offline do not create trackers. Discovery continues if the first scan is empty.

Trackers for devices not already known to Home Assistant are disabled by default. Enable the clients you want to track from the integration's entity list. Trackers for devices already registered in Home Assistant can be enabled automatically.

A tracker shows `home` while the client is online. After its last online observation, it remains `home` for a grace period before changing to `not_home`. New configurations use a three-minute grace period. Imported YAML configurations retain their `consider_home` value. Clients that disappear from the FortiGate's list also use this grace period. The state changes on the next update after the grace period expires.

## Data updates

After setup, one shared scan per FortiGate updates all its trackers every 12 seconds. Adding more trackers does not add a separate scan for each entity. The polling interval is fixed and cannot be changed in the integration settings.

## Known limitations

- Only clients reported by the FortiGate can be tracked.
- The integration reads the `root` virtual domain. Clients in other virtual domains are not supported.
- Home Assistant checks the serial number at startup and when you replace the API token. Credentials for a different FortiGate cannot replace the configured device.
- There is no option to change the host address after setup. To use a different host address, remove the integration and add it again with the correct address.

## Troubleshooting

### Unsupported firmware

If the setup form reports that FortiOS 6.4.3 or newer is required, update the FortiGate firmware and submit the form again.

If an existing integration cannot load because of unsupported firmware, update the firmware and reload the integration under {% my integrations title="**Settings** > **Devices & services**" %}. Home Assistant does not poll clients while this setup error is present.

### Connection or certificate errors

If setup reports a connection failure, check the hostname or IP address, HTTPS port, trusted hosts, and certificate verification setting. During initial setup, submit the form again after correcting the connection. For an existing integration, Home Assistant retries setup automatically after connection failures.

If an established connection fails, existing trackers become `unavailable`. They recover after the next successful scan.

### Invalid API token

If the token becomes invalid, Home Assistant asks you to authenticate again. Generate a replacement token with the required read permissions, then enter it when prompted. The token must identify the same FortiGate. Keep tokens out of shared screenshots and logs.

### FortiGate identity mismatch

If the FortiGate serial number does not match the configured device, Home Assistant stops setup before polling clients. Check that the hostname, DNS mapping, or DHCP assignment still points to the original FortiGate, then reload the integration. To use a different host address or a different FortiGate, remove the integration and add it again.

### Leftover known devices

If a repair identifies entries in `known_devices.yaml`, remove only the matching tracked entries after reviewing their use in automations and person assignments. Restart Home Assistant and enable the new trackers you need. You do not need to delete the entire file or unrelated entries.

## Removing the integration

{% include integrations/remove_device_service.md %}
