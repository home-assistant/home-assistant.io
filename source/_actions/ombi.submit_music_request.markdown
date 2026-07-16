---
title: "Submit music request"
action: ombi.submit_music_request
domain: ombi
description: "Searches for a music album and requests the first result in Ombi."
related_actions:
  - ombi.submit_movie_request
  - ombi.submit_tv_request
---

The **Submit music request** action searches your Ombi instance for a music album by name and submits a request for the first matching result.

This is handy when you want to request an album without opening the Ombi interface, for example from a voice assistant or a dashboard button.

{% include actions/ui_header.md %}

To submit a music request from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Ombi: Submit music request**.
6. Enter the **Name** of the album to search for.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Name:
  description: The music album to search for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ombi.submit_music_request`. A basic example looks like this:

{% example %}
action: |
  action: ombi.submit_music_request
  data:
    name: "Nevermind"
{% endexample %}

This searches Ombi for the album and requests the first matching result.

### Options in YAML

{% options_yaml %}
name:
  description: >
    The music album to search for.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: request an album when you tap a button

When you press a dashboard button, request a specific album in Ombi.

- **Trigger**: A button helper is pressed
- **Action**: Ombi: Submit music request

{% details "YAML example for requesting an album from a button" %}

{% example %}
automation: |
  alias: "Request album of the week"
  triggers:
    - trigger: state
      entity_id: input_button.music_request
  actions:
    - action: ombi.submit_music_request
      data:
        name: "Nevermind"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
