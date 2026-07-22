---
title: "Tutorial: Show the average home temperature on your dashboard"
description: "Build a template sensor that averages all your temperature sensors, step by step."
related:
  - docs: /docs/templating/states/
    title: Working with states
  - docs: /docs/templating/patterns/
    title: Common template patterns
  - docs: /template-functions/selectattr/
    title: "`selectattr` filter"
  - docs: /template-functions/average/
    title: "`average` filter"
  - docs: /integrations/template/
    title: Template integration
---

In this tutorial, you will build a template {% term sensor %} that averages all temperature readings in your home into a single number. It's ideal for seeing your whole-house temperature at a glance, or for triggering automations based on overall comfort. It shows up on your dashboard like any other sensor, and it updates automatically whenever one of the underlying temperature readings changes.

This is a classic first template sensor. You will learn how to gather readings from many entities, average them, round the result, and wire the whole thing into Home Assistant as a real sensor you can use anywhere else.

## What you will build

A {% term sensor %} called `sensor.home_average_temperature` that you can place on any dashboard. It shows a single number like `21.4` °C, calculated from all the temperature sensors in your home.

You get a real sensor entity, so you can also use it in automations, chart it in history, or reference it from other templates.

## Before you start

You need:

- At least two temperature sensors in Home Assistant. They should have `device_class: temperature` in their attributes. Most climate integrations set this automatically.
- Five minutes with the [Developer tools template editor](/docs/templating/debugging/#the-template-editor) open.

If you want your result in Fahrenheit, see the [Going further](#going-further) section at the bottom.

## Step 1: See your temperature sensors

Open {% my developer_states title="**Settings** > **Tools** > **States**" %} and filter on `temperature`.

<!-- screenshot placeholder: Developer tools > States filtered to temperature sensors -->

You should see a list of entities with `device_class: temperature` in their attributes. The state column shows the current reading as text, like `22.5`.

These are the sensors your new sensor will average. Make a mental note of how many you have.

## Step 2: Write the averaging template

In {% my developer_template title="**Tools** > **Template**" %}, paste this:

{% example %}
template: |
  {{
    states.sensor
    | selectattr('attributes.device_class', 'eq', 'temperature')
    | rejectattr('state', 'in', ['unknown', 'unavailable'])
    | map(attribute='state') | map('float') | average | round(1)
  }}
output: "21.4"
{% endexample %}

That is one long line. Read it left to right as one sentence:

1. Start with every `sensor` entity.
2. Keep only the ones whose `device_class` is `temperature`.
3. Drop any that are `unknown` or `unavailable`.
4. From each remaining entity, pull out only the `state` value.
5. Convert each state from text to a number.
6. Average them.
7. Round the result to one decimal.

Your result should be a single number close to what you feel in your home.

{% tip %}
If you see an error, try running the template one piece at a time. Remove the `| round(1)`, then `| average`, then `| map('float')`, and see where it breaks. Step-by-step narrowing is explained in [Debugging templates](/docs/templating/debugging/).
{% endtip %}

## Step 3: Make it a real sensor

A one-off template in the editor is great for testing. To use the result on a dashboard, you need to turn it into an actual {% term entity %}. You do this with a **template helper**, which Home Assistant creates for you from the user interface.

1. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}.
2. Select **Create helper** in the bottom-right.
3. Pick **Template**.
4. Pick **Template a sensor**.

### Fill in the form

You will see a form with several fields. Fill them out like this:

- **Name**: `Home average temperature`. This is what you will see in dashboards and the app, and it is used to generate the entity ID (`sensor.home_average_temperature`).
- **State template**: paste the template you tested in step 2. Paste it exactly, including the `{{ ... }}` delimiters.
- **Unit of measurement**: `°C` (or `°F` if your sensors report Fahrenheit).
- **Device class**: `Temperature`. This tells Home Assistant this sensor represents a temperature so dashboards and voice assistants pick the right icon and handle units correctly.
- **State class**: `Measurement`. This tells Home Assistant the value changes continuously over time, which is what makes the sensor chartable in history.

Select **Submit**. Your new sensor is ready to use immediately, no restart needed.

{% tip %}
If you later rename the helper, its **unique ID** stays the same. That is the internal identifier Home Assistant uses to track this sensor across renames, moves, and configuration tweaks. History, dashboards, and automations keep working because they reference the unique ID behind the scenes. You don't have to do anything with it, but it's good to know it exists if you ever see it mentioned elsewhere.
{% endtip %}

## Step 4: Check it

Your new helper now appears on the {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %} page. Find `Home average temperature` in the list and select it to open the details dialog. The current value shows there.

If the value looks wrong, use the three-dot menu in the dialog to open the helper's settings and adjust the template. Changes save immediately.

## Step 5: Add it to your dashboard

1. Open a dashboard in edit mode.
2. Select **Add card**.
3. Pick a [**Tile**](/dashboards/tile/) card (clean display with optional extras) or a [**Gauge**](/dashboards/gauge/) card (visual dial).
4. Choose `sensor.home_average_temperature` from the entity list.
5. Save the dashboard.

The card updates automatically whenever any of your temperature sensors changes.

## Going further

A few ways to extend this:

- **Fahrenheit**. If your sensors report in Fahrenheit, open the sensor's settings from the entity and set **Unit of measurement** to `°F`. No changes to the template are needed.
- **By area**. Instead of averaging the whole house, limit it to a single area. Replace the `states.sensor` starting point with `area_entities('living_room')` and add a step to filter for temperature sensors. See [`area_entities`](/template-functions/area_entities/).
- **Highest and lowest too**. Add two more sensors that use [`max`](/template-functions/max/) and [`min`](/template-functions/min/) instead of [`average`](/template-functions/average/). Great for seeing the spread.
- **Weighted average**. If you want the bedroom thermostat to count more than the garage sensor, you will need a bit more template logic. A [`for` loop](/docs/templating/loops-and-conditions/#loops-with-for) with manual weighting handles that.
- **Skip sensors reporting unrealistic values**. If a broken sensor reports `999`, it will skew your average. Filter out values outside a reasonable range with an additional step before `| average`.
- **Group by type**. You can build one for humidity, one for pressure, one for CO₂. Same template shape, different `device_class` value.

## Next steps

- The [Working with states](/docs/templating/states/) page explains the [`selectattr`](/template-functions/selectattr/), [`rejectattr`](/template-functions/rejectattr/), and [`map`](/template-functions/map/) filters used here.
- The [Common template patterns](/docs/templating/patterns/) page has more aggregation recipes.
- If this is the first tutorial you did, try the [Tutorial: get notified when a device needs a new battery](/docs/templating/tutorial-battery-alerts/) next to learn about templates in automations.
