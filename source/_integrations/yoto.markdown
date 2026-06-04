---
title: Yoto
description: Instructions on how to integrate Yoto players with Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Cloud Push
ha_release: 2026.6
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@cdnninja'
  - '@piitaya'
ha_domain: yoto
ha_platforms:
  - media_player
ha_integration_type: hub
ha_dhcp: true
---

The **Yoto** {% term integration %} lets you control your [Yoto](https://yotoplay.com) audio players from Home Assistant. You can play and pause cards, change the volume, skip tracks, seek within a track, see what is currently playing, and browse your card library to start a specific card, chapter, or track.

The integration talks to the official Yoto cloud over OAuth2 and receives playback updates over MQTT, so changes that happen on the player show up in Home Assistant almost immediately. Online and offline detection still relies on the cloud API and can lag by up to 5 minutes.

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

During setup, Home Assistant opens the Yoto authorization page so you can grant access. After you approve, Home Assistant creates one {% term device %} and one media player {% term entity %} for every Yoto player in your family.

## Supported functionality

The integration provides one media player entity per Yoto player. Each entity supports:

- Play, pause, and stop
- Skip to the previous or next track
- Seek to a position within the current track
- Set the volume directly, or step up and down in the 16 hardware steps the player uses
- Show the currently playing track title, the card title and author, and the card cover art as media artwork
- Show the player as _off_ when it is asleep or disconnected from the Yoto cloud
- Browse your Yoto card library and start playback of a card, chapter, or track

Yoto players cannot be powered on remotely. Home Assistant reports the player as _off_ when it is offline but cannot wake it up.

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

## Data updates

The integration receives real-time playback updates from each Yoto player over MQTT. To keep the reported status fresh even when the player has not changed state, the integration also requests a status snapshot from each player every 60 seconds.

The player's online or offline state comes from the Yoto cloud REST API, which the integration {% term polling polls %} every 5 minutes. A player that loses power or network can take up to that long to show as _off_ in Home Assistant.

## Known limitations

- The online and offline state of a player can lag by up to 5 minutes because the Yoto cloud only exposes this through polling.
- Yoto players cannot be powered on or off from Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can also delete the developer application you created on the Yoto developer portal if you no longer need it.
