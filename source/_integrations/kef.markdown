---
title: KEF
description: Instructions on how to integrate KEF Speakers into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Polling
ha_release: 0.104
ha_codeowners:
  - '@basnijholt'
ha_domain: kef
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `kef` {% term integration %} allows you to control the KEF LS50 Wireless and [KEF LSX](https://international.kef.com/products/lsx) speakers from Home Assistant.

Supported devices:

- KEF LS50 Wireless
- KEF LSX

## Configuration

To add KEF Speakers to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
media_player:
 - platform: kef
   host: IP_ADDRESS
   type: LS50
```

{% configuration %}
host:
  description: "IP address of the device. Example: 192.168.1.32"
  required: true
  type: string
type:
  description: The speaker type, either `LS50` or `LSX`.
  required: true
  type: string
name:
  description: The name of the device
  required: false
  default: KEF
  type: string
port:
  description: The port of the device
  required: false
  default: 50001
  type: integer
maximum_volume:
  description: Maximum volume allowed. Number between 0 and 1.
  required: false
  default: 0.5
  type: float
volume_step:
  description: Volume step when increasing volume.
  required: false
  default: 0.05
  type: float
inverse_speaker_mode:
  description: Switch channels from L/R to R/L.
  required: false
  default: false
  type: boolean
standby_time:
  description: The speakers automatically turn to standby mode after either `20` or `60` minutes. Leave out for the speaker to never go into standby mode.
  required: false
  type: integer
supports_on:
  description: LS50 Wireless with a serial number below LS50W13074K24L/R2G do not support turning on the speakers over the network. Set this to false if you have an older model.
  default: true
  required: false
  type: boolean
{% endconfiguration %}

## Advanced - configuration example

```yaml
# Example configuration.yaml entry
media_player:
 - platform: kef
   host: IP_ADDRESS
   type: LS50
   name: My KEF speakers
   maximum_volume: 0.6
   volume_step: 0.05
```

## Actions

Just like in the KEF Control app, we can change the digital signal processing (DSP) settings.

The speaker's current DSP settings are updated automatically each hour and after each action.
To update the settings manually, use `kef.update_dsp`.

### Action `kef.update_dsp`

Update all DSP settings.

| Data attribute | Optional | Description                       |
| ---------------------- | -------- | --------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker. |

### Action `kef.set_mode`

Set the mode of the speaker. When optional attributes are left out, the setting will be unchanged.

| Data attribute | Optional | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker.                          |
| desk_mode              | Yes      | "Desk mode" (`true` or `false`)                            |
| wall_mode              | Yes      | "Wall mode" (`true` or `false`)                            |
| phase_correction       | Yes      | "Phase correction" (`true` or `false`)                     |
| high_pass              | Yes      | "High-pass mode" (`true` or `false`)                       |
| sub_polarity           | Yes      | "Sub polarity" (`-` or `+`)                                |
| bass_extension         | Yes      | "Bass extension" selector (`Less`, `Standard`, or `Extra`) |

### Action `kef.set_desk_db`

Set the "Desk mode" slider of the speaker in dB.

| Data attribute | Optional | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker.               |
| db_value               | No       | Value of the slider (-6 to 0 with steps of 0.5) |

### Action `kef.set_wall_db`

Set the "Wall mode" slider of the speaker in dB.

| Data attribute | Optional | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker.               |
| db_value               | No       | Value of the slider (-6 to 0 with steps of 0.5) |

### Action `kef.set_treble_db`

Set desk the "Treble trim" slider of the speaker in dB.

| Data attribute | Optional | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker.               |
| db_value               | No       | Value of the slider (-2 to 2 with steps of 0.5) |

### Action `kef.set_high_hz`

Set the "High-pass mode" slider of the speaker in Hz.

| Data attribute | Optional | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker.               |
| hz_value               | No       | Value of the slider (50 to 120 with steps of 5) |

### Action `kef.set_low_hz`

Set the "Sub out low-pass frequency" slider of the speaker in Hz.

| Data attribute | Optional | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker.               |
| hz_value               | No       | Value of the slider (40 to 250 with steps of 5) |

### Action `kef.set_sub_db`

Set the "Sub gain" slider of the speaker in dB.

| Data attribute | Optional | Description                                     |
| ---------------------- | -------- | ----------------------------------------------- |
| entity_id              | No       | The entity_id of the KEF speaker.               |
| db_value               | No       | Value of the slider (-10 to 10 with steps of 1) |

## Notes

- The LS50 Wireless was tested with the latest firmware of 19-11-2019: `p6.3001902221.105039422` and older firmware: `p6.2101809171.105039422`
- The LSX Wireless was tested with the latest firmware of 10-10-2019 v4.1: `p20.4101909240.105243`

[KEF Speakers]: /integrations/kef/
