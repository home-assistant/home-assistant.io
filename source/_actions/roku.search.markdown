---
title: Search
action: roku.search
domain: roku
description: "Open the search screen on a Roku device and enter a search keyword."
---

Use this action to emulate opening the search screen on your Roku device and entering a keyword. This is handy when you want to jump straight to search results for a movie, show, or app from an automation or script, without picking up the remote.

{% include actions/ui_header.md %}

To search from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Roku media player you want to search on.
6. From the actions shown for that target, select **Search**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Keyword:
  description: The keyword to search for.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `roku.search`. A basic example looks like this:

{% example %}
action: |
  action: roku.search
  target:
    entity_id: media_player.roku
  data:
    keyword: "Space Jam"
{% endexample %}

This opens the search screen on the Roku device and searches for "Space Jam".

### Options in YAML

{% options_yaml %}
keyword:
  description: The keyword to search for.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The search opens on the Roku device itself. What you can do with the results depends on the apps installed on the device.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
