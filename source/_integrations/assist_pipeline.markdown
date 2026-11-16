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

## Debug recordings

If Assist doesn't understand you or doesn't react to the wake word, you can save the audio of your voice commands and listen to what Home Assistant received.

{% important %}
**Risk of recording private conversations and running out of disk space**

If Home Assistant listens for the wake word itself, debug recording saves everything the microphone picks up while it's waiting for the wake word, not only your commands. Home Assistant never deletes the recordings, so they keep using disk space until you remove them.

To avoid this:

- Turn on debug recording only while you reproduce the problem.
- When you're done, [turn off debug recording](#turning-off-debug-recording) and delete the recordings folder.
{% endimportant %}

### Recording voice commands for debugging

Prerequisites:

- You can [edit your `configuration.yaml` file](/docs/configuration/#editing-configurationyaml).
- On Home Assistant OS: the [Samba app](/common-tasks/os/#installing-and-using-the-samba-app) is installed, so you can open the recordings from another computer.

1. In your {% term "`configuration.yaml`" %} file, add `debug_recording_dir` under `assist_pipeline`:

   ```yaml
   # Example configuration.yaml entry
   assist_pipeline:
     debug_recording_dir: /share/assist_pipeline
   ```

   - On Home Assistant OS, use a folder in `/share`. This is the **share** folder in the Samba app.
   - On other installation types, use a folder that you can access from outside Home Assistant.
   - Home Assistant creates the folder if it doesn't exist.
2. Restart Home Assistant.
3. Reproduce the problem: say the wake word and your command to the device that has the problem.
4. Open the folder with the recording.
   - Each voice command gets its own folder: `<debug_recording_dir>/<device ID>/<assistant name>/<number>`. If the command didn't come from a device, there is no `<device ID>` folder.
   - To find the device ID, go to {% my devices title="**Settings** > **Devices & services** > **Devices**" %} and select the device. The ID is the last part of the URL.
   - The folder numbers aren't dates. To find the latest recording, sort by **Date modified**.
5. Listen to the recordings.
   - `01_stt-*.wav`: the audio that was sent to speech-to-text.
   - `00_wake-*.wav`: the audio Home Assistant listened to for the wake word. Only saved if Home Assistant detects the wake word, not the device itself.
   - Result: You hear what wake word detection and speech-to-text received. For an example of how to use this, see [tweaking the Assist audio configuration](/voice_control/troubleshooting/#tweaking-the-assist-audio-configuration-for-your-device).

When you're done, [turn off debug recording](#turning-off-debug-recording).

### Turning off debug recording

1. In your {% term "`configuration.yaml`" %} file, remove the `debug_recording_dir` line.
2. Restart Home Assistant.
3. Delete the folder with the recordings.
