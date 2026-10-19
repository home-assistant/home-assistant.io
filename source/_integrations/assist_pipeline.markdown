---
title: Assist pipeline
description: Assist pipeline integration.
ha_category:
  - Voice
ha_iot_class: Local Push
ha_release: '2023.5'
ha_codeowners:
  - '@synesthesiam'
  - '@arturpragacz'
ha_domain: assist_pipeline
ha_integration_type: system
ha_quality_scale: internal
ha_platforms:
  - select
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

## Debug recordings

To find out why Assist doesn't understand you, you can save the audio of every voice command. Add `debug_recording_dir` to your {% term "`configuration.yaml`" %} file and restart Home Assistant:

```yaml
# Example configuration.yaml entry
assist_pipeline:
  debug_recording_dir: /share/assist_pipeline
```

For each voice command, a folder is created with the wake word audio (`00_wake-*.wav`) and the speech-to-text audio (`01_stt-*.wav`). For an example of how to use them, see [troubleshooting Assist](/voice_control/troubleshooting/).

Home Assistant doesn't delete these recordings while recording is on. When you're done debugging, remove `debug_recording_dir` and restart Home Assistant. A repair in {% my repairs title="**Settings** > **System** > **Repairs**" %} then reminds you in these cases, and can delete the recordings for you:

- Recording was turned off, or `debug_recording_dir` was changed, but recordings are still in the old directory. This only works for directories that were set after this repair was added.
- Recording is still on and the oldest recording is more than 7 days old. This is checked at startup and once a day.

Only the files Assist wrote are deleted: the `00_wake-*.wav` and `01_stt-*.wav` files, and the folders that are empty afterwards. Other files in the directory are left alone.
