---
title: Wake on LAN
description: Instructions on how to setup the Wake on LAN integration in Home Assistant.
ha_category:
  - Network
  - Switch
ha_release: 0.49
ha_iot_class: Local Push
ha_domain: wake_on_lan
ha_platforms:
  - switch
ha_codeowners:
  - '@ntilley905'
ha_integration_type: integration
---

The `wake_on_lan` integration enables the ability to send _magic packets_ to [Wake on LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) capable devices to turn them on.

There is currently support for the following device types within Home Assistant:

- [Switch](#switch)

## Configuration

To use this integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
wake_on_lan:
```

### Component services

Available services: `send_magic_packet`.

#### Service `wake_on_lan.send_magic_packet`

Send a _magic packet_ to wake up a device with 'Wake-On-LAN' capabilities.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `mac`                     |       no | MAC address of the device to wake up.                   |
| `broadcast_address`       |      yes | Optional broadcast IP where to send the magic packet.   |
| `broadcast_port`          |      yes | Optional port where to send the magic packet.           |

Sample service data:

```json
{
   "mac":"00:40:13:ed:f1:32"
}
```

<div class='note'>
This usually only works if the Target Device is connected to the same network. Routing the WakeOnLan packet to a different subnet requires a special configuration on your router or may not be possible.
The Service to Route the packet is most likely named "IP Helper" which may support WakeOnLan, but not all Routers support this.
</div>

## Switch

The `wake_on_lan` (WOL) switch platform allows you to turn on a [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) enabled computer.

### Switch configuration

The WOL switch can only turn on your computer and monitor the state. There is no universal way to turn off a computer remotely. The `turn_off` variable is there to help you call a script when you have figured out how to remotely turn off your computer. See below for suggestions on how to do this.

It's required that the binary `ping` is in your `$PATH`.

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: wake_on_lan
    mac: MAC_ADDRESS
```

{% configuration %}
mac:
  description: "The MAC address to send the wake up command to, e.g, `00:01:02:03:04:05`."
  required: true
  type: string
name:
  description: The name of the switch.
  required: false
  default: Wake on LAN
  type: string
host:
  description: The IP address or hostname to check the state of the device (on/off). If this is not provided, the state of the switch will be assumed based on the last action that was taken.
  required: false
  type: string
turn_off:
  description: Defines an [action](/getting-started/automation/) to run when the switch is turned off.
  required: false
  type: string
broadcast_address:
  description: The IP address of the host to send the magic packet to.
  required: false
  default: 255.255.255.255
  type: string
broadcast_port:
  description: The port to send the magic packet to.
  required: false
  type: integer
{% endconfiguration %}

### Examples

Here are some real-life examples of how to use the **turn_off** variable.

#### Suspending Linux

Recipe for the `turn_off` action to suspend a Linux **target** from Home Assistant running on a Linux **server**. Home Assistant will run a suspend command on the **target** over SSH.

##### On the Target

1. If needed, install OpenSSH server with package manager. For example, on Ubuntu:

```sh
$ sudo apt install openssh-server
```

2. Create a new system user and set password.

```sh
$ sudo adduser --system hass --home /var/hass --shell /bin/sh
$ sudo passwd hass
```

3. Allow the user to suspend without password.

**Note**: Most Linux operating systems (Ubuntu, Fedora, Arch, etc.) utilize systemd and can use the builtin `systemctl` command to manage power states. For other operating systems (Gqentoo, Void, etc.), you will need alternative methods such as `elogind` or `pm-utils`.

```sh
$ echo "hass ALL= NOPASSWD: /usr/bin/systemctl suspend" | sudo tee /etc/sudoers.d/hass-suspend
```

##### On the Server

1. If needed, install OpenSSH client with package manager. For example, on Ubuntu:

```sh
$ sudo apt install openssh-client
```

2. Create a new passwordless SSH key and copy it to the target. If a key already exists, choose a different place to store the key when prompted. If using `docker`, ensure the container has access to the SSH directory by mounting it in.

```sh
$ ssh-keygen -N ""
$ ssh-copy-id hass@TARGET-IP
```

3. Optionally manually verify that the **server** can suspend the **target**.

```sh
$ ssh hass@TARGET-IP sudo /usr/bin/systemctl suspend
```

4. Add the suspend command to `configuration.yaml`.

```yaml
switch:
  - platform: wake_on_lan
    name: "TARGET"
    ...
    turn_off:
      service: shell_command.turn_off_TARGET

shell_command:
  turn_off_TARGET: "ssh hass@TARGET-IP sudo /usr/bin/systemctl suspend"
```
