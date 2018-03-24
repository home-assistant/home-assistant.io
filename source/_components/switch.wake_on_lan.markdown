---
layout: page
title: "Wake on LAN Switch"
description: "Instructions on how to integrate a wake on lan switch."
date: 2016-03-18 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ethernet.png
ha_category: Switch
ha_release: 0.16
ha_iot_class: "Local Polling"
---

The `wake_on_lan` (WOL) switch platform allows you to turn on a [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) enabled computer.

<p class='note warning'>
The WOL switch can only turn on your computer and monitor the state. There is no universal way to turn off a computer remotely. The `turn_off` variable is there to help you call a script when you have figured out how to remotely turn off your computer.
See below for suggestions on how to do this.
</p>

To enable this switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  - platform: wake_on_lan
    mac_address: "00-01-02-03-04-05"
```

Configuration variables:

- **mac_address** (*Required*): MAC address to send the wake up command to.
- **name** (*Optional*): The name of the switch. Default is 'Wake on LAN'.
- **host** (*Optional*): The IP address or hostname to check the state of the device (on/off).
- **turn_off** (*Optional*): Defines an [action](/getting-started/automation/) to run when the switch is turned off.
- **broadcast_address** (*Optional*): The IP address of the host to send the magic packet to (default 255.255.255.255).

## {% linkable_title Examples %}

Here are some real life examples of how to use the **turn_off** variable.

### {% linkable_title Suspending Linux %}
Suggested recipe for letting the turn_off script suspend a Linux computer (the **target**)
from Home Assistant running on another Linux computer (the **server**).

1. On the **server**, log in as the user account Home Assistant is running under. (I'm using `hass` in this example)
2. On the **server**, create ssh keys by running `ssh-keygen`. Just press enter on all questions.
3. On the **target**, create a new account that Home Assistant can ssh into: `sudo adduser hass`. Just press enter on all questions except password. I recommend using the same user name as on the server. If you do, you can leave out `hass@` in the ssh commands below.
4. On the **server**, transfer your public ssh key by `ssh-copy-id hass@TARGET` where TARGET is your target machine's name or IP address. Enter the password you created in step 3.
5. On the **server**, verify that you can reach your target machine without password by `ssh TARGET`.
6. On the **target**, we need to let the hass user execute the program needed to suspend/shut down the target computer. I'm using `pm-suspend`, use `poweroff` to turn off the computer. First, get the full path: `which pm-suspend`. On my system, this is `/usr/sbin/pm-suspend`.
7. On the **target**, using an account with sudo access (typically your main account), `sudo visudo`. Add this line last in the file: `hass ALL=NOPASSWD:/usr/sbin/pm-suspend`, where you replace `hass` with the name of your user on the target, if different, and `/usr/sbin/pm-suspend` with the command of your choice, if different.
8. On the **server**, add the following to your configuration, replacing TARGET with the target's name:

```yaml
switch:
  - platform: wake_on_lan
    name: "TARGET"
    ...
    turn_off:
      service: shell_command.turn_off_TARGET

shell_command:
  turn_off_TARGET: 'ssh hass@TARGET sudo pm-suspend'
```
