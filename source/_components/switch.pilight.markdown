---
layout: page
title: "Pilight Switch"
description: "Instructions how to have switches using 433 MHz connected to a computer running pilight."
date: 2015-06-10 22:41
sidebar: true
comments: false
sharing: true
footer: true
logo: pilight.png
ha_category: Switch
ha_release: 0.26
ha_iot_class: "Local Polling"
---


The `pilight` switch platform is issuing 433 MHz commands using [pilight](https://www.pilight.org/) to turn a 433 MHz device on or off. The Pilight Home Assistant hub has to be set up.

Additionally RF commands can be defined that trigger this switch to turn on and off. This allows you to also use the remote shipped with your 433 MHz switch without mixing up the Home Assistant states. You can even define several on/off commands, thus several RF remotes to toggle this switch.

To be really sure that Home Assistant knows the actual state of your device it is recommended to use the RF remote with codes unknown to any of your 433 MHz devices. Thus you use the remote to trigger this switch to send the correct RF code to the device.

To define a Pilight switch, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: pilight
    switches:
      Bed light:
        on_code:
          protocol: intertechno_old
          'on': 1
        off_code:
          protocol: intertechno_old
          'off': 1
```

Configuration variables:

- **switches** array (*Required*): The list that contains all command switches.
  - **[entry]** (*Required*): Name of the command switch. Multiple entries are possible.
    - **on_code** (*Required*): The code to turn the device on.
    - **off_code** (*Required*): The code to turn the device off.
    - **on_code_receive** (*Optional*): If given, this command will turn the switch on if it is received by Pilight.
    - **off_code_receive** (*Optional*): If given, this command will turn the switch off if it is received by Pilight.

Variables for the different codes (`on_code` and `off_code`):

- **protocol** (*Required*): Protocol to use, eg. `intertechno_old` or `daycom`.
- **systemcode** (*Optional*): The systemcode of the device.
- **unit** (*Optional*): The unit to use.
- **id** (*Optional*): ID of the device
- **state** (*Optional*): `'on'` or `'off'` has to be in apostrophes to be parsed correctly.
- **'off'** (*Optional*): `1` or `0`
- **'on'** (*Optional*): `1` or `0`

For possible code entries look at the [pilight API](https://www.pilight.org/development/api/). All commands allowed by [pilight-send](https://wiki.pilight.org/doku.php/psend) can be used. Which means that if for a certain protocol there are different parameters used, you should be able to replace the variables above by the proper ones required by the specific protocol. When using the `elro_800_switch` or `mumbi` protocol for example, you will have to replace the variable `unit` with `unitcode` or there will be errors occurring.

Variables for the different receive codes (`on_code_receive` and `off_code_receive`):

- **echo** (*Optional*) Set to `true` if the on-/off-code should be sent if the given code was received.

This is useful if you have paired your sender directly with the receiver to prevent sending the signal twice.

## {% linkable_title Examples %}

```yaml
switch:
  - platform: pilight
    switches:
      Bed light:
        on_code:
          protocol: intertechno_old
          unit: 3
          id: 4
          'on': 1
        off_code:
          protocol: intertechno_old
          unit: 3
          id: 4
          'off': 1
        on_code_receive:
          protocol: daycom
          systemcode: 14462
          unit: 6
          id: 34
          state: 'on'
        off_code_receive:
          protocol: daycom
          systemcode: 14462
          unit: 6
          id: 34
          state: 'off'
```
