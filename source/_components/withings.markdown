---
layout: page
title: "Withings"
description: "Instructions on how to integrate Withings health products within Home Assistant."
date: 2019-03-02 21:20
sidebar: true
comments: false
sharing: true
footer: true
logo: withings.png
ha_category: 
  - Health
  - Sensor
ha_release: 0.93.0
ha_iot_class: Cloud Polling
---

The `withings` sensor platform consumes data from various health products produced by [Withings](https://www.withings.com).

## {% linkable_title Setup %}

### {% linkable_title Perquisites %}

These perquisites are necessary only when creating your Withings developer account. It is important your service meets these requirements as the Withings site will check when you attempt to create your account.

- Home assistant is accessible through a publicly resolvable domain name. An ip address or localhost will not work.
- Service must be running on port 80 or 443 with SSL certs.

Side Note: Upon account creation, Withings checks your server's settings by sending an HTTP HEAD request to the callback uri. While not tested, it may be possible to setup a webserver that responds to that path to avoid having your server online.

### {% linkable_title Account %}

You must have a developer account to distribute the data. [Create a free development account](https://account.withings.com/partner/add_oauth2). 

Values for your account:

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: \<Your email address>
- Callback Uri: https://your-domain-name/api/withings/callback
- Company: Home Assistant

Note: Upon saving these settings, Withings will check if your callback URI resolves. If your service isn't available, the save will fail. After you developer account is created, you can make your home assistant no longer publicly accessible (if you so choose).

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. Take note, you will need these later.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
withings:
    client_id: <client id from previous step>
    client_secret: <consumer secret from previous step>
    profiles:
        - <name of user profile>
```

Withings supports multiple profiles per account. Each profile has a person's name to help distinguish who's data you're looking at. While the profile provided here can be arbitrary, it is recommended you use the same name from the Withings profile. This will make it easier to distinguish who's data you're looking at.

### {% linkable_title Authorization %}

On the home assistant web page
- Goto `Configuraton` > `General`
  - Click `Check Config` and ensure your config looks good.
  - After config is correct, click `Restart`.
- After Home assistant restarts.
  - Got the integrations page.
  - Toward the bottom of the page, you will see list item for Withings, click it.
  - Select the profile you intend to pull data.
  - Click the link to be taken to the withing site to authorize the request.
  - Withings will provide you with a list of profiles to choose from (if you have more than one). Choose the profile
  you selected earlier. Otherwise homeassistant entity names will not match the data they are showing.
- After you authorize at Withings, the Withings website will redirect your browser back to your callback uri.
If your home assistant instance is not accessible publicly, you can change the url in the browser to match the 
url of your server.

That should do it. Data will begin synchronizing in 5 minutes and update every 5 minutes.

## {% linkable_title FAQ %}

### How can I get data for more than one profile?

Create another sensor entry with the same client id and secret. Just be sure to change the profile to the name of the person you want to track. Then restart home assistant and authorize Withings for that profile.

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
  description: The base url to use when authorizing with Withings. This should be the same as the Callback Uri on your Withings account. `<baseurl>/api/withings/callback`
  required: false
  type: string
  default: The base url provided in the `api` component.
measurements:
  description: A list of measurements to create sensors for (and track).
  required: false
  type: map
  default: All of the measurements.
  keys:
    weight_kg:
      description:
    weight_lb:
      description:
    weight_st:
      description: Weight in stone.
    fat_mass_kg:
      description:
    fat_mass_lb:
      description:
    fat_mass_st:
      description: Fat mass in stone.
    fat_free_mass_kg:
      description:
    fat_free_mass_lb:
      description:
    fat_free_mass_st:
      description: Fat free in stone.
    muscle_mass_kg:
      description:
    muscle_mass_lb:
      description:
    muscle_mass_st:
      description: Muscle mass in stone.
    bone_mass_kg:
      description:
    bone_mass_lb:
      description:
    bone_mass_st:
      description: Bone mass in stone.
    height_m:
      description:
    height_cm:
      description:
    height_in:
      description:
    height_imp:
      description: Height portrayed by strings like 5' 6", 6' 3", etc
    temperature_auto:
      description: Temperature. Note; Home assistant automatically converts this value to your configured measurement system.
    body_temperature_auto:
      description: Temperature normally used to determine if a person has a fever. Note; Home assistant automatically converts this value to your configured measurement system.
    skin_temperature_auto:
      description: Skin temperature. Note; Home assistant automatically converts this value to your configured measurement system.
    fat_ratio_pct:
      description:
    diastolic_blood_pressure_mmhg:
      description: Blood pressure.
    systolic_blood_pressure_mmhg:
      description: Blood pressure.
    heart_pulse_bpm:
      description:
    spo2_pct:
      description: Blood oxygen saturation.
    hydration:
      description:
    pulse_wave_velocity:
      description:
    sleep_state:
      description: Possible states are 'unknown', 'awake', 'light', 'deep', 'rem'
    sleep_wakeup_duration_hours:
      description:
    sleep_light_duration_hours:
      description:
    sleep_deep_duration_hours:
      description:
    sleep_rem_duration_hours:
      description:
    sleep_wakeup_duration_minutes:
      description:
    sleep_light_duration_minutes:
      description:
    sleep_deep_duration_minutes:
      description:
    sleep_rem_duration_minutes:
      description:
    sleep_wakeup_count:
      description:
    sleep_tosleep_duration_hours:
      description:
    sleep_towakeup_duration_hours:
      description:
    sleep_tosleep_duration_minutes:
      description:
    sleep_towakeup_duration_minutes:
      description:
    sleep_heart_rate_average_bpm:
      description:
    sleep_heart_rate_min_bpm:
      description:
    sleep_heart_rate_max_bpm:
      description:
    sleep_respiratory_average_bpm:
      description:
    sleep_respiratory_min_bpm:
      description:
    sleep_respiratory_max_bpm:
      description:
{% endconfiguration %}
