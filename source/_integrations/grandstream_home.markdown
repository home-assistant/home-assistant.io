---
title: Grandstream Home
description: Instructions on how to integrate Grandstream devices with Home Assistant.
ha_category:
  - Button
  - Camera
  - Sensor
  - Lock
ha_release: 2026.4
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@GrandstreamEngineering'
ha_domain: grandstream_home
ha_platforms:
  - button
  - camera
  - lock
  - sensor
ha_integration_type: device
ha_zeroconf: true
---

The **Grandstream Home** {% term integration %} allows you to integrate Grandstream devices with Home Assistant for local control and monitoring. This integration supports door access control systems (GDS), IP cameras (GSC), and network storage devices (GNS).

## Supported devices

This integration supports the following Grandstream device types:

### GDS/GSC Series - Door access control systems
Door access control devices with built-in camera and SIP calling capabilities.

- GDS372x series devices
- GSC356X series devices

### GNS Series - Network storage
Network-attached storage (NAS) devices with monitoring capabilities.

- GNS5004E
- GNS5004R

## Prerequisites

- Grandstream device connected to your local network
- Device administrator credentials
- Device must be accessible from your Home Assistant instance
- For GDS/GSC camera streaming: RTSP must be enabled on the device

{% include integrations/config_flow.md %}

## Configuration

The integration can be configured through the UI:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Add integration**.
3. Search for "Grandstream Home".
4. Follow the configuration steps:
   - Enter the device IP address or hostname
   - Enter administrator credentials
   - (Optional for GDS/GSC devices) Configure RTSP credentials for camera streaming
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

### Buttons

The integration provides button entities for device control:

#### All Devices

- **Reboot** - Restart the device

#### GDS/GSC Devices

- **Reset tamper alarm** - Clear tamper alarm status

#### GNS Devices

- **Sleep** - Put the device into sleep/standby mode
- **Wake** - Wake the device from sleep mode (Wake-on-LAN)
- **Shutdown** - Safely shut down the device

### Locks

For compatible GDS door stations that control an electric door strike or relay
output, the integration creates a lock entity in Home Assistant.

- **Door lock**
  - Description: Represents the door or gate controlled by the GDS device.
  - Features: You can lock and unlock the door from Home Assistant, and use
    the lock in your automations, scripts, and scenes.
  - Notes: The lock state follows the information provided by the device when
    available. When the hardware does not report its state, Home Assistant
    assumes the state based on the last command that was sent.

### Camera

For GDS/GSC devices, the integration provides RTSP camera streaming. The
camera entity will be automatically created if RTSP is enabled on the device.

**Requirements:**
- RTSP must be enabled on the device
- RTSP credentials must be configured during setup
- Firewall must allow RTSP traffic (default port 554)

## Device triggers

The integration provides extensive device triggers for automation.

### GDS/GSC device triggers

#### Alarm triggers

Triggered when alarm conditions are detected:

| Trigger Type | Description | Availability |
|--------------|-------------|--------------|
| `personnel_intrusion` | Intrusion/loitering alarm | GDS, GSC |
| `hostage` | Duress alarm | GDS only |
| `tamper` | Tamper alarm | GDS, GSC |
| `keypad_error` | Multiple keypad input errors | GDS only |
| `remote_unlock_wrong_password` | Wrong password during remote unlock | GDS, GSC |
| `non_scheduled_access` | Access outside scheduled time | GDS, GSC |
| `unauthorized_rfid` | Unauthorized RFID/QR code access | GDS, GSC |
| `abnormal_sound` | Abnormal sound detected | GDS, GSC |
| `high_temperature` | High temperature alarm | GDS, GSC |
| `safe_room_alarm` | Safe room alarm | GDS only |
| `door_close_timeout` | Door remained open too long | GDS, GSC |

#### Digital input triggers

| Trigger Type | Description | Availability |
|--------------|-------------|--------------|
| `di_1` | Digital input 1 triggered | GDS, GSC |
| `di_2` | Digital input 2 triggered | GDS, GSC |
| `di_3` | Digital input 3 triggered | GDS only |

#### SD card triggers

| Trigger Type | Description |
|--------------|-------------|
| `sd_card_unavailable` | SD card unavailable |
| `sd_card_formatted` | SD card formatted |

#### Door access triggers

Triggered when door is opened by various methods:

| Trigger Type | Description | Availability |
|--------------|-------------|--------------|
| `door_opened_any` | Door opened (any method) | GDS, GSC |
| `door_opened_rfid` | Door opened by RFID card | GDS, GSC |
| `door_opened_sip` | Door opened by SIP call | GDS, GSC |
| `door_opened_common_password` | Door opened by common password | GDS only |
| `door_opened_personal_password` | Door opened by personal password | GDS, GSC |
| `door_opened_card_password` | Door opened by card + password | GDS, GSC |
| `door_opened_temp_password` | Door opened by temporary password | GDS, GSC |
| `door_opened_forced` | Door forced open | GDS, GSC |
| `door_opened_remote` | Door opened remotely | GDS, GSC |
| `door_opened_http` | Door opened via HTTP | GDS, GSC |
| `door_opened_qrcode` | Door opened by QR code | GDS, GSC |
| `door_opened_ble` | Door opened by Bluetooth | GDS, GSC |
| `door_opened_nfc` | Door opened by NFC | GDS, GSC |
| `door_opened_pin` | Door opened by PIN code | GDS, GSC |
| `door_opened_guest_qrcode` | Door opened by guest QR code | GDS, GSC |
| `door_opened_touch_pass` | Door opened by Touch Pass | GDS, GSC |

#### Phone status triggers

| Trigger Type | Description |
|--------------|-------------|
| `phone_busy` | Phone is busy |
| `phone_ringing` | Phone is ringing |

#### GSC-specific triggers

| Trigger Type | Description |
|--------------|-------------|
| `power_insufficient` | Insufficient power warning |

### GNS device triggers

#### Threshold triggers

Triggered when values exceed configurable thresholds:

| Trigger Type | Description | Default Threshold |
|--------------|-------------|-------------------|
| `cpu_usage_above` | CPU usage exceeds threshold | 80% |
| `memory_usage_above` | Memory usage exceeds threshold | 80% |
| `system_temperature_above` | System temperature exceeds threshold | 60°C |
| `cpu_temperature_above` | CPU temperature exceeds threshold | 70°C |
| `disk_temperature_above` | Disk temperature exceeds threshold | 50°C |
| `pool_usage_above` | Storage pool usage exceeds threshold | 90% |

#### Status triggers

| Trigger Type | Description |
|--------------|-------------|
| `fan_abnormal` | Fan status abnormal |
| `disk_abnormal` | Disk status abnormal |
| `pool_abnormal` | Storage pool status abnormal |

### Example automations

#### Notify on Door Access

```yaml
automations:
  - alias: "Door access notification"
    triggers:
      - trigger: device
        device_id: abc123def456
        domain: grandstream_home
        type: door_opened_rfid
    actions:
      - action: notify.mobile_app
        data:
          title: "Door Access"
          message: "Door opened by RFID card"
```

#### Alert on Intrusion Detection

```yaml
automations:
  - alias: "Intrusion alert"
    triggers:
      - trigger: device
        device_id: abc123def456
        domain: grandstream_home
        type: personnel_intrusion
    actions:
      - action: notify.mobile_app
        data:
          title: "Security Alert"
          message: "Intrusion detected at front door"
```

#### Monitor NAS Temperature

```yaml
automations:
  - alias: "NAS temperature alert"
    triggers:
      - trigger: device
        device_id: abc123def456
        domain: grandstream_home
        type: system_temperature_above
        threshold: 65
    actions:
      - action: notify.mobile_app
        data:
          title: "NAS Temperature Warning"
          message: "NAS system temperature is above threshold"
```

#### Alert on Disk Failure

```yaml
automations:
  - alias: "NAS disk failure"
    triggers:
      - trigger: device
        device_id: abc123def456
        domain: grandstream_home
        type: disk_abnormal
    actions:
      - action: notify.mobile_app
        data:
          title: "Disk Status Alert"
          message: "A disk in your NAS has abnormal status"
```

## Actions

The integration provides the following actions.

### Action: Reboot device

The `grandstream_home.reboot_device` action reboots the Grandstream device.

- **Data attribute**: `device_id`
  - **Description**: Device to reboot
  - **Optional**: No

```yaml
action: grandstream_home.reboot_device
target:
  device_id: abc123def456
```

### Action: Sleep device

The `grandstream_home.sleep_device` action puts a GNS device into sleep mode.

- **Data attribute**: `device_id`
  - **Description**: NAS device to sleep
  - **Optional**: No

```yaml
action: grandstream_home.sleep_device
target:
  device_id: abc123def456
```

### Action: Wake device

The `grandstream_home.wake_device` action wakes a GNS device from sleep mode using Wake-on-LAN.

- **Data attribute**: `device_id`
  - **Description**: NAS device to wake
  - **Optional**: No

**Note**: Requires Wake-on-LAN to be enabled on the device.

```yaml
action: grandstream_home.wake_device
target:
  device_id: abc123def456
```

### Action: Shutdown device

The `grandstream_home.shutdown_device` action safely shuts down a GNS device.

- **Data attribute**: `device_id`
  - **Description**: NAS device to shut down
  - **Optional**: No

```yaml
action: grandstream_home.shutdown_device
target:
  device_id: abc123def456
```

### Action: Unlock door

The `grandstream_home.unlock_door` action unlocks a door on a GDS/GSC device.

- **Data attribute**: `device_id`
  - **Description**: GDS device to control
  - **Optional**: No
- **Data attribute**: `door_id`
  - **Description**: Door ID (default: 0, 0=all doors, 1=door 1, 2=door 2)
  - **Optional**: Yes

**Note**: Requires proper authentication and Home Assistant control to be enabled on the device.

```yaml
action: grandstream_home.unlock_door
target:
  device_id: abc123def456
data:
  door_id: 1  # 1=door 1, 2=door 2, 0=all doors
```

## Examples

### Unlock door on button press

```yaml
automations:
  - alias: "Unlock door button"
    triggers:
      - trigger: state
        entity_id: input_button.open_front_door
    actions:
      - action: grandstream_home.unlock_door
        target:
          device_id: abc123def456
        data:
          door_id: 1  # 1=door 1, 2=door 2
```

### Weekly device reboot

```yaml
automations:
  - alias: "Weekly device reboot"
    triggers:
      - trigger: time
        at: "03:00:00"
    conditions:
      - condition: time
        weekday:
          - sun
    actions:
      - action: grandstream_home.reboot_device
        target:
          device_id: abc123def456
```

### Wake NAS on demand

```yaml
automations:
  - alias: "Wake NAS when needed"
    triggers:
      - trigger: state
        entity_id: input_boolean.wake_nas
        to: "on"
    actions:
      - action: grandstream_home.wake_device
        target:
          device_id: abc123def456
      - action: input_boolean.turn_off
        target:
          entity_id: input_boolean.wake_nas
```

### Monitor storage pool usage

```yaml
automations:
  - alias: "Storage pool usage warning"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.nas_pool_1_usage
        above: 90
    actions:
      - action: notify.mobile_app
        data:
          title: "Storage Warning"
          message: "Storage pool 1 usage is {% raw %}{{ states('sensor.nas_pool_1_usage') }}{% endraw %}%"
```

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

### Camera stream not working (GDS devices)

**Symptoms:**

- Camera entity shows as unavailable
- Stream fails to load

**Solutions:**

1. Verify RTSP is enabled on the device:
   - Log into device web interface
   - Navigate to RTSP settings
   - Enable RTSP streaming
2. Check RTSP credentials are configured correctly during setup
3. Verify firewall allows RTSP traffic (port 554)
4. Test RTSP stream with VLC or another media player:
   ```text
   rtsp://<username>:<password>@<device-ip>:554/sub_stream
   ```

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

### Device triggers not working

**Symptoms:**

- Device triggers don't fire

**Solutions:**

1. Verify the device is properly configured and online
2. Check that the specific trigger type is supported by your device
3. For GDS/GSC devices, ensure webhook notifications are enabled
4. Check Home Assistant logs for trigger-related errors
5. Test the trigger by manually triggering the condition (e.g., open door)

### Wake-on-LAN not working (GNS devices)

**Symptoms:**

- Wake service doesn't wake the device

**Solutions:**

1. Verify Wake-on-LAN is enabled in device BIOS/settings
2. Ensure the device is in sleep mode, not fully shut down
3. Check that the MAC address is correctly detected
4. Verify network allows broadcast traffic
5. The device must be on the same network segment as Home Assistant

## Known limitations

- Camera streaming requires RTSP to be enabled on GDS devices
- Some older device firmware versions may have limited functionality
- Device discovery requires mDNS/Zeroconf to be enabled on your network
- Wake-on-LAN only works for GNS devices in sleep mode, not when shut down
- Door opening service requires proper authentication and Home Assistant control enabled on GDS devices
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

---