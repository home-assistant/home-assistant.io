---
title: "Refresh library"
action: plex.refresh_library
domain: plex
description: "Refreshes a Plex library to scan for new and updated media."
---

Use this action to tell Plex to scan one of its libraries for new and updated media. This is handy when you add files outside of Plex's regular scan schedule and want them to show up right away.

{% include actions/ui_header.md %}

To refresh a Plex library from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Plex: Refresh library**.
6. Enter the **Library name** you want to refresh.
7. _Optional_: If you have more than one Plex server, enter the **Server name** to choose which one to use.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Library name:
  description: The name of the Plex library to refresh.
Server name:
  description: The name of the Plex server to use. Only needed if you have more than one server configured.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `plex.refresh_library`. A basic example looks like this:

{% example %}
action: |
  action: plex.refresh_library
  data:
    library_name: TV Shows
{% endexample %}

This scans the `TV Shows` library for new and updated media.

### Options in YAML

{% options_yaml %}
library_name:
  description: The name of the Plex library to refresh.
  required: true
  type: string
server_name:
  description: The name of the Plex server to use. Only needed if you have more than one server configured.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Plex scans your libraries on its own schedule. Use this action when you want a scan to happen right away, for example after a new download lands on your media drive.
- The library name must match the name of a library on your Plex server exactly.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: refresh the library every night

Keep your Plex library up to date by scanning it once a day, while everyone is asleep.

- **Trigger**: Time, 03:00
- **Action**: Plex: Refresh library
  - **Library name**: TV Shows

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Refresh the Plex TV library nightly"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: plex.refresh_library
      data:
        library_name: TV Shows
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}
