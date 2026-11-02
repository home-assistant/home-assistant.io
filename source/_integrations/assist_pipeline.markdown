---
description: Assist pipeline integration.
ha_release: '2023.5'
ha_domain: assist_pipeline
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /voice_control/voice_remote_local_assistant/
    title: Configuring a voice pipeline
  - docs: /voice_control/
    title: Assist
---

The **Assist pipeline** {% term integration %} provides the foundation for the [Assist](/voice_control/) voice assistant in Home Assistant.

For most users, there is no need to install this integration manually. The Assist pipeline integration is part of the default configuration and is set up automatically if needed by other integrations.
If you are not using the default {% term integration %}, you need to add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
assist_pipeline:
```

For more information, refer to the procedure on [configuring a pipeline](/voice_control/voice_remote_local_assistant/).
