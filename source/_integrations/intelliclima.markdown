---
title: IntelliClima
description: Integration for Fantini Cosmi IntelliClima Ecocomfort 2.0 VMC devices.
ha_release: 2026.3
ha_category:
  - Fan
ha_iot_class: Cloud Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@dvdinth'
ha_domain: intelliclima
ha_integration_type: device
related:
  - url: https://www.fantinicosmi.it/en/
    title: Fantini Cosmi
ha_platforms:
  - fan
  - select
---

The **IntelliClima** {% term integration %} is used to integrate with [Fantini Cosmi](https://www.fantinicosmi.it/en/) Ecocomfort 2.0 ventilation devices. The Ecocomfort 2.0 is a mechanical ventilation with heat recovery (MVHR) system that monitors indoor air quality and automates ventilation to maintain healthy indoor environments. With this integration, you can control fan modes and speeds, and automate ventilation based on schedules.

## Supported devices

The following devices are known to be supported by the integration:

- Ecocomfort 2.0 with firmware 0.6.8

## Prerequisites

Before setting up this integration, you must complete the following steps in the IntelliClima+ mobile app:

1. Install the IntelliClima+ app on your smartphone (iOS or Android).
2. Create an account or sign in to your existing account.
3. Add your Ecocomfort 2.0 device to the app via Bluetooth.
4. Complete the device setup and configuration in the app (network connection, device name, etc.).
5. Verify that the device appears as Online in the IntelliClima+ app.

Once your device is set up and responding in the IntelliClima+ app, you can add the integration to Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The username associated with your IntelliClima+ account."
Password:
    description: "The password for your IntelliClima+ account."
{% endconfiguration_basic %}

## Supported functionality

The **IntelliClima** integration provides the following entities for each discovered Ecocomfort 2.0 device.

### Fan

- **Fan** (Main control entity)
  - **Description**: Control the ventilation system's operation mode and speed.
  - **Supported preset mode**:
    - **auto**: Full automatic mode that follows in-app programs and sensor thresholds for speeds and direction modes
  - **Speed control**: Adjustable from 0-100%, mapped to 5 possible fan control values:
    - **0%**: Off
    - **25%**: Sleep
    - **50%**: Low (Vel1 in-app)
    - **75%**: Medium (Vel2 in-app)
    - **100%**: High (Vel3 in-app)
  - **Available for devices**: Ecocomfort 2.0

### Select

- **Fan Direction Mode**
  - **Description**: Select the ventilation system's direction operation mode. When you change the direction mode, the integration keeps the current fan speed whenever the device is already running at a fixed speed. If you change the direction mode while the device is off, or while the **Fan** entity is in the **auto** preset (which does not have a fixed speed), the fan is started at **25%** (sleep) speed.
  - **Supported options**:
    - **forward**: Intake mode (supply air into the room)
    - **reverse**: Extract mode (exhaust air into the room)
    - **alternate**: Alternating mode (cycles between intake and extract)
    - **sensor**: Sensor-based mode that uses sensor thresholds configured in the app, with a fixed speed when the thresholds are exceeded. Corresponds to the Manual sensor mode in the app.
  - **Available for devices**: Ecocomfort 2.0

## Data updates

The **IntelliClima** integration uses **cloud polling** to fetch device status. The integration {% term polling polls %} the IntelliClima cloud API every 1 minute by default to retrieve current device state, sensor readings, and configuration.

This means:
- An active internet connection is required on the Home Assistant device.
- Your Ecocomfort 2.0 device must be connected to the internet and registered with the IntelliClima+ service.
- Data updates are limited by cloud API availability and latency.

## Examples

### Time-based ventilation schedule

Create a day and night ventilation schedule to run high speed at night and low speed during the day:

```yaml
automation:
  - alias: "Nighttime high-speed ventilation"
    description: "Run ventilation at high speed during night for air exchange"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: fan.set_percentage
        target:
          entity_id: fan.ecocomfort_2
        data:
          percentage: 100

  - alias: "Daytime low-speed ventilation"
    description: "Reduce ventilation during day when people are home"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: fan.set_percentage
        target:
          entity_id: fan.ecocomfort_2
        data:
          percentage: 25
```

## Known limitations

This integration is based on reverse-engineered communication with the IntelliClima+ cloud API. The IntelliClima+ service does not provide an official public API documentation. This means:

- API stability: If Fantini Cosmi changes their cloud API communication protocol or endpoints, this integration may stop working. Updates would be required to restore functionality.
- Feature support: Only the features and commands that were reverse-engineered are implemented. Future features added by Fantini Cosmi may not be immediately available through this integration.
- Cloud dependency: The integration requires a working internet connection and access to Fantini Cosmi's cloud servers. It cannot operate with local-only communication.
- Device support: Currently, only the Ecocomfort 2.0 device with firmware 0.6.8 has been tested. Other devices in the Ecocomfort line may work but have not been verified.

## Troubleshooting

### Enabling debugging

To turn on debug logging, please check the [documentation on enabling debug logs and diagnostics](https://www.home-assistant.io/docs/configuration/troubleshooting/#debug-logs-and-diagnostics). For fully debugging, you might also want to enable debugging for the external `pyintelliclima` library by modifying your {% term "`configuration.yaml`" %} file in the `/config` directory and adding the following:

```yaml
logger:
  logs:
   homeassistant.components.intelliclima: debug
   pyintelliclima: debug
```

### Device appears offline or not responding

#### Symptom: Device is offline and device shows as unavailable in IntelliClima+ app

The integration cannot communicate with your Ecocomfort 2.0 device through the IntelliClima+ cloud service.

#### Resolution

Try the following steps:

1. Verify device status in IntelliClima+ app: Open the IntelliClima+ mobile app and check that your Ecocomfort 2.0 shows as "Online" and responsive.

2. Check your internet connection: Ensure both your Home Assistant device and your Ecocomfort 2.0 have stable internet connectivity.

3. Power cycle the device: 
   - Turn off the Ecocomfort 2.0 at the power supply for 30 seconds.
   - Turn it back on and wait 2-3 minutes for it to reconnect.

4. Restart via IntelliClima+ app:
   - Open the IntelliClima+ app on your smartphone.
   - Find your Ecocomfort 2.0 device.
   - Use the app's restart or reset function if available: Settings > ECOCOMFORT 2.0 MANAGEMENT > RESTART
   ECOCOMFORT.
   - Wait for the device to come back online.

5. Check Home Assistant logs: Look for error messages in the Home Assistant logs for more details about the connection failure:
   - Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
   - Search for "intelliclima" messages.

### Integration fails to authenticate

#### Symptom: "Invalid authentication" error during setup

Your IntelliClima+ account credentials are incorrect or authentication with Fantini Cosmi's service failed.

#### Resolution

1. Verify credentials: Double-check that your email/username and password are correct.
2. Check account status: Ensure your IntelliClima+ account is active and not locked.
3. Try in the mobile app: Open the IntelliClima+ app and sign in to confirm your credentials work.

### No devices found after authentication

#### Symptom: "No devices found" or setup fails when validating account

The integration authenticated successfully, but no Ecocomfort devices were found in your account.

#### Resolution

1. Verify device is set up: Open the IntelliClima+ mobile app and confirm your Ecocomfort 2.0 is listed and shows as "Online".
2. Check device status: Ensure the device is powered on and connected to the internet (may take a few minutes after powering on).
3. Re-add the device: If the device doesn't appear, try removing and re-adding it in the IntelliClima+ app.
4. Wait for sync: After making changes in the IntelliClima+ app, wait a few minutes before retrying the Home Assistant integration setup.

### Slow response times or delayed updates

#### Symptom: Fan commands take a long time to execute, or sensor data is stale

Cloud polling introduces latency in command execution and data updates.

#### Resolution

1. Check internet connection: Ensure stable, fast internet connectivity for both your Home Assistant device and Ecocomfort 2.0.
2. Check cloud service status: Fantini Cosmi's cloud service may occasionally experience slowdowns. Try again in a few minutes.
3. Monitor polling interval: By default, the integration polls every 1 minute. If real-time responsiveness is critical, you can set up local automations that don't depend on frequent updates.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration from Home Assistant, you can continue using your device normally with the IntelliClima+ app.

## Support and contributions

If you encounter issues not covered in the troubleshooting section, or if you have suggestions for improvements, please make an issue and tag the author.

For users with other Ecocomfort device models who wish to add support, contributions are welcome. Support for additional models can be added to the underlying [`pyintelliclima`](https://github.com/dvdinth/pyintelliclima) library through reverse-engineering or official API documentation.
