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
---

You can enable the Cast integration by going to the Integrations page inside the configuration panel.

## Setup

Support for mDNS discovery in your local network is mandatory. Make sure that your router has this feature enabled. This is even required if you entered the IP addresses of the Cast devices are manually in the configuration as mentioned below.

## Home Assistant Cast

Home Assistant has its own Cast application to show the Home Assistant UI on any Chromecast device.  You can use it by adding the [Cast entity row](/lovelace/entities/#cast) to your Lovelace UI, or by calling the `cast.show_lovelace_view` service. The service takes the path of a Lovelace view and an entity ID of a Cast device to show the view on. A `path` has to be defined in your Lovelace YAML for each view, as outlined in the [views documentation](/lovelace/views/#path). The `dashboard_path` is the part of the Lovelace UI URL that follows the defined `base_url` Typically "lovelace". The following is a full configuration for a script that starts casting the `downstairs` tab of the `lovelace-cast` path (note that `entity_id` is specified under `data` and not for the service call):

```yaml
cast_downstairs_on_kitchen:
  alias: Show Downstairs on kitchen
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

## Casting other apps

### YouTube

- `app_name`: `youtube`
- `media_id`: YouTube video ID

Optional:
- `enqueue`: Enqueue only
- `playlist_id`: Play video with `media_id` from this playlist

```yaml
'cast_youtube_to_my_chromecast':
  alias: Cast YouTube to My Chromecast
  sequence:
    - data:
        entity_id: media_player.my_chromecast
        media_content_type: cast
        media_content_id: '
          {
            "app_name": "youtube",
            "media_id": "dQw4w9WgXcQ"
          }'
      service: media_player.play_media
```

### [Supla](https://www.supla.fi/)

Example values to cast the item at https://www.supla.fi/audio/3601824

- `app_name`: `supla`
- `media_id`: Supla item ID

Optional:
- `is_live`: Item is a livestream

```yaml
'cast_supla_to_my_chromecast':
  alias: Cast supla to My Chromecast
  sequence:
    - data:
        entity_id: media_player.my_chromecast
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
  alias: Cast Plex to Chromecast
  sequence:
  - service: media_player.play_media
    data:
      entity_id: media_player.chromecast
      media_content_type: movie
      media_content_id: 'plex://{"library_name": "Movies", "title": "Groundhog Day"}'
```
### Play (almost) any kind of media

Chromecasts can play many kinds of modern [media (image/audio/video) formats](https://developers.google.com/cast/docs/media). As a rule of thumb, if a Chrome browser can play a media file a Chromecast will be able to handle that too.

The media needs to be accessible via HTTP(S). Chromecast devices does not support other protocols like DLNA or playback from an SMB file share.

You can play MP3 streams like netradios, FLAC files or videos from your local network with the `media_player.play_media` service, as long as the media is accessible via HTTP(S). You need to set the `media_content_id` to the media URL and `media_content_type` to a matching content type.

```yaml
# Play a video file from the local network:
service: media_player.play_media
data:
  entity_id: media_player.chromecast
  media_content_type: 'video'
  media_content_id: 'http://192.168.0.100/movies/sample-video.mkv'
```

```yaml
# Show a jpeg image:
service: media_player.play_media
data:
  entity_id: media_player.chromecast
  media_content_type: 'image/jpeg'
  media_content_id: 'http://via.placeholder.com/1024x600.jpg/0B6B94/FFFFFF/?text=Hello,%20Home%20Assistant!'
```

Extra media metadata (for example title, subtitle, artist or album name) can be passed in to the service and that will be shown on the Chromecast display.
For the possible metadata types and values check [google cast docs > MediaInformation > metadata field](https://developers.google.com/cast/docs/reference/messages#MediaInformation).

```yaml
# Play a movie from the internet, with extra metadata provided:
service: media_player.play_media
data:
  entity_id: media_player.chromecast
  media_content_type: 'video/mp4'
  media_content_id: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  extra: 
    metadata: 
      metadataType: 1
      title: 'Big Buck Bunny'
      subtitle: 'By Blender Foundation, Licensed under the Creative Commons Attribution license'
      images:
        - url: 'https://peach.blender.org/wp-content/uploads/watchtrailer.gif'
```

```yaml
# Play a netradio, with extra metadata provided:
service: media_player.play_media
data:
  entity_id: media_player.chromecast
  media_content_type: 'audio/mp3'
  media_content_id: 'http://stream.tilos.hu:8000/tilos' 
  extra: 
    metadata: 
      metadataType: 3
      title: 'Radio TILOS'
      artist: 'LIVE'
      images:
        - url: 'https://tilos.hu/images/kockalogo.png'
```

## Advanced use

### Manual configuration

By default, any discovered Cast device is added to Home Assistant. This can be restricted by supplying a list of allowed chrome casts.

```yaml
# Example configuration.yaml entry
cast:
  media_player:
    - uuid: "ae3be716-b011-4b88-a75d-21478f4f0822"
```

{% configuration %}
media_player:
  description: A list that contains advanced configuration options.
  required: false
  type: list
  keys:
    uuid:
      description: UUID of a Cast device to add to Home Assistant. Use only if you don't want to add all available devices. The device won't be added until discovered through mDNS. In order to find the UUID for your device use a mDNS browser or advanced users can use the following Python command (adjust friendly names as required) - python3 -c "import pychromecast; print(pychromecast.get_listed_chromecasts(friendly_names=["Living Room TV", "Bedroom TV", "Office Chromecast"]))"
      required: false
      type: string
    ignore_cec:
      description: >
        A list of Chromecasts that should ignore CEC data for determining the
        active input. [See the upstream documentation for more information.](https://github.com/balloob/pychromecast#ignoring-cec-data)
      required: false
      type: list
{% endconfiguration %}

### Docker and Cast devices and Home Assistant on different subnets

Cast devices can only be discovered and connected to if they are on the same subnet as Home Assistant.

When running Home Assistant Core in a [Docker container](/docs/installation/docker/), the command line option `--net=host` or the compose file equivalent `network_mode: host` must be used to put it on the host's network, otherwise the Home Assistant Core will not be able to connect to any Cast device.

Setups with cast devices on a different subnet than Home Assistant are not recommended and not supported.

If this is not possible, it's necessary to:

- Enable mDNS forwarding between the subnets.
- Enable source NAT to make requests from Home Assistant to the Chromecast appear to come from the same subnet as the Chromecast.
