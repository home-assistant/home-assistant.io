---
title: Enigma2 (OpenWebif)
description: Instructions on how to integrate an Enigma2 based box running OpenWebif into Home Assistant.
ha_category:
  - Media Player
ha_release: '0.90'
ha_iot_class: Local Polling
ha_codeowners:
  - '@fbradyirl'
ha_domain: enigma2
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `enigma2` platform allows you to control a Linux based set-top box which is running [Enigma2](https://github.com/oe-alliance/oe-alliance-enigma2) with the OpenWebif plugin installed.

[OpenWebif](https://github.com/E2OpenPlugins/e2openplugin-OpenWebif) is an open source web interface for Enigma2 based set-top boxes.

Enigma2 devices should be discovered automatically by using [the discovery component](/integrations/discovery/).

To manually add a set-top box to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: enigma2
    host: IP_ADDRESS
```

{% configuration %}
  host:
    description: The IP/hostname of the Enigma2 set-top box on your home network.
    required: true
    type: string
  use_channel_icon:
    description: By default, a screen grab of the current channel is shown. If you prefer the channel icon to be shown instead, set this to true.
    required: false
    type: boolean
    default: false
  deep_standby:
    description: If set to true, when the user selects Turn Off, the box will go into "deep standby" mode, meaning it can be only awoken by the remote control or via Wake On Lan (if box supports that).
    required: false
    type: boolean
    default: false
  mac_address:
    description: If specified, a Wake On Lan packet is sent to this MAC address, when Turn On is selected.
    required: false
    type: string
    default: empty
  source_bouquet:
    description: Provide a specific bouquet reference for the bouquet you would like to see loaded into the media player "Sources" interface.
    required: false
    type: string
    default: empty
  port:
    description: Port which OpenWebif is listening on.
    required: false
    type: integer
    default: 80
  username:
    description: The username of a user with privileges to access the box. This is only required if you have enabled the setting "Enable HTTP Authentication" in OpenWebif settings. _(e.g., on the remote by pressing `Menu`>`Plugins`>`OpenWebif`)_.
    required: false
    type: string
    default: root
  password:
    description: The password for your given account. Again, this is only required if you have enabled the setting "Enable HTTP Authentication" in OpenWebif settings. _(e.g., on the remote by pressing `Menu`>`Plugins`>`OpenWebif`)_.
    required: false
    type: string
    default: dreambox
  ssl:
    description: Use HTTPS instead of HTTP to connect. This is only required if you have enabled the setting "Enable HTTPS" in OpenWebif settings. _(e.g., on the remote by pressing `Menu`>`Plugins`>`OpenWebif`)_. You will need to ensure you have a valid CA certificate in place or SSL verification will fail with this component.
    required: false
    type: boolean
    default: false
  name:
    description: A name for easy identification of the device.
    required: false
    type: string
    default: Enigma2 Media Player
{% endconfiguration %}
