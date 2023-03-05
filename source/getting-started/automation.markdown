---
title: "Automating Home Assistant"
description: "A quick intro on getting your first automation going."
---

Once your devices are set up, it's time to put the cherry on the pie: automation. In this guide we're going to create a simple automation rule to **turn on the lights when the sun sets**. Of course, this assumes that you have set up an integration that provides a light at this point.

In the user interface, click Settings in the sidebar, then click Automations & Scenes. You will now see the automation screen from which you can manage all the automations in Home Assistant.

<p class='img'>
<img src='/images/getting-started/automation-editor.png'>
The automation editor.
</p>

Click the blue button at the bottom right to create a new automation. A dialog will appear. Choose "Start with an empty automation". You are presented with a blank automation screen.

<p class='img'>
<img src='/images/getting-started/new-automation.png'>
The start of a new automation.
</p>

The first thing we will do is set a name. Enter "Turn Lights On at Sunset".

The second step is defining what should trigger our automation to run. In this case, we want to use the event of the sun setting to trigger our automation. However, if we would turn on the lights when the sun actually sets, it would be too late as it already gets quite dark while it's setting. So we're going to add an offset.

In the trigger section, click on the dropdown menu and change the trigger type to "Sun." It allows us to choose sunrise or sunset, so go ahead and pick sunset. As we discussed, we want our automation to be triggered a little before the sun actually sets, so let's add `-00:30` as the offset. This indicates that the automation will be triggered 30 minutes before the sun actually sets. Neat!

<p class='img'>
<img src='/images/getting-started/new-trigger.png'>
A new automation with a sun trigger filled in.
</p>

Once we have defined our trigger, scroll down to the action section. Make sure the action type is set to "Call service," and change the service to `light.turn_on`. For this automation we're going to turn on all lights, so let's change the service data to:

```yaml
entity_id: all
```

<p class='img'>
<img src='/images/getting-started/action.png'>
A new automation with the action set up to turn on the lights.
</p>

Click the orange button to save the automation. Now wait till it's 30 minutes until the sun sets and see your automation magic!

{% include getting-started/next_step.html step="Presence detection" link="/getting-started/presence-detection/" %}

If after completing this getting started, you are interested in reading more
about automations, we recommend the following page.

- [Triggers](/docs/automation/trigger/)
- [Conditions](/docs/automation/condition/)
- [Actions](/docs/automation/action/)

Please note, these pages require a bit more experience with Home Assistant
than you probably have at this point of this tutorial.
