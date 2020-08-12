---
title: Aruba Instant
description: Instructions on how to integrate Aruba Instant access points into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.115
ha_domain: aruba_instant
---

This platform allows you to detect presence by looking at connected devices to an [Aruba Instant](https://www.arubanetworks.com/products/networking/aruba-instant/) device(s). This integration differs from the [Aruba](https://www.home-assistant.io/integrations/aruba/) integration in that it currently only supports the REST API and not SSH or telnet. Future plans will combine both access methods into this integration.

Supported devices (tested):

- Aruba AP-215
- Aruba AP-315

However, this integration should work with most Aruba Instant APs.

<div class='note warning'>
<ul>
  <li>This device tracker uses the Aruba REST API and requires Aruba Instant AP code 8.5 or greater.</li>
  <li>This device tracker will not work with ArubaOS controllers or Instant On access points.</li>
</ul>
</div>

## Configuration

To add Aruba Instant to your installation, go to **Configuration** >> **Integrations** in the UI, click the FAB button with `+` sign and from the list of integrations select **Aruba Instant**. Provide the required information and click the `submit` button.


## Features
This integration provides the following features and information.
- Supports single AP deployments or multiple AP Virtual Controller-based deployments.
- Device tracking for precense detection of associated wireless clients 
- Asscociated client statistics as entity attributes
- Access Points as Home Assistant Devices 

## Attributes

An Aruba Instant wireless client entity has some extra attributes to describe the current state of an associated client.

| Name | Sample Value | Description |
| ---- | ------------ | ----------- |
| `source_type` | router | HA attribute - source of the entity data.
| `name` | Chromecast | Displays the name of the client if known.
| `ip` | 192.168.1.123 | Displays the IP address of the client.
| `mac` | de:ad:be:ef:ca:fe | Displays the MAC address of the client.
| `os` | Linux | Indicates the OS running on the client system.
| `essid` | HouseWifi | Extended Service Set ID (ESSID) of the client. This is the SSID and network to which the client is connected.
| `ap` | family-room-ap | Access Point the client is associated with.
| `channel` | 11 | Indicates the channel assigned to the client.
| `phy` | GN | Indicates the client's negotiated Wifi type. 
| `role` | HouseWifi | 	Indicates the role assigned to the client.
| `ipv6` | fe80::dead:beef:cafe | Displays the IPv6 address of the client.
| `signal` | 64 | 	Indicates the current signal strength of the client, as detected by the IAP.
| `signal_text` | Good | Friendly text of speed stength.
| `speed` | 72 | 	Indicates the current speed at which data is transmitted in Mbps. When the client is associated with an IAP, it constantly negotiates the speed of data transfer. A value of 0 means that the IAP has not received any packets from the client for some time.
| `speed_text` | Good | Friendly text of speed value
| `friendly_name` | Chromecast | HA attribute - friendly name drived from access point information, can be changed.





