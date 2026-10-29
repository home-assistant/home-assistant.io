---
title: Assist pipeline
description: Assist pipeline integration.
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

On Home Assistant OS, `/share` is the **share** folder. You can open it from another computer with the Samba app](/common-tasks/os/#installing-and-using-the-samba-app). On other installation types, use a folder that you can access from outside Home Assistant.

For each voice command, Home Assistant creates a folder inside `debug_recording_dir`, grouped by device and assistant. Each folder contains the speech-to-text audio (`01_stt-*.wav`). If Home Assistant listens for the wake word itself, the folder also contains the wake word audio (`00_wake-*.wav`). Devices that detect the wake word themselves only save the speech-to-text audio. The folder names are numbers, not dates, so sort by date modified to find the most recent recordings. For an example of how to use them, see [troubleshooting Assist](/voice_control/troubleshooting/).

The wake word audio contains everything the microphone picked up while Home Assistant was listening for the wake word, not only your command. Home Assistant doesn't delete these recordings, so they keep taking up disk space. When you're done debugging, remove `debug_recording_dir`, restart Home Assistant, and delete the folder with the recordings.
