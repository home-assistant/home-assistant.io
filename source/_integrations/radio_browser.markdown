---
title: Radio Browser
description: Instructions on how to integrate Radio Browser into Home Assistant.
ha_category:
  - Media source
  - Multimedia
ha_release: 2022.3
ha_iot_class: Cloud Polling
ha_domain: radio_browser
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_integration_type: service
---

The **Radio Browser** {% term integration %} brings the worldwide directory of internet radio stations from [Radio Browser](https://www.radio-browser.info) into Home Assistant. It adds Radio Browser as a media source, so you can browse thousands of stations and play them on your media players, like a speaker in the kitchen or a Cast device in the living room.

There is no account and no API key to set up. The directory is free and community-maintained.

## Prerequisites

To see stations near you under **Local stations**, set your home location in Home Assistant under {% my general title="**Settings** > **System** > **General**" %}. Browsing all other categories works without it.

{% include integrations/config_flow.md %}

There is nothing to configure. The Radio Browser integration has no options, and you can add it only once.

## Supported functionality

Radio Browser does not add any {% term entities %}. Instead, it adds a media source you can browse from the media browser and from the **Play Media** action.

To listen to a station, go to **Media** > **Radio Browser**, then pick a station and choose the player to send it to:

![Starting the Radio Browser](/images/integrations/radio_browser/radio_browser.png)

When you open Radio Browser, you can find stations in several ways:

- **Popular**: The most listened-to stations across the whole directory.
- **By Category**: Stations grouped by genre and topic tags, such as news, jazz, or classical.
- **By Language**: Stations grouped by the language they broadcast in.
- **Local stations**: Stations broadcasting close to your Home Assistant location.
- **Country list**: Stations grouped per country.

## Examples

You can also start a station from an automation or script. The easiest way is to create the automation in the UI: add the **Play Media** action, browse the Radio Browser directory, and select a station. The station identifier is filled in for you. This lets you, for example, start your favorite station on the kitchen speaker every morning.

If you prefer to write the automation in YAML, you need the station's UUID. To find it:

1. Open the [Radio Browser website](https://www.radio-browser.info).
2. Search for the station you want.
3. Select the station to open its details page. The UUID is shown on that page and is also part of the station's URL.

Then use the UUID in the `media_content_id`:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.YOUR_MEDIA_PLAYER
data:
  media_content_id: >-
    media-source://radio_browser/963ccae5-0601-11e8-ae97-52543be04c81
  media_content_type: audio/mpeg
```

See the [media player](/integrations/media_player/) documentation for more options.

## Data updates

Radio Browser does not poll in the background. The station directory is fetched live from the Radio Browser service each time you browse it, so you always see the current listings.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
