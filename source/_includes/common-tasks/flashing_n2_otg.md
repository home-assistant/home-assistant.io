## Flashing an ODROID-N2+

Home Assistant can be flashed to an ODROID-N2+ by connecting the device directly to your computer via the USB-OTG connection on the front of the board. The device contains the Petitboot bootloader, which allows the ODROID-N2+ storage to show up as it were a USB drive.

_All these instructions work the same for the ODROID-N2 (non-plus version)._

#### What you will need

To flash your eMMC using Petitboot and OTG-USB, you will need the following items:

- HDMI cable and monitor
- USB keyboard
- USB 2.0 to micro-USB cable

#### Enabling SPI boot mode

To enable the SPI boot mode:

1. Power off the ODROID-N2+ by unplugging the power cable.
1. Remove the case.

   ![Photo of the removed case](/images/hassio/screenshots/case-removed.jpg)

1. Locate the toggle for boot mode and switch it from MMC to SPI.

   ![Photo of the SPI toggle switch](/images/hassio/screenshots/toggle_spi.jpg)
   
1. Connect the ODROID-N2+ directly to your computer via the USB-OTG port located on the front of the board.
1. Connect a USB keyboard and a monitor (using HDMI) to your ODROID-N2+.
1. Plug in the power cable to power on the ODROID-N2+.

#### Enabling USB drive mode

After The ODROID-N2+ is set to SPI boot mode and powered on, it boots into a terminal. To enable the USB drive mode:

1. Select `Exit to shell` from the menu.

   ![Exit to shell](/images/hassio/screenshots/exit-shell.png)

<div class='note'>

When using the command line, it may return the following message:
`can't access tty; job control turned off.`
You can safely ignore this message and proceed with the installation

</div>

2. Use the following command at the console to confirm the storage device node:

   ```bash
   ls /dev/mmc*
   ```

3. Set the storage device on the ODROID-N2+ as a mass storage device using the `ums` command (USB Mass storage mode).
This will configure the ODROID-N2+ and OTG to act as a memory card reader:

   ```bash
   ums /dev/mmcblk0
   ```

#### Flashing Home Assistant

Connect the ODROID-N2+ to your PC via the micro-USB port at the front of the ODROID-N2+. When the ODROID-N2 is recognized as a USB connected storage device, you can flash the eMMC with [Etcher](https://www.balena.io/etcher/) using the latest stable version of Home Assistant OS for the [ODROID-N2+](https://github.com/home-assistant/operating-system/releases/download/{{site.data.version_data.hassos['odroid-n2']}}/haos_odroid-n2-{{site.data.version_data.hassos['odroid-n2']}}.img.xz) (haos_odroid-n2-{{site.data.version_data.hassos['odroid-n2']}}.img.xz).

When the flash process is complete, disconnect the ODROID-N2+ from your PC and remove the power cable. Remove the USB and HDMI cable, and make sure to toggle the boot mode switch back to MMC.

Once it is back in its case, connect your ODROID-N2+ to your network with an Ethernet cable and plug in power.

If your router supports mDNS, you will be able to reach your installation on `http://homeassistant.local:8123`.  If your network doesn’t support mDNS, you’ll have to use the IP address of your ODROID-N2+ instead of `homeassistant.local`. For example, `http://192.168.0.9:8123`. You should be able to find the IP address of your ODROID-N2+ from the admin interface of your router.
