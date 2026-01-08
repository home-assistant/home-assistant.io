---
title: Garmin Connect
description: Instructions on how to integrate Garmin Connect with Home Assistant.
ha_category:
  - Health
  - Sensor
ha_iot_class: Cloud Polling
ha_release: "2024.1"
ha_codeowners:
  - "@cyberjunky"
ha_domain: garmin_connect
ha_config_flow: true
ha_integration_type: service
ha_quality_scale: platinum
---

The **Garmin Connect** {% term integration %} allows you to integrate your [Garmin Connect](https://connect.garmin.com/) fitness data into Home Assistant. It provides comprehensive health, fitness, and activity tracking data from your Garmin devices.

## Prerequisites

- A [Garmin Connect](https://connect.garmin.com/) account
- At least one Garmin device synced to your account
- If you have MFA (Multi-Factor Authentication) enabled, you'll need access to your authentication method during setup

## Supported data

This integration provides sensors for the following categories:

### Daily health metrics
- Steps (daily, weekly, total)
- Heart rate (resting, min, max, current)
- Stress levels and durations
- Body Battery™
- Sleep data (duration, quality, stages)
- Respiration rate
- SpO2 (pulse oximetry)
- Calories (active, resting, total)
- Floors climbed
- Intensity minutes

### Body composition
- Weight
- BMI
- Body fat percentage
- Muscle mass
- Bone mass
- Hydration
- Metabolic age
- Fitness age

### Activity & training
- Last activity details (name, type, distance, duration, HR, calories)
- Last N activities (list sensor with attributes)
- Training readiness
- Training status
- Training load
- VO2 Max
- Lactate threshold

### Goals & achievements
- Active goals
- Badges earned
- User points and level

### Gear tracking
- Shoes, bikes, and other gear
- Usage statistics
- Distance accumulated

### Blood pressure
- Systolic and diastolic values
- Pulse readings

### Menstrual cycle tracking
- Cycle phase
- Day in cycle
- Fertile window predictions

## Configuration

{% include integrations/config_flow.md %}

### Configuration parameters

| Parameter | Description |
|-----------|-------------|
| Username | Your Garmin Connect email address |
| Password | Your Garmin Connect password |
| MFA Code | Required only if MFA is enabled on your account |

### Options

After setup, you can configure these options:

| Option | Default | Description |
|--------|---------|-------------|
| Scan interval | 300 | How often to fetch data (seconds, minimum 60) |

## Data updates

The integration uses cloud polling to fetch data from Garmin Connect servers. Data is refreshed based on the configured scan interval (default: 5 minutes).

- **Core health data**: Updates every scan interval
- **Activities**: Fetched from the last 7 days, updates every scan interval
- **Gear data**: Updates every scan interval
- **Body composition**: Updates every scan interval

{% tip %}
Garmin devices sync to Garmin Connect when in Bluetooth range of the paired phone or via WiFi. Sensors will update after your device syncs to Garmin Connect AND the integration polls for new data.
{% endtip %}

## Entities

The integration creates a single device representing your Garmin Connect account, with sensors organized by category.

### Entity naming

Sensors follow this naming pattern: `sensor.garmin_connect_[sensor_name]`

Examples:
- `sensor.garmin_connect_daily_steps`
- `sensor.garmin_connect_resting_heart_rate`
- `sensor.garmin_connect_body_battery`
- `sensor.garmin_connect_last_activity`

### Gear sensors

Gear (shoes, bikes, etc.) creates additional sensors:
- `sensor.garmin_connect_[gear_name]`

Gear sensors include attributes:
- `gear_uuid` - Unique identifier for service calls
- `distance` - Total distance used
- `max_distance` - Maximum expected distance
- `activity_types` - Types of activities this gear is used for

## Actions

This integration provides the following actions (services):

### Set active gear

Set gear as the default for an activity type.

| Data attribute | Required | Description |
|----------------|----------|-------------|
| `gear_uuid` | No* | UUID of the gear (from sensor attributes) |
| `entity_id` | No* | Alternatively, select a gear sensor entity |
| `activity_type` | Yes | Activity type: `running`, `cycling`, `hiking`, `walking`, `swimming`, `other` |
| `setting` | No | One of: `set this as default, unset others`, `set as default`, `unset default` |

*Either `gear_uuid` or `entity_id` is required.

{% raw %}
```yaml
action: garmin_connect.set_active_gear
data:
  entity_id: sensor.garmin_connect_my_running_shoes
  activity_type: running
  setting: "set this as default, unset others"
```
{% endraw %}

### Add body composition

Record body composition metrics to Garmin Connect.

| Data attribute | Required | Description |
|----------------|----------|-------------|
| `weight` | Yes | Weight in kg |
| `timestamp` | No | ISO datetime, defaults to now |
| `percent_fat` | No | Body fat percentage |
| `percent_hydration` | No | Hydration percentage |
| `muscle_mass` | No | Muscle mass in kg |
| `bone_mass` | No | Bone mass in kg |
| `visceral_fat_mass` | No | Visceral fat in kg |
| `metabolic_age` | No | Metabolic age in years |
| `physique_rating` | No | Physique rating (1-9) |
| `bmi` | No | Body Mass Index |

{% raw %}
```yaml
action: garmin_connect.add_body_composition
data:
  weight: 82.3
  percent_fat: 23.6
  muscle_mass: 35.5
```
{% endraw %}

### Add blood pressure

Record blood pressure measurement to Garmin Connect.

| Data attribute | Required | Description |
|----------------|----------|-------------|
| `systolic` | Yes | Systolic pressure (mmHg) |
| `diastolic` | Yes | Diastolic pressure (mmHg) |
| `pulse` | Yes | Pulse rate (bpm) |
| `timestamp` | No | ISO datetime, defaults to now |
| `notes` | No | Additional notes |

{% raw %}
```yaml
action: garmin_connect.add_blood_pressure
data:
  systolic: 120
  diastolic: 80
  pulse: 60
  notes: "Morning measurement"
```
{% endraw %}

### Create activity

Create a manual activity in Garmin Connect.

| Data attribute | Required | Description |
|----------------|----------|-------------|
| `activity_name` | Yes | Name of the activity |
| `activity_type` | Yes | Type: `running`, `cycling`, `walking`, `hiking`, `swimming`, `fitness_equipment`, `other` |
| `duration_min` | Yes | Duration in minutes |
| `start_datetime` | No | ISO datetime, defaults to now |
| `distance_km` | No | Distance in kilometers |
| `time_zone` | No | Time zone (e.g., `Europe/Amsterdam`) |

{% raw %}
```yaml
action: garmin_connect.create_activity
data:
  activity_name: "Morning Run"
  activity_type: running
  duration_min: 30
  distance_km: 5.0
```
{% endraw %}

### Upload activity

Upload an activity file (FIT, GPX, TCX) to Garmin Connect.

| Data attribute | Required | Description |
|----------------|----------|-------------|
| `file_path` | Yes | Path to file (relative to config directory) |

{% raw %}
```yaml
action: garmin_connect.upload_activity
data:
  file_path: "activities/run.fit"
```
{% endraw %}

{% note %}
Place activity files in a subdirectory of your Home Assistant configuration directory. Supported formats: `.fit`, `.gpx`, `.tcx`.
{% endnote %}

### Add gear to activity

Associate gear with a specific activity.

| Data attribute | Required | Description |
|----------------|----------|-------------|
| `activity_id` | Yes | Activity ID (find in `lastActivity` sensor attributes) |
| `gear_uuid` | No* | UUID of the gear |
| `entity_id` | No* | Alternatively, select a gear sensor entity |

*Either `gear_uuid` or `entity_id` is required.

{% raw %}
```yaml
action: garmin_connect.add_gear_to_activity
data:
  activity_id: 12345678901
  entity_id: sensor.garmin_connect_my_running_shoes
```
{% endraw %}

## Automation examples

### Congratulate on step goal

{% raw %}
```yaml
automation:
  - alias: "Daily step goal reached"
    trigger:
      - platform: numeric_state
        entity_id: sensor.garmin_connect_daily_steps
        above: 10000
    action:
      - action: notify.mobile_app_phone
        data:
          title: "🎉 Step Goal Reached!"
          message: "You've reached 10,000 steps today!"
```
{% endraw %}

### Log weight from smart scale

{% raw %}
```yaml
automation:
  - alias: "Sync smart scale to Garmin"
    trigger:
      - platform: state
        entity_id: sensor.smart_scale_weight
    action:
      - action: garmin_connect.add_body_composition
        data:
          weight: "{{ states('sensor.smart_scale_weight') | float }}"
          percent_fat: "{{ states('sensor.smart_scale_body_fat') | float }}"
```
{% endraw %}

### Low Body Battery notification

{% raw %}
```yaml
automation:
  - alias: "Low Body Battery alert"
    trigger:
      - platform: numeric_state
        entity_id: sensor.garmin_connect_body_battery
        below: 20
    condition:
      - condition: time
        after: "08:00:00"
        before: "22:00:00"
    action:
      - action: notify.mobile_app_phone
        data:
          title: "🔋 Low Energy"
          message: "Your Body Battery is at {{ states('sensor.garmin_connect_body_battery') }}%. Consider resting."
```
{% endraw %}

### Automatic gear assignment

{% raw %}
```yaml
automation:
  - alias: "Add shoes to running activity"
    trigger:
      - platform: state
        entity_id: sensor.garmin_connect_last_activity
    condition:
      - condition: template
        value_template: "{{ state_attr('sensor.garmin_connect_last_activity', 'activityType') == 'running' }}"
    action:
      - action: garmin_connect.add_gear_to_activity
        data:
          activity_id: "{{ state_attr('sensor.garmin_connect_last_activity', 'activityId') }}"
          entity_id: sensor.garmin_connect_my_running_shoes
```
{% endraw %}

## Known limitations

- **Cloud-based**: Requires internet connection; data depends on Garmin servers availability
- **Polling delay**: Data updates only when your device syncs to Garmin Connect AND the integration polls
- **MFA sessions**: MFA sessions may expire, requiring re-authentication
- **Rate limiting**: Excessive polling may trigger Garmin's rate limits; minimum interval is 60 seconds
- **China region**: Users with `.cn` Garmin accounts need to make sure country in Home Assistant is set to `China`

## Troubleshooting

### Re-authentication required

If you see "Re-authentication required" in the integration:
1. Go to {% my integrations title="Settings > Devices & Services" %}
2. Find Garmin Connect and select "Reconfigure"
3. Enter your credentials and MFA code if prompted

### Sensors show "unknown" or "unavailable"

- Check if your Garmin device has synced recently
- Verify Garmin Connect website/app shows current data
- Check Home Assistant logs for error messages
- Not all data may be available in your Garmin account

### MFA code not accepted

- Ensure you're using the current code (they expire quickly)
- Try refreshing your authenticator app
- Wait for a new code cycle before retrying

### Rate limit errors

If you see 429 or rate limit errors:
1. Increase the scan interval in options (e.g., to 600 seconds)
2. Wait 15-30 minutes before reloading the integration

## Removing the integration

{% include integrations/remove_device_service.md %}

This will remove all Garmin Connect entities. Your data in Garmin Connect is not affected.
