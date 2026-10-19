---
title: "Tutorial: Create your first automation"
description: "Build your first Home Assistant automations using the visual editor, no code required."
---

Now that your devices are connected, you can put them to work. {% term Automations %} let your home react to things on its own: turn the lights on when the sun goes down, lower the heat when everyone leaves, or remind you to close the garage door at bedtime. You build them with the visual automation editor, so you can follow this tutorial without writing a single line of code.

In this tutorial, you create two automations: one that turns the lights on before the sun sets, and a second that dims them later in the evening before a workday.

## Turning on the lights before sunset

### Prerequisites

- You have [installed Home Assistant](/installation/).
- You have completed the [onboarding steps](/getting-started/onboarding/).
- You have followed the steps on [adding an integration](/getting-started/integration/).
- You have a light that is integrated into Home Assistant.
  - If you don't have a light yet, and are unsure what to buy, try [Philips Hue](/integrations/hue/), [Nanoleaf](/integrations/nanoleaf/), or products supporting [WLED](/integrations/wled/).
- Your lights are assigned to an {% term area %}, so you can turn on all lights in a room at once. To learn more, refer to [Areas](/docs/organizing/areas/).

### To automatically turn on the lights before sunset

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create automation** > **Create new automation**.
   - Result: An empty automation opens.
2. Define what starts the automation. This is the {% term trigger %}.
   1. In the **When** section, select **Add trigger**.
   2. From the search box, search for and select **Sunset**.
   3. Under **Offset**, enter 30 minutes.
   4. Under **Offset type**, select **Before**.
   - Result: The automation starts 30 minutes before sunset.
3. Define what the automation does. This is the {% term action %}.
   1. In the **Then do** section, select **Add action**.
   2. From the search box, search for and select **Turn on light**.
   3. Under **Targets**, select **Add target**, and then select the area of your lights.
      - For example, select **Living room** to turn on all lights in the living room.
4. To save the automation, select **Save**. Enter a name, and optionally a description, and then select **Save** again.
   - Choose a specific name, so that you can find the automation even when you have many.
     - For example, `Turn on living room lights before sunset`.
   - Result: The automation turns on the lights 30 minutes before sunset. To see it work right away, [test your automation](/docs/automation/testing/#testing-your-automation).

## Dimming the lights the night before a workday

This automation dims the light at a specific time on the evening before a workday, but only if the light is on.

### Prerequisites

- You have [installed Home Assistant](/installation/).
- You have completed the [onboarding steps](/getting-started/onboarding/).
- You have followed the steps on [adding an integration](/getting-started/integration/).
- You have a dimmable light that is integrated into Home Assistant.
- You have set up the [Workday](/integrations/workday/) integration with **Offset** set to `1`, so its sensor shows whether tomorrow is a workday.

### To dim the light the night before a workday

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %} and select **Create automation** > **Create new automation**.
   - Result: An empty automation opens.
2. Set the time when the automation starts.
   1. In the **When** section, select **Add trigger** > **Time and sun** > **Time**.
   2. Choose a fixed time, and enter the time.
      - For example, `21:45`.
3. Add a {% term condition %}, so that the automation only continues if tomorrow is a workday.
   1. In the **And if** section, select **Add condition**.
   2. From the search box, search for and select **State**.
   3. In **Entity**, select your workday sensor.
   4. In **State**, select **On**.
4. Make sure the light is only dimmed when it's on. To do this, use an **If-then** building block.
   1. In the **Then do** section, select **Add action** > **Blocks** > **If-then**.
   2. Under **If**, select **Add condition**, and then search for and select **State**.
   3. In **Entity**, select your light. In **State**, select **On**.
   - Result: The actions under **Then** only run if the light is on.
5. Define how to dim the light.
   1. Under **Then**, select **Add action**, and then search for and select **Turn on light**.
   2. Under **Targets**, select **Add target**, and then select your light.
   3. Under **Additional options**, set the brightness. Depending on your light, you can also set the color temperature or color.
6. To save the automation, select **Save**. Enter a name, and optionally a description, and then select **Save** again.
   - For example, `Dim living room light the night before a workday`.
7. [Test your automation](/docs/automation/testing/#testing-your-automation).

{% include getting-started/next_step.html step="Presence detection" link="/getting-started/presence-detection/" %}

If you want to read more about automations after completing this tutorial, refer to the following pages:

- [Triggers](/docs/automation/trigger/)
- [Conditions](/docs/automation/condition/)
- [Actions](/docs/automation/action/)
