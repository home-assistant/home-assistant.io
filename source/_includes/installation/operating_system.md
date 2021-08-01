## Install Home Assistant Operating System

{% assign release_url = "https://github.com/home-assistant/operating-system/releases/download" %}

{% if site.installation.types[page.installation_type].board %}

Follow this guide if you want to get started with Home Assistant easily or if you have little to no Linux experience

{% if page.installation_type == 'raspberrypi' %}

### Suggested Hardware

We will need a few things to get started with installing Home Assistant. Links below lead to Amazon US. If you’re not in the US, you should be able to find these items in web stores in your country.

- [Raspberry Pi 4](https://amzn.to/2S0Gcl1) (Raspberry Pi 3 is ok too, if you have one laying around)
- [Power Supply for Raspberry Pi 4](https://amzn.to/2ReZ2Vq) or [Power Supply for Raspberry Pi 3](https://amzn.to/2R8yG7h)
- [Micro SD Card](https://amzn.to/2X0Z2di). Ideally get one that is [Application Class 2](https://www.sdcard.org/developers/overview/application/index.html) as they handle small I/O much more consistently than cards not optimized to host applications. A 32 GB or bigger card is recommended.
- SD Card reader. This is already part of most laptops, but you can purchase a [standalone USB adapter](https://amzn.to/2WWxntY) if you don't have one. The brand doesn't matter, just pick the cheapest.
- Ethernet cable. Home Assistant can work with Wi-Fi, but an Ethernet connection is more reliable and highly recommended.

{% endif %}

{% if page.installation_type == 'odroid' %}

### Suggested Hardware

We will need a few things to get started with installing Home Assistant. Links below lead to Ameridroid. If you’re not in the US, you should be able to find these items in web stores in your country.

To get started we suggest the ODROID N2+, it's the most powerful ODROID. It's fast and with built-in eMMC one of the best boards to run Home Assistant. It's also the board that powers our [Home Assistant Blue](/blue/).

- [ODROID N2+](https://ameridroid.com/products/odroid-n2-plus?ref=eeb6nfw07e)
- [Power Supply](https://ameridroid.com/products/12v-2a-power-supply-plug?ref=eeb6nfw07e)
- [CR2032 Coin Cell](https://ameridroid.com/products/rtc-bios-battery?ref=eeb6nfw07e)
- [eMMC Module](https://ameridroid.com/products/emmc-module-n2-linux-red-dot?ref=eeb6nfw07e)
- [Case](https://ameridroid.com/products/odroid-n2-case?ref=eeb6nfw07e)

If unavailable, we also recommend the [ODROID C4](https://ameridroid.com/products/odroid-c4?ref=eeb6nfw07e) or [ODROID XU4](https://ameridroid.com/products/odroid-xu4?ref=eeb6nfw07e).

{% endif %}

{% if page.installation_type == 'tinkerboard' %}

### Suggested Hardware

We will need a few things to get started with installing Home Assistant. Links below lead to Amazon US. If you’re not in the US, you should be able to find it in web stores in your country.

- [Asus Tinkerboard S](https://amzn.to/3fFIcbI)

{% endif %}

### Write the image to your installation media

1. Attach the installation media ({{site.installation.types[page.installation_type].installation_media}}) to your computer
2. Download and start <a href="https://www.balena.io/etcher" target="_blank">Balena Etcher</a>
3. Select "Flash from URL"
![etcher_from_url](/images/installation/etcher1.png)

4. Get the URL for your {{site.installation.types[page.installation_type].board}}:
{% if site.installation.types[page.installation_type].variants.size > 1 %}
{% tabbed_block %}
{% for variant in site.installation.types[page.installation_type].variants %}

- title: {{ variant.name }}
  content: |

    ```text
    {{release_url}}/{{site.data.version_data.hassos[variant.key]}}/hassos_{{ variant.key }}-{{site.data.version_data.hassos[variant.key]}}.img.xz
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
{{release_url}}/{{site.data.version_data.hassos[board_key]}}/hassos_{{ board_key }}-{{site.data.version_data.hassos[board_key]}}.img.xz
```

{% endif %}

_Select and copy the URL or use the "copy" button that appear when you hover it._

1. Paste the URL for your {{site.installation.types[page.installation_type].board}} into Balena Etcher and click "OK"
![etcher_from_url_paste](/images/installation/etcher2.png)
6. Balena Etcher will now download the image, when that is done click "Select target"
![etcher_select_target](/images/installation/etcher3.png)
7. Select the {{site.installation.types[page.installation_type].installation_media}} you want to use for your {{site.installation.types[page.installation_type].board}}
![etcher_select_target](/images/installation/etcher4.png)
8. Click on "Flash!" to start writing the image
![etcher_select_target](/images/installation/etcher5.png)
9. When Balena Etcher is finished writing the image you will get this confirmation
![etcher_select_target](/images/installation/etcher6.png)

### Start up your {{site.installation.types[page.installation_type].board}}

1. Insert the installation media ({{site.installation.types[page.installation_type].installation_media}}) you just created
2. Attach a ethernet cable for network.
3. Attach a cable for power
4. Within a few minutes you will be able to reach Home Assistant on <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>. If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your {{site.installation.types[page.installation_type].board}}’s IP address).


{% else %}

{% if page.installation_type != 'nuc' %}
Follow this guide if you already are running a hypervisor, if not look at the [Raspberry Pi](/installation/raspberrypi) or the [ODROID](/installation/odroid)
{% endif %}

### Download the appropriate image

{% if page.installation_type == 'nuc' %}
- [Intel NUC][intel-nuc]
{% else %}
- [VirtualBox][vdi] (.vdi)
{% if page.installation_type == 'macos' %}
- [KVM][qcow2] (.qcow2)
{% endif %}
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
{% endif %}
{% if page.installation_type == "nuc" %}

1. Install the operating system from the link above on the drive you have on the NUC.
2. Start the NUC with the drive you installed the operating system to as the boot device.
3. Once the initial setup has completed you will be able to reach Home Assistant on <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>. If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your {{site.installation.types[page.installation_type].board}}’s IP address).
{% else %}

### Create the Virtual Machine

Load the appliance image into your virtual machine software. (Note: You are free to assign as much resources as you wish to the VM, please assign enough based on your add-on needs)

Minimum recommended assignments:

- 2GB RAM
- 32GB Storage
- 2vCPU

_All these can be extended if your usage calls for more resources._

### Hypervisor specific configuration

{% tabbed_block %}

- title: VirtualBox
  content: |
    1. Create a new virtual machine
    2. Select “Other Linux (64Bit)
    3. Select “Use an existing virtual hard disk file”, select the VDI file from above
    4. Edit the “Settings” of the VM and go “System” then Motherboard and Enable EFI
    5. Then “Network” “Adapter 1” Bridged and your adapter.

- title: KVM
  content: |
    1. Create a new virtual machine in `virt-manager`
    2. Select “Import existing disk image”, provide the path to the QCOW2 image above
    3. Choose “Generic Default” for the operating system
    4. Check the box for “Customize configuration before install”
    5. Select your bridge under “Network Selection”
    6. Under customization select “Overview” -> “Firmware” -> “UEFI x86_64: …”.****

{% if page.installation_type == 'windows' or page.installation_type == 'linux' %}

- title: Vmware Workstation
  content: |
    1. Create a new virtual machine
    2. Select “Custom”, make it compatible with the default of Workstation and ESX
    3. Choose “I will install the operating system later”, select “Linux” -> “Other Linux 5.x or later kernel 64-bit”
    4. Select “Use Bridged Networking”
    5. Select “Use an existing virtual disk” and select the VMDK file above,

    After creation of VM go to “Settings” and “Options” then “Advanced” and select “Firmware type” to “UEFI”.

{% elsif page.installation_type == 'alternative' %}

- title: VMware ESXi/vSphere
  content: |
    Use the “E1001” or “E1001E” virtual network adapater. There are confirmed mDNS/Multicast discovery issues when using VMware’s “VMXnet3” virtual network adapter.
{% endif %}
{% if page.installation_type == 'windows' %}
- title: Hyper-V
  content: |
    <div class='note warning'>
        Hyper-V does not have USB support
    </div>

    1. Create a new virtual machine
    2. Select “Generation 2”
    3. Select “Connection -> “Your Virtual Switch that is bridged”
    4. Select “Use an existing virtual hard disk” and select the VHDX file from above

    After creation go to “Settings” -> “Security” and deselect “Enable Secure Boot”.
{% endif %}

{% endtabbed_block %}

### Start up your Virtual Machine

1. Start the Virtual Machine
2. Observe the boot process of Home Assistant Operating System
3. Once completed you will be able to reach Home Assistant on <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>. If you are running an older Windows version or have a stricter network configuration, you might need to access Home Assistant at <a href="http://homeassistant:8123" target="_blank">homeassistant:8123</a> or `http://X.X.X.X:8123` (replace X.X.X.X with your {{site.installation.types[page.installation_type].board}}’s IP address).

{% endif %}

{% endif %}

With the Home Assistant Operating System installed and accessible you can continue with onboarding.

{% include getting-started/next_step.html step="Onboarding" link="/getting-started/onboarding/" %}


[intel-nuc]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/hassos_intel-nuc-{{site.data.version_data.hassos['ova']}}.img.xz
[vmdk]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/hassos_ova-{{site.data.version_data.hassos['ova']}}.vmdk.xz
[vhdx]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/hassos_ova-{{site.data.version_data.hassos['ova']}}.vhdx.xz
[vdi]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/hassos_ova-{{site.data.version_data.hassos['ova']}}.vdi.xz
[qcow2]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/hassos_ova-{{site.data.version_data.hassos['ova']}}.qcow2.xz
[Virtual Appliance]: {{release_url}}/{{site.data.version_data.hassos['ova']}}/hassos_ova-{{site.data.version_data.hassos['ova']}}.ova
