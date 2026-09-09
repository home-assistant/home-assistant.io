---
title: "Tutorial: Get notified when a device needs a new battery"
description: "Build a daily notification that lists devices with low batteries, step by step."
related:
  - docs: /docs/templating/loops-and-conditions/
    title: Loops and conditions
  - docs: /docs/templating/patterns/
    title: Common template patterns
  - docs: /template-functions/selectattr/
    title: "`selectattr` filter"
  - docs: /template-functions/float/
    title: "`float` filter"
  - docs: /integrations/notify/
    title: Notify actions
---

In this tutorial, you will build a daily notification that tells you which devices need new batteries. It looks at every battery sensor in your home, picks out the ones below a threshold you choose, and sends you a message listing each device with its location and current percentage.

This is one of the most popular templates in the Home Assistant community, and it is a great first real-world template. You will learn how to loop over a collection of sensors, filter by state, build up a list, and format a message. All of these skills carry over to many other templates you will write later.

## What you will build

A notification that arrives each morning with a message like this:

```text
2 devices need new batteries: Front door lock in Hallway (15%), Motion sensor in Kitchen (12%).
```

If everything is healthy, you get a reassuring message instead:

```text
All batteries are healthy.
```

## Before you start

You need:

- At least one battery-powered device reporting a percentage through Home Assistant. Zigbee, Z-Wave, and Matter devices usually do this automatically.
- A notification service set up on your phone, usually the [Home Assistant Companion app](/integrations/mobile_app/). The examples below use `notify.send_message`. Replace `my_device` in `notify.my_device` by your own target when you get there.
- Five minutes with the [Template editor](/docs/templating/debugging/#the-template-editor) open.

## Step 1: See your battery sensors

Before you write a single template, it helps to see what you are working with. Open {% my developer_states title="**Settings** > **Tools** > **States**" %} and filter on `battery`.

<!-- screenshot placeholder: Tools > States filtered to battery sensors -->

You should see a list of sensors with `device_class: battery` in their attributes and a number (like `85` or `12`) in the state column. Those are the entities this automation will watch.

If you do not see any, your devices might be using the old `binary_sensor` battery class (which reports `on`/`off` instead of a percentage) or they do not report battery at all. This tutorial focuses on the numeric `sensor` kind.

## Step 2: List the low batteries

Open {% my developer_template title="**Settings** > **Tools** > **Template**" %} and paste this in:

{% example %}
template: |
  {% set low = namespace(batteries=[]) %}
  {% for sensor in states.sensor
    | selectattr('attributes.device_class', 'eq', 'battery')
    | rejectattr('state', 'in', ['unknown', 'unavailable']) %}
    {% if sensor.state | float(100) < 20 %}
      {% set low.batteries = low.batteries + [device_name(sensor.entity_id)] %}
    {% endif %}
  {% endfor %}
  {{ low.batteries }}
output: "['Front door lock', 'Motion sensor', 'Bedroom sensor']"
{% endexample %}

Read it left to right:

1. Create a namespace called `low` with an empty `batteries` list inside.
2. For each sensor whose `device_class` is `battery`, skipping any that are `unknown` or `unavailable`...
3. If its state (converted to a number) is below `20`...
4. Add the name of the **device** that sensor belongs to to `low.batteries`.

Why the device name? With modern Home Assistant naming, a battery sensor's own name is often only "Battery", which is not very helpful in a notification. The [`device_name`](/template-functions/device_name/) function gives you back the friendly name of the device the sensor is attached to (like "Front door lock" or "Motion sensor").

You should see a list of device names with low batteries. If the list is empty, you can temporarily raise the threshold (change `20` to `100`) to confirm the template is working.

{% note %}
Variables set inside a `for` loop do not survive outside the loop, so `low` is created with a [`namespace`](/template-functions/namespace/). That is the object whose attribute (`low.batteries`) can be updated inside the loop and still hold the full list afterwards. See [Loops and conditions](/docs/templating/loops-and-conditions/) for more on this quirk.
{% endnote %}

## Step 3: Format the message

A bare list is not what you want to send to your phone. Add the area the device is in, the current battery level, and turn the result into a friendly sentence. Replace the template with this:

{% example %}
template: |
  {% set low = namespace(batteries=[]) %}
  {% for sensor in states.sensor
     | selectattr('attributes.device_class', 'eq', 'battery')
     | rejectattr('state', 'in', ['unknown', 'unavailable']) %}
    {% if sensor.state | float(100) < 20 %}
      {% set device = device_name(sensor.entity_id) %}
      {% set area = area_name(sensor.entity_id) %}
      {% set label = device ~ (' in ' ~ area if area else '')
         ~ ' (' ~ sensor.state ~ '%)' %}
      {% set low.batteries = low.batteries + [label] %}
    {% endif %}
  {% endfor %}
  {% if low.batteries | count == 0 %}
    All batteries are healthy.
  {% elif low.batteries | count == 1 %}
    1 device needs a new battery: {{ low.batteries[0] }}.
  {% else %}
    {{ low.batteries | count }} devices need new batteries: {{ low.batteries | join(', ') }}.
  {% endif %}
output: |-
  3 devices need new batteries: Front door lock in Hallway (15%),
  Motion sensor in Kitchen (12%), Window sensor in Bedroom (8%).
{% endexample %}

A few things changed from the previous step:

- Two helper variables: [`device_name`](/template-functions/device_name/) gives you the device's friendly name, and [`area_name`](/template-functions/area_name/) gives you the name of the {% term area %} it is assigned to.
- `label` builds one formatted piece of text per device, combining the device name, the area (only if it is set), and the battery percentage. The `~` symbol glues text together.
- An [`if`/`elif`/`else`](/docs/templating/loops-and-conditions/#multiple-paths-with-elif) picks between three messages based on how many items are in the list. No low batteries get a friendly "all healthy" message. One low battery uses singular wording. Two or more get the full list joined with commas.

Play with the template. Change the threshold, remove the `%`, reword the messages. The template editor updates as you type, so you can see the result of every change right away.

## Step 4: Create the automation

Now turn the template into an actual automation.

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Select **Create automation**, then **Create new automation**.
3. Give it a name: `Low battery notification`.

### Add the trigger

You want this to run once every morning.

1. Under **When**, select **Add trigger**.
2. Choose **Time**.
3. Set the time to something reasonable, like `09:00:00`.

### Add the action

1. Under **Then do**, select **Add action**.
2. Choose **Perform Action**, then pick your `notify` action (like `notify.send_message`).
3. Fill in the message field with the template you built in step 3.

In YAML, the action looks like this:

{% example %}
action: |
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Battery check"
      message: >
        {% set low = namespace(batteries=[]) %}
        {% for sensor in states.sensor
           | selectattr('attributes.device_class', 'eq', 'battery')
           | rejectattr('state', 'in', ['unknown', 'unavailable']) %}
          {% if sensor.state | float(100) < 20 %}
            {% set device = device_name(sensor.entity_id) %}
            {% set area = area_name(sensor.entity_id) %}
            {% set label = device ~ (' in ' ~ area if area else '')
               ~ ' (' ~ sensor.state ~ '%)' %}
            {% set low.batteries = low.batteries + [label] %}
          {% endif %}
        {% endfor %}
        {% if low.batteries | count == 0 %}
          All batteries are healthy.
        {% elif low.batteries | count == 1 %}
          1 device needs a new battery: {{ low.batteries[0] }}.
        {% else %}
          {{ low.batteries | count }} devices need new batteries: {{ low.batteries | join(', ') }}.
        {% endif %}
{% endexample %}

4. Save the automation.

## Step 5: Test it

You do not want to wait until tomorrow morning to find out if it works.

1. Open your automation.
2. Select the **Run** button (or use the three-dots menu and choose **Run actions**).

The notification should arrive on your phone within a few seconds. If it does not, check that the `notify` action name matches what you have on your setup, and look at the automation's trace for clues.

## Going further

A few ways to take this further:

- **Quiet "healthy" days**. Skip the notification entirely when the list is empty. Put the "all healthy" message in an [`if`](/docs/templating/loops-and-conditions/#conditions-with-if) branch that does nothing, or use a template condition before the notification action.
- **Different thresholds**. Replace `20` with a helper input so you can tune the threshold from the dashboard without editing the automation.
- **Weekly instead of daily**. Change the time trigger to a more specific schedule like "every Monday at 9am".
- **Include unavailable devices**. The current template skips sensors that are `unknown` or `unavailable`, but those might indicate a completely dead battery. You can add a second list for offline devices and mention them in the message.
- **Sort by percentage**. If you have many devices, sort the list with the most-drained device first so you know what to replace first.

## Next steps

- The [Loops and conditions](/docs/templating/loops-and-conditions/) page explains the `for` loop and `if`/`elif`/`else` used here.
- The [Common template patterns](/docs/templating/patterns/) page has more cookbook-style recipes.
- Try the [Tutorial: show the average home temperature on your dashboard](/docs/templating/tutorial-average-temperature/) next to learn how to build a template {% term sensor %}.
