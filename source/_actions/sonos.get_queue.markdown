---
title: "Get the Sonos queue"
action: sonos.get_queue
domain: sonos
description: "Returns the contents of a Sonos speaker's queue."
related_actions:
  - sonos.play_queue
  - sonos.remove_from_queue
---

Use this action to get the contents of a Sonos speaker's queue, for example to find a specific track and remove it, or to show what is coming up next.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the Sonos queue from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sonos speaker whose queue you want to read.
6. From the actions shown for that target, select **Get queue**.
7. In the **Response variable** field, enter a name to store the queue data in, such as `queue`. You'll use this name to read the queue in later steps.
8. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonos.get_queue`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: sonos.get_queue
  target:
    entity_id: media_player.living_room
  response_variable: queue
{% endexample %}

{% include actions/targets.md domain="media_player" %}

## Response data

The action returns the queue for each speaker you targeted, keyed by the speaker's entity ID. Each item in the list includes the following fields:

- `media_title`: The title of the track.
- `media_album_name`: The album the track belongs to.
- `media_artist`: The artist of the track.
- `media_content_id`: The content identifier of the track.

A shortened example of the response looks like this:

```yaml
media_player.living_room:
  - media_title: Lazy Sunday
    media_album_name: Morning Coffee
    media_artist: The Beanery
    media_content_id: x-sonos-http:track%3a1234.mp3
  - media_title: Slow Down
    media_album_name: Morning Coffee
    media_artist: The Beanery
    media_content_id: x-sonos-http:track%3a5678.mp3
```

## Good to know

- Use the [Remove from the Sonos queue](/actions/sonos.remove_from_queue/) action together with this one to clear specific tracks. The example below gets the queue, loops through it in reverse order, and removes any track whose title or album contains the word "holiday":

```yaml
- action: sonos.get_queue
  target:
    entity_id: media_player.living_room
  response_variable: queue
- variables:
    queue_len: "{{ queue['media_player.living_room'] | length }}"
- repeat:
    sequence:
      - variables:
          title: "{{ queue['media_player.living_room'][queue_len - repeat.index]['media_title'].lower() }}"
          album: "{{ queue['media_player.living_room'][queue_len - repeat.index]['media_album_name'].lower() }}"
          position: "{{ queue_len - repeat.index }}"
      - if:
          - "{{ 'holiday' in title or 'holiday' in album }}"
        then:
          - action: sonos.remove_from_queue
            target:
              entity_id: media_player.living_room
            data:
              queue_position: "{{ position }}"
    until:
      - "{{ queue_len == repeat.index }}"
```

{% include actions/stuck.md %}

{% include actions/related.md %}
