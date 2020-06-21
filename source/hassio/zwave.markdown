---
title: "Z-Wave"
description: "Instructions on how-to enable Z-Wave with Hass.io."
---

To enable Z-Wave, plug your Z-Wave USB stick into your Raspberry Pi 3 and add the following to your `configuration.yaml`:

```yaml
zwave:
  usb_path: /dev/ttyACM0
```

## RAZBERRY BOARD

If you need GPIO on Raspberry Pi 3 for your Z-Wave module, add the following line into `config.txt` (you have to access that on the SD card directly. Simply plug it into your PC and edit it there.
The `config.txt` is not accessible from the Home Assistant Operating System, you may need to open the SD card on a Windows or Linux system.:

```txt
dtoverlay=pi3-miniuart-bt
```

After that, you need to change `usb_path` to `/dev/ttyAMA0` in your `configuration.yaml`.

```yaml
zwave:
  usb_path: /dev/ttyAMA0
```

## HUSBZB-1

```yaml
zwave:
  usb_path: /dev/ttyUSB0

zha:
  usb_path: /dev/ttyUSB1
  database_path: /config/zigbee.db
```

## Ubuntu and Debian based host system

If your instance is running on a Debian based system, e.g., Ubuntu, the ModemManager may cause unexpected issues.

The ModemManager might be claiming or interfering with a USB Z-Wave stick, like the much used Aeotec ones. If you experience issues where the stick stops responding, needs to be re-plugged or Home Assistant needs a restart to get Z-Wave back, chances are high that the ModemManager is causing the issue.

Execute the following command on your host system to disable the ModemManager:

```bash
systemctl disable ModemManager.service
```

### Finding the path

If the above defaults don't work, you can check what hardware has been found using the [`ha` command](/hassio/commandline/#hardware):

```bash
ha hardware info
```

Or you can use the UI and look in the *System* section of the *Supervisor* menu. There you'll find a *Hardware* button which will list all the hardware found.

## Further reading

For more information on using Z-Wave, see the [main documentation](/docs/z-wave/).
