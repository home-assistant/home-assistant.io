## Flashing an ODROID-N2+

Home Assistant can be flashed to an ODROID-N2+ by connecting the device directly to your computer via the USB-OTG connection on the front of the board. The device contains the Petitboot bootloader, which allows the ODROID-N2+ storage to show up as it were a USB drive.

_All these instructions work the same for the ODROID-N2 (non-plus version)._

### What you will need

To flash your eMMC using Petitboot and OTG-USB, you will need the following items:

- HDMI cable and monitor
- USB keyboard
- USB 2.0 to micro-USB cable
- If your board came in a Home Assistant Blue: No.2 hex key to open the case

### Enabling SPI boot mode

To enable the SPI boot mode:

1. Power off the ODROID-N2+ by unplugging the power cable.
2. Remove the case.

   ![Photo of the removed case](/images/hassio/screenshots/case-removed.jpg)

3. Locate the toggle for boot mode and switch it from MMC to SPI.

   ![Photo of the SPI toggle switch](/images/hassio/screenshots/toggle_spi.jpg)
   
4. Connect the ODROID-N2+ directly to your computer via the USB-OTG port located on the front of the board.
5. Connect a USB keyboard and a monitor (using HDMI) to your ODROID-N2+.
6. Plug in the power cable to power on the ODROID-N2+.

### Enabling USB drive mode

After The ODROID-N2+ is set to SPI boot mode and powered on, it boots into a terminal. To enable the USB drive mode:

1. Select `Exit to shell` from the menu.

   ![Exit to shell](/images/hassio/screenshots/exit-shell.png)

{% note %}
When using the command line, it may return the following message:
`can't access tty; job control turned off.`
You can safely ignore this message and proceed with the installation
{% endnote %}

1. Use the following command at the console to confirm the storage device node:

   ```bash
   ls /dev/mmc*
   ```

2. Set the storage device on the ODROID-N2+ as a mass storage device using the `ums` command (USB Mass storage mode).
This will configure the ODROID-N2+ and OTG to act as a memory card reader:

   ```bash
   ums /dev/mmcblk0
   ```

### Flashing Home Assistant

1. Connect the ODROID-N2+ to your PC via the micro-USB port at the front of the ODROID-N2+. 
2. When the ODROID-N2 is recognized as a USB connected storage device, you can flash the eMMC with [Etcher](https://www.balena.io/etcher/).
   - Use the latest stable version of Home Assistant OS for the [ODROID-N2+](https://github.com/home-assistant/operating-system/releases/download/{{site.data.version_data.hassos['odroid-n2']}}/haos_odroid-n2-{{site.data.version_data.hassos['odroid-n2']}}.img.xz) (haos_odroid-n2-{{site.data.version_data.hassos['odroid-n2']}}.img.xz).
   - In Balena, use **Flash from file**. **Flash from URL** does not work on all systems.

3. When the flash process is complete, disconnect the ODROID-N2+ from your PC.
   - Remove the power cable.
   - Remove the USB and HDMI cables.
   - Make sure to toggle the boot mode switch back to MMC.

4. Put the ODROID back in its case.
5. Connect your ODROID-N2+ to your network with an Ethernet cable, make sure there is internet access, and plug in power.

6. If your router supports mDNS, you can reach your installation at `http://homeassistant.local:8123`. 
   - If your network doesn’t support mDNS, you’ll have to use the IP address of your ODROID-N2+ instead of `homeassistant.local`. For example, `http://192.168.0.9:8123`.
   - You should be able to find the IP address of your ODROID-N2+ from the admin interface of your router.
7. Continue with [onboarding](/getting-started/onboarding/).