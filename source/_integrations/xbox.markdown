---
title: Xbox
description: Instructions on how to set up Xbox devices in Home Assistant.
ha_category:
  - Binary sensor
  - Media player
  - Media source
  - Remote
ha_iot_class: Cloud Polling
ha_release: 0.117
ha_codeowners:
  - '@hunterjm'
  - '@tr4nt0r'
ha_domain: xbox
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - image
  - media_player
  - remote
  - sensor
ha_integration_type: hub
ha_ssdp: true
ha_dhcp: true
---

The **Xbox** {% term integration %} allows you to connect Home Assistant to the **Xbox Network**.

## About Xbox Network

Xbox Network is Microsoft’s online gaming and entertainment service for Xbox consoles and Windows PCs. You can use Xbox Network for multiplayer gaming. It offers social features like friends and parties, cloud saves, and digital game purchases. Xbox Network also provides access to apps and online services. The platform connects players, manages profiles, and powers online functionality across the Xbox ecosystem.

## How you can use this integration

The Home Assistant Xbox {% term integration %} lets you monitor and control Xbox One (and newer) consoles and also keep track of your favorite friends on Xbox Network. It exposes your console’s status and activity, and provides friend-related presence and activity information you can use in dashboards and automations.

## Prerequisites

- You must sign in with a **non-child Xbox account** (age 18+).
- To enable the media player and remote entities, make sure **remote features** are turned on in **Settings** > **Devices & connections** > **Remote features** on your Xbox.
- Home Assistant connects to **Xbox Network** via OAuth2 using Home Assistant Cloud’s account-linking service. To use this, your {% term "configuration.yaml" %} must include either `cloud:` or `default_config:`.

{% include integrations/config_flow.md %}

## Track online status of friends

The **Xbox integration** allows tracking the online status, activity, and other information of your friends. To add a friend, go to {% my integration domain="xbox" title="**Settings** > **Devices & services** > **Xbox**" %} and select **{% icon "mdi:plus" %} Add friend**.

Once added, a new device will appear with the same set of entities available for your own Xbox account, allowing you to track your friend’s activity.

## Supported devices

- Xbox One (S/X)
- Xbox Series S/X

## Media player

The Xbox media player platform will create media player entities for each console linked to your Microsoft account. These entities will display the active app and playback controls as well as a media browser implementation, allowing you to launch any installed application.

### Action: Play media

The `play_media` action launches an application on the Xbox console using the application's product ID. Also supports "Home" to navigate to the dashboard.

You can find Product IDs using the **{% my developer_events title="Developer Tools > Events" %}** tab and listening to the `call_service` event. In a new browser tab, navigate to the media browser for your console and click on an App/Game to see the product ID in the event.

| Data attribute         | Description                           |
| ---------------------- | --------------------------------------|
| `entity_id`            | `entity_id` of the Xbox media player  |
| `media_content_id`     | "Home"/{product_id}                   |
| `media_content_type`   | Any Value                             |

#### Examples

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

### Action: Send command

The `send_command` action sends controller commands or text input to the Xbox console.

| Data attribute | Optional | Description                                                       |
| ---------------------- | -------- | --------------------------------------------------------- |
| `entity_id`            | no       | `entity_id` of the Xbox remote.                           |
| `command`              | no       | List of the controller commands or text input to be sent. |
| `num_repeats`          | yes      | Number of times to repeat the commands.                   |
| `delay_secs`           | yes      | Interval in seconds between one send and another.         |

**Available commands**: `A`, `B`, `X`, `Y`, `Up`, `Down`, `Left`, `Right`, `Menu`, `View`, `Nexus`, `WakeUp`, `TurnOff`, `Reboot`, `Mute`, `Unmute`, `Play`, `Pause`, `Next`, `Previous`,`GoHome`, `GoBack`, `ShowGuideTab`, `ShowGuide`

#### Examples

```yaml
entity_id: remote.xboxone
command: "A"
```

```yaml
entity_id: remote.xboxone
command: "A"
num_repeats: 20
```

```yaml
entity_id: remote.xboxone
command:
  - Right
  - Right
  - A
delay_sec: 0.1
```

### Picture elements card

Below is a picture elements card that can be added to a dashboard to provide an Xbox controller interface in your frontend. It utilizes the services detailed above. Replace `remote.xboxone` and `media_player.xboxone` with the names of your entities and enjoy! Courtesy of [@SeanPM5](https://github.com/SeanPM5) and [@hunterjm](https://github.com/hunterjm).

<p class='img'>
  <img src='/images/integrations/xbox/xbox_picture_entity.png' alt='Screenshot showing Xbox Controller in a dashboard.'>
  Screenshot showing Xbox Controller in a dashboard.
</p>

{% details "Show YAML configuration" %}

```yaml
type: picture-elements
image: >-
  data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjEwIiBoZWlnaHQ9IjkwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogPG1ldGFkYXRhPgogIDxyZGY6UkRGPgogICA8Y2M6V29yayByZGY6YWJvdXQ9IiI+CiAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgIDxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz4KICAgIDxkYzp0aXRsZS8+CiAgIDwvY2M6V29yaz4KICA8L3JkZjpSREY+CiA8L21ldGFkYXRhPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGlkPSJjYW52YXNfYmFja2dyb3VuZCIgeD0iLTEiIHk9Ii0xIiB3aWR0aD0iODAyIiBoZWlnaHQ9IjYwMiIgZmlsbD0ibm9uZSIvPgogPC9nPgogPGNpcmNsZSBjeD0iOTkuMTgiIGN5PSIyMCIgcj0iMTQiIGZpbGw9IiNmZmYiLz4KIDxjaXJjbGUgY3g9IjE0OC4xOCIgY3k9IjU0IiByPSIxMC41IiBmaWxsPSIjMzMzIiBzdHJva2U9IiNmZmYiLz4KIDxwYXRoIGQ9Im0xNTMuMTYgNTkuMzVjLTAuMTEgMC4yMDYtMC4zNCAwLjMyNS0wLjYyNyAwLjMyNWgtMS4zNjhjLTAuNDU1IDAtMC45ODQtMC4yODktMS4yMy0wLjY3MmwtMS43MDEtMi42NTdjLTAuMDMtMC4wNDUtMC4wNTUtMC4wNjItMC4wNjItMC4wNjQgNGUtMyAyZS0zIC0wLjAyMSAwLjAxOC0wLjA1MSAwLjA2NWwtMS43MDkgMi42NTdjLTAuMjQ3IDAuMzgzLTAuNzc2IDAuNjcxLTEuMjMgMC42NzFoLTEuMzUzYy0wLjI4OCAwLTAuNTE2LTAuMTE4LTAuNjI4LTAuMzI0LTAuMTExLTAuMjA2LTAuMDg1LTAuNDYzIDAuMDczLTAuNzAzbDIuOTc2LTQuNTQ1YTAuNzA0IDAuNzA0IDAgMCAwIDJlLTMgLTAuNjc2bC0yLjY0LTQuMDc0Yy0wLjE1NS0wLjI0MS0wLjE4LTAuNDk4LTAuMDY5LTAuNzA0IDAuMTEzLTAuMjA2IDAuMzQyLTAuMzI0IDAuNjMtMC4zMjRoMS4yODZjMC40NTcgMCAwLjk4NCAwLjI5MiAxLjIyNSAwLjY4bDEuNDkgMi4zODVhMC4yMyAwLjIzIDAgMCAwIDAuMDQ4IDAuMDU3YzNlLTMgLThlLTMgMC4wMi0wLjAyNCAwLjA0LTAuMDU3bDEuNDU1LTIuMzhjMC4yMzktMC4zOSAwLjc2NC0wLjY4NSAxLjIyMi0wLjY4NWgxLjI2N2MwLjI4NyAwIDAuNTE2IDAuMTE4IDAuNjI4IDAuMzI0IDAuMTEzIDAuMjA2IDAuMDg5IDAuNDYyLTAuMDY3IDAuNzA0bC0yLjY1OCA0LjE1YTAuNjk5IDAuNjk5IDAgMCAwIDVlLTMgMC42NzVsMi45NyA0LjQ3YzAuMTU5IDAuMjQgMC4xODcgMC40OTYgMC4wNzYgMC43MDJ6IiBmaWxsPSIjMmQ4OWVmIi8+CiA8Y2lyY2xlIGN4PSIxNjguMTgiIGN5PSI3NCIgcj0iMTAuNSIgZmlsbD0iIzMzMyIgc3Ryb2tlPSIjZmZmIi8+CiA8cGF0aCBkPSJtMTczLjU3IDc5LjM2MmMtMC4xMzQgMC4yLTAuMzY4IDAuMzE0LTAuNjQyIDAuMzE0aC0xLjExM2MtMC40OCAwLTAuOTc1LTAuMzQtMS4xNDctMC43ODlsLTAuNDktMS4yNzVhMC42NDIgMC42NDIgMCAwIDAtMC41MzItMC4zNjVoLTMuMDM2YTAuNjIgMC42MiAwIDAgMC0wLjUyIDAuMzY0bC0wLjQ2IDEuMjY3Yy0wLjE2MyAwLjQ0Ny0wLjY2MyAwLjc5OC0xLjE0IDAuNzk4aC0xLjA1M2MtMC4yNzMgMC0wLjUwOC0wLjExNS0wLjY0NC0wLjMxMy0wLjEzNi0wLjE5OS0wLjE1Ny0wLjQ1OS0wLjA1OC0wLjcxM2wzLjcxNi05LjU0YTEuMjkzIDEuMjkzIDAgMCAxIDEuMTUtMC43ODZoMS4wNDdjMC40OCAwIDAuOTc2IDAuMzM2IDEuMTU0IDAuNzgxbDMuODIgOS41NDVjMC4xMDQgMC4yNTMgMC4wODUgMC41MTMtMC4wNSAwLjcxMnptLTUuNDY3LTcuMjU3LTAuOTI2IDIuNTQyYy0wLjAyIDAuMDU1LTAuMDE4IDAuMDk1LThlLTMgMC4xMDkgMC4wMSAwLjAxMyAwLjA0NiAwLjAzIDAuMTA0IDAuMDNoMS42ODFjMC4wNjcgMCAwLjA5Ny0wLjAxOCAwLjEwMy0wLjAyOCA3ZS0zIC0wLjAxMSAwLjAxNC0wLjA0NS0wLjAxLTAuMTA3eiIgZmlsbD0iIzVkYzIxZSIvPgogPGNpcmNsZSBjeD0iMTg4LjE4IiBjeT0iNTQiIHI9IjEwLjUiIGZpbGw9IiMzMzMiIHN0cm9rZT0iI2ZmZiIvPgogPHBhdGggZD0ibTE5My41NCA1OC4xMThhMy40MiAzLjQyIDAgMCAxLTEuMTEgMS4zMThjLTAuNDY3IDAuMzI3LTEuMDQ2IDAuNTMzLTEuNzIyIDAuNjA3LTAuNDE1IDAuMDQzLTEuMzc1IDAuMDctMi44NTUgMC4wOGgtMy4yNzZjLTAuNTUxIDAtMS0wLjQ0OC0xLTF2LTEwLjI0NWMwLTAuNTUyIDAuNDQ5LTEgMS0xaDMuOTYyYzAuOTQ1IDAgMS42MzQgMC4wMzkgMi4xMDYgMC4xMTkgMC40OTYgMC4wODQgMC45NDcgMC4yNjMgMS4zNCAwLjUzIDAuMzk4IDAuMjc1IDAuNzMgMC42MzYgMC45ODYgMS4wNzQgMC4yNjcgMC40NTQgMC40MDIgMC45NjcgMC40MDIgMS41MjMgMCAwLjYwNi0wLjE2NSAxLjE2OS0wLjQ5MSAxLjY3M2EzLjA2IDMuMDYgMCAwIDEtMC42OTIgMC43NThsLTAuMDIzIDAuMDE3IDAuMDE4IDAuMDFjMC40NTQgMC4yMjQgMC44MyAwLjUyOSAxLjEyIDAuOTA1IDAuNDIyIDAuNTUzIDAuNjM3IDEuMjA3IDAuNjM3IDEuOTQ4YTMuNzkgMy43OSAwIDAgMS0wLjQwMSAxLjY4NHptLTMuNDM3LTIuODk2Yy0wLjE5NS0wLjA2OS0wLjY5NC0wLjE1LTEuOTY4LTAuMTVoLTEuMjJhMC4zNCAwLjM0IDAgMCAwLTAuMzQgMC4zNHYxLjc1OWMwIDAuMTg4IDAuMTUzIDAuMzQgMC4zNCAwLjM0aDEuNDk3YzEuMDE4IDAgMS4zOTgtMC4wMzQgMS41MzctMC4wNjMgMC4yODQtMC4wNTMgMC41MDItMC4xNyAwLjY3Mi0wLjM2IDAuMTYzLTAuMTg0IDAuMjQzLTAuNDM1IDAuMjQzLTAuNzYzIDAtMC4yODMtMC4wNjMtMC41MS0wLjE5My0wLjY5OWExLjEwNyAxLjEwNyAwIDAgMC0wLjU2OC0wLjQwNHptLTMuMTg4LTIuNzM4aDAuODY1YzAuODk1IDAgMS40NTQtMC4wMTMgMS42NjEtMC4wMzcgMC4zMjItMC4wMzggMC41NzQtMC4xNDcgMC43NDktMC4zMiAwLjE2Ni0wLjE2NyAwLjI0Ny0wLjM4NyAwLjI0Ny0wLjY3MiAwLTAuMTM2LTAuMDE3LTAuMjYtMC4wNTItMC4zNjctMC4wNTEtMC4xNi0wLjI5LTAuNDIyLTAuNDQ3LTAuNDg4LTAuMTEtMC4wNDctMC4yNC0wLjA4LTAuMzktMC4wOTgtMC4yMTMtMC4wMjUtMC44NzMtMC4wMzctMS45NTgtMC4wMzdoLTAuNjc0YTAuMzQgMC4zNCAwIDAgMC0wLjM0IDAuMzR2MS4zMzljMCAwLjE4OCAwLjE1MiAwLjM0IDAuMzQgMC4zNHoiIGZpbGw9IiNlMTEiLz4KIDxjaXJjbGUgY3g9IjE2OC4xOCIgY3k9IjM0IiByPSIxMC41IiBmaWxsPSIjMzMzIiBzdHJva2U9IiNmZmYiLz4KIDxwYXRoIGQ9Im0xNzMuMTMgMjkuMzUzLTMuMjY5IDUuMTZjLTAuMTQ5IDAuMjM2LTAuMjggMC42ODctMC4yOCAwLjk2NXYzLjI0OWEwLjk1IDAuOTUgMCAwIDEtMC45NDggMC45NDhoLTAuOTE2YTAuOTUgMC45NSAwIDAgMS0wLjk0OS0wLjk0OHYtMy4yNjRjMC0wLjI3OS0wLjEzLTAuNzI5LTAuMjgtMC45NjRsLTMuMjU0LTUuMTQ2Yy0wLjE1Mi0wLjI0My0wLjE3Ni0wLjUtMC4wNjItMC43MDUgMC4xMTMtMC4yMDUgMC4zNDMtMC4zMjMgMC42MjktMC4zMjNoMS4yOTNjMC40NiAwIDAuOTgzIDAuMjk3IDEuMjE5IDAuNjkybDEuODgzIDMuMTY3YzAuMDEzIDAuMDIgMC4wMjMgMC4wMzUgMC4wMzMgMC4wNDUgNGUtMyAtMC4wMSAwLjAxMy0wLjAyNCAwLjAyNS0wLjA0NGwxLjg0NC0zLjE2M2MwLjIzMi0wLjM5OCAwLjc1NC0wLjY5NyAxLjIxNS0wLjY5N2gxLjI1MmMwLjI4NyAwIDAuNTE2IDAuMTE4IDAuNjI5IDAuMzI0IDAuMTE0IDAuMjA1IDAuMDkgMC40NjItMC4wNjQgMC43MDR6IiBmaWxsPSIjZmZjNDBkIi8+CiA8ZyBmaWxsPSIjMzMzIj4KICA8cGF0aCBkPSJtMzYuMzk3IDQ2LjY5YzAgMC42MDQgMC40OSAxLjA5NCAxLjA5MyAxLjA5NGgxMi4xOXYxMi40MzJoLTEyLjE5Yy0wLjYwMyAwLTEuMDkzIDAuNDktMS4wOTMgMS4wOTN2MTIuMTkxaC0xMi40MzR2LTEyLjE5YzAtMC42MDQtMC40OS0xLjA5NC0xLjA5My0xLjA5NGgtMTIuMTl2LTEyLjQzMmgxMi4xOWMwLjYwMyAwIDEuMDkzLTAuNDkgMS4wOTMtMS4wOTN2LTEyLjE5MWgxMi40MzR6IiBzdHJva2U9IiNmZmYiLz4KICA8cGF0aCBkPSJtMTA0LjY0IDguMjQ1Yy0zLjA3NSAwLjE4NC01LjA5OCAxLjQ5OC01LjU4OCAxLjg0OC0wLjQ3My0wLjM0My0yLjQyNS0xLjU5Ny01LjM4My0xLjgyNSAxLjY3OC0wLjc5MiAzLjUzMi0xLjI2OCA1LjUwOC0xLjI2OCAxLjk2IDAgMy43OTcgMC40NjYgNS40NjQgMS4yNDV6bS01LjU4NyA4LjdjNi43ODggNS4yNDIgOC44ODggOS42MjIgOS41MzUgMTEuOTczLTIuMzcxIDIuNTAzLTUuNzAyIDQuMDgyLTkuNDEyIDQuMDgyLTMuODEzIDAtNy4yMTQtMS42OC05LjU5NS00LjMwMyAwLjcxOC0yLjQwMiAyLjg5MS02LjY3MSA5LjQ3Mi0xMS43NTN6bTguMzYxLTYuOTJjMi44ODQgMi4zODggNC43NjIgNS45NDcgNC43NjMgOS45NzUgMCAyLjc5Ny0wLjkwOSA1LjM3Ni0yLjQxOCA3LjQ5OSAwLjMyNS02LjYzNy03LjA2Ny0xMy44MzgtNy4wNjctMTMuODM4IDAuMjY4LTEuNDc2IDIuOTc4LTIuODA3IDQuNzIyLTMuNjM2em0tMTYuNTY1IDAuMDc3YzEuNzQ0IDAuODMyIDQuMzA3IDIuMTM0IDQuNTY4IDMuNTY1IDAgMC03LjEzMyA2Ljk1Ni03LjA3MyAxMy40OTdhMTIuOTI2IDEyLjkyNiAwIDAgMS0yLjE2Ny03LjE2MWMwLTMuOTg3IDEuODM4LTcuNTE2IDQuNjcyLTkuOXoiLz4KICA8cGF0aCBkPSJtOTkuNzYxIDY1LjIzMmgtMS41MzY0djcuNjgyMmgxLjUzNjR2LTcuNjgyMm0zLjcxMDUgMS42NjctMS4wOTA5IDEuMDkwOWMxLjI1OTkgMS4wMTQgMS45ODk3IDIuNTQyOCAxLjk4OTcgNC4xNTYxYTUuMzc3NSA1LjM3NzUgMCAwIDEtNS4zNzc1IDUuMzc3NWMtMi45NjUzIDAtNS4zNzc1LTIuMzk2OC01LjM3NzUtNS4zNzc1IDAtMS42MDU2IDAuNzI5ODEtMy4xNDIgMS45ODItNC4xNjM3bC0xLjA4MzItMS4wODMyYy0yLjkxMTUgMi40NzM3LTMuMjY0OSA2LjgzNzEtMC43OTEyNiA5Ljc0ODcgMi40NzM3IDIuOTAzOSA2LjgzNzEgMy4yNTcyIDkuNzQ4NyAwLjc4MzU4IDEuNTUxOC0xLjMxMzYgMi40MzUyLTMuMjQ5NiAyLjQzNTItNS4yODUzIDAtMi4wMjA0LTAuODkxMTMtMy45NDEtMi40MzUyLTUuMjQ2OXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9Ii43NjgyMiIgc3R5bGU9InBhaW50LW9yZGVyOnN0cm9rZSBmaWxsIG1hcmtlcnMiLz4KIDwvZz4KPC9zdmc+Cg==
elements:
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Up
    style:
      top: 45.35%
      left: 14.3%
      width: 6.2%
      height: 15%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Down
    style:
      top: 74.7%
      left: 14.3%
      width: 6.2%
      height: 15%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Left
    style:
      top: 60%
      left: 8.05%
      height: 14.4%
      width: 6.4%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Right
    style:
      top: 60%
      left: 20.65%
      height: 14.4%
      width: 6.4%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "A"
    style:
      top: 82.5%
      left: 80.05%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "X"
    style:
      top: 60.0%
      left: 70.6%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "B"
    style:
      top: 60.0%
      left: 89.5%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: "Y"
    style:
      top: 37.9%
      left: 80.05%
      width: 10.5%
      height: 24.4%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.toggle
    service_data:
      entity_id: remote.xboxone
    style:
      top: 80.2%
      left: 47.2%
      width: 7%
      height: 16%
      border-radius: 100%
      overflow: hidden
  - type: service-button
    title: ""
    action: remote.send_command
    service_data:
      entity_id: remote.xboxone
      command: Nexus
    style:
      top: 22.2%
      left: 47.2%
      width: 13.4%
      height: 31.2%
      border-radius: 100%
      overflow: hidden
```

{% enddetails %}

## Binary sensor

The **Xbox binary sensor platform** automatically tracks the online status and activity of your own account as well as your friends.

| Entity Name                      | Description                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| (*Gamertag* )                    | Shows the online status of your friend. The entity’s attributes provide extra information, including real name and bio. |
| **In game**                      | Shows if your friend is currently playing a game.                      |
| **Subscribed to Xbox Game Pass** | Indicates whether the friend is currently subscribed to Xbox Game Pass.|

## Sensor

Similar to binary sensors, the **Xbox sensor platform** monitors your account and friends, providing detailed information about their activity and achievements.

| Entity Name      | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| **Status**       | Shows the text status of your friend as it appears in your friends list.   |
| **Gamerscore**   | Friend's Gamerscore.                                                       |
| **Friends**      | Displays the number of mutual friend relationships of the account.         |
| **Follower**     | Displays the number of people following the account.                       |
| **Following**    |  Displays the number of people the account is following.                   |
| **Last online**  | Displays the last time the friend was active online.                       |
| **In party**     | Shows the number of people in the user’s party chat if they are currently in one. |
| **Now playing**  | Shows the title of the game currently being played. Additional details such as a short description, genre, developer, age rating, and achievement progress are available in the entity's attributes. |

### Storage sensors

These sensors track the storage on your own **Xbox consoles** and connected storage devices.

| Entity Name      | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| **Total space: *{name}*** | Reports the total storage capacity of the device. A separate sensor is created for each Xbox console and connected internal and external storage device. |
| **Free space: *{name}*** | Reports the available (unused) storage space on the device. A separate sensor is created for each Xbox console and connected internal and external storage device. |

## Image

For your account and each of your friends, several image entities are available:

| Entity Name      | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Avatar**       | Shows the classic Xbox avatar for you or your friend, if available. You can create or customize your own avatar using the [Xbox Original Avatars app](https://apps.microsoft.com/detail/9nblgggz5qdq?ocid=webpdpshare). |
| **Gamerpic**     | Shows the current **Gamerpic** that represents you or your friend across the Xbox Network. |
| **Now playing**  | Displays the cover art of the game you or your friends are currently playing.          |

## Media source

The Xbox media source platform lets your browse your own and community gameclips or screenshots, as well as promotional images for games you've played, through the Media Browser panel. As with any other media source {% term integration %}, you can also send these clips to supported media players like Chromecast.

## Manual OAuth2 configuration

{% warning %}
These steps are not required, nor will they be supported if issues are encountered.
{% endwarning %}

If you prefer not to use the Home Assistant account linking service, you may manually configure a local implementation if your instance is exposed externally over HTTPS using the following steps:

- Register a new application in [Azure AD](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)
  - Name your app
  - Select "Personal Microsoft accounts only" under supported account types
  - For Redirect URI, add: `https://my.home-assistant.io/redirect/oauth`
- Copy your Application (client) ID for later use
- On the App Page, navigate to "Certificates & secrets"
  - Generate a new client secret and save for later use

You may then add the credentials to [Application Credentials](/integrations/application_credentials/) and then setup the {% term integration %}.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.

{% enddetails %}

## Data updates

This integration syncs with Xbox Network every 15 seconds.

## Troubleshooting

The **Xbox** integration relies on an active internet connection to communicate with **Xbox Network**. If you encounter issues, verify that your network connection is stable. The Xbox Network service itself may also experience downtime. This can be unexpected or due to scheduled maintenance.

When reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics). Restart the integration.   As soon as the issue reoccurs, stop debug logging again. The debug log file will download automatically.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
