---
title: Steam
description: Instructions on how to set up Steam sensors in Home Assistant.
ha_category:
  - Social
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: steam_online
ha_platforms:
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---

The Steam integration will allow you to track the online status of public [Steam](https://steamcommunity.com) accounts.

{% include integrations/config_flow.md %}

{% important %}
Steam has a friends list privacy feature that interferes with easily adding sensors to track friends' activities. Setting the friends list to Public during initial setup will allow the integration to see them for easy adding. It is **not** necessary to keep the friends list Public.

Go to your profile, select "Edit Profile", "Privacy Settings".
{% endimportant %}

<p class='img'>
  <img src='/images/screenshots/steam_privacy_settings.png' />
</p>

## Setup

You need a [free API key](https://steamcommunity.com/dev/apikey) to use the platform.

To find an account's 64-bit SteamID:

1. Open Steam.
2. Open the dropdown menu labeled with your username.
3. Select **Account details**.
   - Your **Steam ID** is displayed just below the label **Your-Account-Name Account**.

## Examples

If you want to add the accounts to a group for example you will have to use:

```yaml
# Example configuration.yaml entry
group:
  steam:
    name: Steam
    entities:
      - sensor.steam_account1
      - sensor.steam_account2
```
