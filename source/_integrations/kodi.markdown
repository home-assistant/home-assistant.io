---
title: Kodi
description: Instructions on how to integrate Kodi into Home Assistant.
ha_category:
  - Notifications
  - Media Player
ha_release: pre 0.7
ha_iot_class: Local Push
ha_codeowners:
  - '@armills'
ha_domain: kodi
---

The `kodi` platform allows you to control a [Kodi](https://kodi.tv/) multimedia system from Home Assistant.

The preferred way to set up the Kodi platform is by enabling the [discovery component](/integrations/discovery/) which requires enabled [web interface](https://kodi.wiki/view/Web_interface) on your Kodi installation.

There is currently support for the following device types within Home Assistant:

- [Media Player](#configuration)
- [Notifications](#notifications)

## Configuration

In case the discovery does not work, or you need specific configuration variables, you can add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: kodi
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The host name or address of the device that is running XBMC/Kodi.
  required: true
  type: string
port:
  description: The HTTP port number.
  required: false
  type: integer
  default: 8080
tcp_port:
  description: The TCP port number. Used for WebSocket connections to Kodi.
  required: false
  type: integer
  default: 9090
name:
  description: The name of the device used in the frontend.
  required: false
  type: string
proxy_ssl:
  description: Connect to Kodi with HTTPS and WSS. Useful if Kodi is behind an SSL proxy.
  required: false
  type: boolean
  default: false
username:
  description: The XBMC/Kodi HTTP username.
  required: false
  type: string
password:
  description: The XBMC/Kodi HTTP password.
  required: false
  type: string
turn_on_action:
  description: Home Assistant script sequence to call when turning on.
  required: false
  type: list
turn_off_action:
  description: Home Assistant script sequence to call when turning off.
  required: false
  type: list
enable_websocket:
  description: Enable websocket connections to Kodi via the TCP port. The WebSocket connection allows Kodi to push updates to Home Assistant and removes the need for Home Assistant to poll. If websockets don't work on your installation this can be set to `false`.
  required: false
  type: boolean
  default: true
timeout:
  description: Set timeout for connections to Kodi. Defaults to 5 seconds.
  required: false
  type: integer
  default: 5
{% endconfiguration %}

### Services

#### Service `kodi.add_to_playlist`

Add music to the default playlist (i.e., playlistid=0).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the Kodi entities where to add the media. |
| `media_type` | yes | Media type identifier. It must be one of SONG or ALBUM. |
| `media_id` | no | Unique Id of the media entry to add (`songid` or `albumid`). If not defined, `media_name` and `artist_name` are needed to search the Kodi music library. |
| `media_name` | no| Optional media name for filtering media. Can be 'ALL' when `media_type` is 'ALBUM' and `artist_name` is specified, to add all songs from one artist. |
| `artist_name` | no | Optional artist name for filtering media. |

#### Service `kodi.call_method`

Call a [Kodi JSON-RPC API](https://kodi.wiki/?title=JSON-RPC_API) method with optional parameters. Results of the Kodi API call will be redirected in a Home Assistant event: `kodi_call_method_result`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the Kodi entities where to run the API method. |
| `method` | yes | Name of the Kodi JSON-RPC API method to be called. |
| any other parameter | no | Optional parameters for the Kodi API call. |

### Event triggering

When calling the `kodi.call_method` service, if the Kodi JSON-RPC API returns data, when received by Home Assistant it will fire a `kodi_call_method_result` event on the event bus with the following `event_data`:

```yaml
entity_id: "<Kodi media_player entity_id>"
result_ok: <boolean>
input: <input parameters of the service call>
result: <data received from the Kodi API>
```

### Kodi turn on/off samples

With the `turn_on_action` and `turn_off_action` parameters you can run any combination of Home Assistant actions to turn on/off your Kodi instance. Here are a few examples of this usage, including the **migration instructions for the old `turn_off_action` list of options**.

#### Turn on Kodi with Wake on LAN

With this configuration, when calling `media_player/turn_on` on the Kodi device, a _magic packet_ will be sent to the specified MAC address. To use this service, first you need to configuration the [`wake_on_lan`](/integrations/wake_on_lan) integration in Home Assistant, which is achieved simply by adding `wake_on_lan:` to your `configuration.yaml`.

```yaml
media_player:
  - platform: kodi
    host: 192.168.0.123
    turn_on_action:
      - service: wake_on_lan.send_magic_packet
        data:
          mac: aa:bb:cc:dd:ee:ff
          broadcast_address: 192.168.255.255
```

#### Turn off Kodi with API calls

Here are the equivalent ways to configure each of the old options to turn off Kodi (`quit`, `hibernate`, `suspend`, `reboot`, or `shutdown`):

- **Quit** method (before was `turn_off_action: quit`)

```yaml
media_player:
  - platform: kodi
    host: 192.168.0.123
    turn_off_action:
      service: kodi.call_method
      data:
        entity_id: media_player.kodi
        method: Application.Quit
```

- **Hibernate** method (before was `turn_off_action: hibernate`)

```yaml
media_player:
  - platform: kodi
    host: 192.168.0.123
    turn_off_action:
      service: kodi.call_method
      data:
        entity_id: media_player.kodi
        method: System.Hibernate
```

- **Suspend** method (before was `turn_off_action: suspend`)

```yaml
media_player:
  - platform: kodi
    host: 192.168.0.123
    turn_off_action:
      service: kodi.call_method
      data:
        entity_id: media_player.kodi
        method: System.Suspend
```

- **Reboot** method (before was `turn_off_action: reboot`)

```yaml
media_player:
  - platform: kodi
    host: 192.168.0.123
    turn_off_action:
      service: kodi.call_method
      data:
        entity_id: media_player.kodi
        method: System.Reboot
```

- **Shutdown** method (before was `turn_off_action: shutdown`)

```yaml
media_player:
  - platform: kodi
    host: 192.168.0.123
    turn_off_action:
      service: kodi.call_method
      data:
        entity_id: media_player.kodi
        method: System.Shutdown
```

#### Turn on and off the TV with the Kodi JSON-CEC Add-on

For Kodi devices running 24/7 attached to a CEC capable TV (OSMC / OpenElec and systems alike running in Rasperry Pi's, for example), this configuration enables the optimal way to turn on/off the attached TV from Home Assistant while Kodi is always active and ready:

```yaml
media_player:
  - platform: kodi
    host: 192.168.0.123
    turn_on_action:
      service: kodi.call_method
      data:
        entity_id: media_player.kodi
        method: Addons.ExecuteAddon
        addonid: script.json-cec
        params:
          command: activate
    turn_off_action:
    - service: media_player.media_stop
      data:
        entity_id: media_player.kodi
    - service: kodi.call_method
      data:
        entity_id: media_player.kodi
        method: Addons.ExecuteAddon
        addonid: script.json-cec
        params:
          command: standby
```

<div class='note'>

This example and the following requires to have the [script.json-cec](https://github.com/joshjowen/script.json-cec) plugin installed on your Kodi player. It'll also expose the endpoints standby, toggle and activate without authentication on your Kodi player. Use this with caution.

</div>

### Kodi services samples

#### Simple script to turn on the PVR in some channel as a time function

{% raw %}
```yaml
script:
  play_kodi_pvr:
    alias: Turn on the silly box
    sequence:
      - alias: TV on
        service: media_player.turn_on
        data:
          entity_id: media_player.kodi
      - alias: Play TV channel
        service: media_player.play_media
        data_template:
          entity_id: media_player.kodi
          media_content_type: "CHANNEL"
          media_content_id: >
            {% if (now().hour < 14) or ((now().hour == 14) and (now().minute < 50)) %}
              10
            {% elif (now().hour < 16) %}
              15
            {% elif (now().hour < 20) %}
              2
            {% elif (now().hour == 20) and (now().minute < 50) %}
              10
            {% elif (now().hour == 20) or ((now().hour == 21) and (now().minute < 15)) %}
              15
            {% else %}
              10
            {% endif %}
```
{% endraw %}

#### Simple script to play a smart playlist

{% raw %}
```yaml
script:
  play_kodi_smp:
    alias: Turn on the silly box with random Firefighter Sam episode
    sequence:
      - alias: TV on
        service: media_player.turn_on
        data:
          entity_id: media_player.kodi
      - service: media_player.play_media
        data:
          entity_id: media_player.kodi
          media_content_type: DIRECTORY
          media_content_id: special://profile/playlists/video/feuerwehrmann_sam.xsp
```
{% endraw %}

#### Trigger a Kodi video library update

```yaml
script:
  update_library:
    alias: Update Kodi Library
    sequence:
      - alias: Call Kodi update
        service: kodi.call_method
        data:
          entity_id: media_player.kodi
          method: VideoLibrary.Scan
```

## Notifications

The `kodi` notifications platform allows you to send messages to your [Kodi](https://kodi.tv/) multimedia system from Home Assistant.

To add Kodi to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: kodi
    name: NOTIFIER_NAME
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: Name displayed in the frontend. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  type: string
host:
  description: The host name or address of the device that is running Kodi.
  required: true
  type: string
port:
  description: The HTTP port number.
  required: false
  default: 8080
  type: integer
proxy_ssl:
  description: Connect to Kodi with HTTPS. Useful if Kodi is behind an SSL proxy.
  required: false
  default: "`false`"
  type: boolean
username:
  description: The XBMC/Kodi HTTP username.
  required: false
  type: string
password:
  description: The XBMC/Kodi HTTP password.
  required: false
  type: string
{% endconfiguration %}

### Script example

```yaml
kodi_notification:
  sequence:
  - service: notify.NOTIFIER_NAME
    data:
      title: "Home Assistant"
      message: "Message to KODI from Home Assistant!"
      data:
        displaytime: 20000
        icon: "warning"
```

#### Message variables

{% configuration %}
title:
  description: Title that is displayed on the message.
  required: false
  type: string
message:
  description: Message to be displayed.
  required: true
  type: string
data:
  description: Configure message properties
  required: false
  type: map
  keys:
    icon:
      description: "Kodi comes with 3 default icons: `info`, `warning` and `error`, a URL to an image is also valid."
      required: false
      default: "`info`"
      type: string
    displaytime:
      description: Length in milliseconds the message stays on screen.
      required: false
      default: "`10000` ms"
      type: integer
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
