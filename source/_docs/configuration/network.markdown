---
title: "Network"
description: "Change the network settings of your Home Assistant system, such as the hostname, a static IP address, or the Wi-Fi network that it connects to."
related:
  - docs: /integrations/network/
    title: Network integration
  - docs: /integrations/http/
    title: HTTP integration
  - docs: /docs/configuration/remote/
    title: Remote access to Home Assistant
---

You can change the hostname, the IP address, and the Wi-Fi network of your Home Assistant system under {% my network title="**Settings** > **System** > **Network**" %}. These settings are only available on {% term "Home Assistant Operating System" %}.

The **Network** page also has settings for the Home Assistant URL, the network adapter, and the HTTP server. For these, refer to [Remote access to Home Assistant](/docs/configuration/remote/), the [Network integration](/integrations/network/#auto-detection), and the [HTTP integration](/integrations/http/#http-server-settings).

When you open Home Assistant after changing the hostname or the IP address, keep the rest of the address the same: `http://` or `https://`, and the port, if your address has one. For example, `http://homeassistant.local:8123` becomes `http://kitchen.local:8123`.

On {% term "Home Assistant Container" %}, the operating system of your computer manages the network. To change the IP address, the Wi-Fi network, or the hostname, use the settings of that operating system.

## Changing the hostname

The hostname is the name of your system on your network. By default, it's `homeassistant`, so you can reach Home Assistant at `homeassistant.local`. If you have more than one Home Assistant system, give each one its own hostname to avoid hostname conflicts.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.

### To change the hostname

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. In the **Hostname** section, enter the new name, and then select **Save**.
3. Reboot the system.
   - For the steps, refer to [Rebooting the system](/common-tasks/general/restarting/#rebooting-the-system).
4. To open Home Assistant, use the new name.
   - For example, if the new hostname is `kitchen`, `homeassistant.local` in your address changes to `kitchen.local`. Keep `http://` or `https://`, and the port.

## Setting a static IP address

By default, your router assigns an IP address to Home Assistant. This address can change, for example, after a restart of your router. A static IP address doesn't change.

Instead of a static IP address, you can also reserve an IP address for Home Assistant in your router. This is called a DHCP reservation. The router then always assigns the same address. For the steps, refer to the documentation of your router.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- The IP address that you want to use. Choose an address that no other device uses, and that is outside the range of addresses your router assigns automatically.
- The IP address of your router, which is usually the gateway address.

### To set a static IP address

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. In the **Configure network interfaces** section, select the tab of your network interface, for example, `eth0`.
3. Expand **IPv4**, and select **Static**.
   - For an IPv6 address, expand **IPv6** instead. It uses **Subnet prefix** instead of **Netmask**.
   - To turn off an IP version for this interface, select **Disabled**.
4. Enter the following settings:
   - Under **IP address**, enter the address that you want to use. To add more addresses, select **Add address**.
   - Under **Netmask**, enter the netmask of your network, for example, `255.255.255.0`.
   - Under **Gateway address**, enter the IP address of your router.
   - Under **DNS server**, select a DNS server, or select **Custom** and enter the IP address of your router.
5. Select **Save**.
   - Home Assistant warns that you might lose the connection.
6. To open Home Assistant, use the new IP address, with the same `http://` or `https://` and port as before.
   - If you can't reach Home Assistant, refer to [I can't reach Home Assistant after changing the network settings](#symptom-i-cant-reach-home-assistant-after-changing-the-network-settings).

## Connecting to a Wi-Fi network

If your system has a Wi-Fi adapter, Home Assistant can connect to your network over Wi-Fi instead of an Ethernet cable.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- A device with a Wi-Fi adapter.
- The name and the password of your Wi-Fi network.

### To connect to a Wi-Fi network

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. In the **Configure network interfaces** section, select the tab of your Wi-Fi interface, for example, `wlan0`.
   - If there is no tab for a Wi-Fi interface, Home Assistant didn't find a Wi-Fi adapter on your device.
3. Expand **Wi-Fi**, and then select **Search networks**.
4. From the list, select your Wi-Fi network.
5. Select the security type of your network, **Open**, **WEP**, or **WPA-PSK**, and enter the **Wi-Fi password**.
6. Select **Save**.
   - Home Assistant warns that you might lose the connection.
7. To open Home Assistant, use the address that your router assigned to the Wi-Fi interface, or the hostname, for example, `homeassistant.local`. Keep `http://` or `https://`, and the port.
   - If you can't reach Home Assistant, refer to [I can't reach Home Assistant after changing the network settings](#symptom-i-cant-reach-home-assistant-after-changing-the-network-settings).

## Resetting a network interface

If you changed the settings of a network interface and want to start over, you can reset it. This sets **IPv4** and **IPv6** back to **Automatic**, removes the DNS servers, and forgets the Wi-Fi network.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.

### To reset a network interface

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. In the **Configure network interfaces** section, select the tab of the network interface.
3. Select **Reset configuration**, and then select **Save**.
   - The reset only takes effect after you select **Save**.

## Changing network settings from the command line

If you can't reach Home Assistant in your browser, you can change the network settings on the command line. On {% term "Home Assistant Operating System" %}, connect a monitor and a keyboard to your system, or open the console of your virtual machine. The console shows the `ha >` prompt.

At the `ha >` prompt, you enter the commands directly. You don't need to type `ha` first. If you use the command line of the [SSH app](/common-tasks/os/#installing-and-using-the-ssh-app) instead, start each command with `ha`, for example, `ha network info`.

1. To find the name of your network interface, enter `network info`.
   - Interface names differ between devices, for example, `eth0`, `end0`, or `enp0s3`. In the following commands, replace `eth0` and `wlan0` with the names of your interfaces.
2. Change the setting that you need:
   - To let your router assign the IP address again, enter `network update eth0 --ipv4-method auto`.
   - To set a static IP address, enter the address with its subnet prefix, your gateway, and a DNS server, for example:

     ```bash
     network update eth0 --ipv4-method static --ipv4-address 192.168.1.50/24 --ipv4-gateway 192.168.1.1 --ipv4-nameserver 192.168.1.1
     ```

   - To connect to a Wi-Fi network, first enter `network scan wlan0` to see the networks nearby. Then, enter the name and the password of your network, for example:

     ```bash
     network update wlan0 --wifi-mode infrastructure --wifi-ssid "MyWiFi" --wifi-auth wpa-psk --wifi-psk "password" --ipv4-method auto
     ```

   - To change the hostname, enter `host options --hostname kitchen`.

## Troubleshooting

{% details "I can't reach Home Assistant after changing the network settings" %}

### Symptom: I can't reach Home Assistant after changing the network settings

After you changed the IP address or the Wi-Fi network, Home Assistant doesn't open in your browser anymore.

#### Description

Home Assistant now uses a different IP address or network, but your browser still uses the old address. If the new settings are wrong, for example, an address outside your network or a wrong Wi-Fi password, Home Assistant can't connect to your network at all.

#### Resolution

1. Try the new address, or the hostname, for example, `homeassistant.local`, in your browser.
   - If you changed the hostname, use the new name, for example, `kitchen.local`.
   - Keep `http://` or `https://`, and the port, if your address has one. For example, `http://homeassistant.local:8123`.
2. If Home Assistant still doesn't open, connect a monitor and a keyboard to your system, or open the console of your virtual machine.
3. At the `ha >` prompt, let your router assign the IP address again. Enter `network update eth0 --ipv4-method auto`.
   - Replace `eth0` with the name of your interface. To find it, enter `network info`.
   - If your system only connects over Wi-Fi, connect an Ethernet cable first. Or, correct the Wi-Fi settings with the command in [Changing network settings from the command line](#changing-network-settings-from-the-command-line).
4. To find the address that your router assigned, enter `network info`.
5. Open Home Assistant with that address, or with the hostname. Keep `http://` or `https://`, and the port.

{% enddetails %}

{% details "There's no network after changing the network adapter of a virtual machine" %}

### Symptom: There's no network after changing the network adapter of a virtual machine

You run {% term "Home Assistant Operating System" %} in a virtual machine. After you changed the type of its virtual network adapter, Home Assistant has no network access.

#### Description

The new network adapter gets a different interface name inside the virtual machine. The saved network settings no longer match, so the virtual machine starts without network access.

#### Resolution

1. Open the console of the virtual machine.
2. At the `ha >` prompt, enter `login`.
   - Result: You're now in the shell of the operating system.
3. To remove the saved network settings and restart, enter the following commands.
   - This removes the saved settings of all network interfaces, not only the one that changed. This includes saved Wi-Fi networks and static IP addresses. After the restart, set them up again.

   ```bash
   rm -r /mnt/overlay/etc/NetworkManager/system-connections
   reboot
   ```

   - Result: Home Assistant OS creates new network settings for the new interface during the restart. Your router assigns the IP address automatically.

{% enddetails %}
