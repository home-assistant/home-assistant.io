---
title: "Submit TV request"
action: ombi.submit_tv_request
domain: ombi
description: "Searches for a TV show and requests the first result in Ombi."
related_actions:
  - ombi.submit_movie_request
  - ombi.submit_music_request
---

The **Submit TV request** action searches your Ombi instance for a TV show by name and submits a request for the first matching result. You can choose which seasons to request.

This is handy when you want to request a show without opening the Ombi interface, for example from a voice assistant or a dashboard button.

{% include actions/ui_header.md %}

To submit a TV request from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Ombi: Submit TV request**.
6. Enter the **Name** of the show to search for, and choose which **Season** to request.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Name:
  description: The TV show to search for.
  required: true
Season:
  description: "Which seasons to request: the first season, the latest season, or all seasons. Defaults to the latest season."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ombi.submit_tv_request`. A basic example looks like this:

{% example %}
action: |
  action: ombi.submit_tv_request
  data:
    name: "Breaking Bad"
    season: all
{% endexample %}

This searches Ombi for the show and requests all of its seasons.

### Options in YAML

{% options_yaml %}
name:
  description: >
    The TV show to search for.
  required: true
  type: string
season:
  description: >
    Which seasons to request. One of `first`, `latest`, or `all`.
  required: false
  default: latest
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: request a show when you tap a button

When you press a dashboard button, request the latest season of a specific show in Ombi.

- **Trigger**: A button helper is pressed
- **Action**: Ombi: Submit TV request

{% details "YAML example for requesting a show from a button" %}

{% example %}
automation: |
  alias: "Request show of the week"
  triggers:
    - trigger: state
      entity_id: input_button.tv_request
  actions:
    - action: ombi.submit_tv_request
      data:
        name: "Breaking Bad"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
