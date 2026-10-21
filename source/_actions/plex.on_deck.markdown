---
title: "On deck"
action: plex.on_deck
domain: plex
description: "Returns the unfinished media and next episodes from the Continue Watching list of a Plex server."
related_actions:
  - plex.search
  - media_player.play_media
---

Use this action to get the media you can continue watching: unfinished movies and episodes, and the next episode of the shows you are following. For example, you can use it to fill a dashboard with media that you can pick up again.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the Continue Watching list from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Plex Media Server: On deck**.
6. _Optional_: Select a **Library name** or **Media type** to limit the list, or set a **Limit**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Library name:
  description: Only return items from this Plex library.
  required: false
Media type:
  description: Only return movies or only return episodes.
  required: false
Limit:
  description: The maximum number of items to return. The default is 20.
  required: false
Server name:
  description: The name of the Plex server to use. Only needed if you have more than one server configured.
  required: false
Username:
  description: The Plex user to get the list for. Only needed if the Plex server has multiple users.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `plex.on_deck`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: plex.on_deck
  data:
    media_type: episode
    limit: 5
  response_variable: continue_watching
{% endexample %}

This returns up to five episodes that you can continue watching.

### Options in YAML

{% options_yaml %}
library_name:
  description: Only return items from this Plex library.
  required: false
  type: string
media_type:
  description: Only return `movie` or only return `episode` items.
  required: false
  type: string
limit:
  description: The maximum number of items to return, from 1 to 100.
  required: false
  default: 20
  type: integer
server_name:
  description: The name of the Plex server to use. Only needed if you have more than one server configured.
  required: false
  type: string
username:
  description: The Plex user to get the list for. Only needed if the Plex server has multiple users.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action returns a list named `results`. Each item has the same fields as a result of the [Search](/actions/plex.search/#response-data) action. Two fields are useful here:

- `view_offset`: How far you got, in milliseconds.
- `progress_percent`: How much of the item you watched, as a percentage.

For episodes, the `show_title`, `season_number`, and `episode_number` fields tell you which show and episode it is.

A shortened example of the response looks like this:

```yaml
results:
  - title: A Chance to Stay
    media_type: episode
    show_title: The Best Immigrant
    season_number: 1
    episode_number: 1
    progress_percent: 51
```

## Good to know

- The list is the same Continue Watching list that you see in Plex.
- The `thumb_url` link of each item is signed. It works in dashboard cards and stays valid for a year or until Home Assistant restarts. If you store the links, for example in a helper, call the action again after a restart to get new ones.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
