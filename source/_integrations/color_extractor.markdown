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

{% important %}
Ensure any [external URLs](/integrations/homeassistant/#allowlist_external_urls) or [external files](/integrations/homeassistant/#allowlist_external_dirs) are authorized for use. You will receive error messages if this {% term integration %} is not allowed access to these external resources.
{% endimportant %}

{% include integrations/actions.md %}
