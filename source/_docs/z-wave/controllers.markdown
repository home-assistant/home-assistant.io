---
title: "Z-Wave Controllers"
description: "Extended instructions how to setup Z-Wave."
---

## Supported Z-Wave USB Sticks & Hardware Modules

You need to have a compatible Z-Wave stick or module installed. The following devices have been confirmed to work with Z-Wave JS:

- 700 series controllers
  - Aeotec Z-Stick 7
  - Zooz ZST10 700
  - Silicon Labs SLUSB7000A

- 500 series controllers
  - Aeotec Z-Stick Gen5 (see note below)
  - Everspring USB stick - Gen 5
  - GoControl HUSBZB-1 stick
  - Sigma Designs UZB stick
  - Vision USB stick - Gen5
  - ZWave.me UZB1 stick

- Rasberry Pi Modules
  - Aeotec Z-Pi 7 (700 series)
  - ZWave.me Razberry Board (500 series)

If you are just starting out, we recommend that you purchase a 500 series controller. At the very least, you should purchase a [Z-Wave Plus](https://z-wavealliance.org/z-wave_plus_certification/) controller.

<div class='note'>
  Not all of the above devices are supported by the deprecated Z-Wave integration.
</div>

<div class='note'>
  If you're using Home Assistant OS, Supervised, or Container, it's recommended to use a USB stick, not a module. Passing a module through Docker is more complicated than passing a USB stick through.
</div>

## Stick Alternatives

The alternative to a stick is a hub that supports Z-Wave. Home Assistant supports the following hubs with Z-Wave support:

- [Vera](/integrations/vera/)
- [Fibaro](/integrations/fibaro/)
- [SmartThings](/integrations/smartthings/)

## Controller Notes

### Aeotec Z-Stick

<div class='note'>

There are [known compatibility issues](https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=245031#p1502030) with older hardware versions of the Aeotec stick not working on the Raspberry Pi 4. Aeotec has released a 2020 hardware revision ZW090-A/B/C Gen5+ with Pi 4 compatibility. Both hardware revisions are still being sold, make informed purchasing decisions if using paired with a Pi 4.

</div>

It's totally normal for your Z-Wave stick to cycle through its LEDs (Yellow, Blue and Red) while plugged into your system.

### Razberry Board

You need to disable the on-board Bluetooth since the board requires the use of the hardware UART (and there's only one on the Pi3). You do this by adding the following to the end of `/boot/config.txt`:

For both processes below you will need to insert your SD card into your PC and open the `/boot/config.txt` file with your favorite text editor.

#### Raspberry Pi 4 procedure

Add the following parameters to the bottom of the `/boot/config.txt` file.

```text
dtoverlay=disable-bt
enable_uart=1
```

Reboot your Pi 4 without the Razberry Z-Wave hat first. Then shutdown, add the hat back, and boot again.

#### Raspberry Pi 3 procedure

Add the following parameters to the bottom of the `/boot/config.txt` file.

```text
dtoverlay=disable-bt
```

Reboot your Pi 3.

For Home Assistant OS this should be everything you need to do. You should now be able to use Razberry Z-Wave from `/dev/ttyAMA0`.

For other operating systems such as Raspberry Pi OS you will also have to run the following command:

```bash
sudo systemctl disable hciuart
```

You should also check the README for details on the overlays. You might find it in `/boot/overlays/README` on your SD-card. If it is not there you can find [the official version here](https://github.com/raspberrypi/firmware/blob/master/boot/overlays/README).

<div class='note'>

  It is possible to keep a limited Bluetooth functionality while using Razberry Z-Wave. Check `boot/overlays/README` on `miniuart-bt`.

</div>

<div class='note'>

  `disable-bt` was previously known as `pi3-disable-bt`. If your OS is old, you might need to use this instead.

</div>

<div class='note'>

  If you've installed the Z-Way software, you'll need to ensure you disable it before you install Home Assistant or you won't be able to access the board. Do this with `sudo /etc/init.d/z-way-server stop; sudo update-rc.d z-way-server disable`.

</div>
