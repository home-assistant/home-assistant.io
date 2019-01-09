---
layout: page
title: "LCN"
description: "Instructions on how to integrate LCN components with Home Assistant."
date: 2018-11-01 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lcn.png
ha_category: Hub
ha_release: 0.85
ha_iot_class: "Local Push"
---


The `lcn` integration for Home Assistant allows you to connect to [LCN](http://www.lcn.eu) hardware devices.

The component requires one unused license of the coupling software LCN-PCHK (version >2.8) and a LCN hardware coupler. Alternatively a LCN-PKE coupler can be used which offers two PCHK licenses.
With this setup sending and receiving commands to and from LCN modules is possible.


There is currently support for the following device types within Home Assistant:

- [Light](/components/light.lcn)

## {% linkable_title Configuration %}

To use your LCN system in your installation, add the following lines to your `configuration.yaml` file.
You have to specify at least one ip/port with login credentials for a PCHK host.
Consider to store your credentials in a [secrets.yaml](/docs/configuration/secrets).


```yaml
lcn:
  connections:
    - name: myhome
      host: 192.168.2.41
      port: 4114
      username: lcn
      password: lcn
  
  lights:
    - name: Bedroom light
      address: myhome.s0.m7
      output: output1
      dimmable: true
      transition: 5
```

{% configuration %}
connections:
  description: List of your connections
  required: true
  type: map
  keys:
    host:
      description: IP address of the LCN-PCHK host.
      required: true
      type: string
    port:
      description: Port of the LCN-PCHK host.
      required: true
      type: integer
    username:
      description: Login username for the LCN-PCHK host.
      required: true
      type: string
    password:
      description: Login password for the LCN-PCHK host.
      required: true
      type: string
    name:
      description: Optional connection identifier. If omited, the connections will be named consecutively as _pchk_, _pchk1_, _pchk2_, ...
      required: false
      default: pchk
      type: string
    sk_num_tries:
      description: Segment coupler scans. Increase this number if you have at least one segment coupler in your system.
      required: false
      default: 0
      type: integer
    dim_mode:
      description: "Dimming mode for connected modules. The operation mode is programmed into the LCN modules by the LCN-PRO software and depends on their firmware. If you experience unexpected dimming behavior, the connection is probably in the wrong operation mode. Possible values: _steps50_, _steps200_"
      required: false
      default: steps50
      type: string

lights:
  description: List of your lights.
  required: true
  type: map
  keys:
    name:
      description: Name of the light.
      required: true
      type: string
    address:
      description: "[Address](/components/lcn#lcn-addresses) of the module/group."
      required: true
      type: string
    output:
      description: "Light source ([OUTPUT_PORT](/components/lcn#ports))."
      required: true
      type: string
    dimmable:
      description: Enable the dimming feature for this light
      required: false
      type: bool
      default: false
    transition:
      description: Transition (ramp) time in seconds.
      required: false
      type: int
      default: 0
{% endconfiguration %}



## {% linkable_title LCN Addresses %}
LCN hardware devices connected to the LCN bus are called _modules_. LCN modules are addressed by their numeric id in the range (5..254).

Modules can be arranged in _segments_. Segments can be addressed by their numeric id (5..128) or 0 (= no segment exist) or 3 (= target all segments).

LCN Modules within the _same_ segment can be grouped by their group id (5..254) or 3 (= target all groups.)

The LCN component allow the connection to more than one hardware coupler. In this case it has to be specified which hardware coupler should be used for addressing the specified module.

Whenever the address of a module or a group has to be specified, it can be addressed using one of the following syntaxes:

Example for modules:
```
connid.s000.m007
connid.s0.m7
s0.m7
0.7
```

Example for groups:
```
connid.s000.g007
connid.s0.g7
s0.g7
0.g7
```

Leading zeroes in the segment id or module/group id can be omitted. If the `connection_id` is omitted, the first connection defined in the [configuration](#configuration) will be used.


## {% linkable_title LCN Constants %}
The platforms and service calls use several predefined constants as parameters.

#### {% linkable_title Ports %}

| Constant | Values |
| -------- | ------ |
| OUTPUT_PORT | `output1`, `output2`, `output3`, `output4` |
