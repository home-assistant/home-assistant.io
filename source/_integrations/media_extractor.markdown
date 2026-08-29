---
title: Media extractor
description: Instructions on how to integrate the Media extractor into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Calculated
ha_release: 0.49
ha_quality_scale: internal
ha_domain: media_extractor
ha_integration_type: integration
ha_codeowners:
  - '@joostlek'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The **Media extractor** {% term integration %} gets a stream URL and sends it to a media player entity. This integration can extract entity specific streams if configured accordingly.

{% note %}
Media extractor doesn't transcode streams, it just tries to find a stream that matches the requested query.
{% endnote %}

{% include integrations/config_flow.md %}

{% include integrations/actions.md %}

## Format query

The query can be used to select the right media.
Query examples with explanations:

- **bestvideo**: Best video-only stream
- **best**: Best video + audio stream
- **bestaudio[ext=m4a]**: Best audio stream in M4A format
- **worst**: Worst video + audio stream
- **bestaudio[ext=m4a]/bestaudio[ext=ogg]/bestaudio**: Best M4A audio, otherwise best OGG audio and only then any best audio

More info about queries can be found [here](https://github.com/ytdl-org/youtube-dl#format-selection).

## Cookies

Some supported video services provide a better experience when you are logged in. For example, if you use Twitch Turbo or are subscribed to a Twitch streamer, logging in prevents the video stream from showing an "An ad is currently playing. Come back after the break." message until the ad is over. Other examples are private or purchased YouTube videos which you can only watch while logged in.
You can add a Netscape format cookie file in the Home Assistant configuration directory. The cookie file will be loaded each time a stream is loaded:

```config/media_extractor/cookies.txt```

To generate the cookie file, you can use a browser extension (like [Get Cookies.txt LOCALLY](https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)). If you want to create one manually, follow this specification: [https://curl.se/rfc/cookie_spec.html](https://curl.se/rfc/cookie_spec.html).
