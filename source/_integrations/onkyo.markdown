---
title: Onkyo & Pioneer Network Receivers
description: Instructions on how to integrate Onkyo and some Pioneer receivers into Home Assistant.
ha_category:
  - Media Player
  - Number
ha_release: 0.17
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: onkyo
ha_codeowners:
  - '@klaashoekstra94'
ha_platforms:
  - media_player
  - number
ha_integration_type: integration
---

The `onkyo` integration allows you to control [Onkyo](https://www.onkyo.com), [Integra](http://www.integrahometheater.com)
and some recent [Pioneer](https://www.pioneerelectronics.com) receivers from Home Assistant.
Please be aware that you need to enable "Network Standby" for this integration to work in your Hardware.

{% include integrations/config_flow.md %}

 If your receiver has second or third zone’s available, they are displayed as additional media players.

{% configuration_basic %}
sources:
  description: A list of mappings from source to source name to give custom names to the available sources. Unused sources may also be disabled.
{% endconfiguration_basic %}

## Maximum volume

Different models of receivers have different volume ranges to set. Older receivers range from `0` to `80`, newer receivers to `200`. Since it's not possible to retrieve the range from de receiver, a number entity is created to set the maximum volume for each device. If you find the maximum volume of the receiver too loud, you can set this to a lower value to set Home Assistant's 100% volume to be that value. i.e., if your receiver has a maximum volume of `200` and you set the maximum volume number entity value to `100`, your receiver's actual volume will be set to 50% when you set the volume in Home Assistant to 100%.

## Playing media

The `play_media` service can be used in a script to play a radio station by preset number.
Note that this does not work for NET radio.

### Examples

This is an example service call that plays the radio station at preset 1.

```yaml
# Example play_media script
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

## Services

The `onkyo` integration makes the following custom service available.

### Service `select_hdmi_output`

Changes HDMI output of your receiver

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of a single `entity_id` that will change output.
| `hdmi_output` | no | The desired output code.

Accepted values are:
`no`, `analog`, `yes`, `out`, `out-sub`, `sub`, `hdbaset`, `both` and `up`.
which one to use seems to vary depending on model so you will have to try them out.
(For model TX-NR676E it seems to be `out` for main, `out-sub` for sub, and `sub` for both).

{% raw %}

```yaml
# Example script to use select_hdmi_output service
script:
  hdmi_sub:
    alias: "HDMI out projector"
    sequence:
      - service: onkyo.select_hdmi_output
        target:
          entity_id: media_player.onkyo
        data:
          hdmi_output: "out-sub"
```

{% endraw %}
