---
title: "Get library items"
action: music_assistant.get_library
domain: music_assistant
description: "Retrieves items from a Music Assistant library."
related_actions:
  - music_assistant.search
  - music_assistant.play_media
---

Use this action to retrieve items from your Music Assistant library. It gives you programmatic access to concise information about your library items, which you can use to build a queue of tracks for playback.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It does not change anything on a player.

{% include actions/ui_header.md %}

To get library items from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Music Assistant: Get library items**.
6. Fill in the options you want to use.
7. In the **Response variable** field, enter a name to store the data in, such as `library_items`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Music Assistant instance through the **Music Assistant instance** option instead.

### Options in the UI

{% options_ui %}
Music Assistant instance:
  description: The Music Assistant instance to retrieve the items from.
Media type:
  description: The media type to request the items for.
Favorites only:
  description: Only return items that are marked as favorites.
Search:
  description: An optional search string to filter the library items.
Limit:
  description: The maximum number of items to return.
Offset:
  description: The point in the list to start returning items from.
Order by:
  description: The field to sort the list by.
Album type filter (albums library only):
  description: When the media type is album, restrict the results to these album types.
Enable album artists filter (only for artist library):
  description: When the media type is artist, only return album artists.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.get_library`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.get_library
  data:
    config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
    media_type: track
  response_variable: library_items
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Music Assistant instance to retrieve the items from. Select the instance from the dropdown in the visual editor, then switch to YAML to read the value.
  required: true
  type: string
media_type:
  description: "The media type to request the items for. One of: `artist`, `album`, `audiobook`, `playlist`, `podcast`, `track`, or `radio`."
  required: true
  type: string
favorite:
  description: Only return items that are marked as favorites.
  required: false
  type: boolean
  default: false
search:
  description: An optional search string to filter the library items.
  required: false
  type: string
limit:
  description: The maximum number of items to return.
  required: false
  type: integer
  default: 25
offset:
  description: The point in the list to start returning items from.
  required: false
  type: integer
  default: 0
order_by:
  description: The field to sort the list by, such as `name`, `year`, or `random`.
  required: false
  type: string
album_type:
  description: "When the media type is album, restrict the results to these album types. One or more of: `album`, `single`, `compilation`, `ep`, or `unknown`."
  required: false
  type: [string, list]
album_artists_only:
  description: When the media type is artist, only return album artists.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Response data

The action returns an `items` list with the matching library items, along with the `limit`, `offset`, `order_by`, and `media_type` you requested. Each item includes details such as its name and URI, which you can pass to the [Play media](/actions/music_assistant.play_media/) action.

This example starts playback of ten random tracks:

{% example %}
script: |
  sequence:
    - action: music_assistant.get_library
      data:
        config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
        media_type: track
        limit: 10
        order_by: random
      response_variable: random_tracks
    - action: music_assistant.play_media
      target:
        entity_id: media_player.kitchen_speaker
      data:
        media_id: "{{ random_tracks['items'] | map(attribute='uri') | list }}"
        media_type: track
        enqueue: replace
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
