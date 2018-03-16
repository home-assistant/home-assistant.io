---
layout: page
title: "Kira"
description: "Instructions how to integrate Keene Electronics IR over IP modules (Kira) into Home Assistant."
date: 2017-05-07 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: keene.png
ha_category: Hub
ha_release: 0.45
---

The `kira` component is the main component to integrate Keene Electronics IR over IP [Kira](https://www.keene.co.uk/keene-ir-anywhere-single-worldwide.html) modules with Home Assistant.

### {% linkable_title Example Configuration %}

```yaml
# Example configuration.yaml entry
kira:
```

Kira modules have no built-in mechanism for auto-discovery, so will need to be configured to send packets to Home Assistant. Documentation for this can be found on the manufacturer's website [Here](https://www.keene.co.uk/pages/iranywhere/index.html).

### {% linkable_title Configuration Options %}

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

Configuration variables:
- **sensors** (*Optional*): Kira sensors to register
  - **name** (*Optional*): Name of this sensor.
  - **host** (*Optional*): Bind address for this sensor. 0.0.0.0 is default.
  - **port** (*Optional*): UDP port to listen for packets on. 65432 is default.
- **remotes** (*Optional*): Remote Kira modules to register
  - **name** (*Optional*): Name of this remote.
  - **host** (*Required*): IP address of Kira module to send commands to.
  - **port** (*Optional*): UDP port to send packets to. 65432 is default.

If no sensors or remotes are specified, a sensor with default values will be added.

### {% linkable_title Code Configuration %}

The first time the Kira component is loaded, `kira_codes.yaml` will be created in the Home Assistant configuration directory.

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

Configuration variables:
- **name** (*Required*): The name of this code.
- **code** (*Required*): The data for this code (see below).
- **device** (*Optional*): The device this code is associated with. Default is "unknown".
- **type** (*Optional*): The type of this code. If this field is omitted, the type will be autodetected if possible.
- **repeat** (*Optional*): The number of times to repeat this code (on transmit). Default is 1.

Some manufacturers (e.g., Samsung) require an IR code to be sent a number of times in a row in rapid succession (usually 3). This doesn't apply to the vast majority of devices, but it can be helpful if needed.

### {% linkable_title Code Types %}

When creating an entry in `kira_codes.yaml`, a few different kinds of codes can be used.
- **kira**: This is the native wire protocol used by Kira modules. These can be captured using netcat.
- **pronto**: Pronto codes are supported.
- **nec**: If the device uses NEC IR codes and the manufacturer has published them, they can be used here.

**NOTE**: NEC codes by themselves contain enough information to recognize an IR sequence, but not enough to reconstruct it. Codes of this type are receive-only (usable by sensors but not remotes).
