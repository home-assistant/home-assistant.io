---
title: Yoto
description: Instructions on how to integrate Yoto players with Home Assistant.
ha_category:
  - Binary Sensor
  - Media Player
  - Number
  - Select
  - Sensor
  - Switch
  - Time
ha_iot_class: Cloud Push
ha_release: 2026.6
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@cdnninja'
  - '@piitaya'
ha_domain: yoto
ha_platforms:
  - binary_sensor
  - media_player
  - number
  - select
  - sensor
  - switch
  - time
ha_integration_type: hub
ha_dhcp: true
---

The **Yoto** {% term integration %} lets you control your [Yoto](https://yotoplay.com) audio players from Home Assistant. You can play and pause cards, change the volume, skip tracks, seek within a track, see what is currently playing, and browse your card library to start a specific card, chapter, or track. You can also monitor each player's battery level, what is loaded in the card slot, and its current day or night mode.

The integration talks to the official Yoto cloud over OAuth2 and receives playback updates over MQTT, so changes that happen on a player, including when it goes online or offline, show up in Home Assistant almost immediately.

With your players connected, you can fold them into your everyday routines. For example, you can start a calming card at bedtime or pause playback automatically when everyone leaves the house. You can also get a notification when a player's battery is running low.

## Supported devices

Any Yoto player that is linked to your Yoto family in the Yoto app is supported.

## Prerequisites

To use the integration, you need a Yoto account with at least one player linked in the Yoto app.

{% note %}
Home Assistant uses account linking provided by Nabu Casa for authenticating with Yoto. This service is free, does not require a Nabu Casa subscription, and is the preferred way of using this integration.

See the **Using custom application credentials** section below if you have the [cloud integration](/integrations/cloud) disabled.
{% endnote %}

{% details "Using custom application credentials" icon="mdi:account-key" %}

1. Sign in to the [Yoto developer dashboard](https://dashboard.yoto.dev/) with your Yoto account.
2. Create a new application. Pick any **Name** you like, for example `Home Assistant`.
3. For **Application Type**, select **Confidential Client**. Home Assistant runs as a server and stores the refresh token on your behalf.
4. Under **Allowed Callback URLs**, enter `https://my.home-assistant.io/redirect/oauth`.
5. Under **Scopes**, select all of the following:
    - `offline_access`
    - `family:view`
    - `family:devices:view`
    - `family:devices:control`
    - `family:devices:manage`
    - `family:library:view`
    - `user:content:view`
    - `user:icons:manage`
6. Accept the **Terms and Conditions** and **Data Privacy** statements, then select **Create Application**.
7. Open the application you just created and note the **Client ID** and **Client secret**. Add them as [Application Credentials](/integrations/application_credentials/) before starting the integration setup.

For more details, see the [Yoto Developers documentation](https://yoto.dev/get-started/start-here/).

{% enddetails %}

{% include integrations/config_flow.md %}

During setup, Home Assistant opens the Yoto authorization page so you can grant access. After you approve, Home Assistant creates one {% term device %} for every Yoto player in your family, each with its media player, sensors, and other {% term entity entities %}.

## Supported functionality

### Media player

The integration provides one media player entity per Yoto player. Each entity supports:

- Play, pause, and stop
- Skip to the previous or next track
- Seek to a position within the current track
- Set the volume directly, or step up and down in the 16 hardware steps the player uses
- Show the currently playing track title, the card title and author, and the card cover art as media artwork
- Browse your Yoto card library and start playback of a card, chapter, or track

Yoto players cannot be powered on or woken remotely. While a player is offline, its media player, sensors, and binary sensors show as unavailable. The day and night mode settings stay available, because they come from the Yoto cloud rather than the player.

To browse your Yoto card library, open the more-info dialog of the Yoto player and select the browse media button. From there, you can select a card, chapter, or track to start playback.

To start playback from a script or automation, call the [`media_player.play_media`](/integrations/media_player/#action-media_playerplay_media) action with `media_content_type: music` and a `yoto://` URI:

- `yoto://card/<card_id>` plays the card, honoring its own resume setting.
- `yoto://card/<card_id>/<chapter_key>` plays the chapter from its first track.
- `yoto://card/<card_id>/<chapter_key>/<track_key>` plays the track from the start.

The URI is case-sensitive. When picking a card in the media browser, the corresponding URI is the value passed to `media_content_id`.

```yaml
action: media_player.play_media
target:
  entity_id: media_player.yoto_player
data:
  media_content_type: "music"
  media_content_id: "yoto://card/abc123/01/02"
```

### Time

Yoto players can switch between a day display and a night display. Set when each mode starts:

- **Day mode start**: The time the player switches to day mode.
- **Night mode start**: The time the player switches to night mode.

### Numbers

Set the display brightness and volume limit for each mode:

- **Day mode brightness**: The display brightness in day mode, from 0% to 100%. Unavailable while day mode uses automatic brightness.
- **Night mode brightness**: The display brightness in night mode, from 0% to 100%. Unavailable while night mode uses automatic brightness.
- **Day mode maximum volume**: The highest volume the player can reach in day mode, from 0 to 16.
- **Night mode maximum volume**: The highest volume the player can reach in night mode, from 0 to 16.

### Selects

Set the player's ambient light color for each mode, picked from a fixed palette. Available on players with an ambient light:

- **Day mode color**: The ambient light color in day mode.
- **Night mode color**: The ambient light color in night mode.

### Switches

Turn the following player settings on or off:

- **Bluetooth pairing**: Enables Bluetooth so you can pair an audio device.
- **Maximum headphone volume**: Limits the volume when headphones are connected.
- **Day mode automatic brightness**: Automatically adjusts the display brightness in day mode (only available on players with a light sensor). Turning this off sets the brightness to 100%.
- **Night mode automatic brightness**: Automatically adjusts the display brightness in night mode (only available on players with a light sensor). Turning this off sets the brightness to 100%.

### Binary sensors

Each Yoto player also provides several binary sensors:

- **Charging**: whether the player's battery is charging.
- **Headphones**: whether headphones are connected to the player.
- **Bluetooth audio**: whether a Bluetooth audio device is connected to the player.

### Sensors

Each Yoto player also provides several sensors:

- **Battery**: the player's battery charge.
- **Card slot**: what is loaded in the player, such as a physical card or streaming content.
- **Day mode**: the player's current mode (day or night).

## Examples

Here are a few ways to use your Yoto players in automations.

### Play a card from a bedside button

Pair a wireless button with a player so a card starts on demand, for example a bedtime story at the press of a button by the bed. The easiest way to set this up is in the automation editor: add your button as the trigger, then add the action that plays the card. The exact trigger depends on your button. The example below uses a button that exposes an event entity. Replace the card ID with one from your own library by browsing it in the media browser and copying the `media_content_id` of the card you want.

```yaml
automation:
  - alias: "Play the bedtime card from the bedside button"
    triggers:
      - trigger: state
        entity_id: event.bedside_button
    actions:
      - action: media_player.play_media
        target:
          entity_id: media_player.yoto_player
        data:
          media_content_type: "music"
          media_content_id: "yoto://card/abc123"
```

### Set a later wake-up time on weekends

Each player has a **Day mode start** time entity that controls when it switches to day mode. This automation changes that time so the player lights up later on weekends. Just after midnight, it sets the day mode start to 8:00 AM on Saturday and Sunday, and back to 7:00 AM on the other days.

```yaml
automation:
  - alias: "Later wake-up on weekends"
    triggers:
      - trigger: time
        at: "00:01:00"
    actions:
      - if:
          - condition: time
            weekday:
              - sat
              - sun
        then:
          - action: time.set_value
            target:
              entity_id: time.yoto_player_day_mode_start
            data:
              time: "08:00:00"
        else:
          - action: time.set_value
            target:
              entity_id: time.yoto_player_day_mode_start
            data:
              time: "07:00:00"
```

### Notify when the battery is low

This automation sends a notification to your phone when a player's battery drops below 20%.

```yaml
automation:
  - alias: "Notify when the Yoto battery is low"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.yoto_player_battery
        below: 20
    actions:
      - action: notify.mobile_app_phone
        data:
          message: "The Yoto player battery is below 20%."
```

## Data updates

The integration updates each Yoto player's data in three ways:

- Media player and playback state are pushed live over MQTT, so play, pause, volume, and track changes appear in Home Assistant right away. A player going online or offline is pushed the same way, so its media player, sensors, and binary sensors switch to available or unavailable instantly.
- Sensor values are refreshed every minute, when the integration requests a status snapshot from each player.
- Configuration, such as the day and night mode settings, is refreshed from the Yoto cloud through {% term polling %} every 5 minutes. This is also when newly linked players are added.

## Known limitations

- Yoto players cannot be powered on or off from Home Assistant.

## Troubleshooting

### The media player and sensors show as unavailable

To save battery, a Yoto player turns itself off after a period of inactivity. While it is off, it disconnects from the Yoto cloud, so its media player, sensors, and binary sensors show as unavailable in Home Assistant. The day and night mode settings stay available. To bring the rest back, wake the player by pressing a button on it or inserting a card, or plug it into power to keep it awake.

### Home Assistant asks you to sign in again

Access to your Yoto account can expire or be revoked, for example if you change your Yoto password. When that happens, Home Assistant starts a reauthentication flow and shows a notification. Follow the prompts to sign in again and restore the connection.

### Playback controls do not respond

Yoto players cannot be powered on remotely, so playback actions have no effect while a player is off or disconnected. Wake the player by pressing a button on it or inserting a card, then try again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can also delete the developer application you created on the Yoto developer portal if you no longer need it.
