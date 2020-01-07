---
title: Kira
description: Instructions on how to integrate Keene Electronics IR over IP modules (Kira) into Home Assistant.
logo: keene.png
ha_category:
  - Hub
  - Remote
  - Sensor
ha_release: 0.45
---

The `kira` integration is the main integration to integrate Keene Electronics IR over IP [Kira](https://www.keene.co.uk/keene-ir-anywhere-single-worldwide.html) modules with Home Assistant.

There is currently support for the following device types within Home Assistant:

- Remote
- Sensor

### Example Configuration

```yaml
# Example configuration.yaml entry
kira:
```

Kira modules have no built-in mechanism for auto-discovery, so will need to be configured to send packets to Home Assistant. Documentation for this can be found on the manufacturer's website [Here](https://www.keene.co.uk/pages/iranywhere/index.html).

### Configuration Options

```yaml
# Example configuration.yaml entry
kira:
  sensors:
    - name: kira_sensor
      host: 0.0.0.0
      port: 65432
  remotes:
    - name: kira_remote
      host: 192.168.100.1
      port: 65432
```

{% configuration %}
sensors:
  description: Kira sensors to register.
  required: false
  type: map
  keys:
    name:
      description: Name of this sensor.
      required: false
      type: string
    host:
      description: Bind address for this sensor.
      required: false
      default: 0.0.0.0
      type: string
    port:
      description: UDP port to listen for packets on.
      required: false
      default: 65432
      type: integer
remotes:
  description: Remote Kira modules to register.
  required: false
  type: map
  keys:
    name:
      description: Name of this remote.
      required: false
      type: string
    host:
      description: IP address of Kira module to send commands to.
      required: true
      type: string
    port:
      description: UDP port to send packets to.
      required: false
      default: 65432
      type: integer
{% endconfiguration %}

If no sensors or remotes are specified, a sensor with default values will be added.

### Code Configuration

The first time the Kira integration is loaded, `kira_codes.yaml` will be created in the Home Assistant configuration directory.

```yaml
# Example kira_codes.yaml entry
- name: LivingRoomTVOn
  code: "K 2322 228A 1126 023E 0227 023E 0207 023F 0658 025D 0207 023F 0227 0220 0227 023F 0222 023E 0222 0220 067D 023F 0658 0222 0227 025C 0640 023F 0658 025D 0640 023E 0658 025D 0640 023F 0222 025C 0207 0222 0678 023E 0207 023F 0227 023F 0222 025C 063B 025C 0640 023E 0660 023E 0658 025D 0207 0222 0678 023E 0660 0220 0678 023E 0202 025D 0207 023F 2000"
  type: kira
- name: HDMI_1
  code: "0000 006d 0026 0000 0155 00aa 0016 0015 0016 0015 0016 0040 0016 0015 0016 0015 0016 0014 0016 0015 0016 0015 0016 0040 0016 0040 0016 0015 0016 0040 0016 0040 0016 0040 0016 0040 0016 0040 0016 0015 0016 0040 0016 0040 0016 0040 0016 0014 0016 0015 0016 0040 0016 0040 0016 0040 0016 0015 0016 0014 0016 0014 0016 0040 0016 0040 0016 0014 0016 0015 0016 060b 0155 0055 0016 0e58 0155 0055 0016 00aa"
  device: LivingRoomTv
  type: pronto
- name: RGB
  code: "F709 DC24"
  device: LivingRoomTv
  type: nec
```

{% configuration %}
name:
  description: The name of this code.
  required: true
  type: string
code:
  description: The data for this code (see below).
  required: true
  type: string
device:
  description: The device this code is associated with.
  required: false
  default: unknown
  type: string
type:
  description: The type of this code. If this field is omitted, the type will be autodetected if possible.
  required: false
  type: string
repeat:
  description: The number of times to repeat this code (on transmit).
  required: false
  default: 1
  type: integer
{% endconfiguration %}

Some manufacturers (e.g., Samsung) require an IR code to be sent a number of times in a row in rapid succession (usually 3). This doesn't apply to the vast majority of devices, but it can be helpful if needed.

### Code Types

When creating an entry in `kira_codes.yaml`, a few different kinds of codes can be used.

- **kira**: This is the native wire protocol used by Kira modules. These can be captured using netcat.
- **pronto**: Pronto codes are supported.
- **nec**: If the device uses NEC IR codes and the manufacturer has published them, they can be used here.

**NOTE**: NEC codes by themselves contain enough information to recognize an IR sequence, but not enough to reconstruct it. Codes of this type are receive-only (usable by sensors but not remotes).
