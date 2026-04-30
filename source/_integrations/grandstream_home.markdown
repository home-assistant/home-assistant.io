---
title: Grandstream Home
description: Instructions on how to integrate Grandstream devices with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.5
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@wtxu-gs'
ha_domain: grandstream_home
ha_platforms:
  - sensor
ha_integration_type: device
ha_zeroconf: true
---

The **Grandstream Home** {% term integration %} allows you to integrate Grandstream devices with Home Assistant for monitoring. This integration supports door access control systems (GDS372x, GSC356X).

## Supported devices

This integration supports the following Grandstream device types:

### GDS/GSC series - door access control systems

Door access control devices with SIP calling capabilities.

- GDS372x series devices
- GSC356X series devices

### Device model discovery

The integration automatically discovers device models via mDNS/Zeroconf:

- GDS
  - mDNS service: `_https._tcp.local.`
  - Example name: `gds_001122334455`
- GSC
  - mDNS service: `_https._tcp.local.`
  - Example name: `gsc_001122334455`

Device names follow the format: `{device_type}_{mac_address}`.

## Prerequisites

- Grandstream device connected to your local network
- Device administrator credentials for the `gdsha` account
- Device must be accessible from your Home Assistant instance
- Home Assistant control must be enabled on the device (for GDS/GSC devices)
{% include integrations/config_flow.md %}

## Configuration

The integration can be configured through the UI:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Add integration**.
3. Search for **Grandstream Home**.
4. Follow the configuration steps:
   - Enter the device IP address or hostname.
   - Enter the device name.
5. On the authentication screen:
   - Enter administrator password (username is fixed to `gdsha`).
   - (Optional) Configure custom port (default: 443 for HTTPS).
   - (Optional) Disable SSL certificate verification (for self-signed certificates).

### Automatic discovery

The integration supports automatic device discovery via mDNS/Zeroconf. Discovered devices will appear on the {% my integrations title="**Settings** > **Devices & services**" %} page with a notification to configure them.

## Supported functionality

### Sensors

The integration provides the following sensor entity:

#### GDS/GSC devices

- **Device status** - Overall device status showing:
  - `online` - Device is connected and responding
  - `offline` - Device is not reachable
  - `account_locked` - User account is temporarily locked
  - `auth_failed` - Authentication failed
  - `ha_control_disabled` - Home Assistant control is disabled on device

## Troubleshooting

### Cannot connect to device

#### Symptom: "Cannot connect" error during setup

When you set up the integration, configuration fails with a "Cannot connect" error, or the device shows as unavailable.

##### Resolution

1. Verify that the device is powered on and connected to the network.
2. Check that the IP address is correct.
3. Confirm that your Home Assistant instance can reach the device:

   ```bash
   ping <device-ip>

### Sensors not updating

#### Symptom: Sensor values are stale or not updating

##### Resolution

1. Check device is online and accessible.
2. Verify device firmware is up to date.
3. Check Home Assistant logs for errors:
   - Go to **Settings** > **System** > **Logs**.
4. Try reloading the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Find **Grandstream Home**.
   - Select the three dots {% icon "mdi:dots-vertical" %} menu.
   - Select **Reload**.

### Authentication errors

#### Symptom: "Invalid authentication" error during setup

When you set up the integration or during normal operation, the device becomes unavailable with authentication errors.

##### Resolution

1. Verify the password is correct (default username: `gdsha`).
2. Confirm that the account is not locked due to excessive failed login attempts.
3. Reset the device password if necessary.
4. Verify Home Assistant control is enabled in device web interface settings.

### Home Assistant control disabled

#### Symptom: "Home Assistant control is disabled" error

##### Resolution

1. Log in to the device web interface.
2. Navigate to the settings page.
3. Enable the **Home Assistant control** or **Third-party integration** option.
4. Save settings and retry the integration setup.

## Known limitations

- Only sensors are supported in the initial release.
- Device discovery requires mDNS/Zeroconf to be enabled on your network.
- Some older device firmware versions may have limited functionality.

## Security considerations

- The integration stores credentials locally in Home Assistant's configuration storage. Make sure you protect your backups, and limit access to your Home Assistant system.
- Communication with devices uses HTTPS by default (port 443).
- Keep SSL certificate verification enabled whenever possible. If your device uses a self-signed certificate, you can disable verification, but this reduces security and should only be used if you understand the risk.
- Administrator password is required for full functionality.
- Home Assistant control must be explicitly enabled on the device.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Support

For issues and feature requests:

- [GitHub Issues](https://github.com/home-assistant/core/issues) (for core integration)
- [Home Assistant Community Forum](https://community.home-assistant.io/)

## See also

- [Grandstream official website](https://www.grandstream.com/)
