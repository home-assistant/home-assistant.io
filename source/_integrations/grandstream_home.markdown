---
title: Grandstream Home
description: Instructions on how to integrate Grandstream devices with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@GrandstreamEngineering"
ha_domain: grandstream_home
ha_platforms:
  - sensor
ha_integration_type: device
ha_zeroconf: true
---

The **Grandstream Home** {% term integration %} allows you to integrate Grandstream devices with Home Assistant for monitoring. This integration supports door access control systems (GDS, GSC) and network storage devices (GNS).

## Supported devices

This integration supports the following Grandstream device types:

### GDS/GSC Series - Door access control systems

Door access control devices with SIP calling capabilities.

- GDS372x series devices
- GSC356X series devices

### GNS Series - Network storage

Network-attached storage (NAS) devices with monitoring capabilities.

- GNS5004E
- GNS5004R

### Device Model Discovery

The integration automatically discovers device models via mDNS/Zeroconf:

| Device Type | mDNS Service               | Model Field    | Example Models   |
| ----------- | -------------------------- | -------------- | ---------------- |
| GDS/GSC     | `_https._tcp.local.`       | `product`      | GDS3725, GDS3727 |
| GNS         | `_device-info._tcp.local.` | `product_name` | GNS5004E         |

## Prerequisites

- Grandstream device connected to your local network
- Device administrator credentials
- Device must be accessible from your Home Assistant instance

{% include integrations/config_flow.md %}

## Configuration

The integration can be configured through the UI:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Add integration**.
3. Search for "Grandstream Home".
4. Follow the configuration steps:
   - Enter the device IP address or hostname
   - Enter administrator credentials
   - (Optional) Configure custom port (default: 443 for HTTPS, 80 for HTTP)
   - (Optional) Configure SSL certificate verification

### Automatic discovery

The integration supports automatic device discovery via Zeroconf/mDNS. Discovered devices will appear on the {% my integrations title="**Settings** > **Devices & services**" %} page with a notification to configure them.

## Supported functionality

### Sensors

The integration provides various sensors depending on your device type:

#### GDS/GSC Devices

- **Device status** - Overall device status
- **SIP registration status** - Registration status for each SIP account (supports multiple accounts)

#### GNS Devices

**System monitoring:**

- CPU usage percentage
- Memory used (GB)
- Memory usage percentage
- System temperature
- CPU temperature
- System uptime (running time)

**Network monitoring:**

- Network upload speed
- Network download speed

**Storage monitoring:**

- Storage pool status (one per pool)
- Storage pool usage percentage (one per pool)
- Disk status (one per disk)
- Disk temperature (one per disk)

**Hardware monitoring:**

- Fan mode (auto, silent, performance, standard)
- Fan status (one per fan)

## Troubleshooting

### Cannot connect to device

**Symptoms:**

- Configuration fails with "Cannot connect" error
- Device shows as unavailable

**Solutions:**

1. Verify the device is powered on and connected to the network
2. Check the IP address is correct
3. Ensure your Home Assistant instance can reach the device:
   ```bash
   ping <device-ip>
   ```
4. Check firewall settings on both Home Assistant and the device
5. Verify the credentials are correct
6. Check if you're using the correct port (default: 443 for HTTPS)
7. If using HTTPS, try disabling SSL verification in the configuration

### Device not discovered automatically

**Symptoms:**

- Failed to discover the device

**Solutions:**

1. Ensure the device and Home Assistant are on the same network
2. Check mDNS/Zeroconf is not blocked by your network
3. Verify multicast traffic is allowed
4. Manually add the device using the IP address

### Sensors not updating

**Symptoms:**

- Sensor values are stale or not updating

**Solutions:**

1. Check device is online and accessible
2. Verify device firmware is up to date
3. Check Home Assistant logs for errors:
   - Go to **Settings** > **System** > **Logs**
4. Try reloading the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}
   - Find "Grandstream Home"
   - Select the three dots {% icon "mdi:dots-vertical" %} menu
   - Select **Reload**

### Authentication errors

**Symptoms:**

- "Invalid authentication" error during setup
- Device becomes unavailable with authentication errors

**Solutions:**

1. Verify your credentials and ensure the account has administrator privileges
2. Confirm that the account is not locked due to excessive failed login attempts
3. Reset the device password if necessary
4. For GDS/GSC devices, verify Home Assistant control is enabled in device settings

## Known limitations

- Some older device firmware versions may have limited functionality
- Device discovery requires mDNS/Zeroconf to be enabled on your network
- Maximum of 10 concurrent device connections (practical limitation)

## Security considerations

- The integration stores credentials locally in Home Assistant's encrypted storage
- Communication with devices uses HTTPS by default
- SSL certificate verification can be disabled for self-signed certificates (not recommended for production)
- Administrator credentials are required for full functionality
- Some features require specific permissions to be enabled on the device

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Support

For issues and feature requests:

- [GitHub Issues](https://github.com/home-assistant/core/issues) (for core integration)
- [Home Assistant Community Forum](https://community.home-assistant.io/)

## See also

- [Grandstream official website](https://www.grandstream.com/)
