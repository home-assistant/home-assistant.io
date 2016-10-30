---
layout: page
title: "LIRC"
description: "Instructions how to integrate IR remotes with LIRC into Home Assistant."
date: 2016-05-22 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: lirc.gif
ha_category: Automation
featured: false
ha_release: 0.21
ha_iot_class: "Local Push"
---

[LIRC](http://www.lirc.org/) integration for Home Assistant allows you to receive signals from an infrared remote control and control actions based on the buttons you press. You can use them to set scenes or trigger any other [automation](https://home-assistant.io/components/automation/).

Sending IR commands is not supported in this component (yet), but can be accomplished using the [shell_command component](https://home-assistant.io/components/shell_command/) in conjunction with the `irsend` command.

### {% linkable_title Installation %}

To allow Home Assistant to talk to your IR receiver, you need to first make sure you have the correct dependencies installed:

```bash
$ sudo apt-get install lirc liblircclient-dev
```


<p class='note'>
If you are configuring on a Raspberry Pi, there are excellent instructions with GPIO schematics and driver configurations [here](http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/). Consider following these.
</p>

### {% linkable_title Configuring LIRC %}

Now teach LIRC about your particular remote control by preparing a lircd configuration file (`/etc/lirc/lircd.conf`). Search the [LIRC remote database](http://lirc.sourceforge.net/remotes/) for your model. If you can't find it, then you can always use the `irrecord` program to learn your remote. This will create a valid configuration file. Add as many remotes as you want by pasting them into the file. If `irrecord` doesn't work (e.g. for some air conditioner remotes), then the `mode2` program is capable of reading the codes in raw mode, followed by `irrecord -a` to extract hex codes.

Next, you have to make a `~/.lircrc` file that maps keypresses to system actions. [The configuration](http://www.lirc.org/html/configure.html) is a bit tedious but it must be done. Use the `prog = home-assistant` for all keys you want to be recognized by Home Assistant. The values you set for `button` must be the same as in the `lircd.conf` file and the values you put for `config` entry will be the sensor value in Home Assistant when you press the button. An example may look like this:

```bash
begin
    remote = SONY
    button = KEY_1
    prog   = home-assistant
    config = KEY_1
end
begin
    remote = SONY
    button = KEY_2
    prog   = home-assistant
    config = KEY_2
end
begin
    remote = SONY
    button = KEY_3
    prog   = home-assistant
    config = KEY_3
end
```

Test your LIRC installation before proceeding by running:

```bash
$ ircat home-assistant
```

and pressing some buttons on the remote. You should see them register on the screen if LIRC is properly configured.


### {% linkable_title Configuration Home Assistant %}

```yaml
# Example configuration.yaml entry
lirc:
```

#### {% linkable_title Events %}

The LIRC component fires `ir_command_received` events on the bus. You can capture the events and respond to them in automation scripts like this:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: Off on Remote
    trigger:
      platform: event
      event_type: ir_command_received
      event_data:
        button_name: KEY_0
    action:
      service: homeassistant.turn_off
      entity_id: group.a_lights
```

The `button_name` data values (e.g. `KEY_0`) are set by you in the `.lircrc` file.
