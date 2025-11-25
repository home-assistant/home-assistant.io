---
title: Melissa
description: Instructions on how to integrate Melissa Climate into Home Assistant.
ha_category:
  - Climate
  - Hub
ha_release: 0.63
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@kennedyshead'
ha_domain: melissa
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `melissa` {% term integration %} is the main integration to connect to a [Melissa Climate](https://seemelissa.com/) A/C control.

There is currently support for the following device types within Home Assistant:

- Climate

The climate platform will be automatically configured if Melissa integration is configured.

## Configuration

To set the Melissa {% term integration %} up, add the following information to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
melissa:
  username: YOUR_MELISSA_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
  username:
    description: The username for accessing your Melissa account.
    required: true
    type: string
  password:
    description: The password for accessing your Melissa account.
    required: true
    type: string
{% endconfiguration %}
