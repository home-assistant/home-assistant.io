---
title: Kodi
description: Instructions on how to integrate Kodi into Home Assistant.
ha_category:
  - Media Player
  - Media Source
  - Notifications
ha_release: pre 0.7
ha_iot_class: Local Push
ha_codeowners:
  - '@OnFreund'
  - '@cgtobi'
ha_domain: kodi
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - media_player
  - notify
ha_integration_type: integration
---

The `kodi` platform allows you to control a [Kodi](https://kodi.tv/) multimedia system from Home Assistant.

The preferred way to set up the Kodi platform is through discovery, which requires an enabled [web interface](https://kodi.wiki/view/Web_interface) on your Kodi installation.

There is currently support for the following device types within Home Assistant:

- [Media Player](#configuration)
- [Notifications](#notifications)

{% include integrations/config_flow.md %}

If you previously had Kodi configured through `configuration.yaml`, it's advisable to remove it, and configure from the UI.
If you do not remove it, your configuration will be imported with the following limitations:
* Your turn on/off actions will not be imported. This functionality is now available through device triggers.
* You may have duplicate entities.
* Kodi must be on when Home Assistant is loading for the first time for the configuration to be imported.

### Turning On/Off

You can customize your turn on and off actions through automations. Simply use the relevant Kodi device triggers and your automation will be called to perform the `turn_on` or `turn_off` sequence; see the [Kodi turn on/off samples](#kodi-turn-onoff-samples) section for scripts that can be used.

These automations can be configured through the UI (see [Device Triggers](/docs/automation/trigger/#device-triggers) for automations).  If you prefer YAML, you'll need to get the device ID from the UI automation editor.  Automations would be of the form:

```yaml
automation:
  - id: kodi_turn_on
    alias: "Kodi: turn on"
    trigger:
      - platform: device
        device_id: !secret kodi_device_id
        domain: kodi
        entity_id: media_player.kodi
        type: turn_on
    action:
      - service: script.kodi_turn_on

  - id: kodi_turn_off
    alias: "Kodi: turn off"
    trigger:
      - platform: device
        device_id: !secret kodi_device_id
        domain: kodi
        entity_id: media_player.kodi
        type: turn_off
    action:
      - service: script.kodi_turn_off
```

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

The following scripts can be used in automations for turning on/off your Kodi instance; see [Turning on/off](#turning-onoff).  You could also simply use these sequences directly in the automations without creating scripts.

#### Turn on Kodi with Wake on LAN

With this configuration, when calling `media_player/turn_on` on the Kodi device, a _magic packet_ will be sent to the specified MAC address. To use this service, first you need to configuration the [`wake_on_lan`](/integrations/wake_on_lan) integration in Home Assistant, which is achieved simply by adding `wake_on_lan:` to your `configuration.yaml`.

```yaml
script:
  turn_on_kodi_with_wol:
    sequence:
      - service: wake_on_lan.send_magic_packet
        data:
          mac: aa:bb:cc:dd:ee:ff
          broadcast_address: 192.168.255.255
```

#### Turn off Kodi with API calls

Here are the equivalent ways to configure each of the old options to turn off Kodi (`quit`, `hibernate`, `suspend`, `reboot`, or `shutdown`):

- **Quit** method

```yaml
script:
  kodi_quit:
    sequence:
      - service: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: Application.Quit
```

- **Hibernate** method

```yaml
script:
  kodi_hibernate:
    sequence:
      - service: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Hibernate
```

- **Suspend** method

```yaml
script:
  kodi_suspend:
    sequence:
      - service: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Suspend
```

- **Reboot** method

```yaml
script:
  kodi_reboot:
    sequence:
      - service: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Reboot
```

- **Shutdown** method

```yaml
script:
  kodi_shutdown:
    sequence:
      - service: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
          method: System.Shutdown
```

#### Turn on and off the TV with the Kodi JSON-CEC Add-on

For Kodi devices running 24/7 attached to a CEC capable TV (OSMC / OpenElec and systems alike running in Rasperry Pi's, for example), this configuration enables the optimal way to turn on/off the attached TV from Home Assistant while Kodi is always active and ready:

```yaml
script:
  turn_on_kodi_with_cec:
  sequence:
    - service: kodi.call_method
      target:
        entity_id: media_player.kodi
      data:
        method: Addons.ExecuteAddon
        addonid: script.json-cec
        params:
          command: activate

  turn_off_kodi_with_cec:
    sequence:
      - service: media_player.media_stop
        target:
          entity_id: media_player.kodi
      - service: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
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
    alias: "Turn on the silly box"
    sequence:
      - alias: "TV on"
        service: media_player.turn_on
        target:
          entity_id: media_player.kodi
      - alias: "Play TV channel"
        service: media_player.play_media
        target:
          entity_id: media_player.kodi
        data:
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
    alias: "Turn on the silly box with random Firefighter Sam episode"
    sequence:
      - alias: "TV on"
        service: media_player.turn_on
        target:
          entity_id: media_player.kodi
      - service: media_player.play_media
        target:
          entity_id: media_player.kodi
        data:
          media_content_type: DIRECTORY
          media_content_id: special://profile/playlists/video/feuerwehrmann_sam.xsp
```

{% endraw %}

#### Trigger a Kodi video library update

```yaml
script:
  update_library:
    alias: "Update Kodi Library"
    sequence:
      - alias: "Call Kodi update"
        service: kodi.call_method
        target:
          entity_id: media_player.kodi
        data:
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
