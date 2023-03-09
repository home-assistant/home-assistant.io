---
title: "Quadra-Fire"
description: Connect and control your Monessen fireplace using the IntelliFire integration
ha_category:
  - Binary Sensor
  - Climate
  - Fan
  - Light
  - Number
  - Sensor
  - Switch
ha_domain: quadrafire
ha_integration_type: virtual
ha_supporting_domain: intellifire
ha_supporting_integration: IntelliFire
ha_release: 2022.3
ha_codeowners:
  - '@jeeftor'
ha_platforms:
  - binary_sensor
  - climate
  - fan
  - light
  - number
  - sensor
  - switch
ha_iot_class: Local Polling
---

{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

{{ name }} fireplaces with an installed IntelliFire module can utilize the
[{{ page.ha_supporting_integration }}](/integrations/{{ page.ha_supporting_domain }})
integration.

{% include integrations/config_flow.md domain=page.ha_supporting_domain %}

## Usage information

For more documentation on how to use {{ name }} in Home Assistant, please refer to the
[{{ page.ha_supporting_integration }} integration documentation page](/integrations/{{ page.ha_supporting_domain }}).
