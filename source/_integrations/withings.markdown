---
title: "Withings"
description: "Instructions on how to integrate Withings health products within Home Assistant."
logo: withings.png
ha_category:
  - Health
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Polling
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

- Confirm your YAML configuration is valid by using the `Check Config` tool (see note).
- Restart Home Assistant.
- Go to the integrations page.
- Add a Withings integration.
- Select the profile you intend to pull data. This will take you to the Withings site.
- On the Withings site, choose the profile you selected in the previous step (if prompted).
  - Note: It's important you select the same profile from the previous step. Choosing a different one will result in Home Assistant displaying data for profile 2, but it will be labeled as profile 1.
- Authorize the application. Your browser will redirect you to your Home Assistant URL.
  - Note: If you get a browser error saying the site is inaccessible, you can modify the
  `http://domain` portion of the URL to something you know is accessible, locally or publically. For example, `http://localhost:8123`.
  This occurs when the base URL provided by Home Assistant to Withings is not accessible to the outside world.
  Changing the domain will not affect how data is synchronized.
- Data will synchronize immediately and update every 5 minutes.

Note: In order for "Check Config" to be visible, you must enable "Advanced Mode" on your user profile. The "Check Config" tool can be found by clicking "Configuration" from the sidebar (cog icon) and then clicking "Server Control".

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
  description: Withings supports multiple profiles per account. Provide the person's name whom you want Home Assistant entities to will be associated with (just a name, it doesn't have to be perfect). During the authorization step, you will be asked to select this user from the Withings website.
  required: true
  type: map
base_url:
  description: Overrides Home Assistant's default base URL to use when authorizing with Withings.
  required: false
  type: string
  default: The base URL provided in the Home Assistant `api` component.
{% endconfiguration %}
