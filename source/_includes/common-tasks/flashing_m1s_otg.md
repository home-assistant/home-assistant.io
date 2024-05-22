## Flashing an ODROID-M1S

Home Assistant can be flashed to an ODROID-M1S by connecting the device directly to your computer via the USB-OTG connection on the front of the board. 
Unlike other ODROID boards, the M1S does not have a socket for an optional  <abbr title="embedded MultiMediaCard">eMMC</abbr> module. It also does not have a separate flash chip that holds a dedicated bootloader.
Instead, the M1S has a build-in 64GB <abbr title="embedded MultiMediaCard">eMMC</abbr> soldered directly on the board that holds a bootloader by default. This guide will show you how to install the {% term "Home Assistant Operating System" %} to the built-in <abbr title="embedded MultiMediaCard">eMMC</abbr>.

<ins>**Warning:</ins> Installing Home Assistant OS replaces the firmware and <abbr title="secondary program loader">SPL</abbr> on the <abbr title="embedded MultiMediaCard">eMMC</abbr> with the mainline version provided by the Home Assistant OS. As a result, it is not possible to use the SD card with the EMMC2UMS image anymore, because the mainline <abbr title="secondary program loader">SPL</abbr> is not compatible with U-Boot in the EMMC2UMS image at this time (February 2024). This does not pose any problem for standard use, just makes it more complicated in case you want to return to the Hardkernel-provided OS (see [HK Recovery](#hk-recovery)).**

### What you will need

To flash your <abbr title="embedded MultiMediaCard">eMMC</abbr> using <abbr title="USB-On-The-Go">USB-OTG</abbr>, you will need the following items:

- A small SD card
- Another computer
- USB 2.0 to micro-USB cable
- the special Hardkernel eMMC-to-USB-mass-storage image

### Boot into mass-storage mode

(These steps are identical to the official [Hardkernel wiki](https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide?redirect=1#install_over_usb_from_pc) page.)

1. Download [ODROID-M1S_EMMC2UMS.img](https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img).
2. Use [balena Etcher](https://www.balena.io/etcher/) or another tool to flash the UMS utility onto an SD card.
   - Use **Flash from file**. **Flash from URL** does not work on all systems.
      (balena Etcher will complain that something went wrong during flashing. You can ignore this message)
3. Plug-in that SD card to your ODROID-M1S and boot it.

### Flashing Home Assistant M1S

1. Download the latest stable version of Home Assistant OS for the [ODROID-M1S](https://github.com/home-assistant/operating-system/releases/download/{{site.data.version_data.hassos['odroid-m1s']}}/haos_odroid-m1s-{{site.data.version_data.hassos['odroid-m1s']}}.img.xz).
2. Apart from the HAOS image to flash (M1S instead of N2+ version), you can follow the N2+ step-by-step flashing guide [HERE](/common-tasks/os/#flashing-home-assistant).


#### _HK Recovery_

If you want to restore your M1S back into Hardkernel's initial state, you will have to restore the HK's bootloader.
A reliable way of reflashing the eMMC with an operating system of your choice is to use Home Assistant OS to flash the EMMC2UMS image which turns the ODROID-M1S into USB Mass Storage device. Once you have flashed the EMMC2UMS image, you can flash any OS again. You will need a micro USB cable to connect ODROID-M1S to PC.

Note: This commands will render your current Home Assistant OS installation unbootable!

Use the local terminal (HDMI/keyboard) to access the system console. On the Home Assistant CLI (command line), enter `login` to enter the root shell and use `curl` to download an image and `dd` it to the eMMC block device:

```sh
curl https://dn.odroid.com/RK3566/ODROID-M1S/Installer/ODROID-M1S_EMMC2UMS.img | dd of=/dev/mmcblk0
```

This way, the device will start in the UMS mode on the next boot with the SD card removed. Follow the [Install over USB from PC](https://wiki.odroid.com/odroid-m1s/getting_started/os_installation_guide#install_over_usb_from_pc) to install a different operating system.
