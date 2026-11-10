---
title: Grandstream Home
description: Instructions on how to integrate Grandstream devices with Home Assistant.
ha_categories:
  - security_safety.doorbells_intercoms
ha_release: 2026.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@wtxu-gs'
ha_domain: grandstream_home
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
ha_zeroconf: true
---

The **Grandstream Home** {% term integration %} allows you to integrate [Grandstream](https://www.grandstream.com/) devices with Home Assistant for monitoring. This integration supports door access control systems (GDS372x, GSC356X).

## Supported devices

This integration supports the following Grandstream device types:

### GDS/GSC series - door access control systems

Door access control devices with SIP calling capabilities.

- GDS372x series devices
- GSC356X series devices

## Prerequisites

- Grandstream device connected to your local network
- Device administrator credentials for the `gdsha` account
- Device must be accessible from your Home Assistant instance
- Home Assistant control must be enabled on the device (for GDS/GSC devices):

  1. Log in to the device web interface.
  2. Go to **Access Control Settings** > **Basic Settings**.
  3. Enable the **Home Assistant** option and save.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your Grandstream device."
    required: true
    type: string
Password:
    description: "The administrator password of your device. The username is fixed to `gdsha`."
    required: true
    type: string
Port:
    description: "The HTTPS port of your device. This is pre-filled with the port from device discovery, or 443 by default."
    required: false
    type: integer
Verify SSL certificate:
    description: "Verify the SSL certificate of your device. This is disabled by default because Grandstream devices use self-signed certificates. Enable it if your device has a valid certificate."
    required: false
    type: boolean
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides the following sensor entity:

#### GDS/GSC devices

- **Device status** - Overall device status showing:
  - `available` - Device is idle with an available account
  - `busy` - Device is currently on a call
  - `ringing` - Device is ringing
  - `preview` - Device is in call preview state
  - `no_available_account` - No account is available on the device
  - `offline` - Device is not reachable

## Known limitations

- Only sensors are supported in the initial release.
- Device discovery requires mDNS/Zeroconf to be enabled on your network.
- Some older device firmware versions may have limited functionality.

## Troubleshooting

### Cannot connect to device

{% details "Connection error during setup" %}

When you set up the integration, configuration fails with a "Cannot connect" error, or the device shows as unavailable.

To resolve this issue, try the following steps:

1. Verify that the device is powered on and connected to the network.
2. Check that the IP address is correct.
3. Confirm that your Home Assistant instance can reach the device:

   ```bash
   ping <device-ip>
   ```
{% enddetails %}

### Sensors not updating

{% details "Sensor values are stale or not updating" %}

To resolve this issue, try the following steps:

1. Check device is online and accessible.
2. Verify device firmware is up to date.
3. Check Home Assistant logs for errors:
   - Go to **Settings** > **System** > **Logs**.
4. Try reloading the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Find **Grandstream Home**.
   - Select the three dots {% icon "mdi:dots-vertical" %} menu.
   - Select **Reload**.
{% enddetails %}

### Authentication errors

{% details "Invalid authentication error" %}

When you set up the integration or during normal operation, the device becomes unavailable with authentication errors.

To resolve this issue, try the following steps:

1. Verify the password is correct (default username: `gdsha`).
2. Confirm that the account is not locked due to excessive failed login attempts.
3. Reset the device password if necessary.
4. Verify the **Home Assistant** option is enabled in the device web interface under **Access Control Settings** > **Basic Settings**.
{% enddetails %}

### Home Assistant control disabled

{% details "Home Assistant control is disabled error" %}

To resolve this issue, try the following steps:

1. Log in to the device web interface.
2. Go to **Access Control Settings** > **Basic Settings**.
3. Enable the **Home Assistant** option.
4. Save settings and retry the integration setup.
{% enddetails %}

## Security considerations

- The integration stores credentials locally in Home Assistant's configuration storage. Make sure you protect your backups, and limit access to your Home Assistant system.
- Communication with devices uses HTTPS by default (port 443).
- Keep SSL certificate verification enabled whenever possible. If your device uses a self-signed certificate, you can disable verification, but this reduces security and should only be used if you understand the risk.
- Administrator password is required for full functionality.
- Home Assistant control must be explicitly enabled on the device.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
