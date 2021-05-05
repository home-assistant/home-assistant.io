---
title: "Actions"
description: "Define what an object does when interacted with."
---

Some Lovelace cards have support for tap actions. These actions define what will happen when you tap or hold on an object within a card.

Actions can be enabled on:

- [Button](/lovelace/button/)
- [Entities](/lovelace/entities/)
- [Glance](/lovelace/glance/)
- [Light](/lovelace/light/)
- [Picture](/lovelace/picture/)
- [Picture Element](/lovelace/picture-elements/)
- [Picture Entity](/lovelace/picture-entity/)
- [Picture Glance](/lovelace/picture-glance/)

## Tap-Action

Action that will be performed when an object on a card is tapped.

```yaml
tap_action:
  action: toggle
```

{% configuration tap-action %}
tap_action:
  required: false
  description: Action to take on tap.
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`toggle` (some cards overwrite default to `more-info` if the provided entity cannot be toggled)"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g., `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g., `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g., `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g., `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
    target:
      required: false
      description: "Service target when `action` defined as `call-service`" (see [Service Targets](https://developers.home-assistant.io/docs/documenting/yaml-style-guide/#service-targets))
      type: list
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
{% endconfiguration %}

## Hold Action

Action that will be performed when an object on a card is tapped, held for at least half a second and then released. Action will only be triggered once, not continuously during hold.

```yaml
hold_action:
  action: toggle
```

{% configuration hold_action %}
hold_action:
  required: false
  description: Action to take on tap-and-hold
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g., `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g., `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g., `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g., `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
    target:
      required: false
      description: "Service target when `action` defined as `call-service`" (see [Service Targets](https://developers.home-assistant.io/docs/documenting/yaml-style-guide/#service-targets))
      type: list
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
{% endconfiguration %}

## Double-Tap Action

Action that will be performed when an object on a card is double-tapped.

```yaml
double_tap_action:
  action: toggle
```

{% configuration double_tap_action %}
double_tap_action:
  required: false
  description: Action to take on double tap
  type: map
  keys:
    action:
      required: true
      description: "Action to perform (`more-info`, `toggle`, `call-service`, `navigate`, `url`, `none`)"
      type: string
      default: "`more-info`"
    navigation_path:
      required: false
      description: "Path to navigate to (e.g., `/lovelace/0/`) when `action` defined as `navigate`"
      type: string
      default: none
    url_path:
      required: false
      description: "Path to navigate to (e.g., `https://www.home-assistant.io`) when `action` defined as `url`"
      type: string
      default: none
    service:
      required: false
      description: "Service to call (e.g., `media_player.media_play_pause`) when `action` defined as `call-service`"
      type: string
      default: none
    service_data:
      required: false
      description: "Service data to include (e.g., `entity_id: media_player.bedroom`) when `action` defined as `call-service`"
      type: string
      default: none
    target:
      required: false
      description: "Service target when `action` defined as `call-service`" (see [Service Targets](https://developers.home-assistant.io/docs/documenting/yaml-style-guide/#service-targets))
      type: list
      default: none
    confirmation:
      required: false
      description: "Present a confirmation dialog to confirm the action. See `confirmation` object below"
      type: [boolean, map]
      default: "false"
{% endconfiguration %}

## Options For Confirmation

If you define confirmation as an object instead of boolean, you can add more customization and configurations.

```yaml
double_tap_action:
  action: call-service
  confirmation:
    text: Are you sure you want to restart?
  service: script.restart
hold_action:
  action: call-service
  confirmation: true
  service: script.do_other_thing
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

## Options For Exemptions

{% configuration exemptions %}
user:
  required: true
  description: User ID for which the confirmation dialog will **not** be shown.
  type: string
{% endconfiguration %}

```yaml
double_tap_action:
  action: call-service
  confirmation:
    text: Are you sure you want to restart?
    exemptions:
      - user: x9405b8c64ee49bb88c42000e0a9dfa8
      - user: 88bcfbdc39155d16c3b2d09cbf8b0367
  service: script.restart
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
