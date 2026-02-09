---
title: LoJack
description: Instructions on how to integrate your LoJack by Spireon vehicle tracking account with Home Assistant.
ha_category:
  - Car
  - Presence detection
  - Sensor
ha_release: '2025.3'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: bronze
ha_codeowners:
  - '@devinslick'
ha_domain: lojack
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - sensor
ha_integration_type: hub
---

The **LoJack** {% term integration %} connects Home Assistant to vehicles equipped with [LoJack by Spireon](https://www.spireon.com/lojack/) GPS tracking hardware. After you authenticate with your Spireon/LoJack account credentials, the integration automatically discovers every vehicle registered to your account and creates a device for each one.

Each vehicle device provides:

- A **device tracker** entity for real-time GPS location on the map
- **Sensors** for odometer, speed, battery voltage, and last-reported timestamp
- **Binary sensors** for connectivity status and movement detection
- A **button** entity to request a live GPS fix directly from the vehicle's hardware

LoJack/Spireon is a vehicle tracking and recovery service primarily available in the United States. The hardware is typically installed by a dealership at the time of vehicle purchase. You need an active Spireon/LoJack account with at least one enrolled vehicle to use this integration.

## Supported devices

The integration supports any vehicle enrolled in a Spireon/LoJack account, including:

- Vehicles with factory-installed LoJack hardware
- Vehicles with dealer-installed LoJack devices
- Vehicles tracked through the Spireon fleet management platform (consumer accounts)

Each vehicle registered to your account is represented as a separate device in Home Assistant. The device displays:

- **Name**: Year, make, and model of the vehicle (for example, "2021 Toyota Camry")
- **Manufacturer**: Spireon LoJack
- **Model**: Make and model string
- **Serial number**: The vehicle's VIN

## Prerequisites

Before setting up the integration, make sure you have the following:

- An active **Spireon/LoJack account** with valid credentials (username and password)
- At least one vehicle enrolled and active on the account
- A working internet connection (the integration communicates with the Spireon cloud API)

No additional hardware is required on the Home Assistant side. The LoJack GPS hardware is installed in the vehicle.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "The username (typically an email address) for your Spireon/LoJack account."
Password:
  description: "The password for your Spireon/LoJack account."
{% endconfiguration_basic %}

### Reauthentication

If your credentials expire or you change your password, Home Assistant prompts you to re-authenticate:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **LoJack** integration. It will show a **Re-authenticate** message.
2. Select the **Reconfigure** button or the re-authenticate prompt.
3. Enter your new **password**.
4. Select **Submit**.

The integration verifies the password against the same account. Your username cannot be changed during reauthentication. On success, the integration reloads automatically.

### Reconfiguration

If you need to update both your username and password (for example, if you changed your Spireon account email):

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **LoJack** integration.
2. Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Update your **username** and/or **password**.
4. Select **Submit**.

{% note %}
If you change the username to a different account, the reconfiguration will abort with an "account mismatch" error. Each LoJack account must be a separate config entry.
{% endnote %}

## Supported functionality

### Entities

The **LoJack** integration provides the following entities for each vehicle.

#### Device tracker

Each vehicle gets a device tracker entity. This is the primary entity, and its name follows the device name directly.

- **Source type**: GPS
- **State**: Reports `home`, `not_home`, or a zone name based on the vehicle's GPS coordinates

Extra state attributes:

- `last_polled` — Timestamp of the most recent location report from the vehicle
- `address` — Human-readable street address of the vehicle's location
- `heading` — Compass heading in degrees (0–360)
- `gps_accuracy` — GPS accuracy value from the hardware

#### Sensors

The following sensors are enabled by default:

- **Odometer**
  - **Description**: The vehicle's odometer reading.
  - **Device class**: Distance
  - **Unit**: Miles

- **Speed**
  - **Description**: The vehicle's current speed.
  - **Device class**: Speed
  - **Unit**: mph

- **Battery voltage**
  - **Description**: The vehicle's 12V battery voltage.
  - **Device class**: Voltage
  - **Unit**: V

- **Location last reported**
  - **Description**: Timestamp of the most recent GPS fix.
  - **Device class**: Timestamp

The following diagnostic sensors are disabled by default. You can enable them in the entity settings if needed.

- **Make**
  - **Description**: Vehicle manufacturer (for example, "Toyota")

- **Model**
  - **Description**: Vehicle model (for example, "Camry")

- **Year**
  - **Description**: Vehicle model year (for example, "2021")

- **VIN**
  - **Description**: Vehicle Identification Number

- **License plate**
  - **Description**: License plate number, if available

#### Binary sensors

- **Active**
  - **Description**: Indicates whether the LoJack device is reporting. Shows as "on" if the vehicle has recent location data.
  - **Device class**: Connectivity

- **Moving**
  - **Description**: Shows as "on" if the vehicle's speed exceeds 0.5 mph. Shows as "unknown" if speed data is unavailable.
  - **Device class**: Moving

#### Buttons

- **Refresh location**
  - **Description**: Sends a command to the vehicle's LoJack hardware to obtain a fresh GPS fix. This is different from simply polling the server. For more details, see [Requesting a live GPS fix](#requesting-a-live-gps-fix-from-the-vehicle).

## Data updates

The **LoJack** integration {% term polling polls %} data from the Spireon cloud API every 5 minutes by default. Each poll retrieves the last known location cached on the Spireon server. It does _not_ command the vehicle's hardware to obtain a new GPS fix. The server-side cache is updated whenever the vehicle's LoJack hardware periodically reports in (the reporting interval is determined by the LoJack hardware and firmware and is not configurable).

### Polling the server cache

Calling the `homeassistant.update_entity` action (or triggering a coordinator refresh) re-fetches the last known location already stored on the Spireon server. This is fast and lightweight but only returns whatever location the server already has. If the vehicle has not reported in recently, you will get stale data.

Use this approach when you want to check the location more frequently than every 5 minutes, or when you need a quick, low-overhead update.

### Requesting a live GPS fix from the vehicle

Pressing the **Refresh location** button (or calling `button.press` on the refresh location entity) sends a command through the Spireon API to the vehicle's LoJack hardware. The hardware wakes up, acquires a fresh GPS satellite fix, and reports its current position back to the server. This provides a truly up-to-date location but involves a round trip to the physical hardware and may take 30 seconds to a few minutes for the updated location to appear.

Use this approach when you need the vehicle's actual current position right now, when the server cache is stale, or when you are tracking a stolen vehicle and need a live fix.

{% important %}
Each live GPS request wakes the vehicle's LoJack hardware and uses cellular data. Excessive requests could drain the vehicle's battery over time, as the LoJack hardware draws from the 12V system. The fresh location may take 30 seconds to several minutes to become available.
{% endimportant %}

### Rate limiting

The integration handles API rate limiting automatically. If the Spireon API returns a rate-limit response, the integration backs off and gradually resumes normal polling once the rate limit window expires. The polling interval is bounded between 1 minute (minimum) and 60 minutes (maximum).

## Examples

### Arrival and departure notifications

```yaml
automation:
  - alias: "Notify when vehicle arrives home"
    triggers:
      - trigger: state
        entity_id: device_tracker.lojack_camry
        to: "home"
    actions:
      - action: notify.mobile_app_phone
        data:
          message: "Your vehicle has arrived home."
```

### Low battery voltage alert
{% raw %}
```yaml
automation:
  - alias: "Alert on low vehicle battery"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.lojack_camry_battery_voltage
        below: 12.0
    actions:
      - action: notify.mobile_app_phone
        data:
          message: >
            Your vehicle's battery voltage is
            {{ states('sensor.lojack_camry_battery_voltage') }}V.
            This may indicate the battery needs attention.
```
{% endraw %}

### Movement detection at night

```yaml
automation:
  - alias: "Alert when vehicle starts moving at night"
    triggers:
      - trigger: state
        entity_id: binary_sensor.lojack_camry_moving
        to: "on"
    conditions:
      - condition: time
        after: "22:00:00"
        before: "06:00:00"
    actions:
      - action: notify.mobile_app_phone
        data:
          message: "Your vehicle has started moving after hours!"
```

### On-demand active tracking

For situations where you need frequent, accurate location updates (for example, actively tracking a vehicle), you can combine a live GPS fix request with a server poll. Use an input boolean to control when tracking is active to avoid unnecessary battery drain.

```yaml
automation:
  - alias: "Active tracking - request GPS every 3 minutes"
    triggers:
      - trigger: time_pattern
        minutes: "/3"
    conditions:
      - condition: state
        entity_id: input_boolean.vehicle_tracking_mode
        state: "on"
    actions:
      # Request a fresh GPS fix from the vehicle hardware
      - action: button.press
        target:
          entity_id: button.lojack_camry_refresh_location
      # Wait for the hardware to acquire and report the fix
      - delay:
          seconds: 90
      # Poll the server to pick up the new location
      - action: homeassistant.update_entity
        target:
          entity_id: device_tracker.lojack_camry
```

{% tip %}
Running active tracking continuously (24/7) wakes the LoJack hardware every few minutes, which increases battery draw and cellular data usage. Consider using conditions to limit active tracking to when it is actually needed.
{% endtip %}

## Known limitations

- All data flows through the Spireon cloud API. If the Spireon servers are down, the integration cannot retrieve data or send commands.
- The integration uses cloud polling. There is no webhook or push mechanism, so location updates depend on the polling interval.
- The LoJack hardware reporting interval is determined by the LoJack firmware and is not configurable by the user or the integration.
- LoJack by Spireon is primarily available in the United States. International availability may vary.
- The API reports speed in miles per hour and distance in miles. Home Assistant's unit conversion system converts these to metric if your instance is configured for metric units.
- The integration does not support creating or managing LoJack geofences. Use Home Assistant {% term zones %} for geofence functionality instead.
- The integration does not support remote commands beyond location refresh (no remote start, lock/unlock, or similar vehicle commands).
- Each LoJack/Spireon account requires its own config entry. You cannot merge vehicles from multiple accounts into a single entry.

## Troubleshooting

### Can't connect to LoJack servers

#### Symptom: "Failed to connect to LoJack servers"

When trying to set up or use the integration, you see a "Failed to connect to LoJack servers" error.

#### Description

This means the integration is unable to reach the Spireon cloud API. The issue could be with your internet connection or a temporary Spireon server outage.

#### Resolution

To resolve this issue, try the following steps:

1. Verify your internet connection is working.
2. Check that the Spireon/LoJack API is online by trying to log in at the Spireon website or mobile app.
3. If the Spireon API is experiencing a temporary outage, try again later.

### Invalid credentials

#### Symptom: "Invalid username or password"

When trying to set up the integration, you see an "Invalid username or password" error.

#### Description

The credentials you entered do not match any active Spireon/LoJack account.

#### Resolution

To resolve this issue, try the following steps:

1. Verify your credentials work on the official Spireon/LoJack website or mobile app.
2. Ensure you are using the correct username format (typically an email address).
3. If you recently changed your password, use the [reauthentication flow](#reauthentication).

### Stale location data

If the location data seems outdated:

1. Keep in mind that the default polling interval is 5 minutes, so data may be up to 5 minutes old.
2. The Spireon server may have cached old data if the vehicle's hardware hasn't reported in recently.
3. Use the **Refresh location** button to request a live GPS fix from the vehicle.
4. After pressing **Refresh location**, wait 1–2 minutes and then check again. The hardware needs time to acquire a fix and report back.

### Vehicle not appearing

If a vehicle on your account does not appear in Home Assistant:

1. Verify the vehicle is enrolled and active on your Spireon/LoJack account.
2. Check that the vehicle appears when you log in to the Spireon website.
3. Try removing and re-adding the integration.

### Rate limiting

If you see "Rate limited by LoJack API" in the logs, the integration has automatically backed off. The integration gradually resumes normal polling once the rate limit window expires. Avoid running automations that poll too aggressively (for example, every 30 seconds).

### Enabling debug logging

To enable debug logging for the LoJack integration, add the following to your {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.lojack: debug
    lojack_api: debug
```

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Removing the integration disconnects Home Assistant from the Spireon/LoJack service. Your Spireon/LoJack account and vehicle enrollment are not affected.
