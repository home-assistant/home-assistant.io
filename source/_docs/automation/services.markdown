---
title: "Automation actions"
description: "How to use the various automation actions."
---

The automation integration has actions to control automations, like turning automations on and off. This can be useful if you want to disable an automation from another automation.

## Action {% my developer_call_service service="automation.turn_on" %}

This action enables the automation's {% term triggers %}.

Data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

## Action {% my developer_call_service service="automation.turn_off" %}

This action disables the automation's {% term triggers %}, and optionally stops any currently active {% term actions %}.

Data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn off. Can be a list. `none` or `all` are also accepted.
`stop_actions` | yes | Stop any currently active actions (defaults to true).

## Action {% my developer_call_service service="automation.toggle" %}

This action enables the automation's triggers if they were disabled, or disables the automation's triggers, and stops any currently active actions, if the triggers were enabled.

Data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

## Action {% my developer_call_service service="automation.trigger" %}

This action will trigger the {% term action %} of an {% term automation %}. By default it bypasses any conditions, though that can be changed via the `skip_condition` attribute.

Data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to trigger. Can be a list. `none` or `all` are also accepted.
`skip_condition` | yes | Whether or not the condition will be skipped (defaults to true).

## Action {% my developer_call_service service="automation.reload" %}

_This action is only required if you create/edit automations in YAML. Automations via the UI do this automatically._

This action reloads all automations, stopping all currently active automation actions.
