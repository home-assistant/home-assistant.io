---
title: Sky Remote Control
description: The Sky Remote integration allows you to control a Sky box with Home Assistant.
ha_category:
  - Remote
ha_release: 2024.12
ha_domain: sky_remote
ha_config_flow: true
ha_codeowners:
  - '@dunnmj'
  - '@saty9'
ha_iot_class: Assumed State
ha_platforms:
  - remote
ha_integration_type: device
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Sky Remote** {% term integration %} lets you control a [Sky](https://www.sky.com/) box using Home Assistant.

## Supported models

This integration is intended to control Sky+ HD and Sky Q satellite receiver boxes with a LAN port. It will not control Sky stream pucks.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: "Hostname or IP address of your Sky device (e.g., 192.168.1.250). This can typically be found in your Sky box network settings or router's DHCP client list."
  required: true
  type: string
{% endconfiguration_basic %}

## Remote

The Sky Remote platform will create a [Remote](/integrations/remote/) entity for the device. This entity allows you to send commands via the `remote.send_command` action.

### Action `remote.send_command`

Send a single command or a set of commands to one Sky box.

| Data attribute | Optional | Description                                         |
| ---------------------- | -------- | --------------------------------------------------- |
| `entity_id`            | no       | Entity ID to target.                                |
| `command`              | no       | A single command or a list of commands to send.     |


A typical action for sending several commands looks like this:

```yaml
action: remote.send_command
target:
  entity_id: remote.192_168_1_250
data:
  command:
    - sky
    - tvguide
```

### Available Commands

The following commands are supported:

#### Power & Navigation
- `power` - Turns Sky box on or off
- `up`, `down`, `left`, `right` - Navigate menus and guides
- `select` - Confirm selection
- `backup` - Return to previous screen or step in navigation. 

#### Menu Access
- `sky` - Exits menus and returns to live TV
- `tvguide` - Open the TV guide
- `boxoffice` - Access Sky Box Office
- `services` - Access Sky services
- `interactive` - Access interactive features

#### Channel Controls
- `channelup` - Moves to next channel or to next page in menus
- `channeldown` - Moves to previous channel or to previous page in menus

#### Information and Help
- `i` - Displays information about the current program
- `text` - Access text services when on live TV
- `help` - Access subtitles or audio description when in live TV

#### Color Coded Shortcut Buttons
`red`, `green`, `yellow`, `blue` - Perform specific actions or open options within the user interface. The functions of these buttons vary depending on the menu or app currently in use.

#### Numeric Keypad
`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` - Number keys used for channel or PIN input

#### Playback Controls
- `play` - Starts or resumes playback.
- `pause` - Pauses playback.
- `stop` - Stops playback entirely.
- `record` - Starts recording the current program or selected content.
- `fastforward` - Speeds up playback to skip ahead.
- `rewind` - Rewinds playback to go back.

#### SkyQ Only
- `sidebar` - Opens the SkyQ sidebar
- `dismiss` - Dismiss interactive content 
- `search` - Opens SkyQ search interface
- `home` - Launches SkyQ homepage
