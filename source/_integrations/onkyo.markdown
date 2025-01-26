---
title: Onkyo
description: Instructions on how to integrate Onkyo and some Pioneer receivers into Home Assistant.
ha_category:
  - Media player
ha_codeowners:
  - '@arturpragacz'
  - '@eclair4151'
ha_config_flow: true
ha_domain: onkyo
ha_integration_type: device
ha_iot_class: Local Push
ha_platforms:
  - media_player
ha_release: 0.17
ha_ssdp: true
---

The `onkyo` {% term integration %} allows you to control [Onkyo](https://www.onkyo.com) and [Integra](http://www.integrahometheater.com) (from 2011 onward) and also [Pioneer](https://www.pioneerelectronics.com) (from 2016 onward) receivers using Home Assistant.
Please be aware that you need to enable "Network Standby" for this integration to work with your hardware.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: Hostname or IP address of the device, for example:`192.168.1.2`.
Volume Resolution:
  description: Number of steps it takes for the receiver to go from the lowest to the highest possible volume. Possible values are 50, 80, 100, 200. For older Onkyo receivers, this typically is 80; newer Onkyo receivers use 200.
Input sources:
  description: List of input sources supported by the receiver.
{% endconfiguration_basic %}

The above settings can also be adjusted later. To do this, click the three-dot menu on the integration entry and select **Reconfigure**.

{% include integrations/option_flow.md %}

{% configuration_basic %}
Max Volume:
  description: Maximum volume limit as a percentage. Often the maximum volume of the receiver is far too loud. Setting this will set Home Assistant's 100% volume to be this setting on the amp, i.e., if you set this to 50%, when you set Home Assistant to be 100%, then your receiver will be set to 50% of its maximum volume.
Input sources:
  description: Mappings of input sources to their names.
{% endconfiguration_basic %}

## Zones

If your receiver has a second or third zone available, they are displayed as additional media players with functionality similar to the main zone.

## Actions

### Action `onkyo_select_hdmi_output`

Changes HDMI output of your receiver

| Data attribute | Optional | Description                                                     |
| ---------------------- | -------- | --------------------------------------------------------------- |
| `entity_id`            | no       | String or list of a single `entity_id` that will change output. |
| `hdmi_output`          | no       | The desired output code.                                        |

Accepted values are:
'no', 'analog', 'yes', 'out', 'out-sub', 'sub', 'hdbaset', 'both', 'up'
which one to use seems to vary depending on model so you will have to try them out.
( For model TX-NR676E it seems to be 'out' for main, 'out-sub' for sub, and 'sub' for both )

### Example `onkyo_select_hdmi_output` script

```yaml
# Example onkyo_select_hdmi_output script
#
script:
  hdmi_sub:
    alias: "Hdmi out projector"
    sequence:
      - action: media_player.onkyo_select_hdmi_output
        data:
          entity_id: media_player.onkyo
          hdmi_output: out-sub
```

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
      - action: media_player.turn_on
        target:
          entity_id: media_player.onkyo
      - action: media_player.play_media
        target:
          entity_id: media_player.onkyo
        data:
          media_content_type: "radio"
          media_content_id: "1"
```

## Supported devices

Network receivers from Onkyo and Integra are supported starting with models from the year 2011. Pioneer network receivers are supported starting with models from 2016.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
