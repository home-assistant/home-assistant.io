---
title: LIRC
description: Instructions on how to integrate IR remotes with LIRC into Home Assistant.
ha_category:
  - Automation
ha_release: 0.21
ha_iot_class: Local Push
ha_domain: lirc
ha_integration_type: integration
ha_quality_scale: legacy
---

[LIRC](https://www.lirc.org/) integration for Home Assistant allows you to receive signals from an infrared remote control and control actions based on the buttons you press. You can use them to set scenes or trigger any other [automation](/docs/automation/).

Sending IR commands is not supported in this integration (yet), but can be accomplished using the [shell_command integration](/integrations/shell_command/) in conjunction with the `irsend` command.

## Installation

To allow Home Assistant to talk to your IR receiver, you need to first make sure you have the correct dependencies installed:

```bash
sudo apt-get install lirc liblircclient-dev
```

{% note %}

If you are configuring on a Raspberry Pi, there are excellent instructions with GPIO schematics and driver configurations [here](http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/). Take notice, the instructions in this blog are valid for Raspian Jesse where lirc 0.9.0 was included in the Debian package. In Raspian Stretch lirc 0.9.4 is included in the Debian package.
The configuration is slightly different :

- The `hardware.conf` file is not supported, obsoleted by a new `lirc_options.conf` file and systemd unit definitions.
- The former single `lirc` service is replaced with the three systemd services `lircd.service`, `lircmd.service` and `irexec.service`. There is no counterpart to the 0.9.0 `lirc` service which covered all of these. Using a separate transmitter device requires yet another service.
- 0.9.4 defaults to using systemd for controlling the services. This is not just start/stop functionality, systemd is used to implement new features and to address shortcomings in 0.9.0. However, traditional systemV scripts are also installed and could be used although this is less tested and not really documented.

For more information have a look at `/usr/share/doc/lirc/README.Debian.gz` where the update process is explained when you have updated from jessie to stretch.

{% endnote %}

## Configuring LIRC

Now teach LIRC about your particular remote control by preparing a lircd configuration file (`/etc/lirc/lircd.conf`). Search the [LIRC remote database](https://lirc.sourceforge.net/remotes/) for your model. If you can't find it, then you can always use the `irrecord` program to learn your remote. This will create a valid configuration file. Add as many remotes as you want by pasting them into the file. If `irrecord` doesn't work (e.g., for some air conditioner remotes), then the `mode2` program is capable of reading the codes in raw mode, followed by `irrecord -a` to extract hex codes.

Next, you have to make a `~/.lircrc` file that maps keypresses to system actions. The file has to be in the home dir of the user running Home Assistant, e.g., in `/home/homeassistant/.lircrc` if you're running in a virtual env. [The configuration](https://www.lirc.org/html/configure.html) is a bit tedious but it must be done. Use the `prog = home-assistant` for all keys you want to be recognized by Home Assistant. The values you set for `button` must be the same as in the `lircd.conf` file and the values you put for `config` entry will be the sensor value in Home Assistant when you press the button. An example may look like this:

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
ircat home-assistant
```

and pressing some buttons on the remote. You should see them register on the screen if LIRC is properly configured.

## Configuration Home Assistant

```yaml
# Example configuration.yaml entry
lirc:
```

### Events

The LIRC integration fires `ir_command_received` events on the bus. You can capture the events and respond to them in automation scripts like this:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: "Off on Remote"
    triggers:
      - trigger: event
        event_type: ir_command_received
        event_data:
          button_name: KEY_0
    actions:
      - action: homeassistant.turn_off
        target:
          entity_id: group.a_lights
```

The `button_name` data values (e.g., `KEY_0`) are set by you in the `.lircrc` file.
