---
title: DALI Center
description: Instructions on how to integrate DALI Center with Home Assistant.
ha_category:
  - Light
ha_release: 2025.10
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@niracler'
ha_domain: dali_center
ha_platforms:
  - light
ha_integration_type: hub
---

The DALI Center integration allows you to control DALI (Digital Addressable Lighting Interface) devices through Sunricher DALI gateways in Home Assistant.

This integration supports automatic discovery of DALI gateways on your network and provides real-time control and status updates for connected DALI lighting devices.

## Supported hardware

- Sunricher SR-GW-EDA DALI Gateway
- Any DALI-compatible lighting devices connected to supported gateways

## Prerequisites

- A Sunricher DALI gateway (SR-GW-EDA) connected to your network
- DALI lighting devices connected to the gateway
- Home Assistant and the DALI gateway must be on the same network for discovery

## Configuration

The DALI Center integration can be configured through the Home Assistant user interface.

{% include integrations/config_flow.md %}

### Configuration steps

1. Go to **Settings** > **Devices & Services**.
2. Click **Add Integration**.
3. Search for and select **DALI Center**.
4. The integration will automatically scan your network for available DALI gateways.
5. Select your gateway from the discovered devices list.
6. The integration will automatically discover and configure all connected DALI devices.

## Features

### Gateway Discovery

The integration automatically discovers Sunricher DALI gateways on your local network using network scanning. No manual IP configuration is required.

### Automatic Device Discovery

Once connected to a gateway, the integration automatically discovers all DALI devices connected to that gateway and creates corresponding light entities in Home Assistant.

### Real-time Updates

The integration uses push notifications from the DALI gateway to provide real-time status updates, ensuring that the Home Assistant interface reflects the actual device states immediately.

### Light Control

DALI light entities support:

- **On/Off control**: Turn lights on and off
- **Brightness control**: Adjust brightness from 0-100%
- **Color temperature control**: Adjust color temperature for compatible devices (1000K - 8000K)

## Entities

### Light

Each DALI lighting device connected to your gateway will appear as a light entity in Home Assistant with the following capabilities:

- **State**: On/Off status
- **Brightness**: Brightness level (0-255 internal, 0-100% in UI)  
- **Color Temperature**: Color temperature in Kelvin (for supported devices)
- **Availability**: Real-time availability status based on device connectivity

The entity naming follows the pattern: `light.<gateway_serial>_<device_name>`

## Device Information

Each DALI device will show the following information in the device registry:

- **Name**: Device name as configured in the gateway
- **Model**: DALI Light Type with device type number
- **Manufacturer**: Sunricher
- **Identifiers**: Unique device ID from the gateway
- **Via Device**: Connected through the DALI gateway

## Troubleshooting

### Gateway Not Discovered

If your DALI gateway is not automatically discovered:

1. Ensure the gateway and Home Assistant are on the same network
2. Check that the gateway is powered on and connected to the network
3. Verify the gateway's network connectivity by accessing its web interface
4. Try restarting the gateway and retry the integration setup

### Devices Not Appearing

If DALI devices are not appearing after gateway setup:

1. Ensure devices are properly connected to the DALI bus
2. Check that devices are commissioned in the gateway's configuration
3. Verify device addressing in the gateway's web interface
4. Restart the integration by reloading it in Settings > Devices & Services

### Real-time Updates Not Working

If device status updates are delayed or not working:

1. Check network connectivity between Home Assistant and the gateway
2. Verify the gateway's push notification settings
3. Restart both the gateway and Home Assistant
4. Check the Home Assistant logs for connection errors

### Device Unavailable

If a device shows as unavailable:

1. Check physical connections to the DALI bus
2. Verify device power supply
3. Check device addressing conflicts in the gateway
4. Test device functionality through the gateway's web interface

## Technical Details

### Communication Protocol

The integration communicates with DALI gateways using the PySrDaliGateway library, which handles:

- Gateway discovery via network scanning
- WebSocket connections for real-time updates
- DALI protocol communication
- Device state management

### Update Mechanism

Device updates are received through:

- **Push notifications**: Real-time status updates from gateway
- **Property updates**: Specific device properties (power state, brightness, color temperature)
- **Availability tracking**: Online/offline status monitoring

### Supported DALI Properties

The integration monitors and controls these DALI properties:

- **Property 20**: On/Off state
- **Property 22**: Brightness level (0-1000, converted to 0-255)
- **Property 23**: Color temperature in Kelvin

## Advanced Configuration

### Multiple Gateways

The integration supports multiple DALI gateways. Each gateway will be discovered and configured separately, with its own set of devices.

### Device Naming

Device names are automatically derived from the gateway configuration. To change device names:

1. Update the device name in the gateway's web interface
2. Restart the Home Assistant integration
3. The new names will be reflected in Home Assistant

## Integration Quality

This integration follows Home Assistant's Bronze quality scale standards, providing:

- Configuration flow support
- Unique entity IDs
- Proper error handling
- Device registry integration
- Real-time status updates