---
layout: page
title: "Z-Wave Controllers"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

## {% linkable_title Supported Z-Wave USB Sticks & Hardware Modules %}

You need to have a compatible Z-Wave stick or module installed. This needs to be a *static controller*, which most Z-Wave sticks and modules will be. If yours is a *bridge* device then it won't work with [OpenZWave](http://openzwave.com/), which is what provides Home Assistant's Z-Wave capabilities. The following devices have been confirmed to work:

* Aeotec Z-Stick Series 5
* Everspring USB stick - Gen 5
* Sigma Designs UZB stick
* Vision USB stick - Gen5
* Zooz Z-Wave Plus S2 stick ZST10
* ZWave.me Razberry Board
* ZWave.me UZB1 stick

We recommend that you purchase a [Z-Wave Plus](https://z-wavealliance.org/z-wave_plus_certification/) controller, to take advantage of the improvements this provides. As OpenZWave doesn't support S2 or Smart Start, there's no need to buy one just for support of these features.

<p class='note'>
  If you're using Hass.io or running HASS in a Docker container, it's recommended to use a USB stick, not a module. Passing a module through Docker is more complicated than passing a USB stick through.
</p>

## {% linkable_title Stick Alternatives %}

The alternative to a stick is a hub that supports Z-Wave. Home Assistant supports the following hubs with Z-Wave support:

 - [Vera](/components/vera/)
 - [Wink](/components/wink/)

## {% linkable_title Controller Notes %}

### {% linkable_title Aoetec Stick %}

By default this will turn on "disco lights", which you can turn off by following the instructions in the [device specific page](/docs/z-wave/device-specific/#aeon-z-stick)

### {% linkable_title Razberry Board %}

You need to disable the on-board Bluetooth since the board requires the use of the hardware UART (and there's only one on the Pi3). You do this by following the instructions in the [device specific page](/docs/z-wave/device-specific/#razberry-board)
