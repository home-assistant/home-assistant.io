---
title: ProgettiHWSW Automation
description: Instructions on how to integrate the ProgettiHWSW remote relay boards into Home Assistant.
ha_category:
  - Binary sensor
  - DIY
  - Switch
ha_release: 0.115
ha_iot_class: Local Polling
ha_domain: progettihwsw
ha_codeowners:
  - '@ardaseremet'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
---

The `progettihwsw` integration brings the automation experience with ProgettiHWSW boards to Home Assistant.

{% include integrations/config_flow.md %}

## Binary sensor

The `progettihwsw` binary sensor platform allows you to read the input values of a [ProgettiHWSW Board](http://www.progetti-hw-sw.it/).

The input numbers for sensors are shown on the board's enclosure and PCB.

## Switch

The `progettihwsw` switch platform allows you to control relays of a [ProgettiHWSW Board](http://www.progetti-hw-sw.it/).

For more information about the boards, visit [our website](http://www.progetti-hw-sw.it/).

### Troubleshooting

There are no known errors with this integration yet. Feel free to submit them to us.
