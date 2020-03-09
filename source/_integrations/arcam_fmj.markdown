---
title: Arcam FMJ Receivers
description: Instructions on how to integrate Arcam FMJ Receivers into Home Assistant.
ha_category: Media Player
ha_release: 0.96
ha_iot_class: Local Polling
ha_codeowners:
  - '@elupus'
ha_domain: arcam_fmj
---

The `arcam_fmj` integration allows you to control [Arcam FMJ Receveivers](https://www.arcam.co.uk/range/fmj.htm) from Home Assistant.

Supported devices:

- AVR 380
- AVR 450
- AVR 750
- Likely other AVRs

## Configuration

To add an Arcam FMJ to your installation, add the following to your `configuration.yaml` file:

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
      description: Zone index number.
      type: map
      keys:
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

## Power state

Arcam FMJ receivers turn off their network port when in standby, the component will try to
reconnect to the receiver every 5 seconds. This mean powering on the first zone is not
possible over the builtin network connection. Two options for complete power control
exists: IR or Serial gateway.

### IR command

Use an IR blaster to send a command to turn the device on using these discrete codes:

 - Zone 1: Protocol: NEC1 Device: 16 Function: 123
 - Zone 2: Protocol: NEC1 Device: 23 Function: 123

### Serial Port to network gateway

Use a network to a serial port gateway to connect to the serial port of the
receiver. The serial port is always available and can power on the device.
This is the most reliable communication method as well.
