---
layout: page
title: "Withings"
description: "Instructions on how to integrate Withings health products within Home Assistant."
date: 2019-07-16 07:33
sidebar: true
comments: false
sharing: true
footer: true
logo: withings.png
ha_category: 
  - Health
  - Sensor
ha_release: 0.96.0
ha_iot_class: "Cloud Polling"
---

The `withings` sensor platform consumes data from various health products produced by [Withings](https://www.withings.com).

## {% linkable_title Setup %}

### {% linkable_title Account %}

You must have a developer account to distribute the data. [Create a free development account](https://account.withings.com/partner/add_oauth2). 

Values for your account:

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: \<Your email address>
- Callback Uri: https://your-domain-name/ - Withings will check if this url is accessible (http HEAD) upon submitting the form.
- Company: Home Assistant

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. You will need these in the next step.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
withings:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
  profiles:
    - <name of user profile>
```

Withings supports multiple profiles per account. Each profile has a person's name to help distinguish who's data you're looking at. While the profile provided here can be arbitrary, it is recommended you use the same name from the Withings profile. This will make it easier to distinguish who's data you're looking at.

### {% linkable_title Authorization %}
- Confirm your yaml configuration is valid by using the `Check Config` tool.
- Restart home assistant.
- Goto the integrations page.
- Add a Withings integration.
- Select the profile you intend to pull data. This will take you to the Withings site.
- On the withings site, choose the profile you selected in the previous step (if prompted).
  - Note: It's important you select the same profile from the previous step. Choosing a different one will result in Home assistant displaying data for profile 2 but it will be labeled as profile 1.
- Authorize the application. Your browser will redirect you to your home assistant url.
  - Note: If you get a browser error saying the site is inaccessible, you can modify the 
  `http://domain` portion of the url to something you know is accessible, locally or publically. For example `http://localhost:8123`.
  This occurs when the base url provided by home assistant to Withings is not accessible to the outside world.
  Changing the domain will not affect how data is synchronized.
- Data will synchronize immediately and update every 5 minutes.

## {% linkable_title Advanced Configuration %}

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
  description: Withings supports multiple profiles per account. Provide the person's name who you want home assistant entities to will be associated with (just a name, it doesn't have to be perfect). During the authorization step, you will be asked to select this user from the Withings website.
  required: true
  type: map
base_url:
  description: Overrides home assistant's default base url to use when authorizing with Withings.
  required: false
  type: string
  default: The base url provided in the home assistant `api` component.
measurements:
  description: A list of measurements to track.
  required: false
  type: map
  default: All of the measurements.
  keys:
    body_temperature_c:
      description:
    bone_mass_kg:
      description:
    diastolic_blood_pressure_mmhg:
      description:
    fat_free_mass_kg:
      description:
    fat_mass_kg:
      description:
    fat_ratio_pct:
      description:
    heart_pulse_bpm:
      description:
    height_m:
      description:
    hydration:
      description:
    muscle_mass_kg:
      description:
    pulse_wave_velocity:
      description:
    skin_temperature_c:
      description:
    sleep_deep_duration_seconds:
      description:
    sleep_heart_rate_average_bpm:
      description:
    sleep_heart_rate_max_bpm:
      description:
    sleep_heart_rate_min_bpm:
      description:
    sleep_light_duration_seconds:
      description:
    sleep_rem_duration_seconds:
      description:
    sleep_respiratory_average_bpm:
      description:
    sleep_respiratory_max_bpm:
      description:
    sleep_respiratory_min_bpm:
      description:
    sleep_state:
      description: Possible states are 'unknown', 'awake', 'light', 'deep', 'rem'
    sleep_tosleep_duration_seconds:
      description:
    sleep_towakeup_duration_seconds:
      description:
    sleep_wakeup_count:
      description:
    sleep_wakeup_duration_seconds:
      description:
    spo2_pct:
      description:
    systolic_blood_pressure_mmhg:
      description:
    temperature_c:
      description:
    weight_kg:
      description:
{% endconfiguration %}
