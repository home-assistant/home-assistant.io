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
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The Spotify media player integration lets you control your Spotify
account playback and browse the [Spotify](https://www.spotify.com/) media
library from Home Assistant.

## Prerequisites

- An active Spotify account. A premium is not required, but recommended.
  Premium accounts can be controlled (pause, play, next, etc.), while
  free accounts can only be used for browsing and current playback status.
- Spotify compatible playback [source](#selecting-output-source) device
- A Spotify Developer application. Instructions for that are in
  the next step.
 
### Create a Spotify application

For Home Assistant to communicate with Spotify, we need to create
an application at Spotify using the Spotify Developer website. This will
provide you with the Spotify application credentials Home Assistant needs
to allow you to log in with your Spotify account.

1. Log in to the [Spotify Developer](https://developer.spotify.com) Dashboard.
2. Visit the [My Applications](https://developer.spotify.com/my-applications/#!/applications) page.
3. Click the **CREATE AN APP** button in the top right. Enter a name and
   description; feel free to use any name and description you like.

  ![Creating a Spotify Application](/images/integrations/spotify/create-spotify-application.png)

4. Check the box to agree with the requirements and click the **CREATE** button
   to confirm the application creation.
5. Spotify will now show the new application you have just created. Click on
   the **EDIT SETTINGS** button to configure it. You will  need to make a final
   adjustment to this new application for it to work correctly.

  ![Edit the Spotify Application settings](/images/integrations/spotify/edit-settings.png)

6. Next, we need to set the _"Redirect URI"_ to the following:
   
   `https://my.home-assistant.io/redirect/oauth`

   Please copy and paste the exact URL above. You **do not** have to change it.

  ![Add a redirect URI to the Spotify Application](/images/integrations/spotify/redirect-uri.png)

  Enter the above redirect URL into the _"Redirect URI"_  field (marked as 1).
  and be sure to press the **ADD** button (marked as 2).

7. Save the application settings by scrolling down the current page and
   clicking the **SAVE** button at the bottom left.

  ![Make sure to save the Spotify Application settings changes](/images/integrations/spotify/save-application.png)

8. You now have successfully created a Spotify application! Before we
   can start configuring Home Assistant, we need to grab the application
   credentials Home Assistant needs.

  Click on the **SHOW CLIENT SECRET** button to reveal the client secret.

  ![Show the client secret of the Spotify Application](/images/integrations/spotify/show-client-secret.png)

9. The _"Client ID"_ and _"Client Secret"_ are the two pieces of information
   that Home Assistant needs to communicate with Spotify and is what we
   call: Application credentials.

  ![Get the application credentials from the Spotify Application](/images/integrations/spotify/application-credentials.png)

   You will need the _"Client ID"_ and _"Client Secret"_ during the Spotify
   integration setup process in Home Assistant.

You can now continue with the next chapter to configure the Spotify integration
in Home Assistant.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`."

{% enddetails %}

{% include integrations/config_flow.md %}

## Using multiple Spotify accounts

This integration supports multiple Spotify accounts at once. You don't need to
create another Spotify application in the Spotify Developer Portal.
Multiple Spotify accounts can be linked to a _single_ Spotify application.

You will have to add those accounts into the **Users and Access** section of
your application in the Spotify Developer Portal.

To add an additional Spotify account to Home Assistant, go to the Spotify
website, log out, and then repeat _only_ the steps in the
[Configuration](#configuration) section. 

## Selecting output source

To play media Spotify first needs a device selected for audio output known as the `source`.

```yaml
# Example code to select an AV receiver as the output device
service: media_player.select_source
entity_id: media_player.spotify
data:
  source: "Denon AVR-X2000"
```

The Spotify API cannot initiate playback to a device not already known to the Spotify API. The source list of available devices can be found in the Details section of the Spotify Media Player Control and the `source_list` attribute in the {% my developer_states title="Developer Tools States" %}.

## Playing Spotify playlists

You can send playlists to Spotify using the `"media_content_type": "playlist"`, which is part of the
[media_player.play_media](/integrations/media_player/#service-media_playerplay_media) service, for example:

```yaml
# Example script to play playlist
script:
  play_jazz_guitar:
    sequence:
      - service: media_player.play_media
        target:
          entity_id: media_player.spotify
        data:
          media_content_id: "https://open.spotify.com/playlist/5xddIVAtLrZKtt4YGLM1SQ?si=YcvRqaKNTxOi043Qn4LYkg"
          media_content_type: playlist
```

The `media_content_id` value can be obtained from the Spotify desktop app by clicking on the more options ("...") next to the album art picture, selecting "Share" and then "Copy Spotify URI" or "Copy Playlist Link" (also available in the Spotify phone and web app). Alternatively a Spotify URI string (e.g. `spotify:playlist:5xddIVAtLrZKtt4YGLM1SQ`) can be supplied for the `media_content_id`.

## Unsupported Devices

- **Sonos**: Although Sonos is a Spotify Connect device, it is not supported by the official Spotify API.
