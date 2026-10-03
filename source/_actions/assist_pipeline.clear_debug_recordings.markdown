---
title: "Clear debug recordings"
action: assist_pipeline.clear_debug_recordings
domain: assist_pipeline
description: "Deletes the voice command audio that Assist saved for debugging."
---

The **Clear debug recordings** action deletes the audio files that the [Assist pipeline](/integrations/assist_pipeline/#debug-recordings) integration saves while `debug_recording_dir` is set. Home Assistant never deletes these recordings on its own, so they keep taking up disk space. Use this action to remove all of them, or only the ones older than a number of days.

This action can only be used by administrators.

{% include actions/ui_header.md %}

To clear the recordings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Assist pipeline: Clear debug recordings**.
6. Optionally, set **Older than** to the number of days to keep.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Older than:
  description: Only deletes recordings that are older than this many days. For example, a value of 7 keeps the recordings of the last 7 days. If omitted, all recordings are deleted.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `assist_pipeline.clear_debug_recordings`. This example deletes recordings older than 7 days:

{% example %}
action: |
  action: assist_pipeline.clear_debug_recordings
  data:
    days: 7
{% endexample %}

### Options in YAML

{% options_yaml %}
days:
  description: Only deletes recordings that are older than this many days. For example, a value of 7 keeps the recordings of the last 7 days. If omitted, all recordings are deleted.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- The action fails if `debug_recording_dir` isn't set in your {% term "`configuration.yaml`" %} file.
- Only the recordings that Assist wrote are deleted: the `00_wake-*.wav` and `01_stt-*.wav` files in each voice command's folder, and the folders that are empty afterwards. Other files in the directory are left alone.
- Deleting the recordings doesn't stop new ones. To stop recording, remove `debug_recording_dir` and restart Home Assistant.

{% include actions/stuck.md %}

{% include actions/related.md %}
