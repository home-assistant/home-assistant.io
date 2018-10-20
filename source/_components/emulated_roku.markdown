---
layout: page
title: "Emulated Roku"
description: "Instructions on how to set up Emulated Roku within Home Assistant."
date: 2018-10-03 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Hub
ha_release: 0.81.0
ha_iot_class: "Local Push"
ha_qa_scale: internal
---

This component integrates an emulated Roku API into Home Assistant,  
so remotes such as Harmony and Android apps can connect to it through WiFi as it were a Roku player.  
Home Assistant will see key presses and app launches as Events, which you can use as triggers for automations.  
Multiple Roku servers may be started if you run out of buttons by specifying multiple server entries.  
When using multiple servers, you can filter the Roku USN which is specified via the `name` attribute.

<p class='note'>  
Windows is not supported because Home Assistant uses `ProactorEventLoop` which does not support UDP sockets.
</p>  

## {% linkable_title Configuration %}

The component is configurable through the frontend. (**Configuration** -> **Integrations** -> **Emulated Roku**)

<p class='note warning'>
You can only configure the component through the integrations page, not in configuration files.
</p>

{% configuration %}
name:
  description: Name of the Roku that will be displayed as USN in Harmony.
  required: true
  type: string
listen_port:
  description: The port the Roku API will run on. This can be any free port on your system.
  required: true
  type: integer
host_ip:
  description: The IP address that your Home Assistant installation is running on. If you do not specify this option, the component will attempt to determine the IP address on its own.
  required: false
  type: string
advertise_ip:
  description: If you need to override the IP address used for UPnP discovery. (For example, using network isolation in Docker)
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

After starting up, you can check if the Emulated Roku is reachable at the specified ports on your Home Assistant instance (eg.: `http://192.168.1.101:8060/`).
If you change your advertised IP or ports, you will have to re-add your Roku in Harmony.

## {% linkable_title Events %}

### {% linkable_title Event `roku_command` %}

All Roku commands are sent as `roku_command` events.

Field | Description
----- | -----------
`source_name` | Name of the that sent the event Roku. Not required for when using one Emulated Roku instance.
`type` | The type of the event that was called on the Roku API.
`key` | the code of the pressed key when the command `type` is `keypress`, `keyup` or `keydown`.
`app_id` | the id of the app that was launched when command `type` is `launch`.  

The available keys are listed here:
[Roku key codes](https://sdkdocs.roku.com/display/sdkdoc/External+Control+API#ExternalControlAPI-KeypressKeyValues)

## {% linkable_title Automations %}

The following is an example implementation of an automation:
```yaml
# Example automation
- id: amp_volume_up
  alias: Increase amplifier volume
  trigger:
  - platform: event
    event_type: roku_command
    event_data:
      source_name: hass roku
      type: keypress
      key: Fwd
  action:
  - service: media_player.volume_up
    entity_id: media_player.amplifier
```

## {% linkable_title Troubleshooting %}

Known limitations:
* Some Android remotes send key up/down events instead of key presses.
* Functionality other than key presses and app launches are not implemented yet.
* Harmony cannot launch apps as it uses IR instead of the WiFi API
* App ids are limited between 1-10. (The Emulated API reports 10 dummy apps)