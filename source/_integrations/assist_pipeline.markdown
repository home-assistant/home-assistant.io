---
title: Assist pipeline
description: Assist pipeline integration.
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@balloob'
  - '@synesthesiam'
ha_domain: assist_pipeline
ha_integration_type: integration
ha_quality_scale: internal
ha_platforms:
  - select
---

The Assist pipeline integration provides the foundation for the [Assist](/voice_control/) voice assistant in Home Assistant. 

For most users, there is no need to install this integration manually. The Assist pipeline integration is part of the default configuration and is set up automatically if needed by other integrations. 
If you are not using the default integration, you need to add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
assist_pipeline:
```

For more information, refer to the procedure on [configuring a pipeline](/voice_control/voice_remote_local_assistant/).
