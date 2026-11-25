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

You can play music on your speakers from Home Assistant, for example a radio station from the [Radio Browser](/integrations/radio_browser/) integration. Open the media player and select **Browse media**, or use the `media_player.play_media` action.

- After Home Assistant starts or a speaker is turned on, it can take up to 2 minutes before you can play media.
- Home Assistant and the speakers must be on the same network.
- If you have a stereo pair and cannot play media, add the other speaker of the pair to Home Assistant instead.
- Some radio stations cannot be played, because the speakers do not support their secure (HTTPS) stream.

## Turning off the device

The media player `turn off`  button and the `media_player.turn_off` action will turn off all the devices of the designated system. Exiting OFF mode is only possible by pressing a physical button on each device.
