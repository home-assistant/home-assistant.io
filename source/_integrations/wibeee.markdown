---
title: Wibeee
description: Instructions on how to integrate Wibeee energy monitors within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2026.10'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@fquinto'
ha_domain: wibeee
ha_platforms:
  - sensor
ha_integration_type: device
---

The **Wibeee** {% term integration %} allows you to connect [Wibeee](https://wibeee.com/) energy monitors to Home Assistant. Wibeee devices are hardware energy monitors that measure power consumption across electrical phases, which you can use to track your energy usage in the [energy dashboard](/docs/energy/) or to trigger automations based on power consumption.

## Supported devices

The integration supports the following Wibeee models:

- Wibeee 1Ph (single-phase)
- Wibeee 3Ph (three-phase)
- Wibeee 3Ph RN
- Wibeee 3Ph 3W
- Wibeee MAX / MAX 2S / MAX 3S / MAX MS
- Wibeee BOX / BOX S3P
- Wibeee GND
- Wibeee SMART PLUG

## Prerequisites

- A Wibeee device connected to your local network
- The device IP address
- Home Assistant running on the same network as the device

Wibeee devices on your network can also be discovered automatically. When a device is discovered, it shows up under **Settings** > **Devices & services**, and you only need to confirm adding it.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Wibeee device on your network. For example, `192.168.1.150`."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration creates sensor entities for each phase of your device. Phase labels are L1, L2, L3, and Total. Single-phase models provide L1 and Total.

The following sensors are enabled by default:

- **Voltage**: Voltage on the phase.
- **Current**: Current draw on the phase.
- **Active power**: Real power consumption.
- **Apparent power**: Apparent power.
- **Inductive reactive power**: Inductive reactive power.
- **Frequency**: Grid frequency.
- **Power factor**: Power factor.
- **Active energy**: Total active energy consumed. You can use this sensor in the energy dashboard.
- **Inductive reactive energy**: Total inductive reactive energy.

The following sensors are disabled by default. You can enable them from the entity settings if you need them:

- **Capacitive reactive power**: Capacitive reactive power.
- **Capacitive reactive energy**: Total capacitive reactive energy.
- **Phase angle**: Phase angle.
- **THD sensors**: Total harmonic distortion of current and voltage, including the fundamental and the individual harmonics (3rd, 5th, 7th, and 9th).

## Data updates

The integration {% term polling polls %} the device every 30 seconds over your local network. The device provides all sensor readings in a single request, so polling is lightweight.

## Automation examples

### Notify when power exceeds threshold

{% raw %}

```yaml
automation:
  - alias: "High power alert"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.wibeee_xxxx_l1_active_power
        above: 2000
    actions:
      - action: notify.notify
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
        state: >-
          {{ states('sensor.wibeee_xxxx_l1_active_energy')
              | float(0) * 0.15 }}
```

{% endraw %}

## Known limitations

- **Network connectivity**: The device must be on the same network as Home Assistant. Wibeee devices use local HTTP and do not support TLS.
- **No authentication**: The device uses fixed default credentials and does not support user-defined authentication.
- **Fixed hardware**: Each Wibeee device monitors a fixed number of phases determined by the hardware model. New phases cannot be added via software.
- **Polling interval**: The polling interval is fixed at 30 seconds and cannot be configured.

## Troubleshooting

### Device not discovered

Make sure the device is powered on and connected to the network. Try pinging the device IP address from your Home Assistant server.

### Connection errors

If you see connection errors in the logs:

1. Verify the device IP address is correct and reachable.
2. Check that no firewall is blocking local connections.
3. Ensure the device is not in sleep/power-saving mode.

### Entities unavailable

If entities show as unavailable:

1. Check the device is online (ping the IP address).
2. Reload the integration.

The sensors become available again automatically as soon as the device responds to polling.

## Removing the integration

This integration follows standard integration removal steps. When removed, the integration will clean up all created entities.

{% include integrations/remove_device_service.md %}
