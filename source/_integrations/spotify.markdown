---
title: Spotify
description: Instructions on how to integrate Spotify into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.43
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: silver
ha_codeowners:
  - '@frenck'
ha_domain: spotify
---

The Spotify media player integration allows you to control [Spotify](https://www.spotify.com/) playback from Home Assistant.

## Prerequisites

- Spotify account
- Spotify application configured for Home Assistant (see [below](#create-a-spotify-application))

<div class='note'>
  Spotify integrated media controls (pause, play, next, etc.) require a Premium account.
  If you do not have a Premium account, the frontend will not show the controls.
</div>

### Create a Spotify application

- Login to [Spotify Developer](https://developer.spotify.com) via Dashboard.
- Visit the [My Applications](https://developer.spotify.com/my-applications/#!/applications) page.
- Select **Create An App**. Enter any name and description.
- Once your application is created, view it and copy your **Client ID** and **Client Secret**, which are used in the Home Assistant [configuration file below](#configuration).
- Enter the **Edit Settings** dialog of your newly-created application and add a *Redirect URI*:
  - If you are not using SSL: `http://<your_home_assistant_url_or_local_ip>:<port>/auth/external/callback`
  - If you are using SSL: `https://<your_home_assistant_url_or_local_ip>:<port>/auth/external/callback`
- Click **Save** after adding the URI.

<div class='note'>
  Your Home Assistant instance does not need to be exposed to the internet. It works just fine with local IP addresses.
</div>  

## Configuration

To add Spotify to Home Assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
spotify:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

Restart your Home Assistant instance before continuing with the next step.

{% configuration %}
client_id:
  description: Client ID from your Spotify Developer application.
  required: true
  type: string
client_secret:
  description: Client Secret from your Spotify Developer application.
  required: true
  type: string
{% endconfiguration %}

## Activating the Spotify integration

- Access Home Assistant using the URL that you used in the **Redirect URI** step above 
- Go to the **Configuration** page in the Home Assistant frontend.
- Click on **Integrations**.
- Click the **Add Integration** button in the bottom-right.
- Select "Spotify".
- Once the new Spotify tab opens, enter your Spotify credentials and allow Home Assistant to access your Spotify account.

<div class='note'>

  If you receive an `INVALID_CLIENT: Invalid redirect URI` error while trying to
  authenticate with your Spotify account, check the Redirect URI in
  the address bar after adding the new integration. Compare this value with the
  Redirect URI defined in the Spotify Developer Portal.

</div>

## Using multiple Spotify accounts

This integration supports multiple Spotify accounts at once. You don't need to
create another Spotify application in the Spotify Developer Portal and no
modification to the `configuration.yaml` file is needed. Multiple Spotify
accounts can be linked to a _single_ Spotify application.

To add an additional Spotify account to Home Assistant, go to the Spotify website and log out, then repeat _only_ the steps
in the [Activating the Spotify integration](#activating-the-spotify-integration) section. 

## Playing Spotify playlists

You can send playlists to Spotify using the `"media_content_type": "playlist"`, which is part of the
[media_player.play_media](/integrations/media_player/#service-media_playerplay_media) service, for example:

```yaml
# Example script to play playlist
script:
  play_jazz_guitar:
    sequence:
      - service: media_player.play_media
        data:
          entity_id: media_player.spotify
          media_content_id: 'https://open.spotify.com/playlist/5xddIVAtLrZKtt4YGLM1SQ?si=YcvRqaKNTxOi043Qn4LYkg'
          media_content_type: playlist
```

The `media_content_id` value can be obtained from the Spotify desktop app by clicking on the more options ("...") next to the album art picture, selecting "Share" and then "Copy Spotify URI" or "Copy Playlist Link" (also available in the Spotify phone and web app).

## Unsupported Devices

- **Sonos**: Although Sonos is a Spotify Connect device, it is not supported by the official Spotify API.
