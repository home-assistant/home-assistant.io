---
layout: page
title: "Broadlink RM Switch"
description: "Instructions how to have Broadlink RM switches."
date: 2016-11-22 22:41
sidebar: true
comments: false
sharing: true
footer: true
logo: broadlink.png
ha_category: Switch
ha_release: 0.34
---

This `Broadlink` switch platform allow to you control Broadlink RM2 Pro and RM mini IR+RF [devices](http://www.ibroadlink.com/rm/)

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: broadlink
  host: IP_ADDRESS
  mac: 'MAC_ADDRESS'
  switches:
    reciever:
      command_on: 'switch_packet on'
      command_off: 'switch_packet off'
```

Configuration variables:
- **host** (*Required*): The hostname/IP address to connect to.
- **mac** (*Required*):  Device mac address.
- **switches** (*Required*): The array that contains all switches.
  - **identifier** (*Required*): Name of the command switch as slug. Multiple entries are possible.
    - **command_on** (*Required*): Base64 encoded packet from RM device to take for on.
    - **command_off** (*Required*): Base64 encoded packet from RM device to take for off.
    - **optimistic** (*Optional*): Default true: Flag that defines if switch works in optimistic mode. 
    - **friendly_name** (*Optional*): The name used to display the switch in the frontend.


How to obtain IR/RF packet while in learning mode?

Run: hass --script broadlink --ip `YOUR_DEVICE_IP` --mac `YOUR_DEVICE_MAC`

If the orange LED is on point the remote to device and press the matching button on remote.
If the orange LED is off it means the learning is successful and packet will be printed on console.
Then you can copy and paste this packet.
