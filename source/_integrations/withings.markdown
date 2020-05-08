---
title: Withings
description: Instructions on how to integrate Withings health products within Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@vangorra'
ha_domain: withings
---

The `withings` sensor platform consumes data from various health products produced by [Withings](https://www.withings.com).

## Setup

### Step 1 - Create a Withings Account

You must have a developer account to distribute the data. [Create a free development account](https://account.withings.com/partner/add_oauth2).

Values for your account:

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: Your email address
- Callback Uri: `https://your-domain-name/auth/external/callback` - Withings will check if this URL is accessible (HTTP HEAD) upon submitting the form.
- Company: Home Assistant

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. You will need these in the next step.

### Step 2 - Configure Home Assistant

```yaml
# Example configuration.yaml entry
withings:
  client_id: CLIENT_ID
  client_secret: CONSUMER_SECRET
  profiles:
    - USER_PROFILE_NAME
```

Withings supports multiple profiles per account. Each profile has a person's name to help distinguish whose data you're looking at. While the profile provided here can be arbitrary, it is recommended you use the same name from the Withings profile. This will make it easier to distinguish whose data you're looking at.

### Step 3 - Authorize Home Assistant

- Confirm your YAML configuration is valid by using the `Check Config` tool (see note).
  - Note: In order for "Check Configuration" to be visible, you must enable "Advanced Mode" on your user profile. The "Check Configuration" tool can be found by clicking "Configuration" from the sidebar (cog icon) and then clicking "Server Control".
- Restart Home Assistant.
- Go to the integrations page.
- Add a Withings integration. This will open a new tab/window on the withings site.
- On the Withings site, choose the profile of the data you want to sync.
- Authorize the application. Your browser will redirect you to the redirect uri you provided during account setup.
  - Note: If you get a browser error saying the site is inaccessible, you can modify the
  `http://domain` portion of the URL to something you know is accessible, locally or publicly. For example, `http://localhost:8123`.
  This occurs when the base URL provided by Home Assistant to Withings is not accessible to the outside world.
  Changing the domain will not affect how data is synchronized.
- Once authorized, the tab/window will close and the integration page will prompt to select a profile. Select the profile you chose while on the withings site.
  - Note: It's important you select the same profile from the previous step. Choosing a different one will result in Home Assistant displaying the wrong data.
- Data will synchronize immediately and update every 5 minutes.

## Configuration

```yaml
# Example configuration.yaml entry
withings:
    client_id: CLIENT_ID
    client_secret: CONSUMER_SECRET
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
  description: Withings supports multiple profiles per account. Provide the person's name whom you want Home Assistant entities to will be associated with (just a name, it doesn't have to be perfect). During the authorization step, you will be asked to select this user from the Withings website.
  required: true
  type: map
{% endconfiguration %}

## Bonus: Template Sensors to Convert Kilograms to Pounds

In a text editor, replace ```USER_PROFILE_NAME``` in the template sensors below with your withings User Profile Name defined in the Withings integration configuration. 


{% raw %}

```yaml
# Example configuration.yaml entry
sensors:
  - platform: template
    sensors:
      withings_weight_lbs_USER_PROFILE_NAME:
        friendly_name: "withings weight_lbs_USER_PROFILE_NAME"
        unit_of_measurement: 'lbs'
        value_template: "{{ (states('sensor.withings_weight_kg_USER_PROFILE_NAME') | float * 2.20462262185) | round(2) }}"
        icon_template: mdi:weight-pound

  - platform: template
    sensors:
      withings_bone_mass_lbs_USER_PROFILE_NAME:
        friendly_name: "withings bone_mass_lbs_USER_PROFILE_NAME"
        unit_of_measurement: 'lbs'
        value_template: "{{ (states('sensor.withings_bone_mass_kg_USER_PROFILE_NAME') | float * 2.20462262185) | round(2) }}"
        icon_template: mdi:weight-pound
        
  - platform: template
    sensors:
      withings_fat_free_mass_lbs_USER_PROFILE_NAME:
        friendly_name: "withings fat_free_mass_lbs_USER_PROFILE_NAME"
        unit_of_measurement: 'lbs'
        value_template: "{{ (states('sensor.withings_fat_free_mass_kg_USER_PROFILE_NAME') | float * 2.20462262185) | round(2) }}"
        icon_template: mdi:weight-pound
        
  - platform: template
    sensors:
      withings_fat_mass_lbs_USER_PROFILE_NAME:
        friendly_name: "withings fat_mass_lbs_USER_PROFILE_NAME"
        unit_of_measurement: 'lbs'
        value_template: "{{ (states('sensor.withings_fat_mass_kg_USER_PROFILE_NAME') | float * 2.20462262185) | round(2) }}"
        icon_template: mdi:weight-pound
        
  - platform: template
    sensors:
      withings_muscle_mass_lbs_USER_PROFILE_NAME:
        friendly_name: "withings muscle_mass_lbs_USER_PROFILE_NAME"
        unit_of_measurement: 'lbs'
        value_template: "{{ (states('sensor.withings_muscle_mass_kg_USER_PROFILE_NAME') | float * 2.20462262185) | round(2) }}"
        icon_template: mdi:weight-pound
```

{% endraw %}
