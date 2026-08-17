---
title: Wake on LAN
description: Instructions on how to set up the Wake on LAN integration in Home Assistant.
ha_category:
  - Button
  - Network
  - Switch
ha_release: 0.49
ha_iot_class: Local Push
ha_domain: wake_on_lan
ha_config_flow: true
ha_platforms:
  - button
ha_codeowners:
  - '@ntilley905'
ha_integration_type: service
---

The **Wake on LAN** {% term integration %} enables the ability to send _magic packets_ to [Wake on LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) capable devices to turn them on.

There is currently support for the following device types within Home Assistant:

- [Button](#button)

{% tip %}
To implement a switch without using YAML, consider using a [template switch helper](/integrations/template/#switch). Use the Wake on LAN button as the turn on action, a [ping](/integrations/ping) sensor for the state, and a third service for the turn off action.
{% endtip %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Mac address:
  description: "The MAC address to send the wake-up command to. For example, `00:01:02:03:04:05`."
SecureOn password:
  description: "The SecureOn password to append to the magic packet. For example, `00:aa:22:bb:33:cc`."
Broadcast address:
  description: The IP address of the host to send the magic packet to.
Broadcast port:
  description: The port to send the magic packet to.
{% endconfiguration_basic %}

## Button

The `wake_on_lan` (WOL) button {% term integration %} allows you to turn on a [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) enabled computer.

The WOL button can only turn on your computer.
It will send a magic packet to the MAC address specified in the configuration. As a button, it is stateless. This means it cannot monitor if the WOL-enabled computer has actually received the wake-up call and has started.

### Examples

Here are some real-life examples of how to use the **turn_off** variable.

#### Suspending Linux

Suggested recipe for letting the `turn_off` script suspend a Linux computer (the **target**)
from Home Assistant running on another Linux computer (the **server**).

1. On the **server**, log in as the user account Home Assistant is running under. In this example it's `hass`.
2. On the **server**, create a `.ssh` directory in `/config`. This is necessary to avoid a 255 error that prevents the SSH command from executing.
3. On the **server**, create SSH keys by running `ssh-keygen`. Just press enter on all questions.
4. On the **target**, create a new account that Home Assistant can ssh into: `sudo adduser hass`. Just press enter on all questions except password. It's recommended using the same username as on the server. If you do, you can leave out `hass@` in the SSH commands below.
5. On the **server**, transfer your public SSH key by `ssh-copy-id hass@TARGET` where TARGET is your target machine's name or IP address. Enter the password you created in step 4.
6. On the **server**, verify that you can reach your target machine without password by `ssh TARGET`.
7. On the **target**, we need to let the `hass` user execute the program needed to suspend/shut down the target computer. Here it is `pm-suspend`, use `poweroff` to turn off the computer. First, get the full path: `which pm-suspend`. On my system, this is `/usr/sbin/pm-suspend`.
8. On the **target**, using an account with sudo access (typically your main account), `sudo visudo`. Add this line last in the file: `hass ALL=NOPASSWD:/usr/sbin/pm-suspend`, where you replace `hass` with the name of your user on the target, if different, and `/usr/sbin/pm-suspend` with the command of your choice, if different.
9. Create a Wake on LAN config entry with the mac address of your target.
10. Create a Ping config entry with the IP address of your target.
11. On the **server**, add the following to your configuration, replacing TARGET with the target's name (A Template switch {% term helper %} can also be created in the UI):

```yaml
shell_command:
  turn_off_TARGET: "ssh hass@TARGET sudo pm-suspend"

template:
  - switch:
      - name: "TARGET"
        state: "{{ is_state('binary_sensor.PING_ENTITY', 'on') }}"
        turn_on:
          action: button.press
          target:
            entity_id: button.wake_on_lan
        turn_off:
          action: shell_command.turn_off_TARGET
```

## Wake up TV

For many TV's it's not possible to turn them on or off using built-in functionality, but you can send a magic packet to wake them up.

It is optional to have a `turn_off` action, therefore a Template switch {% term helper %} can be useful without one to provide a status and make it easy to turn it on when it's off.

1. Create a Wake on LAN config entry with the mac address of your TV
2. Create a Ping config entry with the IP address of your TV
3. Add the following to your configuration, replacing the entities with their correct entity id (A Template switch {% term helper %} can also be created in the UI):

```yaml
template:
  - switch:
      - name: "TV"
        state: "{{ is_state('media_player.tv', 'on') }}"
        turn_on:
          action: button.press
          target:
            entity_id: button.wake_on_lan
```
