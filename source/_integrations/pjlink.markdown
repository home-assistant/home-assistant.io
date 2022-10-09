---
title: PJLink
description: Instructions on how to integrate PJLink enabled projectors into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.76
ha_iot_class: Local Polling
ha_domain: pjlink
ha_platforms:
  - media_player
  - sensor
  - binary_sensor
ha_integration_type: integration
---

The `pjlink` platform allows you to control from Home Assistant, projectors with support for the
[PJLink protocol](https://pjlink.jbmia.or.jp/english/index.html).

## Configuration

{% include integrations/config_flow.md %}

### Options

- **Host:** The IP address or hostname of the device. Example: `192.168.1.2`.
- **Port:** The port on which the PJLink service runs on the device. Optional, defaults to 4352.
- **Name:** Name of the device. Optional, defaults to the projector provided name.
- **Encoding:** Character encoding to use to communicate with the device. Optional, defaults to utf-8.
- **Password:** Password to authenticate with the projector. Optional.

## Media Player

The PJLink platform will create a media player entity for each projector configured. This entity
will allow the user to power the projector on/off, select the input source, and control muting of
audio.

The entity will also expose the below attributes:

- `projector_status`: Exposes the warming up, on, cooling down, and off state of the projector.
- `other_info`: Other information reported by the projector. Manufacturer defined.

## Sensors

The lamp sensor(s) provides the lamp hours for each lamp in the projector, and whether they are powered on.

The error sensors provide the error status of the projector, and an `is_warning` attribute to indicate the error level. For more information about the meaning of the errors, please consult manufacturer documentation for your projector. The following errors are supported:

- Fan
- Lamp
- Temperature
- Cover (case/chassis)
- Filter
- Other
