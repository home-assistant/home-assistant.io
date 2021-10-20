---
title: PulseAudio Loopback
description: Instructions on how to use Pulseaudio loopback modules to build a flexible whole-home audio system.
ha_category:
  - Switch
ha_release: 0.16
ha_iot_class: Local Polling
ha_domain: pulseaudio_loopback
ha_platforms:
  - switch
---

The goal behind this switch is to allow a very flexible whole home audio system based upon [PulseAudio](https://www.freedesktop.org/wiki/Software/PulseAudio/).

For example, for a system with a 7.1 surround sound card, and 3 instances of [MPD](https://www.musicpd.org/) running, it is possible to quickly route the output of any MPD instance to any of the 8 possible (4 stereo) channels on the sound card, by loading/unloading a loopback module. This loading/unloading functionality is provided by this component. When the switch is `on`, the loopback module is loaded.  When the switch is `off`, the module is not loaded.

The benefit of this approach is that this audio routing can occur without modifying the design-time configuration of MPD or PulseAudio.

This integration uses a TCP connection to control a local or remote PulseAudio server. So there are no local dependencies.

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: pulseaudio_loopback
```

{% configuration %}
sink_name:
  description: The name of the Pulseaudio sink that will receive the audio.
  required: true
  type: string
source_name:
  description: The name of the Pulseaudio source that will supply the audio.
  required: true
  type: string
name:
  description: Name of the switch.
  required: false
  default: paloopback
  type: string
host:
  description: The IP address or host name of the PulseAudio server.
  required: false
  default: Use client configuration in /etc/pulse
  type: string
port:
  description: The port that Pulseaudio is listening on.
  required: false
  default: 4713
  type: integer
{% endconfiguration %}

<div class='note warning'>

This integration relies on raw TCP commands to PulseAudio. In order for PulseAudio to accept commands with this component, `module-native-protocol` must be loaded on the PulseAudio server.

</div>
