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
ha_category: Health
ha_release: 0.86.1
ha_iot_class: "Cloud Polling"
---

The `withings` sensor platform consumes data from various health products produced by [Withings](https://www.withings.com).

## {% linkable_title Setup %}

### Perquisites
- Home assistant is accessible through a publicly resolvable domain name. An ip address or localhost will NOT work.
- Service must be running on port 80 or 443 with SSL certs.

### Account
To use Withings with Home Assistant, first you must [create a free development account](https://account.withings.com/partner/add_oauth2). 

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: <Your email address>
- Callback Uri: https://your-domain-name/api/withings/callback
- Company: Home Assistant

Note: Upon saving these settings, Withings WILL check if your callback URI resolves. If your service isn't available, the save will fail.

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. Take note, you will need these later.

### Configuration

```yaml
# Example configuration.yaml entry
sensor:
  - platform: 'withings'
    client_id: <client id from previous step>
    secret: <consumer secret from previous step>
    profile: <name of user profile>
```

On the home assistant web page
- Goto `Configuraton` > `General`
  - Click `Check Config` and ensure your config looks good.
  - After config is correct, click `Restart`.
- After Home assistant restarts.
  - Goto the main home assistant page and click on the notifications. This is usually a bell icon in the top left of
  the main page.
  - You will see a configuration card for withings, click it.
  - Read the description, it says who's profile you should allow access to. Keep that in mind for the next step.
  - Click the link to be taken to the withing site to authorize the request.
  - Withings will provide you with a list of profiles to choose from (if you have more than one). Choose the profile
  you saw in the description earlier. Otherwise data will be mixed up and things will get confusing.
- After you authorize at Withings, the Withings website will redirect your browser back to your callback uri.
If you home assistant instance is not accessible publicly, you can change the url in the browser to match the 
url of your server.

That should do it. Data will begin synchronizing in 5 minutes and update every 5 minutes.

###


{% configuration %}
client_id:
  description: The OAuth client id (get from https://account.withings.com/partner/add_oauth2)
  required: true
  type: string
secret:
  description: The OAuth secret (get from https://account.withings.com/partner/add_oauth2)
  required: true
  type: string
profile:
  description: Withings supports multiple profiles per account. The person's name sensors will be associated with (just a name, it doesn't have to be perfect). During the authorization step, you will be asked to select this user from the Withings website.
  required: true
  type: string
base_url:
  description: The base url to use when authorizing with Withings. This should be the same as the Callback Uri on your Withings account. `<baseurl>/api/withings/callback`
  required: false
  type: string
  default: The base url provided in the `api` component config.
measurements:
  description: A list of measurements to create sensors for (and track).
  required: false
  type: map
  keys:
    weight_kg:
      description:
    weight_lb:
      description:
    fat_mass_kg:
      description:
    fat_mass_lb:
      description:
    fat_free_mass_kg:
      description:
    fat_free_mass_lb:
      description:
    muscle_mass_kg:
      description:
    muscle_mass_lb:
      description:
    bone_mass_kg:
      description:
    bone_mass_lb:
      description:
    height_m:
      description:
    height_cm:
      description:
    height_in:
      description:
    height_imp:
      description: Height portrayed by strings like 5' 6", 6' 3", etc
    temperature_c:
      description: 
    temperature_f:
      description:
    body_temperature_c
      description: Temperature normally used to determine if a person has a fever.
    body_temperature_f:
      description: Temperature normally used to determine if a person has a fever.
    skin_temperature_c:
      description:
    skin_temperature_f:
      description:
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

