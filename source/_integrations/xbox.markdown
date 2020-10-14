---
title: Xbox
description: Instructions on how to set up Xbox devices in Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Cloud Polling
ha_release: 0.117
ha_codeowners:
  - '@hunterjm'
ha_domain: xbox
---

The Xbox integration allows you to control Xbox One (or newer) consoles from Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Media Player](#media-player)
- [Remote](#remote)
- [Media Source](#media-source)

Home Assistant authenticates with Xbox Live through OAuth2 using the Home Assistant account linking service. Set up the integration through **Configuration -> Integrations -> Xbox**.

## Manual Configuration

If you prefer not to use the Home Assistant account linking service, you may manually configure a local implementation using the following steps:

- Register a new application in [Azure AD](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
  - Name your app
  - Select "Personal Microsoft accounts only" under supported account types
  - For Redirect URI, add: `<INTERNAL_HOME_ASSISTANT_URL>/auth/external/callback`
  Use your internal Home Assistant URL, if you didn't configure one manually, use your local IP address. Examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.
- Copy your Application (client) ID for later use
- On the App Page, navigate to "Certificates & secrets"
  - Generate a new client secret and save for later use

Add the client id and secret to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
xbox:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

Finish setup in the UI through **Configuration -> Integrations -> Xbox**.

{% configuration %}
client_id:
  description: The `client id` from your Azure AD Application.
  required: true
  type: string
client_secret:
  description: The `client secret` from your Azure AD Application.
  required: true
  type: string
{% endconfiguration %}

## Media Player

The Xbox media player platform will create Media Player entities for each console linked to your Microsoft account. These entities will display the active app and playback controls as well as a media browser implementation allowing you to launch any installed application.

### Service `play_media`

Launches an application on the Xbox console using the application's product ID. Also supports "Home" and "TV" to navigate to the dashboard or Live TV respectively.

You can find Product IDs by using the **Developer Tools -> Events** tab and listening to the `call_service` event. In a new browser tab, navigate to the media browser for your console and click on an App/Game to see the product ID in the event.

| Service data attribute | Description                           |
| ---------------------- | --------------------------------------|
| `entity_id`            | `entity_id` of the Xbox media player  |
| `media_content_id`   | "Home"/"TV"/{product_id}                |
| `media_content_type` | Any Value                               |

##### Examples:

```yaml
entity_id: media_player.xboxone
media_content_type: ""
media_content_id: "Home"
```

```yaml
entity_id: media_player.xboxone
media_content_type: ""
media_content_id: "9WZDNCRFJ3TJ" # Netflix
```

## Remote

The Xbox remote platform will create Remote entities for each console linked to your Microsoft Account. These entities will allow you to turn on/off and send controller or text input to your console.

### Service `send_command`

| Service data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | no       | `entity_id` of the Xbox remote.                                                      |
| `command`              | no       | List of the controller commands or text input to be sent.<br />Commands: A, B, X, Y, Up, Down, Left, Right |
| `num_repeats`          | yes      | Number of times to repeat the commands.                                |
| `delay_secs`           | yes      | Interval in seconds between one send and another.                      |

Example 1: Send a single command

```yaml
entity_id: media_player.xboxone
command: "A"
```

Example 2: Send a command repeatedly

```yaml
entity_id: media_player.xboxone
command: "A"
num_repeats: 20
```

Example 3: Send a sequence of commands

```yaml
entity_id: media_player.xboxone
command:
  - Right
  - Right
  - A
delay_sec: 0.1
```

## Media Source

The Xbox media source platform allows you to use the Media Browser panel to view both your own, and community, gameclips or screenshots for games that you have installed on any of your consoles. As with any other media source integration, you are also able to send these clips to supported media players like Chromecast.
