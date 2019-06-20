---
layout: page
title: "Arcam FMJ Receivers"
description: "Instructions on how to integrate Arcam FMJ Receivers into Home Assistant."
date: 2019-04-28 13:59 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: arcam.svg
ha_category: Media Player
ha_release: 0.96
---

The `arcam_fmj` platform allows you to control [Arcam FMJ Receveivers](https://www.arcam.co.uk/range/fmj.htm) from Home Assistant.

Supported devices:

- AVR 380 
- AVR 450
- AVR 750
- Likely other AVRs

To add a Arcam FMJ to your installation, add the following to your `configuration.yaml` file:

```yaml
# Minimal example configuration.yaml entry
arcam_fmj:
  - host: HOSTNAME
    zone:
      1:
```

{% configuration %}
host:
  description: IP address or hostname of the device.
  required: true
  type: string
port:
  description: Port to connect to.
  required: false
  default: 50000
  type: integer
zone:
  description: Per zone specific configuration
  type: map
  keys:
    ZONE_INDEX:
      name:
        description: Name of zone
        required: false
        type: string
        default: Arcam FMJ - ZONE_INDEX
      turn_on:
        description: Service to use when turning on device when no connection is established
        required: false
        type: action
{% endconfiguration %}

```yaml
# Larger example configuration.yaml entry
media_player:
  - platform: arcam_fmj
    host: HOSTNAME
    zone:
      1:
        name: "Zone 1 name"
        turn_on:
          service: 'broadlink.send'
          data:
            host: BROADLINK_IR_IP
            packet: JgAVADodHTo6HR0dHR0dOh0dHR06Oh0dHQ0FAA==
      2:
        name: "Zone 2 name"
        turn_on:
          service: 'broadlink.send'
          data:
            host: BROADLINK_IR_IP
            packet: JgAYADodHTo6Oh0dHR0dHR0dHR06Oh0dHQALZw0FAAAAAAAAAAAAAAAAAAA=
```

## {% linkable_title Power state %}
Arcam FMJ receivers turn of their network port when in standby, the component will try to
reconnect to the receiver every 5 seconds. This mean powering on the first zone is not
possible over the builtin network connection. Two options for complete power control
exists: IR or Serial gatway.

### {% linkable_title IR command %}
Use an IR blaster to send command to turn device on using these discrete codes:
 - Zone 1: Protocol: NEC1 Device: 16 Function: 123
 - Zone 2: Protocol: NEC1 Device: 23 Function: 123

### {% linkable_title Serial Port to network gateway %}
Use a network to serial port gateway to connect to the serial port of the
receiver. The serial port is always available and can power on device.
This is the most reliable communication method as well.

