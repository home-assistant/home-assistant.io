---
title: Google Cast
description: Instructions on how to integrate Google Cast into Home Assistant.
ha_category:
  - Media player
featured: true
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: cast
ha_codeowners:
  - '@emontnemery'
ha_zeroconf: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

{% include integrations/config_flow.md %}

Support for mDNS discovery in your local network is mandatory for automatic discovery. Make sure that your router has this feature enabled. If mDNS does not work in your network, the IP addresses of the Cast devices can be manually entered in the configuration as mentioned below.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Known hosts:
  description: "A comma-separated list of hostnames or IP-addresses of cast devices, use if mDNS discovery is not working"
Allowed UUIDs:
  description: A comma-separated list of UUIDs of Cast devices to add to Home Assistant. **Use only if you don't want to add all available devices.** The device won't be added until discovered through either mDNS or if it's included in the list of known hosts. In order to find the UUID for your device use a mDNS browser or advanced users can use the following Python command (adjust friendly names as required) - `python3 -c "import pychromecast; print(pychromecast.get_listed_chromecasts(friendly_names=['Living Room TV', 'Bedroom TV', 'Office Chromecast']))"`. This option is only visible if advanced mode is enabled in your user profile.
Ignore CEC:
  description: A comma-separated list of Chromecasts that should ignore CEC data for determining the active input. [See the upstream documentation for more information](https://github.com/home-assistant-libs/pychromecast#ignoring-cec-data). This option is only visible if advanced mode is enabled in your user profile.
{% endconfiguration_basic %}

## Home Assistant Cast

Home Assistant has its own Cast application to show the Home Assistant UI on any Chromecast device.  You can use it by adding the [Cast entity row](/dashboards/entities/#cast) to your dashboards, or by calling the `cast.show_lovelace_view` action. The action takes the path of a dashboard view and an entity ID of a Cast device to show the view on. A `path` has to be defined in your dashboard's YAML for each view, as outlined in the [views documentation](/dashboards/views/#path). The `dashboard_path` is the part of the dashboard URL that follows the defined `base_url`, typically "`lovelace`". The following is a full configuration for a script that starts casting the `downstairs` tab of the `lovelace-cast` path (note that `entity_id` is specified under `data` and not for the action):

```yaml
cast_downstairs_on_kitchen:
  alias: "Show Downstairs on kitchen"
  sequence:
    - action: cast.show_lovelace_view
      data:
        dashboard_path: lovelace-cast
        entity_id: media_player.kitchen
        view_path: downstairs
```

{% important %}
Home Assistant Cast requires your Home Assistant installation to be accessible via `https://`. If you're using Home Assistant Cloud, you don't need to do anything. Otherwise you must make sure that you have configured the `external_url` in your [configuration](/integrations/homeassistant/#configuration-variables).
{% endimportant %}

## Playing media

{% note %}

Chromecasts generally ignore DNS servers from DHCP and will instead use Google's DNS servers, 8.8.8.8 and 8.8.4.4. This means media URLs must either be specifying the IP-address of the server directly, e.g. `http://192.168.1.1:8123/movie.mp4`, or be publicly resolvable, e.g. `http://homeassistant.internal.mydomain.com:8123/movie.mp4` where `homeassistant.internal.mydomain.com` resolves to `192.168.1.1`. A hostname which can't be publicly resolved, e.g. `http://homeassistant.local:8123/movie.mp4` will fail to play.

This is important when casting TTS or local media sources; the cast integration will cast such media from the `external_url` if [configured](/integrations/homeassistant/#editing-the-general-settings-in-yaml), otherwise from the Home Assistant Cloud if configured, otherwise from the [`internal_url`](/integrations/homeassistant/#editing-the-general-settings-in-yaml). Note that the Home Assistant Cloud will not be used if an `external_url` is configured.

{% endnote %}

### Using the built in media player app (Default Media Receiver)

Chromecasts can play many kinds of modern [media (image/audio/video) formats](https://developers.google.com/cast/docs/media) using the built in app Default Media Receiver. As a rule of thumb, if a Chrome browser can play a media file a Chromecast will be able to handle that too.

The media needs to be accessible via HTTP(S). Chromecast devices do not support other protocols like DLNA or playback from an SMB file share.

You can play MP3 streams like net radios, FLAC files or videos from your local network with the `media_player.play_media` action, as long as the media is accessible via HTTP(S). You need to set the `media_content_id` to the media URL and `media_content_type` to a matching content type.

```yaml
# Play a video file from the local network:
action: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: "video"
  media_content_id: "http://192.168.0.100/movies/sample-video.mkv"
```

```yaml
# Show a jpeg image:
action: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: "image/jpeg"
  media_content_id: "http://via.placeholder.com/1024x600.jpg/0B6B94/FFFFFF/?text=Hello,%20Home%20Assistant!"
```

Extra media metadata (for example title, subtitle, artist or album name) can be passed into the action and that will be shown on the Chromecast display.
For the possible metadata types and values check [Google cast documentation > MediaInformation > metadata field](https://developers.google.com/cast/docs/reference/messages#MediaInformation).

```yaml
# Play a movie from the internet, with extra metadata provided:
action: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: "video/mp4"
  media_content_id: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  extra: 
    metadata: 
      metadataType: 1
      title: "Big Buck Bunny"
      subtitle: "By Blender Foundation, Licensed under the Creative Commons Attribution license"
      images:
        - url: "https://peach.blender.org/wp-content/uploads/watchtrailer.gif"
```

```yaml
# Play a netradio, with extra metadata provided:
action: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: "audio/mp3"
  media_content_id: "http://stream.tilos.hu:8000/tilos" 
  extra: 
    metadata: 
      metadataType: 3
      title: "Radio TILOS"
      artist: "LIVE"
      images:
        - url: "https://tilos.hu/images/kockalogo.png"
```

### Casting with other apps

It's possible to play with other apps than the default media receiver.
To do so, `media_content_type` should be set to `cast`, and `media_content_id` should be a JSON dict with parameters for the app, including the app name.

### [BBC iPlayer](https://www.bbc.co.uk/iplayer)

This app doesn't retrieve its own metadata, so if you want the cast interface or media player card to show titles and/or images you will have to provide the data yourself. See the examples below.

Note: Media ID is NOT the 8 digit alphanumeric in the URL, it can be found by right-clicking the playing video. E.g., [this episode](https://www.bbc.co.uk/iplayer/episode/b09w7fd9/bitz-bob-series-1-1-castle-makeover) shows:

|          |                                 |
| -------- | ------------------------------- |
| 2908kbps | dash (mf_cloudfront_dash_https) |
| b09w70r2 | 960x540                         |

With b09w70r2 being the `media_id`

#### Media parameters

Mandatory:

- `app_name`: `bbciplayer`
- `media_id`: Item ID

Optional:

- `is_live`: Item is a live stream

#### Example

Example values to cast [this episode](https://www.bbc.co.uk/iplayer/episode/b09w7fd9/bitz-bob-series-1-1-castle-makeover)

```yaml
  alias: "Cast BBC iPlayer to My Chromecast"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "bbciplayer",
            "media_id": "b09w70r2"
          }'
        extra: 
          metadata: 
            metadataType: 0
            title: "Bitz & Bob"
            subtitle: "Castle Makeover"
            images:
              - url: "https://ichef.bbci.co.uk/images/ic/1280x720/p07j4m3r.jpg"
```

### [BBC Sounds](https://www.bbc.co.uk/sounds)

This app doesn't retrieve its own metadata, so if you want the cast interface or media player card to show titles and/or images you will have to provide the data yourself. See the examples below.

#### Media parameters

Mandatory:

- `app_name`: `bbcsounds`
- `media_id`: Item ID

Optional:

- `is_live`: Item is a live stream

#### Example

Example values to cast [BBC Radio 1](https://www.bbc.co.uk/sounds/play/live:bbc_radio_one)

```yaml
  alias: "Cast BBC Sounds to My Chromecast"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "bbcsounds",
            "media_id": "bbc_radio_one",
            "is_live": true
          }'
        extra: 
          metadata: 
            metadataType: 0
            title: "Radio 1"
            images:
              - url: "https://sounds.files.bbci.co.uk/2.3.0/networks/bbc_radio_one/background_1280x720.png"
```

### BubbleUPNP

The BubbleUPNP app has similar functionality to the built in Default Media Receiver app, and can be used as a backup if the default app fails to play the media.

#### Media parameters

Mandatory:

- `app_name`: `bubbleupnp`
- `media_id`: The URL to play

Optional:

- `media_type`: Media type, e.g. `video/mp4`, `audio/mp3`, `image/jpeg`, defaults to `video/mp4`.

#### Example

```yaml
'cast_bubbleupnp_to_my_chromecast':
  alias: "Cast a video to My Chromecast using BubbleUPNP"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "bubbleupnp",
            "media_id": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "media_type": "video/mp4"
          }'
```

### [NRK Radio](https://radio.nrk.no)

#### Finding Media IDs

Media ID can be found in the URL, e.g:
- Live channel: <https://radio.nrk.no/direkte/p1>, media ID is `p1`
- Podcast: <https://radio.nrk.no/podkast/tazte_priv/l_8457deb0-4f2c-4ef3-97de-b04f2c6ef314>, media ID is `l_8457deb0-4f2c-4ef3-97de-b04f2c6ef314`
- On-demand program: <https://radio.nrk.no/serie/radiodokumentaren/sesong/201011/MDUP01004510>, media ID is `MDUP01004510`

#### Media parameters

- `app_name`: `nrkradio`
- `media_id`: NRK Radio media ID

#### Example

Example values to cast the item at <https://radio.nrk.no/podkast/tazte_priv/l_8457deb0-4f2c-4ef3-97de-b04f2c6ef314>

```yaml
'cast_nrkradio_to_chromecast':
  alias: "Cast NRK Radio to Chromecast"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "nrkradio",
            "media_id": "l_8457deb0-4f2c-4ef3-97de-b04f2c6ef314"
          }'
```

### [NRK TV](https://tv.nrk.no)

#### Finding Media IDs

 - Live programs: ID is in the URL, e.g. for <https://tv.nrk.no/direkte/nrk1>, the media ID is `nrk1`
 - On-demand programs: ID is found by clicking share button, e.g. for <https://tv.nrk.no/serie/uti-vaar-hage/sesong/2/episode/2> the share link is `https://tv.nrk.no/se?v=OUHA43000207` and the media ID is `OUHA43000207`

#### Media parameters

- `app_name`: `nrktv`
- `media_id`: NRK TV media ID

#### Example

Example values to cast the item at <https://tv.nrk.no/serie/uti-vaar-hage/sesong/2/episode/2>

```yaml
'cast_nrktv_to_chromecast':
  alias: "Cast NRK TV to Chromecast"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "nrktv",
            "media_id": "OUHA43000207"
          }'
```

### Plex

To cast media directly from a configured Plex server, set the fields [as documented in the Plex integration](/integrations/plex/#action-media_playerplay_media) and prepend the `media_content_id` with `plex://`:

```yaml
'cast_plex_to_chromecast':
  alias: "Cast Plex to Chromecast"
  sequence:
  - action: media_player.play_media
    target:
      entity_id: media_player.chromecast
    data:
      media_content_type: movie
      media_content_id: 'plex://{"library_name": "Movies", "title": "Groundhog Day"}'
```

### [Supla](https://www.supla.fi/)

Note: Media ID is NOT the 8 digit alphanumeric in the URL, it can be found by right-clicking the playing audio clip. E.g., [this episode](https://www.bbc.co.uk/sounds/play/p009ycqy) shows:

|          |                                         |
| -------- | --------------------------------------- |
| 128bps   | dash (mf_cloudfront_nonbidi_dash_https) |
| p009ycqz |                                         |

With p009ycqz being the `media_id`

#### Media parameters

Mandatory:

- `app_name`: `supla`
- `media_id`: Supla item ID

Optional:

- `is_live`: Item is a livestream

#### Example

Example values to cast the item at <https://www.supla.fi/audio/3601824>

```yaml
'cast_supla_to_my_chromecast':
  alias: "Cast supla to My Chromecast"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "supla",
            "media_id": "3601824"
          }'
```

### YouTube

#### Media parameters

Mandatory:

- `app_name`: `youtube`
- `media_id`: YouTube video ID

Optional:

- `enqueue`: Enqueue only
- `playlist_id`: Play video with `media_id` from this playlist. Note that only providing `playlist_id` but no `media_id` does not work.

#### Example

```yaml
'cast_youtube_to_my_chromecast':
  alias: "Cast YouTube to My Chromecast"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "youtube",
            "media_id": "dQw4w9WgXcQ"
          }'
```

## Troubleshooting automatic discovery

mDNS relies on UDP multicast, which may fail for various reasons. If none of the tips in this section helps, the recommended solution is to ensure all cast devices have static IPs assigned to them and configure a list of known hosts.

### Zeroconf configuration

The Google Cast integration relies on the [Zeroconf integration](/integrations/zeroconf) for mDNS discovery. The Zeroconf integration has some configuration options which impact mDNS routing.

### Cast devices and Home Assistant on different subnets

Cast devices can only be automatically discovered if they are on the same subnet as Home Assistant because mDNS packets are not routed across subnets.
Automatic discovery in setups with cast devices on a different subnet than Home Assistant is not recommended and not supported.
If it is not possible, it's necessary to either enable mDNS forwarding between the subnets or to configure a list of known hosts.

### Home Assistant Container

When running the [Home Assistant Container](/installation/linux#install-home-assistant-container) in Docker, make sure it is running with host network mode. Running without it is not supported by the Home Assistant project, and will cause this integration to be unable to discover to your Cast devices.
