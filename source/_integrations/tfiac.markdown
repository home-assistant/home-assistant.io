---
title: Tfiac
description: Instructions on how to integrate Tfiac AC devices with Home Assistant.
ha_category:
  - Climate
ha_release: 0.91
ha_iot_class: Local Polling
ha_codeowners:
  - '@fredrike'
  - '@mellado'
ha_domain: tfiac
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `tfiac` {% term integration %} integrates several vendors air conditioning systems, that uses the Tfiac mobile app, into Home Assistant. App currently available at [Play Store](https://play.google.com/store/apps/details?id=com.tcl.export) and [App Store](https://itunes.apple.com/app/tfiac/id1059938398).

## Configuration

To add your Tfiac {% term integration %} into your Home Assistant installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Full manual example configuration.yaml entry
climate:
  - platform: tfiac
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of your AC device.
  required: true
  type: string
{% endconfiguration %}
