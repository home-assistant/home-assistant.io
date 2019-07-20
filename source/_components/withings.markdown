---
title: "Withings"
description: "Instructions on how to integrate Withings health products within Home Assistant."
logo: withings.png
ha_category: 
  - Health
  - Sensor
ha_release: 0.97
ha_iot_class: "Cloud Polling"
---

The `withings` sensor platform consumes data from various health products produced by [Withings](https://www.withings.com).

## Setup

### Step 1 - Create a Withings Account

You must have a developer account to distribute the data. [Create a free development account](https://account.withings.com/partner/add_oauth2). 

Values for your account:

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: Your email address
- Callback Uri: `https://your-domain-name/` - Withings will check if this URL is accessible (HTTP HEAD) upon submitting the form.
- Company: Home Assistant

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. You will need these in the next step.

### Step 2 - Configure Home Assistant

```yaml
# Example configuration.yaml entry
withings:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
  profiles:
    - USER_PROFILE_NAME
```

Withings supports multiple profiles per account. Each profile has a person's name to help distinguish whose data you're looking at. While the profile provided here can be arbitrary, it is recommended you use the same name from the Withings profile. This will make it easier to distinguish whose data you're looking at.

### Step 3 - Authorize Home Assistant

- Confirm your YAML configuration is valid by using the `Check Config` tool.
- Restart home assistant.
- Goto the integrations page.
- Add a Withings integration.
- Select the profile you intend to pull data. This will take you to the Withings site.
- On the Withings site, choose the profile you selected in the previous step (if prompted).
  - Note: It's important you select the same profile from the previous step. Choosing a different one will result in Home assistant displaying data for profile 2, but it will be labeled as profile 1.
- Authorize the application. Your browser will redirect you to your home assistant URL.
  - Note: If you get a browser error saying the site is inaccessible, you can modify the 
  `http://domain` portion of the URL to something you know is accessible, locally or publically. For example `http://localhost:8123`.
  This occurs when the base URL provided by home assistant to Withings is not accessible to the outside world.
  Changing the domain will not affect how data is synchronized.
- Data will synchronize immediately and update every 5 minutes.

## Configuration

```yaml
# Example configuration.yaml entry
withings:
    client_id: CLIENT_ID
    client_secret: CLIENT_SECRET
    profiles:
        - USER_PROFILE_NAME
```
{% configuration %}
client_id:
  description: The OAuth client id (get from https://account.withings.com/partner/add_oauth2)
  required: true
  type: string
client_secret:
  description: The OAuth secret (get from https://account.withings.com/partner/add_oauth2)
  required: true
  type: string
profiles:
  description: Withings supports multiple profiles per account. Provide the person's name whom you want home assistant entities to will be associated with (just a name, it doesn't have to be perfect). During the authorization step, you will be asked to select this user from the Withings website.
  required: true
  type: map
base_url:
  description: Overrides home assistant's default base URL to use when authorizing with Withings.
  required: false
  type: string
  default: The base URL provided in the home assistant `api` component.
measurements:
  description: A list of measurements to track.
  required: false
  type: map
  default: All of the measurements.
  keys:
    body_temperature_c:
      description: "Body temperature (unit of measure: celsius)."
    bone_mass_kg:
      description: "Body mass (unit of measure: kilograms)."
    diastolic_blood_pressure_mmhg:
      description: "Diastolic blood pressure (unit of measure: millimeters of mercury)."
    fat_free_mass_kg:
      description: "Body mass not consisting of fat (unit of measure: kilograms)."
    fat_mass_kg:
      description: "Body mass that is made up of fat (unit of measure: kilograms)."
    fat_ratio_pct:
      description: "Percent of body mass that is made up of fat (unit of measure: percent)."
    heart_pulse_bpm:
      description: "Heart rate (unit of measure: beats per minute)."
    height_m:
      description: "Vertical height (unit of measure: meters)."
    hydration:
      description: "Overall body hydration (unit of measure: unknown)."
    muscle_mass_kg:
      description: "Body mass that is made up of muscle (unit of measure: kilograms)."
    pulse_wave_velocity:
      description: "The velocity of blood pressure pulse as it propagates through the circulatory system (unit of measure: meters per second)."
    skin_temperature_c:
      description: "Skin temperature (unit of measure: celsius)."
    sleep_deep_duration_seconds:
      description: "Total deep sleep since noon the previous day (unit of measure: seconds)."
    sleep_heart_rate_average_bpm:
      description: "Average heart rate while sleeping (unit of measure: beats per minute)."
    sleep_heart_rate_max_bpm:
      description: "Maximum heart rate while sleeping (unit of measure: beats per minute)."
    sleep_heart_rate_min_bpm:
      description: "Minimum heart rate while sleeping (unit of measure: beats per minute)."
    sleep_light_duration_seconds:
      description: "Total light sleep since noon the previous day (unit of measure: seconds)."
    sleep_rem_duration_seconds:
      description: "Total REM sleep since noon the previous day (unit of measure: seconds)."
    sleep_respiratory_average_bpm:
      description: "Average breath rate while sleeping (unit of measure: breaths per minute)."
    sleep_respiratory_max_bpm:
      description: "Maximum breath rate while sleeping (unit of measure: breaths per minute)."
    sleep_respiratory_min_bpm:
      description: "Minimum breath rate while sleeping (unit of measure: breaths per minute)."
    sleep_state:
      description: "The current sleep state. Possible states are 'unknown', 'awake', 'light', 'deep', 'rem'."
    sleep_tosleep_duration_seconds:
      description: "Amount of time it took to fall asleep (unit of measure: seconds)."
    sleep_towakeup_duration_seconds:
      description: "Amount of time it took to wake up (unit of measure: seconds)."
    sleep_wakeup_count:
      description: "Number of times woken up since noon the previous day (unit of measure: count)."
    sleep_wakeup_duration_seconds:
      description: "Total spent awake during sleep session since noon the previous day (unit of measure: seconds)."
    spo2_pct:
      description: "Amount of oxygen in the blood (unit of measure: percent)."
    systolic_blood_pressure_mmhg:
      description: "Systolic blood pressure (unit of measure: millimeters of mercury)."
    temperature_c:
      description: "Temperature of the person (unit of measure: celsius)."
    weight_kg:
      description: "Mass of the person (unit of measure: kilograms)."
{% endconfiguration %}
