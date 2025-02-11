---
title: "Actions"
description: "Define what an object does when interacted with."
related:
  - docs: /dashboards/button/
    title: Button card
  - docs: /dashboards/entities/
    title: Entities card
  - docs: /dashboards/glance/
    title: Glance card
  - docs: /dashboards/light/
    title: Light card
  - docs: /dashboards/picture/
    title: Picture card
  - docs: /dashboards/picture-elements/
    title: Picture element card
  - docs: /dashboards/picture-entity/
    title: Picture entity card
  - docs: /dashboards/picture-glance/
    title: Picture glance card
---

Some cards have support for tap actions. These actions define what will happen when you tap or hold on an object within a card.

Actions can be enabled on the following cards:

- [Button](/dashboards/button/)
- [Entities](/dashboards/entities/)
- [Gauge](/dashboards/gauge/)
- [Glance](/dashboards/glance/)
- [Light](/dashboards/light/)
- [Picture](/dashboards/picture/)
- [Picture element](/dashboards/picture-elements/)
- [Picture entity](/dashboards/picture-entity/)
- [Picture glance](/dashboards/picture-glance/)
- [Tile](/dashboards/tile/)
- [Weather forecast](/dashboards/weather-forecast/)

## Tap action

Action that will be performed when an object on a card is tapped.

```yaml
tap_action:
  action: toggle
```

{% configuration tap-action %}
tap_action:
  required: false
  description: Action taken on tap.
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `perform-action`, `navigate`, `url`, `assist`, `none`)"
      type: string
      default: "`toggle` (some cards overwrite default to `more-info` if the provided entity cannot be toggled)"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g., `/lovelace/0/`) when the `action` is defined as `navigate`"
      type: string
      default: none
    navigation_replace:
      required: false
      description: "Whether to replace the current page in the the history with the new URL when the `action` is defined as `navigate`"
      type: boolean
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g., `https://www.home-assistant.io`) when the `action` is defined as `url`"
      type: string
      default: none
    perform_action:
      required: false
      description: "Action to perform (e.g., `media_player.media_play_pause`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    data:
      required: false
      description: "Action data to include (e.g., `brightness: 100`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    target:
      required: false
      description: "Action target to user (e.g., `entity_id: media_player.bedroom`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
    pipeline_id:
      required: false
      description: "Assist pipeline to use when the `action` is defined as `assist`. It can be either `last_used`, `preferred`, or a pipeline id."
      type: string
      default: "`last_used`"
    start_listening:
      required: false
      description: "If supported, listen for voice commands when opening the assist dialog and the `action` is defined as `assist`"
      type: boolean
      default: none
    entity:
      required: false
      description: "Overrides the default entity to show when the `action` is defined as `more-info`"
      type: string
      default: none
{% endconfiguration %}

## Hold action

Action that will be performed when an object on a card is tapped, held for at least half a second and then released. Action will only be triggered once, not continuously during hold.

```yaml
hold_action:
  action: toggle
```

{% configuration hold_action %}
hold_action:
  required: false
  description: Action taken on tap-and-hold
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `perform-action`, `navigate`, `url`, `assist`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g., `/lovelace/0/`) when the `action` is defined as `navigate`"
      type: string
      default: none
    navigation_replace:
      required: false
      description: "Whether to replace the current page in the the history with the new URL when the `action` is defined as `navigate`"
      type: boolean
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g., `https://www.home-assistant.io`) when the `action` is defined as `url`"
      type: string
      default: none
    perform_action:
      required: false
      description: "Action to perform (e.g., `media_player.media_play_pause`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    data:
      required: false
      description: "Action data to include (e.g., `brightness: 100`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    target:
      required: false
      description: "Action target to user (e.g., `entity_id: media_player.bedroom`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
    pipeline_id:
      required: false
      description: "Assist pipeline id to use when the `action` is defined as `assist`"
      type: string
      default: none
    start_listening:
      required: false
      description: "If supported, listen for voice commands when opening the assist dialog and the `action` is defined as `assist`"
      type: boolean
      default: none
    entity:
      required: false
      description: "Overrides the default entity to show when the `action` is defined as `more-info`"
      type: string
      default: none
{% endconfiguration %}

## Double tap action

Action that will be performed when an object on a card is double-tapped.

```yaml
double_tap_action:
  action: toggle
```

{% configuration double_tap_action %}
double_tap_action:
  required: false
  description: Action taken on double tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `perform-action`, `navigate`, `url`, `assist`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g., `/lovelace/0/`) when the `action` is defined as `navigate`"
      type: string
      default: none
    navigation_replace:
      required: false
      description: "Whether to replace the current page in the the history with the new URL when the `action` is defined as `navigate`"
      type: boolean
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g., `https://www.home-assistant.io`) when the `action` is defined as `url`"
      type: string
      default: none
    perform_action:
      required: false
      description: "Action to perform (e.g., `media_player.media_play_pause`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    data:
      required: false
      description: "Action data to include (e.g., `brightness: 100`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    target:
      required: false
      description: "Action target to user (e.g., `entity_id: media_player.bedroom`) when the `action` is defined as `perform-action`"
      type: string
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
    pipeline_id:
      required: false
      description: "Assist pipeline id to use when the `action` is defined as `assist`"
      type: string
      default: none
    start_listening:
      required: false
      description: "If supported, listen for voice commands when opening the assist dialog and the `action` is defined as `assist`"
      type: boolean
      default: none
    entity:
      required: false
      description: "Overrides the default entity to show when the `action` is defined as `more-info`"
      type: string
      default: none
{% endconfiguration %}

## Options for confirmation

If you define confirmation as an object instead of boolean, you can add more customization and configurations.

```yaml
double_tap_action:
  action: perform-action
  confirmation:
    text: Are you sure you want to restart?
  perform_action: script.restart
hold_action:
  action: perform-action
  confirmation: true
  perform_action: script.do_other_thing
```

{% configuration confirmation%}
text:
  required: false
  description: Text to present in the confirmation dialog.
  type: string
exemptions:
  required: false
  description: "List of `exemption` objects. See below"
  type: list
{% endconfiguration %}

## Options for exemptions

{% configuration exemptions %}
user:
  required: true
  description: User ID for which the confirmation dialog will **not** be shown.
  type: string
{% endconfiguration %}

```yaml
double_tap_action:
  action: perform-action
  confirmation:
    text: Are you sure you want to restart?
    exemptions:
      - user: x9405b8c64ee49bb88c42000e0a9dfa8
      - user: 88bcfbdc39155d16c3b2d09cbf8b0367
  perform_action: script.restart
```

## Examples

Tap action implemented on an entity button card:

```yaml
type: button
tap_action:
  action: toggle
hold_action:
  action: more-info
```

## Limitations

It is not possible to use templates for actions. But calling a [script](/docs/scripts/) is a good alternative.
