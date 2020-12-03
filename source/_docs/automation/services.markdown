---
title: "Automation Services"
description: "How to use the various automation services."
---


### `automation.turn_on`

This service enables the automation's triggers.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

### `automation.turn_off`

This service disables the automation's triggers, and optionally stops any currently active actions.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.
`stop_actions` | yes | Stop any currently active actions (defaults to true).

### `automation.toggle`

This service enables the automation's triggers if they were disabled, or disables the automation's triggers, and stops any currently active actions, if the triggers were enabled.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

### `automation.reload`

This service reloads all automations, stopping any currently active actions in all of them.

### `automation.trigger`

This service will trigger the action of an automation. By default it bypasses any conditions, though that can be changed via the `skip_condition` attribute.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to trigger. Can be a list. `none` or `all` are also accepted.
`skip_condition` | yes | Whether or not the condition will be skipped (defaults to true).
