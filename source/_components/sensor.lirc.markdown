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
ha_category: Sensor
featured: false
---

[LIRC](http://www.lirc.org/) integration for Home Assistant allows you to receive signals from an infrared remote control and control actions based on the buttons you press. You can use them to set scenes or trigger any other action. 

Sending IR commands is not supported in this component, but can be accomplished using the [shell_command component](https://home-assistant.io/components/shell_command/) in conjunction with the `irsend` command. 

### {% linkable_title Installation %}

To allow Home Assistant to talk to your IR receiver, you need to first make sure you have the correct dependencies installed:

```bash
$ sudo apt-get install lirc python-lirc
```

<p class='note'>
If you are configuring on a Raspberry Pi, there are excellent instructions with GPIO schematics and driver configurations [here](http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/). Consider following these. 
</p>


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

and pressing some buttons on the remote. 



### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: lirc
```


#### {% linkable_title Events %}

You can activate a scene on a key press with automation scripts like this:

```yaml
# Example configuration.yaml automation entry
automation:
 - alias: Bright on Remote
   trigger:
     platform: state
     entity_id: sensor.lirc
     to: KEY_1
   action:
     service: scene.turn_on
     entity_id: scene.Bright

```

The value *KEY_1* was set by you in the `.lircrc` file. 

The state of this sensor is only set to a non-zero value in the moment that a button is pressed on the remote. 


