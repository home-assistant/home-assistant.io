---
description: Instructions on how to integrate Devialet devices into Home Assistant.
ha_release: 2023.11
ha_domain: devialet
---

The **Devialet** {% term integration %} lets you control your [Devialet](https://www.devialet.com) wireless speakers from Home Assistant.

{% important %}

- For a stereo setup, only one of the speakers need to be configured.
- Make sure your Devialet firmware version is 2.16.1 or later. Otherwise, expect functions not to work.
- Assigning a fixed IP address to your speakers is highly recommended.

{% endimportant %}

{% include integrations/config_flow.md %}

## Tested models

Known supported devices:

- Phantom I
- Phantom II

## Playing media

You can play media on your speakers, for example a radio station from the [Radio Browser](/integrations/radio_browser/) integration, from the media browser or with the `media_player.play_media` action.

Home Assistant plays media through the UPnP renderer of the speaker. After Home Assistant starts or the speaker comes online, it can take up to 2 minutes before Home Assistant has found the renderer and the media player offers media playback.

- Home Assistant and the speakers must be on the same network, so Home Assistant can discover the renderer.
- In a stereo setup, only the system leader of the pair can play media. If the media player does not offer media playback, set up the other speaker of the pair instead.
- The speakers cannot open HTTPS streams. Home Assistant then tries the same stream over HTTP. Stations that only offer HTTPS cannot be played.
- To play media from Home Assistant itself, such as local media, the speaker must be able to reach Home Assistant over HTTP.

## Turning off the device

The media player `turn off`  button and the `media_player.turn_off` action will turn off all the devices of the designated system. Exiting OFF mode is only possible by pressing a physical button on each device.
