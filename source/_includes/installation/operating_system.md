# Install Home Assistant Operating System

{% assign release_url = "https://github.com/home-assistant/operating-system/releases/download" %}

{% if site.installation.types[page.installation_type].board %}

Follow this guide if you want to get started with Home Assistant easily or if you have little to no Linux experience.

{% if page.installation_type == 'odroid' %}

## Suggested hardware

We will need a few things to get started with installing Home Assistant. The links below lead to Ameridroid. If you’re not in the US, you should be able to find these items in web stores in your country.

To get started, we suggest the ODROID N2+, the board that powers our [Home Assistant Blue](/blue/), or the ODROID M1.

If unavailable, we also recommend the [ODROID C4](https://ameridroid.com/products/odroid-c4?ref=eeb6nfw07e).


Home Assistant bundles (US market):

The bundles come with Home Assistant pre-installed.

- [ODROID N2+: 2 GB RAM / 16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44748729286935?ref=eeb6nfw07e)
- [ODROID N2+: 4 GB RAM / 64 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44748729221399?ref=eeb6nfw07e)
- ODROID M1: 4 GB RAM / 256 GB NVMe / [16 GB &micro;SD](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44929573028119?ref=eeb6nfw07e) or [16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940567831?ref=eeb6nfw07e)
- ODROID M1: 8 GB RAM / 256 GB NVMe / [16 GB &micro;SD](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44929573093655?ref=eeb6nfw07e) or [16 GB eMMC](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940633367?ref=eeb6nfw07e)
- [ODROID M1: 8 GB RAM / 1 TB NVMe / 64 GB eMMC ](https://ameridroid.com/products/odroid-n2-home-assistant-blue-bundle-limited-edition?variant=44994940698903?ref=eeb6nfw07e)

Variants without pre-installed Home Assistant:

- ODROID N2+, [2 GB RAM](https://ameridroid.com/products/odroid-n2-plus?variant=40371828719650?ref=eeb6nfw07e) or [4 GB RAM](https://ameridroid.com/products/odroid-n2-plus?variant=40371828752418?ref=eeb6nfw07e)
- [ODROID C4](https://ameridroid.com/products/odroid-c4?ref=eeb6nfw07e)
- [ODROID M1](https://ameridroid.com/products/odroid-M1?ref=eeb6nfw07e)

- [Power Supply](https://ameridroid.com/products/12v-2a-power-supply-plug?ref=eeb6nfw07e)
- [CR2032 Coin Cell](https://ameridroid.com/products/rtc-bios-battery?ref=eeb6nfw07e)
- [eMMC Module](https://ameridroid.com/products/emmc-module-n2-linux-red-dot?ref=eeb6nfw07e)
- [Case](https://ameridroid.com/products/odroid-n2-case?ref=eeb6nfw07e)

*These are affiliated links. We get commissions for purchases made through links in this post.*

{% endif %}

{% if page.installation_type == 'generic-x86-64' %}

<div class='note'>
<b>Prerequisites</b>

This guide assumes that you have a dedicated {{ site.installation.types[page.installation_type].board }} PC to exclusively run the Home Assistant Operating System.

- This is typically an Intel or AMD-based system.
- The system must be 64-bit capable and be able to boot using UEFI. 
  - Most systems produced in the last 10 years support the UEFI boot mode.

<b>Summary</b>

1. First, you will need to configure your {{ site.installation.types[page.installation_type].board }} PC to use UEFI boot mode.
2. Then, write the Home Assistant Operating System disk image to your boot medium. 

</div>

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

Next, we need to write the Home Assistant Operating System image to the "boot medium", which is the medium your x86-64 hardware will boot from when it is running Home Assistant.

<div class='note'>
HAOS has no integrated installer that writes the image automatically. You must write it manually using a tool like Balena Etcher or the <b>Restore Disks</b> function from Ubuntu.
</div>

Typically an internal medium like S-ATA hard disk, S-ATA SSD, M.2 SSD, or a non-removable eMMC is used for the x86-64 boot medium. Alternatively, an external medium can be used such as a USB SDD, though this is not recommended.

To write the HAOS image to the boot medium on your x86-64 hardware, there are 2 different methods:

  **Method 1**: Recommended method. It also works on laptops and PCs with internal hard disks. This method boots Ubuntu from a USB flash drive and installs the Home Assistant Operating System from there.

  **Method 2**: With this method, you write the Home Assistant Operating disk image directly onto a boot medium. The steps are a bit more complex. If you have non-removable internal mediums (for example because you are using a laptop) or do not have the necessary adapter (for example an USB to eMMC adapter) use method 1 instead.

### Method 1: Installing HAOS via Ubuntu booting from a USB flash drive

#### Required material

- Computer
- The target x86-64 hardware, on which you want to install the Home Assistant Operating System (HAOS)
- USB flash drive (USB thumb drive is sufficient, it should be at least 4GB in size)
- Internet connection

#### To install HAOS via Ubuntu from a USB flash drive

1. **Notice**: This procedure will write the Home Assistant Operating System onto your device.
   - This means you will lose all the data as well as the previously installed operating system.
   - Back up your data before continuing with the next step.
2. Create a so called *live operating system* on a USB flash drive:
   - Follow the ([Ubuntu instructions](https://ubuntu.com/tutorials/try-ubuntu-before-you-install)) on writing an Ubuntu iso file onto a USB device.
3. Insert the USB flash drive into the system on which you want to run Home Assistant.
   - Boot the live operating system.
   - The system then starts Ubuntu.
4. In Ubuntu, open a browser and download the image to your computer.
      - Copy the URL for the image.
  
      {% if site.installation.types[page.installation_type].variants.size > 1 %}
      {% tabbed_block %}
      {% for variant in site.installation.types[page.installation_type].variants %}

      - title: {{ variant.name }}
        content: |

          ```text
          {{release_url}}/{{site.data.version_data.hassos[variant.key]}}/haos_{{ variant.key }}-{{site.data.version_data.hassos[variant.key]}}.img.xz
          ```

          {% if variant.key == "odroid-n2" %}
          [Guide: Flashing Odroid-N2 using OTG-USB](/hassio/flashing_n2_otg/)
          {% elsif variant.key == "rpi4" or variant.key == "rpi3" %}
            _(64-bit is recommended)_
          {% endif %}

      {% endfor %}
      {% endtabbed_block %}
      {% else %}

      ```text
      {% assign board_key = site.installation.types[page.installation_type].variants[0].key %}
      {{release_url}}/{{site.data.version_data.hassos[board_key]}}/haos_{{ board_key }}-{{site.data.version_data.hassos[board_key]}}.img.xz
      ```

      {% endif %}

      _Select and copy the URL or use the "copy" button that appear when you hover it._


       - Paste the URL into your browser to start the download.


      {% endif %}

5. In Ubuntu, in the bottom left corner, select **Show Applications**.
6. In the applications, search and open **Disks** and start restoring the HOAS image:
   1. In **Disks**, on the left side, select the internal disk device you want to install HAOS onto.
   2. On top of the screen, select the three dots menu and select **Restore Disk Image...**.
      ![Restore disk image: select three dots menu](/images/installation/ubuntu_restore_disk_image.png)
   3. Select the image you just downloaded.
      ![Restore disk image: select three dots menu](/images/installation/select_haos.png)
   4. Select **Start Restoring...**.
      ![Restore disk image: select three dots menu](/images/installation/start_restoring.png)
   5. Confirm by selecting **Restore**.
      ![Restore disk image: select three dots menu](/images/installation/restore.png)
   6. In the partitions overview, you should now see the **hassos-boot** partition.
      - The Home Assistant Operating System is now being installed on your system.

### Method 2: Installing HAOS directly from a boot medium

#### Required material

- Computer
- The target x86-64 hardware, on which you want to install the Home Assistant Operating System (HAOS)
- Boot medium
- Internet connection

### Write the image to your boot medium


1. **Notice**: This procedure will write the Home Assistant Operating System onto your device.
   - This means you will lose all the data as well as the previously installed operating system.
   - Back up your data before continuing with the next step.
2. Attach the Home Assistant boot medium ({{site.installation.types[page.installation_type].installation_media}}) to your computer.
    {% if page.installation_type == 'odroid' %}
      If you are using ODROID M1, note that booting from NVMe is not supported. If you want to boot from eMMC, [update the firmware](https://github.com/home-assistant/operating-system/blob/dev/Documentation/boards/hardkernel/odroid-m1.md) before installing the image.

      If you are using a [Home Assistant Blue](/blue) or ODROID N2+, you can [attach your device directly](/common-tasks/os/#flashing-an-odroid-n2).
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
    [Guide: Flashing Odroid-N2 using OTG-USB](/hassio/flashing_n2_otg/)
    {% elsif variant.key == "rpi4" or variant.key == "rpi3" %}
      _(64-bit is recommended)_
    {% endif %}

{% endfor %}
{% endtabbed_block %}
{% else %}

```text
{% assign board_key = site.installation.types[page.installation_type].variants[0].key %}
{{release_url}}/{{site.data.version_data.hassos[board_key]}}/haos_{{ board_key }}-{{site.data.version_data.hassos[board_key]}}.img.xz
```

{% endif %}

_Select and copy the URL or use the "copy" button that appear when you hover it._


5. Paste the URL into your browser to start the download.
6. Select **Flash from file** and select the image you just downloaded.
   - **Flash from URL** does not work on some systems.

  ![Screenshot of the Etcher software showing flash from URL selected.](/images/installation/etcher1_file.png)
7. **Select target**.
![Screenshot of the Etcher software showing the select target button highlighted.](/images/installation/etcher3.png)
8. Select the boot medium ({{site.installation.types[page.installation_type].installation_media}}) you want to use for your installation.
![Screenshot of the Etcher software showing the targets available.](/images/installation/etcher4.png)
9. Select **Flash!** to start writing the image.
![Screenshot of the Etcher software showing the Flash button highlighted.](/images/installation/etcher5.png)
10. When Balena Etcher has finished writing the image, you will see a confirmation.
![Screenshot of the Etcher software showing that the installation has completed.](/images/installation/etcher6.png)

### Start up your {{site.installation.types[page.installation_type].board}}

{% if page.installation_type == 'generic-x86-64' %}


- If you used a live operating system (Ubuntu, Method 1), shut it down and remove the live operating system USB device.

- If you used your desktop system to write the HAOS image directly to a boot medium like an S-ATA SSD (Method 2), connect this back to your {{ site.installation.types[page.installation_type].board }} system.

1. Plug in an Ethernet cable that is connected to the network.
2. Power the system on. If you have a screen connected to the {{site.installation.types[page.installation_type].board}} system, after a minute or so the Home Assistant welcome banner will appear in the console.

<div class="note">

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

</div>

{% else %}

1. Insert the boot medium ({{ site.installation.types[page.installation_type].installation_media }}) you just created.
2. Plug in an Ethernet cable that is connected to the network and power the system on.

{% endif %}

3. In the browser of your desktop system, within a few minutes you will be able to reach your new Home Assistant at <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>.

<div class="note">
If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your {{site.installation.types[page.installation_type].board}}’s IP address).
</div>

{% else %}

### Download the appropriate image

- [VirtualBox][vdi] (.vdi)
{% if page.installation_type == 'windows' or page.installation_type == 'linux' %}
- [KVM][qcow2] (.qcow2)
- [Vmware Workstation][vmdk] (.vmdk)
{% elsif page.installation_type == 'alternative' %}
- [KVM/Proxmox][qcow2] (.qcow2)
- [VMware ESXi/vSphere][Virtual Appliance] (.ova)
{% endif %}
{% if page.installation_type == 'windows' %}
- [Hyper-V][vhdx] (.vhdx)
{% endif %}

After downloading, decompress the image. If the image comes in a ZIP file, for example, unzip it.

Follow this guide if you already are running a supported virtual machine hypervisor. If you are not familiar with virtual machines, we recommend installing Home Assistant OS directly on a [Home Assistant Yellow](/installation/yellow), a [Raspberry Pi](/installation/raspberrypi), or an [ODROID](/installation/odroid).

{% if page.installation_type == 'macos' %}
- If VirtualBox is not supported on your Mac, and you have experience using virtual machines, you can try running the Home Assistant Operating system on [UTM](https://mac.getutm.app/). 
{% endif %}

### Create the virtual machine

Load the appliance image into your virtual machine hypervisor. (Note: You are free to assign as much resources as you wish to the VM, please assign enough based on your add-on needs).

Minimum recommended assignments:

- 2 GB RAM
- 32 GB Storage
- 2vCPU

_All these can be extended if your usage calls for more resources._

### Hypervisor specific configuration

{% tabbed_block %}

- title: VirtualBox
  content: |
    1. Create a new virtual machine.
    2. Select type **Linux** and version **Linux 2.6 / 3.x / 4.x (64-bit)**.
    3. Select **Use an existing virtual hard disk file**, select the unzipped VDI file from above.
    4. Edit the **Settings** of the VM and go to **System** > **Motherboard**. Select **Enable EFI**.
    5. Then go to **Network** > **Adapter 1**. Choose **Bridged Adapter** and choose your network adapter.
    <div class="note warning">
    Please keep in mind that the bridged adapter only functions over a hardwired Ethernet connection.
    Using Wi-Fi on your VirtualBox host is unsupported.
    </div>
    6. Then go to **Audio** and choose **Intel HD Audio** as audio controller.
    <div class="note info">

    By default, VirtualBox does not free up unused disk space. To automatically shrink the vdi disk image
    the `discard` option must be enabled using your host machine's terminal:
    ```bash
    VBoxManage storageattach <VM name> --storagectl "SATA" --port 0 --device 0 --nonrotational on --discard on
    ```
    More details can be found about the command can be found [here](https://www.virtualbox.org/manual/ch08.html#vboxmanage-storageattach).

    </div>

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


{% unless page.installation_type == 'macos' %}
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
    virt-install --name hass --description "Home Assistant OS" --os-variant=generic --ram=2048 --vcpus=2 --disk <PATH TO QCOW2 FILE>,bus=sata --import --graphics none --boot uefi
    ```
    <div class="note info">
    If you have a USB dongle to attach, you need to add the option `--hostdev busID.deviceId`. You can discover these IDs via the `lsusb` command.
    As example, if `lsusb` output is:

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
    virt-install --name hass --description "Home Assistant OS" --os-variant=generic --ram=2048 --vcpus=2 --disk <PATH TO QCOW2 FILE>,bus=sata --import --graphics none --boot uefi --hostdev 003.003
    ```
    Note that this configuration (bus 003, device 003) is just an example, your dongle could be on another bus and/or with another device ID. 
    Please check the correct IDs of your USB dongle with `lsusb`.
    </div>
{% endunless %}

{% if page.installation_type == 'windows' or page.installation_type == 'linux' %}

- title: Vmware Workstation
  content: |
    1. Create a new virtual machine.
    2. Select **Custom**, make it compatible with the default of Workstation and ESX.
    3. Choose **I will install the operating system later**, select **Linux** > **Other Linux 5.x or later kernel 64-bit**.
    4. Select **Use Bridged Networking**.
    5. Select **Use an existing virtual disk** and select the VMDK file above.

    After the VM has been created, go to **Settings** > **Options** > **Advanced**. Under **Firmware type** select **UEFI**.

{% elsif page.installation_type == 'alternative' %}

- title: VMware ESXi/vSphere
  content: |
    Use the “E1001” or “E1001E” virtual network adapter. There are confirmed mDNS/Multicast discovery issues when using VMware’s “VMXnet3” virtual network adapter.
{% endif %}
{% if page.installation_type == 'windows' %}
- title: Hyper-V
  content: |
    <div class='note warning'>
        Hyper-V does not have USB support
    </div>

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
3. Once completed, you will be able to reach Home Assistant on <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>. If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your {{site.installation.types[page.installation_type].board}}’s IP address).

{% endif %}

{% include installation_survey.html %}

With the Home Assistant Operating System installed and accessible, you can continue with onboarding.

{% include getting-started/next_step.html step="Onboarding" link="/getting-started/onboarding/" %}

[generic-x86-64]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_generic-x86-64-{{site.data.version_data.hassos['generic-x86-64']}}.img.xz
[vmdk]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.vmdk.zip
[vhdx]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.vhdx.zip
[vdi]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.vdi.zip
[qcow2]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.qcow2.xz
[Virtual Appliance]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/haos_ova-{{site.data.version_data.hassos['ova']}}.ova
