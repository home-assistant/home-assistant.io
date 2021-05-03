---
title: Google Cast
description: Instructions on how to integrate Google Cast into Home Assistant.
ha_category:
  - Media Player
featured: true
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: cast
ha_codeowners:
  - '@emontnemery'
ha_zeroconf: true
---

{% include integrations/config_flow.md %}

Support for mDNS discovery in your local network is mandatory for automatic discovery. Make sure that your router has this feature enabled. If mDNS does not work in your network, the IP addresses of the Cast devices can be manually entered in the configuration as mentioned below.

{% include integrations/option_flow.md %}
{% configuration_basic %}
Known hosts:
  description: "A comma-separated list of hostnames or IP-addresses of cast devices, use if mDNS discovery is not working"
Allowed UUIDs:
  description: A comma-separated list of UUIDs of Cast devices to add to Home Assistant. **Use only if you don't want to add all available devices.** The device won't be added until discovered through either mDNS or if it's included in the list of known hosts. In order to find the UUID for your device use a mDNS browser or advanced users can use the following Python command (adjust friendly names as required) - `python3 -c "import pychromecast; print(pychromecast.get_listed_chromecasts(friendly_names=['Living Room TV', 'Bedroom TV', 'Office Chromecast']))`. This option is only visible if advanced mode is enabled in your user profile.
Ignore CEC:
  description: A comma-separated list of Chromecasts that should ignore CEC data for determining the
        active input. [See the upstream documentation for more information](https://github.com/home-assistant-libs/pychromecast#ignoring-cec-data). This option is only visible if advanced mode is enabled in your user profile.
{% endconfiguration_basic %}

## Home Assistant Cast

Home Assistant has its own Cast application to show the Home Assistant UI on any Chromecast device.  You can use it by adding the [Cast entity row](/lovelace/entities/#cast) to your Lovelace UI, or by calling the `cast.show_lovelace_view` service. The service takes the path of a Lovelace view and an entity ID of a Cast device to show the view on. A `path` has to be defined in your Lovelace YAML for each view, as outlined in the [views documentation](/lovelace/views/#path). The `dashboard_path` is the part of the Lovelace UI URL that follows the defined `base_url` Typically "lovelace". The following is a full configuration for a script that starts casting the `downstairs` tab of the `lovelace-cast` path (note that `entity_id` is specified under `data` and not for the service call):

```yaml
cast_downstairs_on_kitchen:
  alias: "Show Downstairs on kitchen"
  sequence:
    - data:
        dashboard_path: lovelace
        entity_id: media_player.kitchen
        view_path: downstairs
      service: cast.show_lovelace_view
```
<div class='note'>

Home Assistant Cast requires your Home Assistant installation to be accessible via `https://`. If you're using Home Assistant Cloud, you don't need to do anything. Otherwise you must make sure that you have configured the `external_url` in your [configuration](/docs/configuration/basic).

</div>

## Playing media

### Using the built in media player app (Default Media Receiver)

Chromecasts can play many kinds of modern [media (image/audio/video) formats](https://developers.google.com/cast/docs/media) using the built in app Default Media Receiver. As a rule of thumb, if a Chrome browser can play a media file a Chromecast will be able to handle that too.

The media needs to be accessible via HTTP(S). Chromecast devices do not support other protocols like DLNA or playback from an SMB file share.

You can play MP3 streams like net radios, FLAC files or videos from your local network with the `media_player.play_media` service, as long as the media is accessible via HTTP(S). You need to set the `media_content_id` to the media URL and `media_content_type` to a matching content type.

```yaml
# Play a video file from the local network:
service: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: "video"
  media_content_id: "http://192.168.0.100/movies/sample-video.mkv"
```

```yaml
# Show a jpeg image:
service: media_player.play_media
target:
  entity_id: media_player.chromecast
data:
  media_content_type: "image/jpeg"
  media_content_id: "http://via.placeholder.com/1024x600.jpg/0B6B94/FFFFFF/?text=Hello,%20Home%20Assistant!"
```

Extra media metadata (for example title, subtitle, artist or album name) can be passed into the service and that will be shown on the Chromecast display.
For the possible metadata types and values check [Google cast documentation > MediaInformation > metadata field](https://developers.google.com/cast/docs/reference/messages#MediaInformation).

```yaml
# Play a movie from the internet, with extra metadata provided:
service: media_player.play_media
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
service: media_player.play_media
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

### BubbleUPNP

The BubbleUPNP app has similar functionality to the built in Default Media Receiver app, and can be used as a backup if the default app fails to play the media.

#### Media parameters

Mandatory:

- `app_name`: `bubbleupnp`
- `media_id`: The URL to play

Optional:

- `media_type`: Media type, e.g. `video/mp4`, `audio/mp3`, `image/jpeg`, defaults to `video/mp4`.

#### Example:

```yaml
'cast_bubbleupnp_to_my_chromecast':
  alias: "Cast a video to My Chromecast using BubbleUPNP"
  sequence:
    - target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "bubbleupnp",
            "media_id": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "media_type": "video/mp4"
          }'
      service: media_player.play_media
```

### YouTube

#### Media parameters

Mandatory:

- `app_name`: `youtube`
- `media_id`: YouTube video ID

Optional:

- `enqueue`: Enqueue only
- `playlist_id`: Play video with `media_id` from this playlist

#### Example:

```yaml
'cast_youtube_to_my_chromecast':
  alias: "Cast YouTube to My Chromecast"
  sequence:
    - target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "youtube",
            "media_id": "dQw4w9WgXcQ"
          }'
      service: media_player.play_media
```

### [Supla](https://www.supla.fi/)

Example values to cast the item at <https://www.supla.fi/audio/3601824>

- `app_name`: `supla`
- `media_id`: Supla item ID


Optional:
- `is_live`: Item is a livestream

#### Example:

```yaml
'cast_supla_to_my_chromecast':
  alias: "Cast supla to My Chromecast"
  sequence:
    - target:
        entity_id: media_player.my_chromecast
      data:
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "supla",
            "media_id": "3601824"
          }'
      service: media_player.play_media
```

### Plex

To cast media directly from a configured Plex server, set the fields [as documented in the Plex integration](/integrations/plex/#service-play_media) and prepend the `media_content_id` with `plex://`:

```yaml
'cast_plex_to_chromecast':
  alias: "Cast Plex to Chromecast"
  sequence:
  - service: media_player.play_media
    target:
      entity_id: media_player.chromecast
    data:
      media_content_type: movie
      media_content_id: 'plex://{"library_name": "Movies", "title": "Groundhog Day"}'
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
