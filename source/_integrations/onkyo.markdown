---
title: Onkyo
description: Instructions on how to integrate Onkyo and some Pioneer receivers into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.17
ha_iot_class: Local Polling
ha_domain: onkyo
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `onkyo` platform allows you to control a [Onkyo](https://www.onkyo.com), [Integra](http://www.integrahometheater.com)
and some recent [Pioneer](https://www.pioneerelectronics.com) receivers from Home Assistant.
Please be aware that you need to enable "Network Standby" for this integration to work in your Hardware.

## Configuration

To add an Onkyo or Pioneer receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: onkyo
    host: 192.168.1.2
    name: receiver
    sources:
      pc: "HTPC"
```

 If your receiver has second or third zone’s available, they are displayed as additional media players with the same functionality as the main zone.

{% configuration %}
host:
  description: IP address of the device. Example:`192.168.1.2`. If not specified, the platform will load any discovered receivers.
  required: false
  type: string
name:
  description: Name of the device. (*Required if host is specified*)
  required: false
  type: string
max_volume:
  description: Maximum volume as a percentage. Often the maximum volume of the receiver is far too loud. Setting this will set Home Assistant's 100% volume to be this setting on the amp. i.e., if you set this to 50% when you set Home Assistant to be 100% then your receiver will be set to 50% of its maximum volume.
  required: false
  default: 100
  type: integer
receiver_max_volume:
  description: The maximum volume of the receiver. For older Onkyo receivers this was 80, newer Onkyo receivers use 200.
  required: false
  default: 80
  type: integer
sources:
  description: A list of mappings from source to source name. Valid sources can be found below. A default list will be used if no source mapping is specified.
  required: false
  type: list
{% endconfiguration %}

List of source names:

- `video1`
- `video2`
- `video3`
- `video4`
- `video5`
- `video6`
- `video7`
- `dvd`
- `bd-dvd`
- `tape1`
- `tv-tape`
- `tape2`
- `phono`
- `cd`
- `tv-cd`
- `fm`
- `am`
- `tuner`
- `dlna`
- `internet-radio`
- `usb`
- `network`
- `universal-port`
- `multi-ch`
- `xm`
- `sirius`

If your source is not listed above, and you want to figure out how to format that source name so you can map its entry, you can use the `onkyo-eiscp` Python module to discover the exact naming needed. First, change your receiver's source to the one that you need to define, and then run:

```bash
onkyo --host 192.168.0.100 source=query
```

To find your receivers max volume use the onkyo-eiscp Python module set the receiver to its maximum volume
(don't do this whilst playing something!) and run:

```bash
onkyo --host 192.168.0.100 volume=query
unknown-model: master-volume = 191
```

### Service `onkyo_select_hdmi_output`

Changes HDMI output of your receiver

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of a single `entity_id` that will change output.
| `hdmi_output` | no | The desired output code.

Accepted values are:
'no', 'analog', 'yes', 'out', 'out-sub', 'sub', 'hdbaset', 'both', 'up'
which one to use seems to vary depending on model so you will have to try them out.
( For model TX-NR676E it seems to be 'out' for main, 'out-sub' for sub, and 'sub' for both )

### Example `play_media` script

The `play_media` function can be used in script to play radio station by preset number.
Not working for NET radio.

```yaml
# Example play_media script
#
script:
 radio1:
    alias: "Radio 1"
    sequence:
      - service: media_player.turn_on
        target:
          entity_id: media_player.onkyo
      - service: media_player.play_media
        target:
          entity_id: media_player.onkyo
        data:
          media_content_type: "radio"
          media_content_id: "1"
```

### Example `onkyo_select_hdmi_output` script

```yaml
# Example onkyo_select_hdmi_output script
#
script:
 hdmi_sub:
    alias: "Hdmi out projector"
    sequence:
      - service: media_player.onkyo_select_hdmi_output
        data:
          entity_id: media_player.onkyo
          hdmi_output: out-sub
```
