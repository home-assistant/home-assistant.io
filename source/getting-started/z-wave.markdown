---
layout: page
title: "Z-Wave"
description: "Instructions how to integrate your existing Z-Wave within Home Assistant."
date: 2016-02-27 19:59
sidebar: true
comments: false
sharing: true
footer: true
---

[Z-Wave](http://www.z-wave.com/) integration for Home Assistant allows you to observe and control connected Z-Wave devices. Z-Wave support requires a [supported Z-Wave USB stick](https://github.com/OpenZWave/open-zwave/wiki/Controller-Compatibility-List) to be plugged into the host.

There is currently support for switches, lights and sensors. All will be picked up automatically after configuring this platform.

### {% linkable_title Installation %}

To allow Home Assistant to talk to your Z-Wave USB stick you will have to compile the OpenZWave library and install the related [python-OpenZWave package](https://github.com/OpenZWave/python-openzwave). This can be done as follows. _(Note: The Home Assistant docker image and the All In One installer have support for Z-Wave already built-in!)_

Make sure you have the correct dependencies installed before running the script:

```bash
$ sudo apt-get install cython3 libudev-dev python3-sphinx python3-setuptools
```

Make sure you have at least version 0.23 of cython.

```bash
$ sudo pip3 install --upgrade cython
```

Then get the OpenZWave files and switch to the `python3` branch:
<p class='note warning'>Do not use root to build python-openzwave as it will surely fail.</p>
```bash
$ git clone https://github.com/OpenZWave/python-openzwave.git
$ cd python-openzwave
$ git checkout python3
$ PYTHON_EXEC=$(which python3) make build
$ sudo PYTHON_EXEC=$(which python3) make install
```
<p class='note'>
Instead of `make install`, you can alternatively build your own python-openzwave package which can be easily uninstalled:

```$ sudo PYTHON_EXEC=$(which python3) checkinstall --pkgname python-openzwave --pkgversion 1.0 --provides python-openzwave```

</p>

With this installation, your `config_path` needed below will resemble:

```bash
/usr/local/lib/python3.4/dist-packages/libopenzwave-0.3.0b8-py3.4-linux-x86_64.egg/config
```


### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyUSB0
  config_path: /usr/local/share/python-openzwave/config
  polling_interval: 60000
  customize:
    sensor.greenwave_powernode_6_port_energy_10:
        polling_intensity: 1
```

Configuration variables:

- **usb_path** (*Required*): The port where your device is connected to your Home Assistant host.
- **config_path** (*Optional*): The path to the Python Open Z-Wave configuration files.
- **autoheal** (*Optional*): Allows disabling auto ZWave heal at midnight. Defaults to True.
- **polling_interval** (*Optional*): The time period in milliseconds between polls of a nodes value. Be careful about using polling values below 30000 (30 seconds) as polling can flood the zwave network and cause problems.
- **customize** (*Optional*): This attribute contains node-specific override values:
  - **polling_intensity** (*Optional*): Enables polling of a value and sets the frequency of polling (0=none, 1=every time through the list, 2-every other time, etc). If not specified then your device will not be polled.

To find the path of your Z-Wave stick, run:

```bash
$ ls /dev/ttyUSB*
```

Or, on some other systems (such as Raspberry Pi), use:

```bash
$ ls /dev/ttyACM*
```

<p class='note'>
Depending on what's plugged into your USB ports, the name found above may change. You can lock in a name, such as `/dev/zwave`, by following [these instructions](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/). 
</p>

#### {% linkable_title Events %}

**zwave.network_complete**
HomeAssistant will trigger a event when the zwave network is complete. Meaning all of the nodes on the network have been queried. This can take quite som time, depending on wakeup intervals on the battery powered devices on the network.

```yaml
 - alias: ZWave network is complete
   trigger:
     platform: event
     event_type: zwave.network_complete
```

**zwave.network_ready**
HomeAssistant will trigger a event when the zwave network is ready for use. Between `zwave.network_start` and `zwave.network_ready` HomeAssistant will feel sluggish when trying to send commands to zwave nodes. This is because the controller is requesting information from all of the nodes on the network. When this is triggered all awake nodes have been queried and sleeping nodes will be queried when they awake.

```yaml
 - alias: ZWave network is ready
   trigger:
     platform: event
     event_type: zwave.network_ready
```

**zwave.network_start**
HomeAssistant will trigger a event when the zwave network is set up to be started.

```yaml
 - alias: ZWave network is starting
   trigger:
     platform: event
     event_type: zwave.network_start
```

**zwave.network_stop**
HomeAssistant will trigger a event when the zwave network stopping.

```yaml
 - alias: ZWave network is stopping
   trigger:
     platform: event
     event_type: zwave.network_start
```

**zwave.node_event**
HomeAssistant will trigger a event when command_class_basic changes value on a node.
This can be virtually anything, so tests have to be made to determine what value equals what.
You can use this for automations.

Example:

```yaml
 - alias: Minimote Button Pressed
   trigger:
     platform: event
     event_type: zwave.node_event
     event_data:
       object_id: aeon_labs_minimote_1
       basic_level: 255
```

The *object_id* and *basic_level* of all triggered events can be seen in the console output.

**zwave.scene_activated**
Some devices can also trigger scene activation events, which can be used in automation scripts (for example the press of a button on a wall switch):

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: Turn on Desk light
    trigger:
      platform: event
      event_type: zwave.scene_activated
      event_data:
        object_id: zwaveme_zme_wallcs_secure_wall_controller_8
        scene_id: 11
```

The *object_id* and *scene_id* of all triggered events can be seen in the console output.

#### {% linkable_title Services %}

The Z-Wave component exposes four services to help maintain the network.

| Service | Description |
| ------- | ----------- |
| add_node | Put the zwave controller in inclusion mode. Allows one to add a new device to the zwave network.|
| add_node_secure | Put the zwave controller in secure inclusion mode. Allows one to add a new device with secure communications to the zwave network. |
| cancel_command | Cancels a running zwave command. If you have started a add_node or remove_node command, and decides you are not going to do it, then this must be used to stop the inclusion/exclusion command. |
| heal_network | Tells the controller to "heal" the network. Bascially asks the nodes to tell the controller all of their neighbors so the controller can refigure out optimal routing. |
| remove_node | Put the zwave controller in exclusion mode. Allows one to remove a device from the zwave network.|
| soft_reset | Tells the controller to do a "soft reset". This is not supposed to lose any data, but different controllers can behave differently to a "soft reset" command.|
| test_network | Tells the controller to send no-op commands to each node and measure the time for a response. In theory, this can also bring back nodes which have been marked "presumed dead".|

The soft_reset and heal_network commands can be used as part of an automation script
to help keep a zwave network running relliably. For example:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: soft reset at 2:30am
    trigger:
      platform: time
      after: '2:30:00'
    action:
      service: zwave.soft_reset

  - alias: heal at 2:31am
    trigger:
      platform: time
      after: '2:31:00'
    action:
      service: zwave.heal_network
```
