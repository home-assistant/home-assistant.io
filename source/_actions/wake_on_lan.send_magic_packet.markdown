---
title: "Send magic packet"
action: wake_on_lan.send_magic_packet
domain: wake_on_lan
description: "Sends a magic packet to wake up a device with Wake-on-LAN capabilities."
---

Use this action to send a _magic packet_ to wake up a device by using [Wake-on-LAN](https://en.wikipedia.org/wiki/Wake-on-LAN), for example to turn on a computer from an automation.

{% include actions/ui_header.md %}

To send a magic packet from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Wake on LAN: Send magic packet**.
6. Enter the **MAC address** of the device you want to wake up, and fill in any other options you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You enter the device's MAC address through the **MAC address** option instead.

### Options in the UI

{% options_ui %}
MAC address:
  description: The MAC address of the device to wake up.
SecureOn password:
  description: The SecureOn password, in 6-byte hexadecimal format, to append to the magic packet. For example, `00:aa:22:bb:33:cc`.
Broadcast address:
  description: The IP address to send the magic packet to. Defaults to `255.255.255.255` and is normally not changed.
Broadcast port:
  description: The port to send the magic packet to. Defaults to `9` and is normally not changed.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `wake_on_lan.send_magic_packet`. A basic example looks like this:

{% example %}
action: |
  action: wake_on_lan.send_magic_packet
  data:
    mac: "00:40:13:ed:f1:32"
{% endexample %}

### Options in YAML

{% options_yaml %}
mac:
  description: The MAC address of the device to wake up.
  required: true
  type: string
secureon_password:
  description: The SecureOn password, in 6-byte hexadecimal format, to append to the magic packet. For example, `00:aa:22:bb:33:cc`.
  required: false
  type: string
broadcast_address:
  description: The IP address to send the magic packet to. Normally not changed.
  required: false
  type: string
  default: "255.255.255.255"
broadcast_port:
  description: The port to send the magic packet to. Normally not changed.
  required: false
  type: integer
  default: 9
{% endoptions_yaml %}

## Good to know

- This usually only works if the target device is connected to the same network. Routing the magic packet to a different subnet requires special configuration on your router, or may not be possible. The router feature that does this is often named "IP Helper", but not all routers support it.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
