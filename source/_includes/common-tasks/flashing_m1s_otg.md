## Flashing an ODROID-M1S

Home Assistant can be flashed to an ODROID-M1S by connecting the device directly to your computer via the USB-OTG connection on the front of the board. 
Unlike other ODROID boards the M1S does not have a socket for an optionl eMMC module. It also does not have a separate flash chip that holds a dedicated bootloader.
Instead the M1S has a build-in 64GB eMMC soldered directly on the board that holds a petitboot bootloader by default. This guide will show you how to flash HAOS to the build-in eMMC.

<ins>**Warning:</ins> This will erase the petitboot bootloader from the eMMC and replace it by a u-boot bootloader. After that it requires special tricks to re-flash a petitboot image again.
If you wish to return to any official Hardkernel images then short the maskRom pads near the 40pin connector while booting from a [Hardkernel recovery image](https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide?redirect=1#user_installer).**

### What you will need

To flash your eMMC using OTG-USB, you will need the following items:

- A small SD card
- Another computer
- USB 2.0 to micro-USB cable
- the special Hardkernel eMMC-to-USB-mass-storage image

### Boot into mass-storage mode
(These steps are identical to the official [Hardkernel wiki](https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide?redirect=1#install_over_usb_from_pc) page.)

1. Download [ODROID-M1S_EMMC2UMS.img](https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img)
2. Use [balena Etcher](https://www.balena.io/etcher/) or another tool to flash the UMS utility onto an SD card.
   - use **Flash from file**. **Flash from URL** does not work on all systems.
      (balena Etcher will complain that something went wring during flashin. You can ignore this message)
3. Plug-in that SD card to your ODROID-M1S and boot it.

### Flashing Home Assistant

1. Connect the ODROID-M1S to your PC via the micro-USB port. 
2. When the ODROID-M1S is recognized as a USB connected storage device, you can flash the eMMC with [Etcher](https://www.balena.io/etcher/).
![ums](https://wiki.odroid.com/_media/odroid-m1s/getting_started/disk_management.png)
   - Use the latest stable version of Home Assistant OS for the [ODROID-M1S](https://github.com/home-assistant/operating-system/releases/download/{{site.data.version_data.hassos['odroid-m1s']}}/haos_odroid-m1s-{{site.data.version_data.hassos['odroid-m1s']}}.img.xz).
   - In Balena, use **Flash from file**. **Flash from URL** does not work on all systems.

3. When the flash process is complete, disconnect the ODROID-M1S from your PC.
   - Remove the power cable.
   - Remove the micro-USB cabel

4. Connect your ODROID-M1S to your network with an Ethernet cable and plug in power.

5. If your router supports mDNS, you can reach your installation at `http://homeassistant.local:8123`. 
   - If your network doesn’t support mDNS, you’ll have to use the IP address of your ODROID-M1S instead of `homeassistant.local`. For example, `http://192.168.0.9:8123`. 
   - You should be able to find the IP address of your ODROID-M1S from the admin interface of your router.
6. Continue with [onboarding](/getting-started/onboarding/).
