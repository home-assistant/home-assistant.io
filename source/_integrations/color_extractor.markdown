---
title: ColorExtractor
description: Instructions how to integrate the Color Extractor into Home Assistant.
ha_release: 0.118
ha_category:
  - Image processing
ha_domain: color_extractor
ha_codeowners:
  - '@GenericStudent'
ha_config_flow: true
ha_integration_type: integration
---

The **ColorExtractor** {% term integration %} will extract the predominant color from a given image and apply that color to a target light.
Useful as part of an {% term automation %}.

{% include integrations/config_flow.md %}


{% include integrations/actions.md %}
