---
title: "Recently added"
action: plex.recently_added
domain: plex
description: "Returns the most recently added movies and shows of a Plex server, newest first."
related_actions:
  - plex.search
  - plex.on_deck
---

Use this action to get the movies and shows that were added to your Plex server most recently. For example, you can use it to fill a dashboard with new additions.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the recently added media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Plex Media Server: Recently added**.
6. _Optional_: Select a **Library name** or **Media type** to limit the list, or set a **Limit**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Library name:
  description: Only return items from this Plex library.
  required: false
Media type:
  description: Only return movies or only return shows.
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

In YAML, refer to this action as `plex.recently_added`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: plex.recently_added
  data:
    media_type: movie
    limit: 5
  response_variable: new_movies
{% endexample %}

This returns the five movies that were added most recently.

### Options in YAML

{% options_yaml %}
library_name:
  description: Only return items from this Plex library.
  required: false
  type: string
media_type:
  description: Only return `movie` or only return `show` items.
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

The action returns a list named `results`, sorted by the time the item was added, newest first. Each item has the same fields as a result of the [Search](/actions/plex.search/#response-data) action.

## Good to know

- Shows are returned as shows, not as individual episodes. Use the `rating_key` of a show to look up its episodes with the [Search](/actions/plex.search/) action.
- The `thumb_url` link of each item is signed. It works in dashboard cards and stays valid for a year or until Home Assistant restarts. If you store the links, for example in a helper, call the action again after a restart to get new ones.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
