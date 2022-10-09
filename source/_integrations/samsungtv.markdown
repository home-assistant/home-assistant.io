---
title: Samsung Smart TV
description: Instructions on how to integrate a Samsung Smart TV into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.13
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
  - '@epenet'
ha_domain: samsungtv
ha_ssdp: true
ha_platforms:
  - diagnostics
  - media_player
ha_zeroconf: true
ha_dhcp: true
ha_integration_type: integration
---

The `samsungtv` platform allows you to control a [Samsung Smart TV](https://www.samsung.com/uk/tvs/all-tvs/).

### Setup

Go to the integrations page in your configuration and click on new integration -> Samsung TV.
If your TV is on and you have enabled [SSDP](/integrations/ssdp) discovery, it's likely that you just have to confirm the detected device.

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

### YAML Configuration

YAML configuration is around for people that prefer YAML.
To use this integration, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
samsungtv:
  - host: IP_ADDRESS
```

{% configuration %}
host:
  description: "The hostname or IP of the Samsung Smart TV, e.g., `192.168.0.10`."
  required: true
  type: string
name:
  description: The name you would like to give to the Samsung Smart TV.
  required: false
  type: string
turn_on_action:
  description: "Defines an [action](/docs/automation/action/) to turn the TV on."
  required: false
  type: list
{% endconfiguration %}

After saving the YAML configuration, the TV must be turned on _before_ launching Home Assistant in order for the TV to be registered the first time.

#### Wake up TV / TV does not turn on

If the integration knows the MAC address of the TV from discovery, it will attempt to wake it using wake on LAN when calling turn on. Wake on LAN must be enabled on the TV for this to work. If the TV is connected to a smart strip or requires a more complex turn-on process, a `turn_on_action` can be provided that will take precedence over the built-in wake on LAN functionality.

To wake up the TV when switched off you can use the [wake-on-lan](/integrations/wake_on_lan/) integration and call a service.

```yaml
wake_on_lan:

samsungtv:
  - host: IP_ADDRESS
    turn_on_action:
      - service: wake_on_lan.send_magic_packet
        data:
          mac: MAC_ADDRESS
```

### Usage

#### Changing channels

Changing channels can be done by calling the `media_player.play_media` service
with the following payload:

```yaml
entity_id: media_player.samsung_tv
media_content_id: 590
media_content_type: channel
```

#### Selecting a source

It's possible to switch between the 2 sources `TV` and `HDMI`.
Some older models also expose the installed applications through the WebSocket, in which case the source list is adjusted accordingly.

### Known issues and restrictions

#### Subnet/VLAN

Samsung SmartTV does not allow WebSocket connections across different subnets or VLANs. If your TV is not on the same subnet as Home Assistant this will fail.
It may be possible to bypass this issue by using IP masquerading or a proxy.

#### H and J models

Some televisions from the H and J series use an encrypted protocol and require manual pairing with the TV. This should be detected automatically when attempting to send commands using the WebSocket connection, and trigger the corresponding authentication flow.
