---
title: Yoto
description: Instructions on how to integrate Yoto players with Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Cloud Push
ha_release: 2026.6
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@cdnninja'
  - '@piitaya'
ha_domain: yoto
ha_platforms:
  - media_player
ha_integration_type: hub
---

The **Yoto** {% term integration %} lets you control your [Yoto](https://yotoplay.com) audio players from Home Assistant. You can play and pause cards, change the volume, skip tracks, seek within a track, and see what is currently playing.

The integration talks to the official Yoto cloud over OAuth2 and receives playback updates over MQTT, so changes that happen on the player show up in Home Assistant almost immediately. Online and offline detection still relies on the cloud API and can lag by up to 5 minutes.

## Supported devices

Any Yoto player that is linked to your Yoto family in the Yoto app is supported.

## Prerequisites

To use the integration, you need:

- A Yoto account with at least one player linked in the Yoto app.
- Your own Yoto OAuth2 application credentials. Yoto does not yet provide shared credentials for Home Assistant, so you have to register your own developer application and copy the client ID and client secret into Home Assistant when prompted.

{% details "Generate a client ID and client secret" %}

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
7. Open the application you just created and note the **Client ID** and **Client secret**. You enter them in the next step.

For more details, see the [Yoto Developers documentation](https://yoto.dev/get-started/start-here/).

{% enddetails %}

{% include integrations/config_flow.md %}

During setup, Home Assistant asks for your Yoto **Client ID** and **Client secret** through the [Application Credentials](/integrations/application_credentials/) flow, then opens the Yoto authorization page so you can grant access. After you approve, Home Assistant creates one {% term device %} and one media player {% term entity %} for every Yoto player in your family.

## Supported functionality

The integration provides one media player entity per Yoto player. Each entity supports:

- Play, pause, and stop
- Skip to the previous or next track
- Seek to a position within the current track
- Set the volume directly, or step up and down in the 16 hardware steps the player uses
- Show the currently playing track title, the card title and author, and the card cover art as media artwork
- Show the player as _off_ when it is asleep or disconnected from the Yoto cloud

Yoto players cannot be powered on remotely. Home Assistant reports the player as _off_ when it is offline but cannot wake it up.

### Play media

When you use the [`media_player.play_media`](/integrations/media_player/#action-media_playerplay_media) action, pass the Yoto card identifier in `media_content_id` and set `media_content_type` to `music`. The action also requires `media_content_type`.

The `media_content_id` value supports two formats:

- A bare card ID. Playback starts from the beginning of the card.
- A structured ID in the form `<card_id>+<chapter_key>+<track_key>+<seconds_in>`. Each segment after the card ID is optional. Leave a segment empty to keep its default.

## Data updates

The integration receives real-time playback updates from each Yoto player over MQTT. To keep the reported status fresh even when the player has not changed state, the integration also requests a status snapshot from each player every 60 seconds.

The player's online or offline state comes from the Yoto cloud REST API, which the integration {% term polling polls %} every 5 minutes. A player that loses power or network can take up to that long to show as _off_ in Home Assistant.

## Known limitations

- The online and offline state of a player can lag by up to 5 minutes because the Yoto cloud only exposes this through polling.
- Yoto players cannot be powered on or off from Home Assistant.
- Browsing your card library from the media player UI is not supported yet. You need to know the card ID to start playback through the [`media_player.play_media`](/integrations/media_player/#action-media_playerplay_media) action.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can also delete the developer application you created on the Yoto developer portal if you no longer need it.
