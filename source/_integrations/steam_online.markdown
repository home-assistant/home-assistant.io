---
title: Steam
description: Instructions on how to set up Steam in Home Assistant.
ha_category:
  - Social
  - Image
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: steam_online
ha_platforms:
  - sensor
  - image
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---

The **Steam** {% term integration %} will allow you to track the online status of public [Steam](https://steamcommunity.com) accounts.

{% include integrations/config_flow.md %}

{% important %}
Steam has a friends list privacy feature that interferes with easily adding sensors to track friends' activities. Setting the friends list to Public during initial setup will allow the integration to see them for easy adding. It is **not** necessary to keep the friends list Public.

Go to your profile, select "Edit Profile", "Privacy Settings".
{% endimportant %}

<p class='img'>
  <img src='/images/screenshots/steam_privacy_settings.png' />
</p>

## Setup

You need a [free API key](https://steamcommunity.com/dev/apikey) to use the platform. The domain name appears to not have any effect, but it's recommended to set this to your Home Assistant domain name. If you wish to avoid the proprietary Steam mobile application (needed because API key creation requires Steam Guard Mobile Authenticator), you can temporarily enroll in Steam Guard in the app, create an API key, then unregister Steam Guard again. The new API key will continue to function.

To find an account's 64-bit SteamID:

1. Open Steam.
2. Open the dropdown menu labeled with your username.
3. Select **Account details**.
   - Your **Steam ID** is displayed just below the label **Your-Account-Name Account**.

## Supported functionality

The **Steam** integration provides the following entities.

### Sensors

- **Primary sensor**
  - **Name**: The Steam profile name of the account.
  - **Description**: Represents the account's current presence status.
  - **Available states**:
    - Online
    - Offline
    - Away
    - Busy
    - Snooze
    - Looking to play
    - Looking to trade
  - **Attributes**:
    - **Account created**: The date and time when the Steam account was created.
    - **Real name**: The user's real name, if provided on their Steam profile.
    - **Level**: The current Steam level of the user.
    - **Last online**: The date and time the Steam user was last seen online.
    - **Game**: The title of the game the user is currently playing.
    - **Game ID**: The Steam App ID of the currently played game.
    - **Game image**: The URL of the logo image for the game the user is currently playing.
    - **Game header image**: The URL of the header image for the game the user is currently playing.
    - **Game icon**: The URL of the icon for the game the user is currently playing.

- **Last online**
  - **Description**: The date and time the Steam user was last seen online.

- **Level**
  - **Description**: The current Steam level of the user.

- **Now playing**
  - **Description**: The title of the game the user is currently playing.
  - **Attributes**:
    - **Steam App ID**: The Steam App ID of the currently played game.

### Images

Image entities provide artwork for the Steam account or the game the account is currently playing. Game-related image entities are only available while a game is actively being played.

- **App icon**
  - **Description**: The game's application icon.
  - **Image size**: 32 × 32 px.
  - **Remarks**: Entity disabled by default.

- **Avatar**
  - **Description**: The Steam user's profile avatar.
  - **Image size**: 184 × 184 px.
  - **Remarks**: Entity disabled by default.

- **Header capsule**
  - **Description**: The game's header artwork as displayed on its Steam store page.
  - **Image size**: 460 × 215 px.

- **Library capsule**
  - **Description**: The game's vertical library artwork used in the Steam library.
  - **Image size**: 600 × 900 px.

- **Library hero capsule**
  - **Description**: The game's wide hero artwork displayed at the top of the Steam library page.
  - **Image size**: 1920 × 620 px.

- **Library logo**
  - **Description**: The transparent logo displayed on top of the library hero artwork.
  - **Image size**: Varies by game.

- **Main capsule**
  - **Description**: The game's main capsule artwork used throughout the Steam store.
  - **Image size**: 616 × 353 px.

- **Page background**
  - **Description**: The background artwork used on the game's Steam store page.
  - **Image size**: 1438 × 810 px.

- **Small capsule**
  - **Description**: The game's small capsule artwork used in lists and search results.
  - **Image size**: 231 × 87 px.
  - **Remarks**: Entity disabled by default.

- **Vertical capsule**
  - **Description**: The game's vertical store capsule artwork.
  - **Image size**: 374 × 448 px or 748 × 896 px.

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
