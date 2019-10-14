---
title: "Automating Home Assistant"
description: "A quick intro on getting your first automation going."
redirect_from:
 - /getting-started/automation-create-first/
 - /getting-started/automation-2/
---

When your devices are set up, it's time to put the cherry on the pie: automation. In this guide we're going to create a simple automation rule to **turn on the lights when the sun sets**.

In Home Assistant, open the menu by clicking on the top-left icon and click on configuration. Now click on automations. This is the automation screen from which you can manage all the automations in Home Assistant.

Click on the orange button at the bottom right to create a new automation. You are presented with a blank automation screen.

<p class='img'>
<img src='/images/getting-started/automation-new-blank.png'>
The automation editor.
</p>

The first thing we will do is to set a name. Enter "Turn Lights On at Sunset".

The second step is defining what should trigger our automation to run. In this case we want to use the event of the sun setting to trigger our automation. However, if we would turn on the lights when the sun actually sets, it would be too late as it already gets quite dark while it's setting. So we're going to add an offset.

In the trigger section, click on the dropdown and change trigger type to "Sun". It allows us to pick between sunrise and sunset, go ahead and pick sunset. As we discussed, we want our automation to be triggered a little before the sun actually sets, so let's add `-0:30` to the offset. This indicates that we will trigger 30 minutes before the sun actually sets, neat!

<p class='img'>
<img src='/images/getting-started/automation-new-name-trigger.png'>
A new automation with a sun trigger filled in.
</p>

Once we have defined our trigger, scroll down to the action section. Make sure the action type is set to "Call Service" and change the service to `light.turn_on`. For this automation we're going to turn on all lights, so let's change the service data to:
```yaml
entity_id: all
```

<p class='img'>
<img src='/images/getting-started/automation-new-action.png'>
A new automation with the action set up to turn on the lights.
</p>

Click the orange button to save the automation. Now wait till it's 30 minutes until the sun sets and see your automation magic!

Further reading on automations:

- [Triggers](/docs/automation/trigger/)
- [Conditions](/docs/automation/condition/)
- [Actions](/docs/automation/action/)

### [Next step: Presence detection &raquo;](/getting-started/presence-detection/)
