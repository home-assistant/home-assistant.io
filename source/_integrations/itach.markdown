---
description: Instructions on how to integrate a Global Caché iTach IP2IR gateway into Home Assistant.
ha_release: 0.39
ha_domain: itach
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Global Caché iTach TCP/IP to IR** {% term integration %} allows you to control IR devices with a Global Caché iTach Device and GC-100 devices. The Global Cache IR API are similar across their product line. See API documentation links at the end of this page.

To use the digital input (binary sensor) and relay (switch) features of your Global Cache device you will need to use the [gc100 integration](/integrations/gc100) and associated platforms.

To use your iTach remote in your installation, you will need to know the IR commands for your devices in Pronto hex format and add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
remote:
  - platform: itach
    host: "192.168.1.70"
    mac: "000C1E023FDC"
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
  description: The iTach's IP address. Hostnames are not resolved, so this must be a literal IP address.
  required: true
  type: string
mac:
  description: "The iTach's MAC address, as 12 upper-case hexadecimal digits with no separators, for example `000C1E023FDC`. When set, the integration uses the iTach's discovery beacon to check the connection, reconnect after it drops, and reconnect to the iTach's new address if its IP has changed. Without it, a dropped connection is only re-established after a command fails, so the first command sent after the iTach reboots or the network drops is lost. A MAC address written with colons or in lower case never matches the beacon, which has the same effect as leaving it out."
  required: false
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

You can call the integration in {% my tools_actions title="**Settings** > **Tools** > **Actions**" %} using the `remote.send_command` action: `{ "entity_id":"remote.tv", "command":"menu" }`

Note: Global Cache devices expect data in their own format of "sendir...". This integration converts hex code to Global Cache IR form.

API Documentation:

- [iTach](https://www.globalcache.com/files/docs/API-iTach.pdf)
- [GC-100](https://www.globalcache.com/files/docs/API-GC-100.pdf)
