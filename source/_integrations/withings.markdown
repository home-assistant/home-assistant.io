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
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The `withings` sensor platform consumes data from various health products produced by [Withings](https://www.withings.com).

## Create a Withings Account

You must have a developer account to distribute the data. [Create a free development account](https://account.withings.com/partner/add_oauth2).

Values for your account:

- Logo: Any reasonable picture will do.
- Description: Personal app for collecting my data.
- Contact Email: Your email address
- Callback Uri: `https://my.home-assistant.io/redirect/oauth`.
- Company: Home Assistant

Once saved, the "Client Id" and "Consumer Secret" fields will be populated. You will need these in the next step.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Withings will validate (with HTTP HEAD) these requirements each time you save your Withings developer account. When these checks fail, the Withings UI is not always clear about why.

- Home Assistant (For create/update of Withings developer account):
    - Publicly accessible.
    - Running on a fully qualified domain name.
    - Running over HTTPS signed by a globally recognized Certificate Authority. Let's Encrypt will work.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration configuration will ask for the *Client ID* and *Client Secret* created above. See [Application Credentials](/integrations/application_credentials) for more details.

Once authorized, the tab/window will close and the integration page will prompt to select a profile. Select the profile you chose while on the Withings site.
  - Note: It's important you select the same profile from the previous step. Choosing a different one will result in Home Assistant displaying the wrong data.

Data will synchronize immediately and update under the following conditions:
  - If `use_webhook` is enabled:
      - Each time Withings notifies Home Assistant of a data change.
      - Every 120 minutes.
  - If `use_webhook` is not enabled:
      - Every 10 minutes.

## Configuration

There are additional configuration options available:

```yaml
# Example configuration.yaml entry
withings:
    use_webhook: true
```

{% configuration %}
use_webhook:
  description: "Configure Withings to notify Home Assistant when data changes. This also required to populate the in_bed sensor. Note: In order for this to work, your Home Assistant install must be accessible to the internet."
  required: false
  default: false
  type: boolean
{% endconfiguration %}

## Bonus: Template Sensors to Convert Kilograms to Pounds

In a text editor, replace ```USER_PROFILE_NAME``` in the template sensors below with your Withings User Profile Name defined in the Withings integration configuration.

{% raw %}

```yaml
# Example configuration.yaml entry
template:
  - sensor:
    - name: Withings weight lbs USER_PROFILE_NAME
      unit_of_measurement: "lbs"
      state: >-
        {{
          (states('sensor.withings_weight_kg_USER_PROFILE_NAME') | float(0) * 2.20462262185)
          | round(2, default=0)
        }}
      icon: "mdi:weight-pound"

    - name: Withings bone mass lbs USER_PROFILE_NAME
      unit_of_measurement: "lbs"
      state: >-
        {{
          (states('sensor.withings_bone_mass_kg_USER_PROFILE_NAME') | float(0) * 2.20462262185)
          | round(2, default=0)
        }}
      icon: "mdi:weight-pound"

    - name: Withings fat free mass lbs USER_PROFILE_NAME
      unit_of_measurement: "lbs"
      state: >- 
        {{
          (states('sensor.withings_fat_free_mass_kg_USER_PROFILE_NAME') | float(0) * 2.20462262185)
          | round(2, default=0)
         }}
      icon: "mdi:weight-pound"

    - name: Withings fat mass lbs USER_PROFILE_NAME
      unit_of_measurement: "lbs"
      state: >-
        {{
          (states('sensor.withings_fat_mass_kg_USER_PROFILE_NAME') | float(0) * 2.20462262185)
          | round(2, default=0)
        }}
      icon: "mdi:weight-pound"

    - name: Withings muscle mass lbs USER_PROFILE_NAME
      unit_of_measurement: "lbs"
      state: >-
        {{
          (states('sensor.withings_muscle_mass_kg_USER_PROFILE_NAME') | float(0) * 2.20462262185)
          | round(2, default=0)
        }}
      icon: "mdi:weight-pound"
```

{% endraw %}
