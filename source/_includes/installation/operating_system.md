## Install Home Assistant Operating System

{% assign release_url = "https://github.com/home-assistant/operating-system/releases/download" %}

{% if site.installation.types[page.installation_type].board %}

Follow this guide if you want to get started with Home Assistant easily or if you have little to no Linux experience.

{% if page.installation_type == 'odroid' %}

## Suggested hardware

You will need a few things to get started with installing Home Assistant. The links below lead to Ameridroid. If you’re not in the US, you should be able to find these items in web stores in your country.

To get started, we suggest the ODROID-N2+, the board that powers our [Home Assistant Blue](/blue/), or the ODROID-M1.

If unavailable, we also recommend the [ODROID-C4](https://ameridroid.com/products/odroid-c4?ref=eeb6nfw07e).

Home Assistant bundles (US market):

The bundles come with Home Assistant pre-installed.

- [ODROID-N2+: 2 GB RAM / 16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44748729286935?ref=eeb6nfw07e)
- [ODROID-N2+: 4 GB RAM / 64 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44748729221399?ref=eeb6nfw07e)
- ODROID-M1: 4 GB RAM / 256 GB NVMe / [16 GB &micro;SD](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44929573028119?ref=eeb6nfw07e) or [16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940567831?ref=eeb6nfw07e)
- ODROID-M1: 8 GB RAM / 256 GB NVMe / [16 GB &micro;SD](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44929573093655?ref=eeb6nfw07e) or [16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940633367?ref=eeb6nfw07e)
- [ODROID-M1: 8 GB RAM / 1 TB NVMe / 64 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940698903?ref=eeb6nfw07e)

Variants without pre-installed Home Assistant:

- ODROID-N2+, [2 GB RAM](https://ameridroid.com/products/odroid-n2-plus?variant=40371828719650?ref=eeb6nfw07e) or [4 GB RAM](https://ameridroid.com/products/odroid-n2-plus?variant=40371828752418?ref=eeb6nfw07e)
- [ODROID-C4](https://ameridroid.com/products/odroid-c4?ref=eeb6nfw07e)
- [ODROID-M1](https://ameridroid.com/products/odroid-M1?ref=eeb6nfw07e)
- ODROID-M1S, [4 GB RAM](https://ameridroid.com/products/odroid-m1s?variant=47425396474135?ref=eeb6nfw07e) or [8 GB RAM](https://ameridroid.com/products/odroid-m1s?variant=47425396506903?ref=eeb6nfw07e)
- [Power Supply](https://ameridroid.com/products/12v-2a-power-supply-plug?ref=eeb6nfw07e)
- [CR2032 Coin Cell](https://ameridroid.com/products/rtc-bios-battery?ref=eeb6nfw07e)
- [eMMC Module](https://ameridroid.com/products/emmc-module-n2-linux-red-dot?ref=eeb6nfw07e)
- [Case](https://ameridroid.com/products/odroid-n2-case?ref=eeb6nfw07e)

*These are affiliated links. We get commissions for purchases made through links in this post.*

{% endif %}

{% if page.installation_type == 'generic-x86-64' %}

{% important %}

<b>Prerequisites</b>

This guide assumes that you have a dedicated {{ site.installation.types[page.installation_type].board }} PC to exclusively run the {% term "Home Assistant Operating System" %}.

- This is typically an Intel or AMD-based system.
- The system must be 64-bit capable and be able to boot using UEFI.
  - Most systems produced in the last 10 years support the UEFI boot mode.

<b>Summary</b>

1. First, you will need to configure your {{ site.installation.types[page.installation_type].board }} PC to use UEFI boot mode.
2. Then, write the {% term "Home Assistant Operating System" %} disk image to your boot medium.

{% endimportant %}

## Configure the BIOS on your x86-64 hardware

To boot Home Assistant OS, the BIOS needs to have UEFI boot mode enabled and Secure Boot disabled. The following screenshots are from a 7th generation Intel NUC system. The BIOS menu will likely look different on your system. However, the options should still be present and named similarly.

1. To enter the BIOS, start up your x86-64 hardware and repeatedly press the `F2` key (on some systems this might be `Del`, `F1` or `F10`).
![Enter BIOS using F2, Del, F1 or F10 key](/images/installation/intel-nuc-enter-bios.jpg)

2. Make sure the UEFI Boot mode is enabled.
![Enable UEFI Boot mode](/images/installation/intel-nuc-uefi-boot.jpg)

3. Disable Secure Boot.
![Disable Secure Boot mode](/images/installation/intel-nuc-disable-secure-boot.jpg)

4. Save your changes and exit.

The BIOS configuration is now complete.

## Write HAOS onto your x86-64 hardware

Next, you need to write the Home Assistant Operating System image to the *boot medium*, which is the medium your x86-64 hardware will boot from when it is running Home Assistant.

{% note %}
HAOS has no integrated installer that writes the image automatically. You will write it manually using either the <b>Disks</b> utility from Ubuntu or Balena Etcher.
{% endnote %}

Typically, an internal medium like S-ATA hard disk, S-ATA SSD, M.2 SSD, or a non-removable eMMC is used for the x86-64 boot medium. Alternatively, an external medium can be used such as a USB SDD, though this is not recommended.

To write the HAOS image to the boot medium on your x86-64 hardware, there are 2 different methods:

  **Method 1 (recommended)**: Boot Ubuntu from a USB flash drive and install the {% term "Home Assistant Operating System" %} from there. It also works on laptops and PCs with internal hard disks.

  **Method 2**: With this method, you write the Home Assistant Operating disk image directly onto a boot medium from your regular computer. The steps are a bit more complex. If you have non-removable internal mediums (for example because you are using a laptop) or do not have the necessary adapter (for example an USB to S-ATA adapter) use method 1 instead.

### Method 1: Installing HAOS via Ubuntu booting from a USB flash drive

#### Required material

- Computer
- The target x86-64 hardware, on which you want to install the {% term "Home Assistant Operating System" %} (HAOS)
- USB flash drive (USB thumb drive is sufficient, it should be at least 4&nbsp;GB in size)
- Internet connection

#### To install HAOS via Ubuntu from a USB flash drive

1. **Notice**: This procedure will write the {% term "Home Assistant Operating System" %} onto your device.
   - This means you will lose all the data as well as the previously installed operating system.
   - Back up your data before carrying out this procedure.
2. Create a *live operating system* on a USB flash drive:
   - Follow the [Ubuntu Desktop instructions](https://ubuntu.com/tutorials/try-ubuntu-before-you-install) on writing an Ubuntu Desktop iso file onto a USB device.
3. Insert the USB flash drive into the system on which you want to run Home Assistant.
   - Boot the live operating system.
   - You might need to adjust boot order or use F10 (might be a different F-key depending on the BIOS) to select the USB flash drive as boot device.
4. When prompted, make sure to select **Try Ubuntu**. This runs Ubuntu on the USB flash device.
   - The system then starts Ubuntu.
   - Connect your system to your network and make sure it has internet access.
5. In Ubuntu, open a browser and open the current documentation page, so you can follow the steps.
   - From there, [download the image][generic-x86-64].
6. In Ubuntu, in the bottom left corner, select **Show Applications**.
7. In the applications, search and open **Disks** and start restoring the HAOS image:
   1. In **Disks**, on the left side, select the internal disk device you want to install HAOS onto.
   2. On top of the screen, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Restore Disk Image...**.
      ![Restore disk image: select three dots menu](/images/installation/ubuntu_restore_disk_image.png)
   3. Select the image you just downloaded.
      ![Restore disk image: select image](/images/installation/select_haos.png)
   4. Select **Start Restoring...**.
      ![Restore disk image: start restoring](/images/installation/start_restoring.png)
   5. Confirm by selecting **Restore**.
      ![Restore disk image: select Restore](/images/installation/restore.png)
      - If you are getting an **Error unmounting filesystem** error message, stating that the **target is busy**:
      - Most likely, you are running Ubuntu on your internal disk. Instead, you need to run it on your stick.
        - Go back to step 3 and during start up, make sure you select **Try Ubuntu** (and NOT **Install Ubuntu**).
   6. In the partitions overview, you should now see the restore operation in progress.
      - The Home Assistant Operating System is now being installed on your system.
        ![Restore disk image: Restoring...](/images/installation/haos_restoring.png)
8. Once the Home Assistant Operating System is installed, shut down the system.
   - Once Ubuntu has been shut down, remove the USB flash drive (Ubuntu will inform you when this is the case).
   - Your Home Assistant server is now set up and you can start using it.
   - To use it, proceed as described under [start up your generic x86-64](/installation/generic-x86-64#start-up-your-generic-x86-64).

### Method 2: Installing HAOS directly from a boot medium

{% note %}
Use this method only if Method 1 does not work for you.
{% endnote %}

#### Required material

- Computer
- The target x86-64 hardware, on which you want to install the {% term "Home Assistant Operating System" %} (HAOS)
- Boot medium
- Internet connection

#### Write the image to your boot medium

{% else %}

### Write the image to your boot medium

{% endif %}

1. **Notice**: This procedure will write the {% term "Home Assistant Operating System" %} onto your device.
   - This means you will lose all the data as well as the previously installed operating system.
   - Back up your data before continuing with the next step.
2. Attach the Home Assistant boot medium ({{site.installation.types[page.installation_type].installation_media}}) to your computer.
    {% if page.installation_type == 'odroid' %}
      If you are using ODROID-M1, note that booting from NVMe is not supported. If you want to boot from eMMC, [update the firmware](https://github.com/home-assistant/operating-system/blob/dev/Documentation/boards/hardkernel/odroid-m1.md) before installing the image.

      If you are using a [Home Assistant Blue](/blue) or ODROID-N2+, you can [attach your device directly](/installation/odroid#flashing-an-odroid-n2).

      If you are using an ODROID-M1S, you need to follow this guide to [boot your device into UMS mode](/installation/odroid#flashing-an-odroid-m1s).
    {% endif %}
3. Download and start <a href="https://www.balena.io/etcher" target="_blank">Balena Etcher</a>. You may need to run it with administrator privileges on Windows.
4. Download the image to your computer.
   - Copy the URL for the image.
   - If there are multiple links below, make sure to select the correct link for your version of {{site.installation.types[page.installation_type].board}}.
{% if site.installation.types[page.installation_type].variants.size > 1 %}
{% tabbed_block %}
{% for variant in site.installation.types[page.installation_type].variants %}

- title: {{ variant.name }}
  content: |

    ```text
    {{release_url}}/{{site.data.version_data.hassos[variant.key]}}/haos_{{ variant.key }}-{{site.data.version_data.hassos[variant.key]}}.img.xz
    ```

    {% if variant.key == "odroid-n2" %}
    [Guide: Flashing ODROID-N2 using OTG-USB](/installation/odroid#flashing-an-odroid-n2)
    {% elsif variant.key == "odroid-m1s" %}
    [Guide: Flashing ODROID-M1S using OTG-USB](/installation/odroid#flashing-an-odroid-m1s)
    {% elsif variant.key == "rpi4" or variant.key == "rpi3" %}
      *(64-bit is recommended)*
    {% endif %}

{% endfor %}
{% endtabbed_block %}
{% else %}

```text
{% assign board_key = site.installation.types[page.installation_type].variants[0].key %}
{{release_url}}/{{site.data.version_data.hassos[board_key]}}/haos_{{ board_key }}-{{site.data.version_data.hassos[board_key]}}.img.xz
```

{% endif %}

*Select and copy the URL or use the "copy" button that appear when you hover it.*

5. Paste the URL into your browser to start the download.
6. Extract the file you just downloaded.
7. Select **Flash from file** and select the image you just extracted.
   - Do not use **Flash from URL**. It does not work on some systems.

  ![Screenshot of the Etcher software showing flash from URL selected.](/images/installation/etcher1_file.png)
8. **Select target**.
![Screenshot of the Etcher software showing the select target button highlighted.](/images/installation/etcher3.png)
9. Select the boot medium ({{site.installation.types[page.installation_type].installation_media}}) you want to use for your installation.
![Screenshot of the Etcher software showing the targets available.](/images/installation/etcher4.png)
10. Select **Flash!** to start writing the image.
   - If the operation fails, decompress the .xz file and try again.
![Screenshot of the Etcher software showing the Flash button highlighted.](/images/installation/etcher5.png)
   - When Balena Etcher has finished writing the image, you will see a confirmation.
![Screenshot of the Etcher software showing that the installation has completed.](/images/installation/etcher6.png)

### Start up your {{site.installation.types[page.installation_type].board}}

{% if page.installation_type == 'generic-x86-64' %}

- If you used method 1 for the installation, make sure the USB flash drive is removed from the system.

- If you used method 2 for the installation, install the boot medium into your x86-64 hardware.

1. Plug in an Ethernet cable that is connected to the network and to the internet.
   - Note: Internet is required because the newly installed Home Assistant OS does not contain all Home Assistant components yet. It downloads the latest version of Home Assistant Core on first start.
2. Power the system on. If you have a screen connected to the {{site.installation.types[page.installation_type].board}} system, after a minute or so the Home Assistant welcome banner will appear in the console.

{% note %}

If the machine complains about not being able to find a bootable medium, you might need to specify the EFI entry in your BIOS.
This can be accomplished either by using a live operating system (e.g. Ubuntu) and running the following command (replace `<drivename>` with the appropriate drive name assigned by Linux, typically this will be `sda` or `nvme0n1` on NVMe SSDs):

  ```text
  efibootmgr --create --disk /dev/<drivename> --part 1 --label "HAOS" \
     --loader '\EFI\BOOT\bootx64.efi'
  ```

The efibootmgr command will only work if you booted the live operating system in UEFI mode, so be sure to boot from your USB flash drive in this mode.
Depending on your privileges on the prompt, you may need to run efibootmgr using sudo.

Or else, the BIOS might provide you with a tool to add boot options, there you can specify the path to the EFI file:

  ```text
  \EFI\BOOT\bootx64.efi
  ```

{% endnote %}

{% else %}

1. Insert the boot medium ({{ site.installation.types[page.installation_type].installation_media }}) you just created.
2. Plug in an Ethernet cable that is connected to the network and to the internet and power the system on.
   - Note: Internet is required because the newly installed Home Assistant OS does not contain all Home Assistant components yet. It downloads the latest version of Home Assistant Core on first start.

{% endif %}

3. In the browser of your desktop system, within a few minutes you will be able to reach your new Home Assistant at <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>.

{% note %}
If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your {{site.installation.types[page.installation_type].board}}’s IP address).
{% endnote %}

{% else %}

### Download the appropriate image

- [VirtualBox][vdi] (.vdi)
{% if page.installation_type == 'linux' %}
- [KVM][qcow2] (.qcow2)
{% elsif page.installation_type == 'alternative' %}
- [KVM/Proxmox][qcow2] (.qcow2)
- [VMware ESXi/vSphere][Virtual Appliance] (.ova)
{% endif %}
{% if page.installation_type == 'windows' %}
- [VMware Workstation][vmdk] (.vmdk)
- [Hyper-V][vhdx] (.vhdx)
{% endif %}

After downloading, decompress the image. If the image comes in a ZIP file, for example, unzip it.

Follow this guide if you already are running a supported virtual machine hypervisor. If you are not familiar with virtual machines, install Home Assistant OS directly on a [Home Assistant Yellow](/installation/yellow), a [Raspberry Pi](/installation/raspberrypi), or an [ODROID](/installation/odroid).

{% if page.installation_type == 'macos' %}

- If VirtualBox is not supported on your Mac, and you have experience using virtual machines, you can try running the Home Assistant Operating System on [UTM](https://mac.getutm.app/).
{% endif %}

### Create the virtual machine

Load the appliance image into your virtual machine hypervisor. (Note: You are free to assign as much resources as you wish to the VM, please assign enough based on your add-on needs).

Minimum recommended assignments:

- 2 GB RAM
- 32 GB Storage
- 2vCPU

*All these can be extended if your usage calls for more resources.*

### Hypervisor specific configuration

{% tabbed_block %}

- title: VirtualBox
  content: |
    1. Create a new virtual machine.
    2. Select type **Linux** and version **Linux 2.6 / 3.x / 4.x (64-bit)**.
    3. Under **Hardware**, select the amount of memory and number of CPUs. Then, select **Enable EFI**.
       - Make sure **EFI** is enabled. If EFI is not enabled, HAOS won't boot.
    4. Under **Hard Disk**, select **Use an existing virtual hard disk file**, select the unzipped VDI file from above.
    5. Then go to **Network** > **Adapter 1**. Choose **Bridged Adapter** and choose your network adapter.  
      {% icon "mdi:alert-outline" %} Please keep in mind that the bridged
      adapter only functions over a hardwired Ethernet connection.
      Using Wi-Fi on your VirtualBox host is unsupported.
    6. Then go to <b>Audio</b> and choose <b>Intel HD Audio</b> as audio controller.

    {% icon "mdi:alert-outline" %}  By default, VirtualBox does not
    free up unused disk space. To automatically shrink the vdi disk image the `discard` option must
    be enabled using your host machine's terminal:

    ```bash
    VBoxManage storageattach <VM name> --storagectl "SATA" --port 0 --device 0 --nonrotational on --discard on
    ```

    More details can be found about the command can be found [here](https://www.virtualbox.org/manual/ch08.html#vboxmanage-storageattach).

{% unless page.installation_type == 'macos' %}

- title: Unraid
  content: |
    1. Download the **.qcow2** image above and decompress it. (**Extract all** in Windows)
    2. Store the image in the **isos** share on your server.
    3. Make sure under **Settings** > **VM manager**, **Enable VMs** is enabled.
    4. Create a new virtual machine: **VMS** > **Add VM**.
    5. Select type **Linux** and give the VM a name and a description.
    6. Select the CPU cores you want to let the VM use and give it some memory.
    7. Under **Primary vDisk Location**, select **Manual** and then select the qcow2 image.
    8. Select your keyboard language under **VM Console Keyboard**.
    9. Select **br0** under **Network Source**.
    10. Select **virtio** under **Network model**.
    11. Select any USB-devices that you want to pass through to Home Assistant, such as Zigbee- or Z-Wave controllers.
    12. Deselect **Start VM after creation**.
    13. Select **Create**.
    14. Select the name of your new VM and select the capacity number for your disk. Here, you can expand the disk to whatever your needs are. The default is 32&nbsp;GB.
    15. Select the icon of your new VM and select **start with console (VNC)**.

- title: KVM (virt-manager)
  content: |
    1. Create a new virtual machine in `virt-manager`.
    2. Select **Import existing disk image**, provide the path to the QCOW2 image above.
    3. Choose **Generic Default** for the operating system.
    4. Check the box for **Customize configuration before install**.
    5. Under **Network Selection**, select your bridge.
    6. Under customization select **Overview** > **Firmware** > **UEFI x86_64: ...**. Make sure to select a non-secureboot version of OVMF (does not contain the word `secure`, `secboot`, etc.), e.g., `/usr/share/edk2/ovmf/OVMF_CODE.fd`.
    7. Click **Add Hardware** (bottom left), and select **Channel**.
    8. Select device type: **unix**.
    9. Select name: **org.qemu.guest_agent.0**.
    10. Finally, select **Begin Installation** (upper left corner).

- title: KVM (virt-install)
  content: |

    ```bash
    virt-install --name haos --description "Home Assistant OS" --os-variant=generic --ram=4096 --vcpus=2 --disk <PATH TO QCOW2 FILE>,bus=scsi --controller type=scsi,model=virtio-scsi --import --graphics none --boot uefi
    ```

    {% icon "mdi:alert-outline" %} If you have a USB
    dongle to attach, you need to add the option `--hostdev busID.deviceId`. You can
    discover these IDs via the `lsusb` command. As example, if `lsusb` output is:

    ```bash
       Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
       Bus 003 Device 004: ID 30c9:0052 Luxvisions Innotech Limited Integrated RGB Camera
       Bus 003 Device 003: ID 1a86:55d4 QinHeng Electronics SONOFF Zigbee 3.0 USB Dongle Plus V2
       Bus 003 Device 002: ID 06cb:00fc Synaptics, Inc. 
       Bus 003 Device 005: ID 8087:0033 Intel Corp. 
       Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
       Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
       Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
    ```

    You can recognize the Sonoff dongle at `Bus 003 Device 003`. So the command to install the VM will become:

    ```bash
    virt-install --name haos --description "Home Assistant OS" --os-variant=generic --ram=4096 --vcpus=2 --disk <PATH TO QCOW2 FILE>,bus=scsi --controller type=scsi,model=virtio-scsi --import --graphics none --boot uefi --hostdev 003.003
    ```

    Note that this configuration (bus 003, device 003) is just an example, your dongle could be on another bus and/or with another device ID.
    Please check the correct IDs of your USB dongle with `lsusb`.

{% endunless %}

{% if page.installation_type == 'windows' %}

- title: VMware Workstation
  content: |
    1. Start VMware Workstation and select **Create a New Virtual Machine**.
       - Note: the exact name and location of the settings below depend on the VMware version. This procedure is based on version 17.
    2. Select **I will install the operating system later**, then select **Linux** > **Other Linux 5.x kernel 64-bit**.
    3. Give the VM a name, `home-assistant`, and define an easy to reach storage location, such as `C:\home-assistant`.
    4. Specify the disk size and select **Store virtual disk as a single file**.
    5. Select **Customize Hardware**.
    6. Define the amount of memory and the number of cores the VM is allowed to use.
    7. Remove the **New CD/DVD** entry. It will not be used.
    8. Connect an Ethernet cable and make sure it is connected to your network.
    9. Under **Network adapter**, select **Bridged: Connected directly to the physical network**.
       - Make sure **Replicate physical network connection state** is not selected.
       - Select **Configure Adapters**.
       - Make sure all virtual adapters and Bluetooth devices are deselected.
       - Select your host network adapter. Most likely, this is one of the first 2 checkboxes in the list:
         - Select the one for Ethernet.
         - The exact names of these adapters depend on your hardware.
    10. At the end of the wizard, select **Finish**.

      ## Edit the VM settings

      11. In Windows Explorer, navigate to the storage location of your newly created VM, for example under `C:\home-assistant`.
      12. Delete the `home-assistant.vmdk` file.
      3. In the `Downloads` folder, find the `haos_ova_xx.x.vmdk` file. 
         - If you haven't unzipped the archive, unzip it.
         - Within the folder, find the `.vmdk` file and rename it to `home-assistant.vmdk`.
         - Paste the file (not the unzipped folder) into the `C:\home-assistant` folder.
      4. Right-click the `.vmx` file and select **Open with** > **Notepad**.
      5. Under `.encoding`, add a line. Enter `firmware = "efi"`.
      6. Now continue with the next step to start your VM. 
         - If you see a message about side channel mitigations, select **OK**.
         - If you see a message stating that the `.vmdk` file could not be found, in step 3, you likely pasted the folder, not the file. Repeat step 3.


{% elsif page.installation_type == 'alternative' %}

- title: VMware ESXi/vSphere
  content: |
    Use the “E1001” or “E1001E” virtual network adapter. There are confirmed mDNS/Multicast discovery issues when using VMware’s “VMXnet3” virtual network adapter.
{% endif %}
{% if page.installation_type == 'windows' %}
- title: Hyper-V
  content: |
    ⚠️ Hyper-V does not have USB support

    1. Create a new virtual machine.
    2. Select **Generation 2**.
    3. Select **Connection** > **Your Virtual Switch that is bridged**.
    4. Select **Use an existing virtual hard disk** and select the VHDX file from above.

    After creation, go to **Settings** > **Security** and deselect **Enable Secure Boot**.
{% endif %}

{% endtabbed_block %}

### Start up your virtual machine

1. Start the virtual machine.
2. Observe the boot process of the Home Assistant Operating System.
3. Once completed, you will be able to reach Home Assistant on <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>. If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your virtual machine’s IP address).

{% endif %}

{% include installation_survey.html %}

With the Home Assistant Operating System installed and accessible, you can continue with onboarding.

{% include getting-started/next_step.html step="Onboarding" link="/getting-started/onboarding/" %}

{% if page.installation_type == 'odroid' %}

{% include common-tasks/flashing_n2_otg.md %}
{% include common-tasks/flashing_m1s_otg.md %}

{% endif %}

[generic-x86-64]: {{release_url}}/{{site.data.version_data.hassos['generic-x86-64']}}/haos_generic-x86-64-{{site.data.version_data.hassos['generic-x86-64']}}.img.xz
[vmdk]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.vmdk.zip
[vhdx]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.vhdx.zip
[vdi]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.vdi.zip
[qcow2]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.qcow2.xz
[Virtual Appliance]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.ova
