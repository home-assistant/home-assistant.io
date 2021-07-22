---
title: "Z-Wave Controllers"
description: "Extended instructions how to setup Z-Wave."
---

<div class='note'>

This Z-Wave integration is deprecated and replaced with a [new implementation based on Z-Wave JS](/integrations/zwave_js); it's currently in beta, and you can [try it now](/integrations/zwave_js/).

</div>

## Supported Z-Wave USB Sticks & Hardware Modules

You need to have a compatible Z-Wave stick or module installed. This needs to be a *static controller*, which most Z-Wave sticks and modules will be. If yours is a *bridge* device then it won't work with [OpenZWave](http://openzwave.com/), which is what provides Home Assistant's Z-Wave capabilities. USB sticks using the new 700 series Z-Wave platform are not compatible. The following devices have been confirmed to work:

<div class='note'>
  
There are [known compatibility issues](https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=245031#p1502030) with older hardware versions of the Aeotec stick not working on the Raspberry Pi 4. Aeotec has released a 2020 hardware revision ZW090-A/B/C Gen5+ with Pi 4 compatibility. Both hardware revisions are still being sold, make informed purchasing decisions if using paired with a Pi 4.

</div>

- Aeotec Z-Stick Series 5
- Everspring USB stick - Gen 5
- GoControl HUSBZB-1 stick
- Sigma Designs UZB stick
- Vision USB stick - Gen5
- Zooz Z-Wave Plus S2 stick ZST10
- ZWave.me Razberry Board
- ZWave.me UZB1 stick

We recommend that you purchase a [Z-Wave Plus](https://z-wavealliance.org/z-wave_plus_certification/) controller, to take advantage of the improvements this provides. As OpenZWave doesn't support S2 or Smart Start, there's no need to buy one just for support of these features.

<div class='note'>
  If you're using Hass.io or running Home Assistant in a Docker container, it's recommended to use a USB stick, not a module. Passing a module through Docker is more complicated than passing a USB stick through.
</div>

## Stick Alternatives

The alternative to a stick is a hub that supports Z-Wave. Home Assistant supports the following hubs with Z-Wave support:

- [Vera](/integrations/vera/)
- [Wink](/integrations/wink/)
- [Fibaro](/integrations/fibaro/)
- [SmartThings](/integrations/smartthings/)

## Controller Notes

### Aeotec Stick

By default this will turn on "disco lights", which you can turn off by following the instructions in the [device specific page](/docs/z-wave/device-specific/#aeotec-z-stick)

### Razberry Board

You need to disable the on-board Bluetooth since the board requires the use of the hardware UART (and there's only one on the Pi3). You do this by following the instructions in the [device specific page](/docs/z-wave/device-specific/#razberry-board)
