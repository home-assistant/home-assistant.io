---
title: "Search Music Assistant"
action: music_assistant.search
domain: music_assistant
description: "Performs a global search on the Music Assistant library and all providers."
related_actions:
  - music_assistant.get_library
  - music_assistant.play_media
---

Use this action to search the Music Assistant library and all connected providers at once. This gives you programmatic access to the full catalog of your music providers, which you can use to build a dashboard where any track can be found and played.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It does not change anything on a player.

{% include actions/ui_header.md %}

To search from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Music Assistant: Search Music Assistant**.
6. Fill in the options you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Music Assistant instance through the **Music Assistant instance** option instead.

### Options in the UI

{% options_ui %}
Music Assistant instance:
  description: The Music Assistant instance to perform the search on.
Search name:
  description: The name or title to search for.
Media type(s):
  description: "The type of content to search for, such as artist, album, track, radio, or playlist. All types when omitted."
Artist name:
  description: When specifying a track or album name in the search name field, you can optionally restrict results by this artist name.
Album name:
  description: When specifying a track name in the search name field, you can optionally restrict results by this album name.
Limit:
  description: The maximum number of items to return per media type.
Only library items:
  description: Only include results that are in the library.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.search`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.search
  data:
    config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
    name: "We Are The Champions"
  response_variable: search_results
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Music Assistant instance to perform the search on. Select the instance from the dropdown in the visual editor, then switch to YAML to read the value.
  required: true
  type: string
name:
  description: The name or title to search for.
  required: true
  type: string
media_type:
  description: "The type of content to search for. One or more of: `artist`, `album`, `audiobook`, `playlist`, `podcast`, `track`, or `radio`. All types when omitted."
  required: false
  type: [string, list]
artist:
  description: When specifying a track or album name in the `name` field, you can optionally restrict results by this artist name.
  required: false
  type: string
album:
  description: When specifying a track name in the `name` field, you can optionally restrict results by this album name.
  required: false
  type: string
limit:
  description: The maximum number of items to return per media type.
  required: false
  type: integer
  default: 5
library_only:
  description: Only include results that are in the library.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Response data

The action returns lists of matching items, grouped by media type: `artists`, `albums`, `tracks`, `playlists`, `radio`, `audiobooks`, and `podcasts`. Each item includes details such as its name and URI, which you can pass to the [Play media](/actions/music_assistant.play_media/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
