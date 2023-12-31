---
title: Remootio
description: Instructions on how to integrate Remootio controlled garage door or garden gate into Home Assistant.
ha_release: 2022.3.0
ha_category:
  - Cover
ha_iot_class: Local Push
ha_domain: remootio
ha_codeowners:
  - '@ivgg-me'
ha_config_flow: true
ha_platforms:
  - cover
---

This integration lets you control [Remootio](https://www.remootio.com/) controlled garage doors and/or garden gates through Home Assistant.

## Requirements

To use this integration with your Remootio device it must have at least the software version _2.21_, has to be connected to your Wi-Fi, must have a fixed IP address assigned and 
a status sensor installed. Furthermore, the API access must be enabled on the device.

<div class="note">

Instead of the IP address you can also enter the host name of your Remootio device if you have configured one on your router or DNS server for it.

</div>

To enable the API access on your Remootio device you need to access it using the master key via the Remootio app, afterward go to the _Websocket API_ settings 
in the _Device software_ section of the device settings and enable the API with logging.

{% include integrations/config_flow.md %}

## Events

The integration fires events based on notifications received from the Remootio device under the type `remootio_event`. The current version of the integration supports firing of events in the following cases:

- if the Remootio controlled garage door or garden gate has been left open

<div class="note">

The notification by the Remootio device about left open garage door or garden gate is disabled by default and can be enabled under the _Gate status sensor_ settings.  

</div>

### Listening for events

You can subscribe to the `remootio_event` event type in [Developer Tools/Events](/docs/tools/dev-tools/) in order to examine the event data JSON for the correct parameters to use in your automations which is similar to the following.

{% raw %}

```json
{
    "event_type": "remootio_event",
    "data": {
        "entity_id": "cover.remootio_device_host_192_168_0_10_s_n_1234567890",
        "serial_number": "1234567890",
        "name": "Remootio Device (Host: 192.168.0.10, S/N: 1234567890)",
        "type": "left_open"
    },
    "origin": "LOCAL",
    "time_fired": "2022-01-08T20:33:29.463591+00:00",
    "context": {
        "id": "cc471093c232680fc143aeb32ff35894",
        "parent_id": null,
        "user_id": null
    }
}
```

{% endraw %}

<div class="note">

This integration exposes the fired events also as [Device triggers](/docs/automation/trigger/#device-triggers).  

</div>