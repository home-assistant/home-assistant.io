---
title: Emulated Roku
description: Instructions on how to set up Emulated Roku within Home Assistant.
ha_category:
  - Hub
ha_release: 0.86
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: emulated_roku
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Emulated Roku** {% term integration %} integrates an emulated Roku API into Home Assistant,
so remotes such as Harmony and Android apps can connect to it through Wi-Fi as if it were a Roku player.
Home Assistant will see key presses and app launches as Events, which you can use as triggers for automations.
Multiple Roku servers may be started if you run out of buttons by specifying multiple server entries.

{% note %}

Windows is not supported because Home Assistant uses `ProactorEventLoop` which does not support UDP sockets.

{% endnote %}

{% caution %}

This {% term integration %} opens an unauthenticated API on the host, allowing anything on the local network to access
your Home Assistant instance through the automations you create with emulated Roku as the trigger.
Using a proxy with whitelisted IP addresses is recommended. (set `advertise_ip` to the proxy's IP or DNS name)

{% endcaution %}

{% include integrations/config_flow.md %}

## Manual configuration

If you wish to configure advanced options, you can add the following entry in your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
emulated_roku:
  servers:
    - name: Home Assistant
      listen_port: 8060
```

{% configuration %}
name:
  description: Name of the Roku that will be displayed as the serial number in Harmony.
  required: true
  type: string
listen_port:
  description: The port the Roku API will run on. This can be any free port on your system.
  required: true
  type: integer
host_ip:
  description: The IP address that your Home Assistant installation is running on. If you do not specify this option, the integration will attempt to determine the IP address on its own.
  required: false
  type: string
advertise_ip:
  description: If you need to override the IP address or DNS name used for UPnP discovery. (For example, using network isolation in Docker or using a proxy)
  required: false
  type: string
advertise_port:
  description: If you need to override the advertised UPnP port.
  required: false
  type: integer
upnp_bind_multicast:
  description: Whether or not to bind the UPnP (SSDP) listener to the multicast address (239.255.255.250) or instead to the (unicast) host_ip address specified above (or automatically determined). The default is true, which will work in most situations. In special circumstances, like running in a FreeBSD or FreeNAS jail, you may need to disable this.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

After starting up, you can check if the emulated Roku is reachable at the specified ports on your Home Assistant instance (eg.: `http://192.168.1.101:8060/`).

## Events

### Event `roku_command`

All Roku commands are sent as `roku_command` events.

| Field         | Description                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `source_name` | Name of the emulated Roku instance that sent the event. Only required when using multiple instances to filter event sources. |
| `type`        | The type of the event that was called on the API.                                                                            |
| `key`         | the code of the pressed key when the command `type` is `keypress`, `keyup` or `keydown`.                                     |
| `app_id`      | the id of the app that was launched when command `type` is `launch`.                                                         |

Available key codes |
------------------- |
`Home`
`Rev`
`Fwd`
`Play`
`Select`
`Left`
`Right`
`Down`
`Up`
`Back`
`InstantReplay`
`Info`
`BackSpace`
`Search`
`Enter`
`PowerOff`

## Automations

The following is an example implementation of an automation:
```yaml
# Example automation
- id: amp_volume_up
  alias: "Increase amplifier volume"
  triggers:
  - trigger: event
    event_type: roku_command
    event_data:
      source_name: Home Assistant
      type: keypress
      key: Fwd
  actions:
  - action: media_player.volume_up
    target:
      entity_id: media_player.amplifier
```

### Video tutorial

This comprehensive video tutorial explains how events work in Home Assistant and how you can set up Emulated Roku to control a media player using a physical remote control.

<lite-youtube videoid="nDHh1OjyuMA" videotitle="Event Triggers Unveiled: Control the Home Assistant Media Player with Your Remote Control!" posterquality="maxresdefault"></lite-youtube>

## Troubleshooting

If you change your advertised IP or ports, you will have to re-add the emulated Roku in your app.
When using Harmony, the app should auto-discover any changes via UPnP discovery (if `name` is unchanged) once it detects that the device is unreachable.
Alternatively, you can trigger the 'Fix' page by pressing a button on the unreachable device's remote in the app and wait ~10 seconds, then click 'Fix it'.

Known limitations:
- Some Android remotes send key up/down events instead of key presses.
- Functionality other than key presses and app launches are not implemented yet.
- App ids are limited between 1-10. (The emulated API reports 10 dummy apps)
- Harmony uses UPnP discovery (UPnP is not needed after pairing), which might not work in Docker. You can:
  - Change Docker to host networking temporarily, then revert after pairing.
  - Run the `advertise.py` helper script from the emulated_roku library directly somewhere else and point it to the emulated Roku API.
- Harmony cannot launch apps as it uses IR instead of the Wi-Fi API and will not display the custom dummy app list.
- Home control buttons cannot be assigned to emulated Roku on the Harmony Hub Companion remote as they are limited to Hue (and possibly other APIs) within Harmony.
- Harmony will not set the name of the added emulated Roku device to the specified `name`.
