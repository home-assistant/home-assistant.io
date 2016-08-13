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
ha_release: pre 0.7
---


A switch platform that issues 433 MHz commands using [pilight](https://www.pilight.org/) to turn a 433 MHz device on or off. The pilight HA hub has to be set up.

Additionally RF commands can be defined that trigger this switch to turn on and off. This allows you to also use the remote shipped with your 433 MHz switch without mixing up the HA states. You can even define several on/off commands, thus several RF remotes to toggle this switch.

To be really sure that HA knows the actual state of your device it is recommended to use the RF remote with codes unknown to any of your 433 MHz devices. Thus you use the remote to trigger this switch to send the correct RF code to the device.

To define a pilight switch, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: pilight
  switches:
    Bed light:
      on_code:
        protocol: intertechno_old  # protocol has to be defined
        unit: 3  # these entries are protocol specific and can differ
        id: 4    # these entries are protocol specific and can differ
        'on': 1  # on has to be in apostrophes to be parsed correctly
      off_code:
        protocol: intertechno_old   # protocol has to be defined
        unit: 3  # these entries are protocol specific and can differ
        id: 4  # these entries are protocol specific and can differ
        'off': 1  # off has to be in apostrophes to be parsed correctly
      on_code_receive:  # optional
        protocol: daycom   # protocol has to be defined
        systemcode: 14462  # these entries are protocol specific and can differ
        unit: 6  # these entries are protocol specific and can differ
        id: 34  # these entries are protocol specific and can differ
        state: 'on'  # off has to be in apostrophes to be parsed correctly
      off_code_receive:  # optional
        protocol: daycom   # protocol has to be defined
        systemcode: 14462  # these entries are protocol specific and can differ
        unit: 6  # these entries are protocol specific and can differ
        id: 34  # these entries are protocol specific and can differ
        state: 'off'  # on has to be in apostrophes to be parsed correctly
```

Configuration variables:

- **switches** (*Required*): The array that contains all command switches.
  - **entry** (*Required*): Name of the command switch. Multiple entries are possible.
    - **on_code** (*Required*): The code to turn the device on.
    - **off_code** (*Required*): The code to turn the device off.
    - **on_code_receive** (*Optional*): If given, this command will turn the switch on if it is received by pilight.
    - **off_code_receive** (*Optional*): If given, this command will turn the switch off if it is received by pilight.

For possible code entries look at the [pilight API](https://www.pilight.org/development/api/). All commands allowed by [pilight-send](https://wiki.pilight.org/doku.php/psend) can be used.