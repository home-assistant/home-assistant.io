---
title: P5 FutureNow
description: Instructions on how to set up P5 FutureNow relay/dimmer units as lights within Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.75
ha_domain: futurenow
ha_platforms:
  - light
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `futurenow` light {% term integration %} allows you to use [P5](https://www.p5.hu/) FutureNow relay/dimmer units as lights. Currently supported units:

- [FutureNow FNIP-6x2AD](https://www.p5.hu/index.php/products/ethernet-modules/265-fnip-6x2ad) dimmer unit (outputs only)
- [FutureNow FNIP-8x10A](https://www.p5.hu/index.php/products/ethernet-modules/263-fnip-8x10a) relay unit (outputs only)

### Configuration Sample

To use your FutureNow units, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
light:
  - platform: futurenow
    driver: FNIP6x10ad
    host: 192.168.1.101
    port: 7078
    devices:
      5:
        name: Dimmer Channel 5
        dimmable: true
```

{% configuration %}
driver:
  description: "Type of the device. Currently `FNIP6x10ad` or `FNIP8x10a`."
  required: true
  type: string
host:
  description: "The IP address or hostname of your unit, e.g., `192.168.1.101`."
  required: true
  type: string
port:
  description: "The TCP port, as set in the unit's settings. Default is `7078`."
  required: true
  type: string
devices:
  description: "List of output channels to set up as lights."
  required: true
  type: map
  keys:
    channel_number:
      description: "Output's (light) properties."
      required: true
      type: map
      keys:
        name:
          description: "The name of the light."
          required: true
          type: string
        dimmable:
          description: "Set to `true` to enable dimming (FNIP6x10ad only)."
          required: false
          type: boolean
          default: false
{% endconfiguration %}

### Extended Configuration Sample

The following example {% term "`configuration.yaml`" %} has two different FutureNow units with multiple channels:

```yaml
# Example configuration.yaml entry
light:
  - platform: futurenow
    driver: FNIP6x10ad
    host: 192.168.1.101
    port: 7078
    devices:
      5:
        name: Dimmer Channel 5
      6:
        name: Dimmer Channel 6
        dimmable: true

  - platform: futurenow
    driver: FNIP8x10a
    host: 192.168.1.102
    port: 7078
    devices:
      1:
        name: Relay Channel 1
      2:
        name: Relay Channel 2
```
