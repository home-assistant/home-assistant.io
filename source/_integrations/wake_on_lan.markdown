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

### Integration services

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

Suggested recipe for letting the `turn_off` script suspend a Linux computer (the **target**)
from Home Assistant running on another Linux computer (the **server**).

1. On the **server**, log in as the user account Home Assistant is running under. In this example it's `hass`.
2. On the **server**, create SSH keys by running `ssh-keygen`. Just press enter on all questions.
3. On the **target**, create a new account that Home Assistant can ssh into: `sudo adduser hass`. Just press enter on all questions except password. It's recommended using the same user name as on the server. If you do, you can leave out `hass@` in the SSH commands below.
4. On the **server**, transfer your public SSH key by `ssh-copy-id hass@TARGET` where TARGET is your target machine's name or IP address. Enter the password you created in step 3.
5. On the **server**, verify that you can reach your target machine without password by `ssh TARGET`.
6. On the **target**, we need to let the `hass` user execute the program needed to suspend/shut down the target computer. Here is it `pm-suspend`, use `poweroff` to turn off the computer. First, get the full path: `which pm-suspend`. On my system, this is `/usr/sbin/pm-suspend`.
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
  turn_off_TARGET: "ssh hass@TARGET sudo pm-suspend"
```

## Helper Button with Automation

A switch defined with the `wake_on_lan` platform will render in the UI with both 'on' and 'off' clickable actions. If you don't intend to use the `turn_off` functionality then using a virtual button & automation will look cleaner and less confusing. It will only have one action.

First define a new helper button. Go to **{% my helpers title="Settings > Devices & Services > Helpers" %}** and click the `+ Create Helper` button. Choose `Button` and give it a name. A button named "Wake PC" will render like this:

![image](https://github.com/home-assistant/home-assistant.io/assets/252209/10e468a0-45c8-4ee7-b69d-596db3845b14)

Then create a new Automation. Go to **{% my automations title="Settings > Automations & Scenes" %}** and click on `+ Create Automation`. The trigger will be on `State` and the entity will be the button you created. Continuin your example, the trigger yaml will look like:

```yaml
platform: state
entity_id:
  - input_button.wake_pc
```

For the action select "Call service" and choose "Wake on LAN: Send magic packet". Type in the target MAC address. (Do not change the broadcast port unless you've configured your device to listen to a different port.) Continuing our example, the action yaml looks like:

```yaml
service: wake_on_lan.send_magic_packet
data:
  broadcast_port: 9
  mac: 00:11:22:33:44:55
```

Save the automation. Now when you active `PRESS` on the helper button in the UI, Home Assistant will send a wake packet to the configured MAC.
