---
title: Wibeee
description: Instructions on how to integrate Wibeee energy monitors within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2026.5'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@fquinto'
ha_domain: wibeee
ha_platforms:
  - sensor
  - button
  - diagnostics
ha_integration_type: device
---

The **Wibeee** {% term integration %} allows you to connect [Wibeee](https://wibeee.com/) energy monitors to Home Assistant. Wibeee devices are hardware energy monitors that measure power consumption with near real-time updates across electrical phases.

## Supported devices

The integration supports the following Wibeee models:

- Wibeee 1Ph (single-phase)
- Wibeee 3Ph (three-phase)
- Wibeee MAX / MAX 2S / MAX 3S / MAX MS
- Wibeee BOX / BOX S3P
- Wibeee 3Ph 3W
- Wibeee GND
- Wibeee SMART PLUG

## Prerequisites

- A Wibeee device connected to your local network
- The device IP address
- Home Assistant running on the same network

{% include integrations/config_flow.md %}

## Update modes

The integration supports two data update modes:

### Polling mode

In polling mode, Home Assistant periodically requests data from the device. Default interval is 30 seconds. You can configure this in the options flow after initial setup.

This mode works immediately upon configuration and does not require any device configuration.

### Local Push mode

In push mode, the device proactively sends data to Home Assistant when measurements change. This provides faster updates and reduces the need for periodic polling.

To use push mode:

1. During configuration, select "Local Push" as the update mode
2. Enable "Auto-configure push server" to let Home Assistant automatically configure the device
3. Or manually configure the device's push server settings

When auto-configuration is enabled, Home Assistant will:
- Configure the device to send data to your Home Assistant instance
- Set the push interval to match your scan interval preference
- Apply the configuration and reboot the device

## Sensors

The integration creates sensor entities for each discovered phase. Phase labels are L1, L2, L3, and L4 (total).

### Power sensors

| Entity | Description | Device Class |
| ------ | ----------- | ------------ |
| Phase voltage | Voltage on each phase | voltage |
| Current | Current draw on each phase | current |
| Active power | Real power consumption | power |
| Apparent power | Apparent power | apparent_power |
| Inductive reactive power | Inductive reactive power | reactive_power |
| Capacitive reactive power | Capacitive reactive power | reactive_power |
| Frequency | Grid frequency | frequency |
| Power factor | Power factor | power_factor |

### Energy sensors

| Entity | Description | Device Class |
| ------ | ----------- | ------------ |
| Active energy | Total active energy consumed | energy |
| Inductive reactive energy | Total inductive reactive energy | - |
| Capacitive reactive energy | Total capacitive reactive energy | - |

### Advanced sensors

Advanced sensors are disabled by default and can be enabled from the entity registry:

| Entity | Description | Device Class |
| ------ | ----------- | ------------ |
| Angle | Phase angle | - |
| THD current | Total harmonic distortion (current) | - |
| THD voltage | Total harmonic distortion (voltage) | - |
| Harmonic 3-9 | Individual harmonic currents (3rd, 5th, 7th, 9th) | current |

## Buttons

The integration creates button entities for device control:

| Button | Description |
| ------ | ----------- |
| Reboot device | Reboots the Wibeee device |
| Reset energy | Resets all energy counters to zero |

## Configuration options

After initial configuration, you can adjust these options via the integration settings:

| Option | Description | Default |
| ------ | ----------- | --------- |
| Scan interval | Polling interval in seconds | 30 |
| Update mode | Polling or local push | polling |

## Data updates

### Polling mode behavior

In polling mode, Home Assistant requests data from the device at the configured interval. The device's `status.xml` endpoint provides all sensor readings in a single request.

### Local Push mode behavior

When configured for push mode, the device sends HTTP POST requests to Home Assistant when measurements change. The device buffers multiple measurements and sends them in a batch.

The push interval on the device is automatically configured to match your Home Assistant settings.

## Automation examples

### Notify when power exceeds threshold

{% raw %}

```yaml
automation:
  - alias: "High power alert"
    trigger:
      - platform: numeric_state
        entity_id: sensor.wibeee_xxxx_l1_active_power
        above: 2000
    action:
      - service: notify.notify
        data:
          message: "Power consumption on L1 exceeded 2000W"
```

{% endraw %}

{% tip %}
Replace `wibeee_xxxx` with your actual device identifier (check your entity IDs in Home Assistant).
{% endtip %}

### Track daily energy usage

{% raw %}

```yaml
template:
  - sensor:
      - name: "Daily energy cost"
        unit_of_measurement: "€"
        state: "{{ states('sensor.wibeee_xxxx_l1_active_energy') | float(0) * 0.15 }}"
```

{% endraw %}

### Create energy dashboard card

```yaml
type: glance
entities:
  - entity: sensor.wibeee_xxxx_l1_active_power
  - entity: sensor.wibeee_xxxx_l2_active_power
  - entity: sensor.wibeee_xxxx_l3_active_power
  - entity: sensor.wibeee_xxxx_l4_active_power
title: Power consumption
```

## Known limitations

- **Network connectivity**: The device must be on the same network as Home Assistant. Wibeee devices use local HTTP and do not support TLS.
- **No authentication**: The integration uses the default device credentials (user/user). The device uses fixed default credentials and does not support user-defined authentication.
- **Fixed hardware**: Each Wibeee device monitors a fixed number of phases determined by the hardware model. New phases cannot be added via software.
- **Push mode requires device reboot**: When switching to push mode with auto-configuration, the device will reboot to apply the new settings.
- **Energy counter reset**: Resetting energy counters is permanent and cannot be undone by Home Assistant.

## Troubleshooting

### Device not discovered

Make sure the device is powered on and connected to the network. Try pinging the device IP address from your Home Assistant server.

### Connection errors

If you see connection errors in the logs:
1. Verify the device IP address is correct and reachable
2. Check that no firewall is blocking local connections
3. Ensure the device is not in sleep/power-saving mode

### Push mode not working

1. Verify the device can reach your Home Assistant instance
2. Check that your router allows incoming connections on the configured port
3. Try switching to polling mode as a test

### Entities unavailable

If entities show as unavailable:
1. Check the device is online (ping the IP address)
2. Try restarting the integration
3. Increase the scan interval in the options flow

## Removing the integration

This integration follows standard integration removal steps. When removed, the integration will clean up all created entities.

If you used local push mode, you may want to:
1. Access the device web interface
2. Navigate to the push server settings
3. Disable the push server to stop unwanted network traffic

{% include integrations/remove_device_service.md %}