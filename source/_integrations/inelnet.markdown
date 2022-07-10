---
title: InelNet
description: Instructions on how to integrate an InelNet Internet central control unit with Home Assistant by using the HTTP API the unit exposes.
ha_category:
  - Hub
  - Cover
  - Switch
ha_iot_class: "Assumed State"
ha_quality_scale: "No score"
---

The solution described in this documentation will allow Home Assistant users who own an [InelNet Internet central control unit](https://www.inel.gda.pl/en/offer/internet-central-control-unit.html) by [Inel](https://www.inel.gda.pl/en/) to control their appliances. The unit controls blinds, roller shutters, awnings, garage doors, drive-in doors, light sources, and mains sockets.

In the examples presented here, the InelNet unit is controlled by HTTP requests, so it is not a Home Assistant integration as such, but rather a set of predefined REST requests you can use to control appliances paired with the unit.



## Setup

Before you start, it is assumed that you have an InelNet unit already configured and paired with the appliances you want to control by Home Assistant.

What's important, the unit should have a **static IP address** assigned (see DHCP settings in your router's configuration). Otherwise, the proposed configuration will stop working whenever the IP address of the unit changes. Alternatively, a host name is a valid solution as well.



## Configuration

The approach described below uses HTTP requests to send control commands to an InelNet unit. The example defines requests to raise, lower or stop a cover associated with a particular channel. The *inelnet_program* request, on the other hand, lets you switch a cover controller to programming mode when there is a need to pair a remote control with it.

The listed commands will work with cover controllers (for example **Inel ST-01R**), but are not limited to them (for example, the *inelnet_up* command may trigger an **Inel ORS-X1T** switch as well).



## Examples

Before you use the example, replace the **INELNET_UNIT_IP_ADDRESS** placeholders with the static IP address or host name of your InelNet unit.

```yaml
# Example configuration.yaml entry
rest_command:
  # raises the cover associated with the specified channel
  inelnet_up:
    url: 'http://INELNET_UNIT_IP_ADDRESS/msg.htm'
    method: post
    content_type: 'application/x-www-form-urlencoded'
    payload: 'send_ch={{channel}}&send_act=160'

  # raises the cover associated with the specified channel (short movement)
  inelnet_up_short:
    url: 'http://INELNET_UNIT_IP_ADDRESS/msg.htm'
    method: post
    content_type: 'application/x-www-form-urlencoded'
    payload: 'send_ch={{channel}}&send_act=176'

  # lowers the cover associated with the specified channel
  inelnet_down:
    url: 'http://INELNET_UNIT_IP_ADDRESS/msg.htm'
    method: post
    content_type: 'application/x-www-form-urlencoded'
    payload: 'send_ch={{channel}}&send_act=192'

  # lowers the cover associated with the specified channel (short movement)
  inelnet_down_short:
    url: 'http://INELNET_UNIT_IP_ADDRESS/msg.htm'
    method: post
    content_type: 'application/x-www-form-urlencoded'
    payload: 'send_ch={{channel}}&send_act=208'

  # stops the cover associated with the specified channel
  inelnet_stop:
    url: 'http://INELNET_UNIT_IP_ADDRESS/msg.htm'
    method: post
    content_type: 'application/x-www-form-urlencoded'
    payload: 'send_ch={{channel}}&send_act=144'

  # switches the cover controller associated with the specified channel
  # to programming mode so you can pair a remote control with it
  inelnet_program:
    url: 'http://INELNET_UNIT_IP_ADDRESS/msg.htm'
    method: post
    content_type: 'application/x-www-form-urlencoded'
    payload: 'send_ch={{channel}}&send_act=224'      
```

Having defined the REST commands above, you can use them to create a cover template like in the example below. Make sure to replace the **MY_BLIND_CHANNEL_NUMBER** placeholder with a proper channel number that your cover is associated with in your InelNet unit configuration.

```yaml
# Example configuration.yaml entry
cover:
  - platform: template
    covers:
      # adjust the entity ID
      living_room_blind:
        device_class: blind
        
        # adjust the unique ID and name
        unique_id: living_room_blind_id
        friendly_name: "Living room blind"

        # InelNet does not support positions and the states of covers,
        # so let's use 50 to always enable cover movement in either direction
        position_template: 50

        open_cover:
          service: rest_command.inelnet_up
          data:
            # replace with a proper channel number, e.g. 1
            channel: MY_BLIND_CHANNEL_NUMBER

        close_cover:
          service: rest_command.inelnet_down
          data:
            # replace with a proper channel number, e.g. 1
            channel: MY_BLIND_CHANNEL_NUMBER

        stop_cover:
          service: rest_command.inelnet_stop
          data:
            # replace with a proper channel number, e.g. 1
            channel: MY_BLIND_CHANNEL_NUMBER
```
