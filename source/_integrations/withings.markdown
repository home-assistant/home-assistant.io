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

## Setup (Simple)

For simplicity, these instructions assume your installation uses Home Assistant Cloud.

### Step 1 - Create a Withings Account

You must have a developer account to distribute the data. [Create a free development account](https://account.withings.com/partner/add_oauth2).

Values for your account:

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: Your email address
- Callback Uri: `https://YOUR_NABU_CASA_ID.ui.nabu.casa/auth/external/callback`.
- Company: Home Assistant

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. You will need these in the next step.

### Step 2 - Configure Home Assistant

- Add the Withings configuration YAML.
    ```yaml
    # Example configuration.yaml entry
    withings:
      client_id: CLIENT_ID
      client_secret: CONSUMER_SECRET
    ```
- Confirm your YAML configuration is valid by using the `Check Config` tool (see note).
    - Note: In order for "Check Configuration" to be visible, you must enable "Advanced Mode" on your user profile. The "Check Configuration" tool can be found by clicking "Configuration" from the sidebar (cog icon) and then clicking "Server Control".
- Restart Home Assistant.


### Step 3 - Authorize Home Assistant

- Add the Withings integration.
- Once authorized, the tab/window will close and the integration page will prompt to enter a profile name.    
  - Note: It's important you provide the same profile from the previous step. Choosing a different one will result in Home Assistant showing data for one profile but labeling it for another.
- Data will synchronize immediately and update every 5 minutes.

## Setup (Advanced)
For advanced users who are NOT using Home Assistant Cloud. This is not intended to be a complete step-by-step guide.

### Requirements

Withings will validate (with HTTP HEAD) these requirements each time you save your Withings developer account. When these checks fail, the Withings UI is not always clear about why.

- Home Assistant (For create/update of Withings developer account):
    - Publicly accessible.
    - Running on a fully qualified domain name.
    - Running over HTTPS signed by a globally recognized Certificate Authority. Let's Encrypt will work.
- Home Assistant (For adding the integration)
    - Home Assistant's `external_url` needs to be set to match the `redirect uri` provided for your Withings account.

### Steps

- Create a developer account with the same steps from the instructions above.
    - The `redirect uri` should look like `https://<MY_DOMAIN_NAME>/auth/external/callback`.
- Configure Home Assistant's URL. This guarantees Withings will receive the proper redirect_uri. When adding the integration, Withings will throw an error if this is not setup correctly.
    ```yaml
    homeassistant:
      external_url: https://<MY_DOMAIN_NAME>
    ```
- Configure the Withings integration in your configuration YAML (see above).
- Add the integration (see above).
    - The following only applied if you chose to close off Home Assistant from the public after setting up your Withings account.
    After authorizing finishing authorization, your browser will redirect back to `https://<MY_DOMAIN_NAME>/auth/external/callback`. Since that is no longer public,
    your browser will return an error saying it could not connect. You can get around this by modifying the URL (in the browser) 
    to point to your local address of Home Assistant. So your browser's URL looked like `https://<MY_DOMAIN_NAME>/auth/external/callback` 
    but now change it to something like `https://192.168.1.11:8123/auth/external/callback`.

## Configuration

```yaml
# Example configuration.yaml entry
withings:
    client_id: CLIENT_ID
    client_secret: CONSUMER_SECRET
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
{% endconfiguration %}

## Bonus: Template Sensors to Convert Kilograms to Pounds

In a text editor, replace ```USER_PROFILE_NAME``` in the template sensors below with your Withings User Profile Name defined in the Withings integration configuration. 


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
