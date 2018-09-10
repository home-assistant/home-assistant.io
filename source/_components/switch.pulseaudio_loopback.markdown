---
layout: page
title: "PulseAudio Loopback Switch"
description: "Instructions on how to use Pulseaudio loopback modules to build a flexible whole-home audio system."
date: 2016-03-22 21:00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pulseaudio.png
ha_category: Switch
ha_release: 0.16
ha_iot_class: "Local Polling"
---


The goal behind this switch is to allow a very flexible whole home audio system based upon [PulseAudio](https://www.freedesktop.org/wiki/Software/PulseAudio/).

For example, for a system with a 7.1 surround sound card, and 3 instances of [MPD](https://www.musicpd.org/) running, it is possible to quickly route the output of any MPD instance to any of the 8 possible (4 stereo) channels on the sound card, by loading/unloading a loopback module. This loading/unloading functionality is provided by this component. When the switch is `on`, the loopback module is loaded.  When the switch is `off`, the module is not loaded.

The benefit of this approach is that this audio routing can occur without modifying the design-time configuration of MPD or PulseAudio.

This component uses a TCP connection to control a local or remote PulseAudio server. So there are no local dependencies.

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: pulseaudio_loopback
```

Configuration variables:

- **sink_name** (*Required*): The name of the Pulseaudio sink that will receive the audio.
- **source_name** (*Required*): The name of the Pulseaudio source that will supply the audio.
- **name** (*Optional*): Name of the switch.
- **host** (*Optional*): The IP address or host name of the PulseAudio server.  If not specified, 127.0.0.1 is used.
- **port** (*Optional*): The port that Pulseaudio is listening on.  Defaults to 4712.
- **buffer_size** (*Optional*): How much data to load from Pulseaudio at once. Default is 1KB.
- **tcp_timeout** (*Optional*): How long to wait for a response from Pulseaudio before giving up. Default is 3 seconds.

<p class='note warning'>
This component relies on raw TCP commands to PulseAudio. In order for PulseAudio to accept commands with this component, `module-cli-protocol` must be loaded on the PulseAudio server.
</p>

