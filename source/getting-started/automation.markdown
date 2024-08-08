---
title: "Automating Home Assistant"
description: "A quick intro on getting your first automation going."
---

Once your {% term devices %} are set up, it's time to put the cherry on the pie: {% term automation %}.

We're going to create two automations: One, to turn on the lights when the sun sets. And a second one to dim the light at a certain time in the evening before a workday.

## Turning on the lights before sunset

### Prerequisites

This tutorial assumes the following:

- You have [installed Home Assistant](/installation/)
- You have completed the [onboarding steps](/getting-started/onboarding/)
- You have followed the steps on [adding an integration](/getting-started/integration/)
- You have a light that is integrated into Home Assistant
  - If you don't have a light yet, and are unsure what to buy, try [Philips Hue](/integrations/hue/), [nanoleaf](/integrations/nanoleaf/), or products supporting [WLED](/integrations/wled/)

### To automatically turn on the lights before sunset

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create Automation**.

    ![The automation editor.](/images/getting-started/automation-editor.png)

   - Then, select **Create new automation**. This brings up an empty automation page.

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
5. Type `light` and select **Light turn on**.
   - For this automation, we're going to turn on all lights in the living room, so let's select the **Area**.
   - This only works if your lights are assigned to an {% term area %}.
   - To learn more about grouping devices in areas, refer to the [area documentation](/docs/organizing/areas/).

   ![A new automation with the action set up to turn on the lights in the living room.](/images/getting-started/action.png)

6. To save the automation, select **Save**. Give the automation a name, add a **Description**, and **Save** again.
   - When choosing a name, be specific, so that you can find it even when you have many automations. For example, `Turn on living room table light at sunset`.
   - Now wait until it's 30 minutes before sunset and see your automation magic!
   - Or follow these steps to [test your automation](/docs/automation/troubleshooting/#testing-your-automation) right away.

## Dimming the lights the night before a workday

This automation dims the light at a specific time before a workday.

### Prerequisites

This tutorial assumes the following:

- You have [installed Home Assistant](/installation/)
- You have completed the [onboarding steps](/getting-started/onboarding/)
- You have followed the steps on [adding an integration](/getting-started/integration/)
- You have a dimmable light that is integrated into Home Assistant

### To dim the light the night before a workday

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create automation**.

    ![The automation editor.](/images/getting-started/automation-editor.png)

   - Then, select **Create new automation**. This brings up an empty automation page.

     ![The start of a new automation.](/images/getting-started/new-automation.png)

2. We want the light to start dimming at 21:45. This means we want an automation that is triggered by time.
   - Select **Add trigger** > **Time and location** > **Time**.
   - Select **Fixed time** and enter the time.

    ![A new automation with a fixed time trigger filled in.](/images/getting-started/automation_trigger_fixed_time.png)

3. We want to do this only if tomorrow is a workday.
   - Select **Add condition** > **Entity** > **State**.
   - Under **Entity**, enter `workd` and select your workday sensor.
   - Under **State**, select **On**.
4. Next, we want to make sure the light is only dimmed when it is actually on. No reason to do this if the light is not on.
   - To achieve this, we use an **If-then** action. Select **Add action** > **Building blocks** > **If-then**.
   - You now get a block called **Conditionally execute an action**. From the **Entity** list, select your light.
   - Under **If**, select **Add condition** > **Entity** > **State**.
   - Under **State**, select **On**.

    ![Screenshot showing the if section of an if-then action](/images/getting-started/automation_if-then-action_if.png)

5. Now we want to define the action that is performed when the condition is true (when the light was on).
   - Under **Then**, select **Add action** > **Light turn on**.
   - Under  **Entity**, select your light.
   - Define the light settings, such as brightness, temperature, or color. The available settings depend on your light.

    ![Screenshot showing the then section of an if-then action](/images/getting-started/automation_if-then-action_then.png)

6. To save the automation, select **Save**. Give the automation a name (for example, `dim living room table light night before workday`), add a **Description**, and **Save** again.
7. [Test your automation](/docs/automation/troubleshooting/#testing-your-automation).

{% include getting-started/next_step.html step="Presence detection" link="/getting-started/presence-detection/" %}

If after completing this getting started you are interested in reading more
about automations, we recommend the following pages:

- [Triggers](/docs/automation/trigger/)
- [Conditions](/docs/automation/condition/)
- [Actions](/docs/automation/action/)

Please note, these pages may require a bit more experience with Home Assistant
than you probably have at this point of this tutorial.
