---
title: "Automation Services"
description: "How to use the various automation services."
---

The automation integration has services to control automations, like turning automations on and off. This can be useful if you want to disable an automation from another automation.

## Service `automation.turn_on`

This service enables the automation's triggers.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

## Service `automation.turn_off`

This service disables the automation's triggers, and optionally stops any currently active actions.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.
`stop_actions` | yes | Stop any currently active actions (defaults to true).

## Service `automation.toggle`

This service enables the automation's triggers if they were disabled, or disables the automation's triggers, and stops any currently active actions, if the triggers were enabled.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

## Service `automation.trigger`

This service will trigger the action of an automation. By default it bypasses any conditions, though that can be changed via the `skip_condition` attribute.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to trigger. Can be a list. `none` or `all` are also accepted.
`skip_condition` | yes | Whether or not the condition will be skipped (defaults to true).

## Service `automation.reload`

_This service is only required if you create/edit automations in YAML. Automations via the UI do this automatically._

This service reloads all automations, stopping all currently active automation actions.
