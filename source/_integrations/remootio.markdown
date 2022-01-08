---
title: Remootio
description: Instructions on how to integrate Remootio controlled garage door or garden gate into Home Assistant.
ha_release: ???
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

This integration lets you control [Remootio](https://www.remootio.com/) controlled garage doors and/or gates through Home Assistant.

## Requirements

To use this integration with your Remootio device it must have at least the software version _2.21_, has to be connected to your Wi-Fi, must have a fixed IP address assigned and 
a status sensor installed. Furthermore, the API access must be enabled on the device.

To enable the API access on your Remootio device you need to access it using the master key via the Remootio app, afterward go to the _Websocket API_ settings 
in the _Device software_ section of the device settings and enable the API with logging.

{% include integrations/config_flow.md %}

## Events

The integration fires an event under the type `remootio_left_open` if the Remootio controlled garage door or garden gate has been left open for 5 minutes.

### Listening for events

You can subscribe to the `remootio_left_open` event type in [Developer Tools/Events](/docs/tools/dev-tools/) in order to examine the event data JSON for the correct parameters to use in your automations. For example, `remootio_left_open` returns event data JSON similar to the following.

```json
{
    "event_type": "remootio_left_open",
    "data": {
        "entity_id": "cover.remootio_device_host_192_168_0_10_s_n_1234567890",
        "serial_number": "1234567890",
        "name": "Remootio Device (Host: 192.168.0.10, S/N: 1234567890)"
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
