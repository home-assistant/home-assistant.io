---
title: Podcast Player
description: Instructions on how to add podcast feeds to Home Assistant.
ha_category:
  - Media source
  - Multimedia
ha_release: 2026.9
ha_iot_class: Cloud Polling
ha_domain: podcast_player
ha_config_flow: true
ha_codeowners:
  - '@armilancode'
ha_integration_type: service
ha_quality_scale: bronze
---

The **Podcast Player** {% term integration %} adds podcast RSS and Atom feeds to Home Assistant as media sources. You can browse episodes and send them to a media player without a podcast account or API key.

Each podcast feed is a separate integration entry. You can add the integration again to make more podcasts available under **Media** > **Podcasts**.

## Prerequisites

You need the full `http://` or `https://` URL of the podcast's RSS or Atom feed. A podcast website URL is not necessarily its feed URL. The feed must contain at least one episode with a playable audio enclosure.

The media player must be able to reach the episode URL provided by the podcast publisher.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Podcast feed URL:
  description: The full RSS or Atom feed URL for one podcast.
{% endconfiguration_basic %}

## Supported functionality

Podcast Player does not add any {% term entities %}. It adds the following functionality to Home Assistant's media browser:

- Multiple podcast feeds, configured as separate integration entries.
- Podcast and episode titles, artwork, and audio types read from the feed.
- Up to 250 playable episodes in the order supplied by each feed.
- Direct playback of an episode's audio enclosure on a media player.

To play an episode:

1. Go to **Media** > **Podcasts**.
2. Select a configured podcast and an episode.
3. Select the media player that should play the episode.

## Examples

You can use a podcast episode in an automation or script. In the automation editor, add the **Play media** action, select the target media player, and use the media picker to browse **Podcasts** and select an episode. The editor stores the episode's media source identifier for you.

For example, this can start a selected news podcast episode on a kitchen speaker as part of a morning automation.

## Data updates

The integration fetches a feed when Home Assistant sets up its config entry and whenever you open that podcast in the media browser. It does not poll feeds in the background.

## Known limitations

- Feed URLs containing embedded usernames or passwords are not supported.
- The media browser shows up to the first 250 playable episodes provided by each feed.
- Playback uses the publisher's direct episode URL. Publishers can impose geographic, network, or authentication restrictions that Home Assistant cannot bypass.
- The integration does not download episodes or track playback position, played status, or subscriptions with an external podcast service.

## Troubleshooting

### The podcast feed is rejected during setup

Confirm that the URL opens an RSS or Atom document rather than a regular web page. The feed must contain an episode with an audio enclosure. Private feeds that require credentials in the URL are not supported.

### An episode does not play on a media player

Open the episode URL on another device on the same network. If it works there, confirm that the target media player supports the episode's audio format and can access the internet. Some publishers block particular networks or devices.

## Removing the integration

Removing one entry removes that podcast from the media browser. Other configured podcast entries remain available.

{% include integrations/remove_device_service.md %}
