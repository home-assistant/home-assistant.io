---
title: iZone
description: Instructions on how to integrate iZone climate control devices with Home Assistant.
ha_category:
  - Climate
ha_release: '0.100'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Swamp-Ig'
ha_domain: izone
---

The `iZone` integration allows access of control of a local [iZone](https://izone.com.au/) ducted reverse-cycle climate control devices. These are largely available in Australia.

## Supported hardware

Any current iZone unit with ducted reverse cycle airconditioning and the CB wired or wireless bridge device installed should currently work. There is currently no support for the iZone lights, reticulation, or other devices.

## Configuration

The iZone component can be configured in two ways. 

- Via the integrations configuration of the Home Assistant user interface.
- Or via the `configuration.yaml` file by adding the following:

If you load the integration from the integrations window, all local iZone instances are added. The integration will discover any new instances added to the local area later on as well.

Alternately if there is more than one iZone system on the local network and one or more must be excluded use manual configuration:

```yaml
# Full manual example configuration.yaml entry
izone:
  exclude:
    - "000013170"
```

{% configuration %}
exclude:
  description: Exclude particular units from integration with Home Assistant.
  required: false
  type: list
{% endconfiguration %}

## Network settings

The iZone system uses UDP broadcasts over the local network to find and communicate with iZone devices. For this to work properly, UDP port  12107 must be able to be broadcasted on, 7005 needs to be listened to for broadcasted messages, and TCP port 80 for HTTP data to the bridge. The integration currently listens on `0.0.0.0` and broadcasts to all broadcast IPv4 local addresses, which is not configurable.

## Master controller

Unit modes off, heat, cool, dry, and fan only are supported. For units fitted with the 'iSave' system, which vents in external air into the house, this is available as 'eco' mode.

## Zones

Zones have three modes available, closed, open, and auto. These are mapped to Home Assistant modes off, fan only, and auto, respectively. Only the auto mode supports setting the temperature.

## Debugging

If you're trying to track down issues with the component, set up logging for it:


```yaml
# Example configuration.yaml with logging for iZone
logger:
  default: warning
  logs:
    homeassistant.components.izone: debug
    pizone: debug
```

This will help you to find network connection issues etc.
