---
title: Browser
description: Instructions on how to set up the browser integration with Home Assistant.
ha_category:
  - Utility
ha_release: pre 0.7
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: browser
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Browser** {% term integration %} provides a action to open URLs in the default browser on the host machine.

## Configuration

To load this integration, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
browser:
```

{% include integrations/actions.md %}
