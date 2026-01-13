---
title: "Victron Energy"
description: "Victron Energy power systems integration"
ha_release: "2025.02"
ha_category: Energy
ha_iot_class: "Local Push"
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@imval'
ha_domain: victronenergy
ha_integration_type: hub
related:
---

# Victron Energy Integration

The Victron Energy integration lets you connect your Victron Energy system to Home Assistant. It uses a GX device , like an Ekrano GX or Cerbo GX, as a gateway and communicates locally via MQTT.

With this integration, devices connected to your GX device, such as solar charge controllers, battery monitors, and inverters are automatically discovered and added to Home Assistant.

## Required and Supported Devices

This integration requires a GX device with the following requirements:
- Running Venus OS v3.70 or newer
- Connected via Ethernet or Wi-Fi

Common supported devices include:
- GX devices (Ekrano GX, Cerbo GX)
		   
										
- MPPT Solar Charge Controllers
- BMV Battery Monitors
- Inverter/Chargers (MultiPlus, Quattro, Multi RS)
- Inverters

## Features

Once set up, Home Assistant will automatically create entities for your Victron system, including:

- **Sensors**: Battery voltage, current, power, solar panel output, AC loads, etc.
- **Binary Sensors**: Alarm states, relay statuses
- **Switches**: Relay controls, inverter on/off
- **Number Controls**: Voltage limits, charge current limits

All entities use appropriate units, device classes, and clear names.

## Prerequisites

Make sure the following requirements are met:

1. **Your GX device is running Venus OS. v3.70 or newer**

2. **MQTT is enabled on your Victron device (for Venus OS version ..TBD.. and lower)**:
   - Access your device's screen or web interface
   - Navigate to Settings > Integrations and enable MQTT Access
   - Note the IP address of your device

## Installation

### Automatic Discovery

If your GX device supports SSDP (Service Discovery Protocol), it may be automatically discovered by Home Assistant:

1. Go to **Settings** > **Devices & Services**
2. Look for a discovered "Victron Energy" device
3. Click **Configure** and follow the setup wizard

### Manual Setup

If automatic discovery doesn't work:

1. Go to **Settings** > **Devices & Services**
2. Click **Add Integration**
3. Search for "Victron Energy"
4. Click on the integration to start setup

#### Setup Process

1. **Enter Device Information (only for manual setup)**
   - **Host**: Enter the IP address or hostname of your GX device
   - Example: `192.168.1.100` or `venus.local`

2. **Set Password**:
   - You will always be asked for a password:
     - If your Local Network Security Profile is set to Unsecured, this can be left empty
     - Otherwise, enter the GX Password

3. **Discovery**:
   - Home Assistant connects to the device and discovers available entities
   - This process may take up to 30 seconds

4. **Completion**:
   - Once discovery is complete, your device and all discovered entities will be added to Home Assistant

## Configuration

### Device Settings

After setup, you can access device settings through:
- **Settings** > **Devices & Services** > **Victron Energy** > **Configure**

### Entity Management

- **Enable/Disable Entities**: Some diagnostic entities may be disabled by default to reduce clutter
- **Customize Names**: Entity names can be customized through the entity settings
- **Entity Categories**: Entities are automatically categorized (e.g., diagnostic entities)

## Security Considerations

### Local Network Security Profile
- The integration always tries to connect to the GX device using MQTT over TLS (port 8883)
- Authentication uses a token that is created during setup
- When the Local Network Security Profile is set to Secure or Weak, the GX password is required to create this token
- When set to Unsecured, the password can be left empty

### Network Security
- Ensure your Victron device is only accessible on your trusted local network, do not expose it to Internet.
- Consider using VLANs if you want extra isolation for IoT devices
- Keep device firmware up to date to receive security fixes

## Troubleshooting

### Device Not Discovered
- Make sure MQTT is enabled on the GX device
- Check that SSDP discovery is enabled in Home Assistant
- Confirm the GX device and Home Assistant are on the same network and can talk (firewall rules for example).
- Try adding the integration manually using the GX device IP address

### Connection Failed
- **Check Network Connectivity**: Verify the device IP address or hostname is correct and reachable
- **Firewall Issues**: Ensure port 8883 is not blocked by a firewall
- **Device Settings**: Confirm MQTT services are running on the GX device

### Authentication Failed
- Double-check the GX Password
												
- Verify the Local Network Security Profile setting

### No Entities Discovered
- Wait up to 30 seconds for discovery to complete
- Verify Home Assistant MQTT discovery is enabled on the device
- Confirm the GX device has active sensors or controls
- Restart the integration if discovery appears stuck
- If you wish to try the integration on a standalone GX device, you can enable the Demo Mode in Venus OS.

### Missing Entities
- Some entities (especially diagnostic ones) may be disabled by default
- Check **Settings** > **Devices & Services** > **Victron Energy** > **Entities**
- Enable any entities you want to use

## Support

### Getting Help
- Visit the [Home Assistant Community Forum](https://community.home-assistant.io/) for Victron-related discussions
- Check Victron Energy documentation for MQTT and GX device setup
- Refer to the device manual for networking details

### Reporting Issues

When reporting a problem, please:
- Ensure you're running the latest Home Assistant version
- Include the GX device model, Venus OS version, and Home Assistant version
- Enable debug logging for the `victronenergy` component (if requested)

### Useful Links
- [Victron Energy MQTT Documentation](https://www.victronenergy.com/live/venus_os:mqtt)
- [Victron Energy Community](https://community.victronenergy.com)

## Removing the Integration

To remove the Victron Energy integration from Home Assistant:

1. **Remove via UI**:
   - Go to **Settings** > **Devices & Services**
   - Find the **Victron Energy** integration
   - Click the three-dot menu and select **Delete**
   - Confirm removal when prompted

2. **Alternative method via device**:
   - Go to **Settings** > **Devices & Services** > **Devices**
   - Find your Victron device
   - Click the device name, then click **Delete Device**
   - This will remove the device and all associated entities

All entities and device data will be permanently removed from Home Assistant. The integration can be re-added later if needed.

## Removal

To remove the Victron Energy integration:

1. Go to **Settings** > **Devices & Services**
2. Find the **Victron Energy** integration
3. Click the **three dots menu** (⋯) next to the integration
4. Select **Delete**
5. Confirm the deletion

All entities and devices associated with the integration will be removed from Home Assistant.
