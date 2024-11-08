---
title: Acaia
description: Instructions on how to integrate your Acaia smart coffee scale with Home Assistant.
ha_release: 2024.12
ha_category:
  - Button
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: acaia
ha_platforms:
  - button
ha_bluetooth: true
ha_codeowners:
  - '@zweckj'
ha_integration_type: device
---

The **Acaia** {% term integrations %} allows you to control [Acaia](https://acaia.co/) scales through Home Assistant.

If your machine is in Bluetooth range to your Home Assistant host and the [Bluetooth](/integrations/bluetooth) integration is fully loaded, the scale should be discovered automatically.

{% include integrations/config_flow.md %}

{% configuration_basic %}
MAC:
  description: "The MAC address of your scale."
  required: true
  type: string
Is new style scale:
  description: "Check this if your scale is a newer model (manufactured after 2021). This setting affects how commands are sent to the scale. If your scale doesn't respond to commands, try toggling this setting. For example, Lunar models made after 2021 should have this enabled."
  required: false
  type: boolean
{% endconfiguration_basic %}

# Available platforms & entities

## Buttons

- **Tare**: Tares the scale
- **Reset timer**: Resets the timer. If the timer is running, it will continue to run.
- **Start/stop timer**: Starts or stops the timer, depending on whether the timer is currently running. Does not reset, but continue the timer.

## Supported devices

The following devices have been tested successfully with this integration:

- Lunar (manufactured after 2021)
- Pyxis

If you have successfully tested this integration with another Acaia model, please let us know by enhancing this documentation, or by opening an issue in GitHub.

## Possible use-cases

The main use-case for this integration is to be used with integration for smart coffee machines, e.g. the [La Marzocco integration](https://www.home-assistant.io/integrations/lamarzocco/).
It could also be used to display the weight on secondary displays when brewing on a Pyxis or Lunar and cannot see the display.

## Automations

Get started with these automation examples.

### Tare & start timer when brew starts

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: Start timer on scale
description: "When a brew starts on the machine, tares, resets the timer and starts the timer on the scale"
triggers:
  - entity_id:
      - binary_sensor.lm001234_brewing_active
    to: "on"
    from: "off"
    trigger: state
conditions: []
actions:
  - action: button.press
    target:
      entity_id: button.lunar_tare
    data: {}
  - action: button.press
    target:
      entity_id:
        - button.lunar_reset_timer
    data: {}
  - action: button.press
    target:
      entity_id:
        - button.lunar_start_stop_timer
    data: {}
mode: single

```

{% endraw %}
{% enddetails %}

## Troubleshooting

{% details "Problem: Not reacting to commands" %}

Try toggling the **Is new style scale** setting in the reconfiguration settings.
{% enddetails %}

