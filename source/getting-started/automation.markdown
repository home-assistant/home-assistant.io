---
title: "Automating Home Assistant"
description: "A quick intro on getting your first automation going."
---

Once your {% term devices %} are set up, it's time to put the cherry on the pie: {% term automation %}.

We're going to create a simple automation to turn on the lights when the sun sets. Of course, this assumes that you have set up an integration that provides a light at this point.

## Automatically turn on the lights before sunset

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and in the lower right corner, select the **Create Automation** button.

    ![The automation editor.](/images/getting-started/automation-editor.png)

   - You are presented with a blank automation screen.

     ![The start of a new automation.](/images/getting-started/new-automation.png)

2. The first step is defining what should {% term trigger %} the automation to run.
   - In this case, we want to use the event of the sun setting to trigger our automation.
   - Select **Add trigger**, type `Sun` and select it.
   ![Use the sun as trigger.](/images/getting-started/sun-trigger.png)
3. Select **Sunset**.
   - We want the automation to be triggered a little before that, so let's add `-00:30` as the offset. This indicates that the automation will be triggered 30 minutes before sunset. Neat!

    ![A new automation with a sun trigger filled in.](/images/getting-started/new-trigger.png)

4. Once we have defined our trigger, we need to define what should happen.
   - Select **Add action**.
   - Type `Ser` and select **Call service**
5. Select **Light** > **Turn on** or directly enter `light.turn_on`.
   - For this automation, we're going to turn on all lights in the living room, so let's select the **Area**.
   - This only works if your lights are assigned to an {% term area %}.

   ![A new automation with the action set up to turn on the lights in the living room.](/images/getting-started/action.png)

6. To save the automation, select **Save**, give the automation a name and **Save** again.
   - Now wait till it's 30 minutes until the sun sets and see your automation magic!

{% include getting-started/next_step.html step="Presence detection" link="/getting-started/presence-detection/" %}

If after completing this getting started you are interested in reading more
about automations, we recommend the following pages:

- [Triggers](/docs/automation/trigger/)
- [Conditions](/docs/automation/condition/)
- [Actions](/docs/automation/action/)

Please note, these pages may require a bit more experience with Home Assistant
than you probably have at this point of this tutorial.
