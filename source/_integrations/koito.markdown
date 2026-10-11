---
title: Koito
description: Monitor listening statistics and now-playing information from a Koito server.
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: bronze
ha_codeowners:
  - "@ryanep"
ha_domain: koito
ha_release: "2026.11"
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
---

The **Koito** {% term integration %} connects to your self-hosted [Koito](https://github.com/gabehf/Koito)
server. It provides listening statistics, the leading artist/album/track, and
now-playing information.

## Prerequisites

Your server must expose Koito's web API and be reachable from Home Assistant.
To obtain your API key:

1. Open your Koito server in a browser.
2. Open **Settings** using the settings icon and sign in on the **Account** tab.
3. Open the **API Keys** tab and copy the generated API key, or create a dedicated
   key for Home Assistant.

This integration only makes read requests, but the key itself can also allow
writes to your server. Keep it private.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Koito URL:
  description: "The base URL of your server, including its port if needed. For example, `https://koito.example.com`. Do not enter an API endpoint."
API key:
  description: The API key generated in Koito. The field is masked.
{% endconfiguration_basic %}

## Supported functionality

### Sensors

- Plays, minutes listened, unique tracks, unique albums, and unique artists.
- Top artist, top album, and top track. Each exposes only the leading result.
- Currently playing track, displayed as `Artist - Track`, with separate `artist`
  and `title` attributes.

Top album and track entities expose separate `title` and `artists` attributes.
Artwork is available through `entity_picture` and `image_url` when supplied by
Koito. Missing ranked items have an unknown state.

### Binary sensors

- Now playing, indicating whether Koito reports playback as active.

## Data updates and limitations

Home Assistant polls every minute. Statistics and rankings use all-time data.
Each refresh requests summary (including rankings) and now-playing concurrently.
Server-requested backoff postpones the next scheduled refresh.
The integration provides no polling/timeframe options or custom actions.

Now playing is cached by Koito for the track's duration when known, or 10 minutes
by default. It can therefore remain on after playback stops. Home Assistant
also needs to wait for its next poll. A transport or payload failure of the optional now-playing
endpoint makes the binary sensor unavailable and the track sensor unknown;
other statistics remain available. Authentication and server backoff failures
apply to the whole refresh. A rejected API key triggers reauthentication.

## Troubleshooting

For connection errors, verify that Home Assistant can reach the server URL and
that the server exposes the summary and now-playing endpoints. For an
authentication error, generate a replacement key and complete the reauthentication
form on the integrations page. Requests and the complete refresh time out after
10 seconds; a playback-only deadline preserves summary data already received.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration removes its entities from Home Assistant. It does not
change your Koito listening history or revoke the server API key.
