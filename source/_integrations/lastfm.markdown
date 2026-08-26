---
title: Last.fm
description: Instructions on how to integrate Last.fm sensors into Home Assistant.
ha_category:
  - Social
ha_iot_class: Cloud Polling
ha_release: '0.20'
ha_domain: lastfm
ha_platforms:
  - sensor
ha_integration_type: service
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
---

The **Last.fm** {% term integration %} lets you monitor the listening activity of [Last.fm](https://www.last.fm/) users. It creates a sensor for each user you add, showing whether they are currently scrobbling and what they are listening to.

## Prerequisites

- A [Last.fm](https://www.last.fm/) account.
- A Last.fm API key. You can create one by registering an [API account](https://www.last.fm/api/account/create) on the Last.fm website. The API secret shown on that page is only needed to read listening information hidden in the Last.fm privacy settings.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key from your Last.fm API account."
API secret:
  description: "Optional. The API secret of your Last.fm API account. Needed to read listening information that is hidden in the Last.fm privacy settings."
Last.fm username:
  description: "Your Last.fm username. This is the main user for the integration and is used to look up your friends list in the next step."
{% endconfiguration_basic %}

After entering your API key and Last.fm username, you are asked to select additional Last.fm users to track. Your friends list is shown for convenience, but you can also enter any Last.fm username manually.

If you provided an API secret, the next step asks you to authorize Home Assistant with your Last.fm account. Open the shown link, select **Authorize** on Last.fm, and the setup continues automatically once the authorization is detected.

{% note %}
Last.fm only shares hidden listening data with the account that authorized the integration. If you have hidden your recent listening information in the [Last.fm privacy settings](https://www.last.fm/settings/privacy), authorize with the same account you want to track. Otherwise, the now-playing state and the `last_played` attribute remain unavailable.
{% endnote %}

## Configuration options

To add or remove tracked users after setup, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Last.fm** integration, and select **Configure**.

{% configuration_basic %}
Last.fm usernames:
  description: "The Last.fm users to track. You can select from your friends list or enter usernames manually."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration creates one sensor per tracked Last.fm user.

- **State**: The currently playing track, formatted as "Artist - Title". When the user is not listening, the state is "Not Scrobbling".
- **Entity picture**: The user's Last.fm avatar.

Each sensor also provides the following attributes:

- **`last_played`**: The last track the user scrobbled, formatted as "Artist - Title".
- **`play_count`**: The total number of tracks the user has scrobbled on Last.fm.
- **`top_played`**: The user's most played track, formatted as "Artist - Title".

## Data updates

The integration {% term polling polls %} Last.fm every 30 seconds for updated listening data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
