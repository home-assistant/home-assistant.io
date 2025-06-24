---
title: Global Caché iTach TCP/IP to IR
description: Instructions on how to integrate a Global Caché iTach IP2IR gateway into Home Assistant.
ha_category:
  - Remote
ha_iot_class: Assumed State
ha_release: 0.39
ha_domain: itach
ha_platforms:
  - remote
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `itach` remote {% term integration %} allows you to control IR devices with a Global Caché iTach Device and GC-100 devices. The Global Cache IR API are similar across their product line. See API documentation links at the end of this page.

In order to utilize the digital input (binary sensor) and relay (switch) features of your Global Cache device you will need to use the [gc100 integration](/integrations/gc100) and associated platforms.

To use your iTach remote in your installation, you will need to know the IR commands for your devices in Pronto hex format and add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
remote:
  - platform: itach
    host: itach023fdc
    devices:
      - name: TV
        connaddr: 2
        ir_count: 3
        commands:
          - name: "ON"
            data: "0000 006D 0000 0022 00AC 00AC 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0015 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0689"
          - name: "OFF"
            data: "0000 006D 0000 0022 00AC 00AC 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0689"
```

{% configuration %}
host:
  description: The iTach's IP address.
  required: true
  type: string
port:
  description: The iTach's port.
  required: false
  default: 4998
  type: integer
devices:
  description: Devices controlled by the iTach.
  required: true
  type: list
  keys:
    name:
      description: Name of the device.
      required: true
      type: string
    modaddr:
      description: iTach module address for the IR emitter.
      required: false
      default: 1
      type: integer
    connaddr:
      description: iTach connection location for the IR emitter. (Note connaddr is a misleading label. Do not put the connection address here. Technically the connection address is the combination of the module address plus the connection location).
      required: true
      type: integer
    ir_count:
      description: Number of times the command payload will be repeated for a single command send.
      required: false
      default: 1
      type: integer
    commands:
      description: Commands available to send to the device.
      required: true
      type: list
      keys:
        name:
          description: Command name.
          required: true
          type: string
        data:
          description: Hex command data.
          required: true
          type: string
{% endconfiguration %}

An example to call the integration from developer tools using the `remote.send_command` action: `{ "entity_id":"remote.tv", "command":"menu" }`

Note: Global Cache devices expect data in their own format of "sendir...". This integration converts hex code to Global Cache IR form.

API Docs:

- [iTach](https://www.globalcache.com/files/docs/API-iTach.pdf)
- [GC-100](https://www.globalcache.com/files/docs/API-GC-100.pdf)
