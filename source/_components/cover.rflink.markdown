---
layout: page
title: "RFLink Cover"
description: "Instructions how to integrate RFLink Somfy RTS Cover into Home Assistant."
date: 2017-08-08
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Cover
ha_release: 0.51
---

The `rflink` component support devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First you have to set up your [rflink hub](/components/rflink/).

Second you have to add the Somfy RTS manually with the supplied rflinkloader (Windows Only)


Press the Learn button on the original Somfy remote
enter the following code within 3 seconds. Your blinds will go up and down shortly 

````
10;RTS;02FFFF;0412;3;PAIR;
````

Your blinds will go up and down again. This means your Rflink is now paired with your RTS motor.
To check this enter the following code again and see if there is a record.

````
10;RTSSHOW;
````
````
RTS Record: 0 Address: FFFFFF RC: FFFF
RTS Record: 1 Address: FFFFFF RC: FFFF
RTS Record: 2 Address: FFFFFF RC: FFFF
RTS Record: 3 Address: 02FFFF RC: 0018
RTS Record: 4 Address: FFFFFF RC: FFFF
RTS Record: 5 Address: FFFFFF RC: FFFF
RTS Record: 6 Address: FFFFFF RC: FFFF
RTS Record: 7 Address: FFFFFF RC: FFFF
RTS Record: 8 Address: FFFFFF RC: FFFF
RTS Record: 9 Address: FFFFFF RC: FFFF
RTS Record: 10 Address: FFFFFF RC: FFFF
RTS Record: 11 Address: FFFFFF RC: FFFF
RTS Record: 12 Address: FFFFFF RC: FFFF
RTS Record: 13 Address: FFFFFF RC: FFFF
RTS Record: 14 Address: FFFFFF RC: FFFF
RTS Record: 15 Address: FFFFFF RC: FFFF
````

After configuring the RFLink Somfy RTS you have to add the cover to the configuration like any other RFlink device.

RFLink sensor ID's are composed of: protocol, id and gateway. For example: `RTS_0100F2_0`. 

Once the ID of a cover is known it can be used to configure the sensor in HA, for example to add it to a different group, hide it or configure a nice name.

Assigning name to a cover:

```yaml
# Example configuration.yaml entry
- platform: rflink
  devices:
    RTS_0100F2_0:
      name: SunShade
```



See [device support](/components/rflink/#device-support)

