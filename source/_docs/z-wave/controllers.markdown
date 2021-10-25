---
title: "Z-Wave Controllers"
description: "Extended instructions how to setup Z-Wave."
---

## Supported Z-Wave USB Sticks & Hardware Modules

You need to have a compatible Z-Wave stick or module installed. This needs to be a *static controller*, which most Z-Wave sticks and modules will be. If yours is a *bridge* device then it won't work with [OpenZWave](http://openzwave.com/), which is what provides Home Assistant's Z-Wave capabilities. The following devices have been confirmed to work:

- Aeotec Z-Stick Gen5 (see note below)
- Everspring USB stick - Gen 5
- GoControl HUSBZB-1 stick
- Sigma Designs UZB stick
- Silicon Labs SLUSB7000A
- Vision USB stick - Gen5
- ZWave.me Razberry Board
- ZWave.me UZB1 stick

We recommend that you purchase a [Z-Wave Plus](https://z-wavealliance.org/z-wave_plus_certification/) controller, to take advantage of the improvements this provides. As OpenZWave doesn't support S2 or Smart Start, there's no need to buy one just for support of these features.

<div class='note'>
  If you're using Hass.io or running Home Assistant in a Docker container, it's recommended to use a USB stick, not a module. Passing a module through Docker is more complicated than passing a USB stick through.
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

It's totally normal for your Z-Wave stick to cycle through its LEDs (Yellow, Blue and Red) while plugged into your system. If you don't like this behavior it can be turned off.

Use the following example commands from a terminal session on your Pi where your Z-Wave stick is connected.

**Note:** You should only do this when Home Assistant has been stopped.

Turn off "Disco lights":

```bash
echo -e -n "\x01\x08\x00\xF2\x51\x01\x00\x05\x01\x51" > /dev/serial/by-id/usb-0658_0200-if00
```

Turn on "Disco lights":

```bash
echo -e -n "\x01\x08\x00\xF2\x51\x01\x01\x05\x01\x50" > /dev/serial/by-id/usb-0658_0200-if00
```

If the above two commands give errors about not having that device, you should try replacing the `/dev/serial/by-id/usb-0658_0200-if00` with `/dev/ttyACM0` or `/dev/ttyACM1` (depending on which tty your Aeotec stick is addressed to).

On some systems, such as macOS, you need to pipe the output of the `echo` command, rather than redirecting to the serial device, to something like `cu` (replacing `/dev/zstick` acccordingly) to properly set the baud rate to 115200 bps:

```bash
echo -e -n "...turn on/off string from examples above..." | cu -l /dev/zstick -s 115200
```

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
