---
title: Hegel Amplifier
description: Instructions on integrating Hegel amplifiers into Home Assistant.
ha_category:
  - Media player
ha_release: 2026.3
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@boazca'
ha_domain: hegel
ha_platforms:
  - media_player
ha_ssdp: true
ha_quality_scale: silver
ha_integration_type: device
---

The **Hegel** {% term integration %} allows you to control your [Hegel Music Systems](https://www.hegel.com/) amplifiers from Home Assistant. It uses Hegel's official IP control protocol over TCP and supports real-time push updates for a responsive experience.

This integration provides complete control over your Hegel amplifier including power management, volume control, input selection, and mute functionality, all with instant feedback when changes are made via the front panel or remote control.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: Hostname or IP address of your Hegel amplifier.
Model:
  description: Your specific Hegel amplifier model for proper input mapping.
{% endconfiguration_basic %}

## Prerequisites

- Your Hegel amplifier must be connected to the same network as Home Assistant.
- The amplifier must support IP control (models H95, H120, H190, H190V, H390, H590, and Röst).
- TCP port 50001 must be accessible between Home Assistant and your amplifier.
- UPnP/SSDP should be enabled on your network for automatic discovery.

## Supported models

The following Hegel amplifiers are confirmed to work with this integration:

- **Röst**
- **H95**
- **H120**
- **H190**
- **H190V**
- **H390**
- **H590**

Other Hegel models with IP control support may also work. If your model is not listed but supports network control, try the integration and report compatibility via the Home Assistant Community Forum.

## Features

### Real-time control

The integration provides instant bidirectional communication with your amplifier:

- **Power control**: Turn your amplifier on or off
- **Volume control**: Set precise volume levels (0-100%) with fine adjustment capability
- **Mute toggle**: Quickly mute and unmute audio
- **Source selection**: Switch between available inputs based on your specific model
- **Live status updates**: Changes made via front panel, remote, or other sources instantly appear in Home Assistant

### Connection reliability

The integration features robust connection management:

- **Automatic discovery**: Finds compatible amplifiers on your network via SSDP/UPnP
- **Connection recovery**: Automatically reconnects if network connection is temporarily lost
- **Exponential backoff**: Smart retry logic prevents network spam during outages
- **Connection validation**: Tests connectivity during setup to prevent configuration issues

### Model-specific features

Each Hegel model has specific input configurations that are automatically mapped:

- **H95**: Analog 1, Analog 2, Coaxial, Optical 1-3, USB, Network
- **H190**: Balanced, Analog 1-2, Coaxial, Optical 1-3, USB, Network
- **H190V**: XLR, Analog 1-2, Coaxial, Optical 1-3, USB, Network, Phono
- **H390**: XLR, Analog 1-2, BNC, Coaxial, Optical 1-3, USB, Network
- **H590**: XLR 1-2, Analog 1-2, BNC, Coaxial, Optical 1-3, USB, Network
- **Röst**: Balanced, Analog 1-2, Coaxial, Optical 1-3, USB, Network

## Using the integration

### Automation examples

**Turn on amplifier with TV:**
```yaml
automation:
  - alias: "Turn on Hegel with TV"
    trigger:
      platform: state
      entity_id: media_player.tv
      to: "on"
    action:
      - action: media_player.turn_on
        target:
          entity_id: media_player.hegel_amplifier
      - action: media_player.select_source
        target:
          entity_id: media_player.hegel_amplifier
        data:
          source: "Optical 1"
```

**Automatic volume adjustment for different sources:**
```yaml
automation:
  - alias: "Adjust Hegel volume by source"
    trigger:
      platform: state
      entity_id: media_player.hegel_amplifier
      attribute: source
    action:
      choose:
        - conditions:
            - condition: state
              entity_id: media_player.hegel_amplifier
              attribute: source
              state: "Network"
          sequence:
            - action: media_player.volume_set
              target:
                entity_id: media_player.hegel_amplifier
              data:
                volume_level: 0.6
        - conditions:
            - condition: state
              entity_id: media_player.hegel_amplifier
              attribute: source
              state: "Phono"
          sequence:
            - action: media_player.volume_set
              target:
                entity_id: media_player.hegel_amplifier
              data:
                volume_level: 0.4
```

**Late night quiet mode:**
```yaml
automation:
  - alias: "Hegel quiet mode at night"
    trigger:
      platform: time
      at: "22:00:00"
    condition:
      condition: state
      entity_id: media_player.hegel_amplifier
      state: "on"
    action:
      - action: media_player.volume_set
        target:
          entity_id: media_player.hegel_amplifier
        data:
          volume_level: 0.3
```

## Network configuration

### Firewall requirements

Ensure the following network access is available:

- **TCP port 50001**: Home Assistant → Hegel amplifier (for control commands)
- **UDP port 1900**: For SSDP discovery (optional, for automatic setup)
- **Multicast traffic**: For UPnP discovery (optional)

### Static IP recommendation

For best reliability, configure your Hegel amplifier with a static IP address or DHCP reservation to prevent connection issues if the IP address changes.

## Troubleshooting

### Setup issues

**Integration cannot find amplifier during automatic discovery:**

1. Verify the amplifier is powered on and connected to the network
2. Check that UPnP/SSDP is enabled on your router
3. Ensure Home Assistant and the amplifier are on the same network segment
4. Try manual setup using the amplifier's IP address

**"Cannot connect to amplifier" error during setup:**

1. Verify the IP address is correct
2. Test connectivity: `telnet <amplifier_ip> 50001` should connect
3. Check firewall settings on your router and Home Assistant host
4. Ensure the amplifier model supports IP control
5. Try power cycling the amplifier

### Connection problems

**Integration frequently loses connection:**

1. Check network stability between Home Assistant and amplifier
2. Verify the amplifier has a static IP or DHCP reservation
3. Check router logs for connection drops
4. Consider network infrastructure issues (Wi-Fi range, switch problems)

**Delayed response to manual changes:**

1. The integration uses push updates - delays suggest connection issues
2. Check debug logs for connection problems
3. Verify network latency between devices

### Control issues

**Wrong input names or missing inputs:**

1. Ensure you selected the correct Hegel model during setup
2. Different models have different available inputs
3. You can reconfigure the integration to change the model
4. Entity names can be customized in Home Assistant's device settings

**Volume or mute commands not working:**

1. Verify the amplifier is powered on
2. Check for firmware issues - try manual control via front panel
3. Some models may have maximum volume limits set

### Debug logging

Enable debug logging to diagnose connection and control issues:

```yaml
logger:
  logs:
    homeassistant.components.hegel: debug
```

Debug logs show:
- Connection attempts and status
- Command transmission (TX) and responses (RX)
- Push notification handling
- Reconnection attempts with timing
- Error conditions and recovery

**Key log messages:**
- `Opening connection to <ip>:50001` - Normal connection establishment
- `Connected to Hegel at <ip>:50001` - Successful connection
- `TX: <command>` - Commands sent to amplifier
- `RX (push): <response>` - Real-time updates from amplifier
- `Connection attempt failed: <error> — retrying in X.Xs` - Temporary connection loss with automatic retry
