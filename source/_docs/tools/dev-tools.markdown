---
title: "Tools"
description: "Use the Tools in Home Assistant to check your configuration, look at the states of your entities, and test actions, templates, events, and Assist sentences."
---

**Tools** let you look at what is happening in Home Assistant and try things out, without creating an {% term automation %} or a dashboard first. For example, you can check the current {% term state %} of an {% term entity %}, control a {% term device %}, test a {% term template %}, or see which {% term events %} happen. Tools are useful to all administrators, not only those who are developers.

Tools are only available to administrators.

To open Tools, go to {% my tools_yaml title="**Settings** > **Tools**" %}.

<p class='img'>
<img src='/images/screenshots/tools.png' alt='Screenshot showing the Tools page in Home Assistant' />
Screenshot of Home Assistant's tools.
</p>

The Tools page has the following tabs:

- [**YAML** tab](#yaml-tab): Check your configuration, reload YAML configuration, and restart Home Assistant.
- [**States** tab](#states-tab): See the current state and attributes of your entities, and set a state to test automations.
- [**Actions** tab](#actions-tab): Perform any {% term action %}, for example, to control a device.
- [**Template** tab](#template-editor-tab): Write a template and see its result right away.
- [**Events** tab](#events-tab): Fire an event, or listen to events to see what happens.
- [**Statistics** tab](#statistics-tab): Find, fix, and adjust {% term "long-term statistics" %}.
- [**Assist** tab](#assist-tab): Test how Assist understands a sentence.

## YAML tab

The YAML tab provides buttons to trigger a check of configuration files and to reload the configuration. Reloading is needed to apply changes that you've made to the configuration.

It is almost the same as the option under **Settings** > three dots {% icon "mdi:dots-vertical" %} menu (top right) > **Restart Home Assistant** > **Quick reload**. The only difference is that **Quick reload** reloads all the configuration, whereas this YAML tab allows you to only reload one specific configuration at a time.

### Reloading the YAML configuration

For configuration changes to become effective, the configuration must be reloaded. Most integrations in Home Assistant (that do not interact with {% term devices %} or {% term services %}) can reload changes made to their configuration in {% term "`configuration.yaml`" %} without needing to restart Home Assistant.

1. Go to {% my tools_yaml title="**Settings** > **Tools** > **YAML**" %} and scroll down to the **YAML configuration reloading** section. Alternatively, select the **C** key from anywhere in the UI to open the command palette of the [quick search](/docs/tools/quick-search/) and then search for `reload`.
   - You are presented with a list of integrations, such as **Automations** or **Conversation**.

    ![Reload configuration changes](/images/docs/configuration/reloading_config.png)

2. Depending on what you find in the list, you can proceed with either reloading or you need to restart Home Assistant:
   - If the integration is listed, select it to reload the settings.
     - For example, if you've changed the [General settings](/docs/configuration/basic/), you can select **Location & customizations** to apply those changes.
   - If the integration is not listed, you need to **Restart** Home Assistant for changes to take effect.

## States tab

The **States** tab lists all your {% term entities %}, with their current {% term state %} and attributes. This is what Home Assistant sees at that moment.

You can also set the state of an entity here. This only changes what Home Assistant shows. It does not control the {% term device %}. For example, setting `light.bedroom` from `off` to `on` does not turn on the light. {% term Automations %} with a {% term trigger %} on that state change still start, though, which makes this useful for testing. The change is temporary: the next time the device reports its state, Home Assistant shows the real state again. To control a device, perform an {% term action %} in the [Actions tab](#actions-tab) instead.

### Filtering the list of entities

The list can contain hundreds of {% term entities %}. To find the entity you are looking for, or to check which entities have a certain {% term state %} or attribute, filter the list. For example, you can show all {% term lights %} that are on, or all entities in one {% term area %}.

1. Go to {% my tools_states title="**Settings** > **Tools** > **States**" %}.
2. Optional: To show more columns, select **Device**, **Area**, or **Attributes** above the list. These options are not shown on narrow screens.
3. In the filter field above a column, enter the text you are looking for.
   - The filters are not case-sensitive and match any part of the text. To use a wildcard, enter `*`, for example, `office*light`.
   - **Filter entities** matches the entity ID and the name of the entity.
   - **Filter attributes** matches the names and the values of attributes. To filter for a specific attribute, enter its name and value separated by a colon. For example, `location:3` shows the entities with an attribute whose name contains `location` and whose value contains `3`.
   - Result: The list only shows the entities that match all filters.

### Setting the state of an entity

Use this to test how automations react to a state change, without changing the device.

{% note %}
**Risk of unintended device actions**

Setting a state starts every automation with a trigger on that state change. Those automations control real devices and services.

To avoid this:

- Before you set the state, check which automations react to this entity.
- Turn off any of these automations that you don't want to run.
{% endnote %}

1. Go to {% my tools_states title="**Settings** > **Tools** > **States**" %}.
2. In the list, select the entity ID. Or, in the **Set state** section at the top, select **Select an entity** and choose the entity.
   - Result: The **Set state** section shows the current state and attributes of the entity.
3. Under **State**, enter the new state. To test a trigger, reproduce the change it reacts to, as set in its **From** and **To** options. If the entity already has the new state, set it to a different state first. Setting the same state again is not a state change, so the trigger does not react.
4. Optional: Under **State attributes (YAML, optional)**, change the attributes.
5. Select **Set state**.
   - Result: Home Assistant shows the new state, and automations with a trigger on that state change start. The device does not change.
6. Optional: To load the current state of the entity into the form again, select **Refresh** {% icon "mdi:refresh" %}.

## Actions tab

The **Actions** tab lets you perform any {% term action %} available in Home Assistant, without creating an {% term automation %} or a {% term script %}. Use it to control a {% term device %} directly, to try out an action and its options before you use it in an automation, or to see the data that an action returns.

The list of actions contains the actions of all {% term integrations %} that are set up, and your scripts. If an action is missing, the integration that provides it is not set up, or not set up correctly.

Most actions work on a target, such as an {% term entity %}, a device, or an {% term area %}. Check the action's options before omitting the target because some actions target all supported entities when no target is selected.

### Performing an action

1. Go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}.
2. In the **Action** dropdown list, select the action. The list shows the name of each action, with its integration on the right. For example, to turn on a light, select **Turn on light**, with **Light** next to it. You can also search by name, integration, or action ID, such as `light.turn_on`.
   - Result: The options of the action are shown.
3. If the action accepts a target, select **Add target**, and then select what you want to control, for example, an entity or an area.
4. Fill in the options that you need.
5. Select **Perform action**.
   - Result: The action runs. If the action returns data, the data is shown under **Response**. To use the data in a template, select **Copy to clipboard as template**.

### Performing an action in YAML mode

Some options, and {% term templates %}, are only available in **YAML mode**. In **UI mode**, these options are listed under **Parameters only available in YAML mode**.

1. Go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}, and select the action in the **Action** dropdown list.
2. Select **YAML mode**.
   - Result: The action is shown in YAML. Below it, **All available parameters** lists all options of the action.
3. Edit the YAML. To fill in example values, select **Fill example data**.
   - For example, to turn on a light at full brightness in red:

     ```yaml
     action: light.turn_on
     target:
       entity_id: light.bedroom
     data:
       brightness: 255
       rgb_color: [255, 0, 0]
     ```

4. Select **Perform action**.
   - Result: The action runs. If the action returns data, the data is shown under **Response**.

## Template editor tab

{% term Templates %} let you create dynamic content from your Home Assistant data, for example, a notification that lists which lights are on. In the **Template** tab, you can write a template and see its result right away, based on the current {% term states %} of your {% term entities %}. Use it to try out a template before you use it in an {% term automation %}, a {% term script %}, or a template entity. For an introduction to templates, refer to [Templating](/docs/templating/).

The result updates while you type, and when the states that the template uses change. Below the result the editor shows when the template updates:

- At the start of each minute, if the template uses the current time.
- When one of the listed entities or domains changes.
- When any state changes, if the template uses all states.
- Not automatically, if the template does not use any states or the current time.

Your template is kept in your browser, so it is still there the next time you open the tab.

### Testing a template

Use this to check that a template gives the result you expect, before you use it elsewhere.

1. Go to {% my tools_template title="**Settings** > **Tools** > **Template**" %}.
2. In the **Template editor**, enter your template.
   - The editor starts with a demo template. To start with an empty editor, in the toolbar of the editor, select **Clear** {% icon "mdi:trash-can-outline" %}. To go back to the demo template, select **Reset to demo template** {% icon "mdi:restore" %}.
   - To get suggestions, for example, for entity IDs, place the cursor inside a function that supports it, and press <kbd>Ctrl</kbd>+<kbd>Space</kbd>.
3. If your template uses variables that only exist when it runs in an automation or an integration, such as `trigger`, `this`, or `value_json`, at the top of the template, define them yourself with `{% set %}`. If you don't, the editor shows an error, or a warning and an empty result. To see an example, refer to [testing an incoming-data template](/docs/templating/where-to-use/#testing-an-incoming-data-template). For details, refer to [Why does my template behave differently in Tools?](/docs/templating/debugging/#why-does-it-work-in-tools-but-not-in-my-automation).
4. Under **Result**, check the output.
   - Result: The output of your template is shown, with its **Result type**. If the template has an error, the error message is shown instead. For warnings and other problems, refer to [Debugging templates](/docs/templating/debugging/).
5. When the template works, remove the variables you defined in step 3, if any. They would replace the real values when the template runs.
6. In the toolbar, select **Copy to clipboard** {% icon "mdi:content-copy" %}. Then paste the template into your automation, script, or template entity.

## Events tab

{% term Events %} are how Home Assistant announces that something has happened. In the **Events** tab, you can fire an event yourself, or listen to events to see what happens and which data an event contains. For more information about events, refer to [Events](/docs/configuration/events/).

- Fire an event to test an {% term automation %} with a [**Manual event received**](/triggers/event/) {% term trigger %}, without waiting for the event to happen.
- Listen to an event to find out its event type and data, so you can set up a trigger that reacts to it. Many integrations describe their events in their documentation.

### Firing an event

Use this to test how automations react to an event, without waiting for the event to happen.

{% note %}
**Risk of unintended device actions**

Firing an event starts every automation with a trigger on that event. Those automations control real devices and services.

To avoid this:

- Before you fire the event, check which automations react to it.
- Turn off any of these automations that you don't want to run.
{% endnote %}

1. Go to {% my tools_events title="**Settings** > **Tools** > **Events**" %}.
2. Under **Event type**, enter the event type. You can also select an event type under **Active listeners**. This list shows the event types that something in Home Assistant is listening to.
3. Optional: Under **Event data (YAML, optional)**, enter the data of the event. To test a trigger that filters on event data, enter at least the same data as in the trigger. Additional data does not matter.
4. Select **Fire event**.
   - Result: Home Assistant fires the event, and automations with a trigger on that event start.

For example, to fire a custom event, enter the event type `event_light_state_changed` and the following event data:

```yaml
state: on
```

The following automation reacts to that event:

```yaml
- alias: "Capture Event"
  triggers:
    - trigger: event
      event_type: event_light_state_changed
  actions:
    - action: notify.notify
      data:
        message: "Light is turned {{ trigger.event.data.state }}"
```

### Listening to events

Use this to see which events happen and what data they contain. For example, listen for events to find out which event a button sends when you press it, so you can set up a trigger that reacts to it. Listening doesn't change anything in Home Assistant.

1. Go to {% my tools_events title="**Settings** > **Tools** > **Events**" %}.
2. Under **Listen to events**, in **Event to subscribe to**, enter the event type.
   - If you don't know the event type, enter `*` to listen to all events. This shows many events, and only the latest 100 are kept, so use **Filter events** in the next step to narrow them down.
   - You can also find event types under **Active listeners**, on the [events page](/docs/configuration/events/), or in the documentation of the integration.
3. Optional: To only capture events that contain a certain text, enter it under **Filter events**, for example, the name of the device. The filter is case-sensitive, and matches both the names and the values in the event. This is useful when you want to listen to all events.
4. Select **Start listening**.
5. Make the event happen, for example, by pressing the button.
   - Result: Each event that happens is shown in YAML, with its event type and data. The list keeps the latest 100 events. To move between events, use the buttons next to the event.
6. To stop, select **Stop listening**. To remove the events from the list, select **Clear events**.

#### Listening to events: example

For example, listening to the event type `shelly.click` of the Shelly integration shows data similar to the following when you press a button:

```yaml
event_type: shelly.click
data:
  device_id: e09c64a22553484d804353ef97f6fcd6
  device: shellybutton1-A4C12A45174
  channel: 1
  click_type: single
origin: LOCAL
time_fired: "2021-04-28T08:53:12.755729+00:00"
context:
  id: e0f379706563aaa0c2c1fda5174b5a0e
  parent_id: null
  user_id: null
```

## Statistics tab

Home Assistant keeps {% term "long-term statistics" %} for sensors that measure something over time, such as temperature or energy use. Some {% term integrations %} also add statistics directly, without a sensor, for example, the energy use that your utility reports. Home Assistant stores statistics in its database, which the [Recorder](/integrations/recorder/) maintains. History graphs, statistics cards, and the Energy dashboard use these statistics. The **Statistics** tab lists all long-term statistics, with their name, statistic ID, unit, source, and any issue. For how statistics work, refer to [Long-term statistics](/docs/configuration/statistics/).

Use the **Statistics** tab to:

- Find the statistics that an {% term integration %} created, for example, to use them in the Energy dashboard.
- Fix an issue that stops Home Assistant from keeping statistics for an entity.
- Correct a wrong value, for example, a spike in your energy use.
- Delete statistics that you no longer need.

### Fixing a statistics issue

If Home Assistant can't keep statistics for an entity, the **Issue** column shows why. For example, the entity is no longer recorded, or its unit changed.

{% important %}
**Risk of data loss**

Some fixes delete the statistics of the entity. Deleted statistics can't be restored, except from a backup.

To avoid this:

- Read the dialog carefully before you select **Delete**.
- Before you delete statistics, [create a backup](/common-tasks/general/#creating-a-manual-backup).
{% endimportant %}

#### To fix a statistics issue

1. Go to {% my tools_statistics title="**Settings** > **Tools** > **Statistics**" %}.
2. In the row of the statistic with the issue, select **Fix issue**. If Home Assistant can't fix the issue for you, the button is called **Info** instead.
   - Result: A dialog explains the issue and what you can do about it.
   ![Statistics issue message](/images/docs/developer-tools/statistics_issue.png)
3. Follow the instructions in the dialog. What you can do depends on the issue:
   - If the unit changed, update the unit of the old statistics without converting the values. Or delete the old statistics, so Home Assistant can start over.
   - If the mean type changed, delete the old statistics, so Home Assistant can start over.
   - If the entity has no state, for example, because you removed its device, you can delete its old statistics.
   - If the entity is not recorded, or no longer recorded, include it in the [Recorder](/integrations/recorder/) again, so Home Assistant can keep statistics for it. If the entity is no longer recorded and you don't need its old statistics, you can delete them.
   - If the entity no longer has a state class, Home Assistant can't keep statistics for it until the state class is back. If you set the state class yourself, correct it. If the integration provided it, report an issue to the integration. If you no longer need the old statistics, you can delete them.
   - Result: The issue is no longer shown in the list. After you delete statistics, it can take a moment for the issue to disappear.

### Adjusting a statistic

Sometimes a statistic has a wrong value at one point in time, for example, after a meter resets, or when a sensor reports a wrong reading. This shows up as a spike in graphs and in the Energy dashboard. You can correct the value. This works for statistics that add up over time, such as energy or water use.

#### To adjust a statistic

1. Go to {% my tools_statistics title="**Settings** > **Tools** > **Statistics**" %}.
2. In the row of the statistic, select **Adjust sum** {% icon "mdi:slope-uphill" %}. If this button is not shown, the statistic can't be adjusted.
   - Result: The **Adjust a statistic** dialog shows the changes around the current time.
3. Find the wrong value:
   - To see the 10 largest changes in the history of the statistic, select **Outliers**. A spike is usually one of them.
   - To look at a specific moment, under **Pick a time**, enter the date and time. The dialog shows up to five changes around that time.
   ![Screenshot showing the dialog to adjust a statistic where the time, date and value to adjust can be selected](/images/docs/developer-tools/adjust-statistics.png)
4. Select the wrong value.
5. Under **New value**, enter the correct change for that period, not the meter reading. For example, enter `0` for a spike after a meter reset.
   ![Screenshot showing the dialog to adjust a previous selected statistic value](/images/docs/developer-tools/adjust-statistic-value.png)
6. Select **Adjust**.
   - Result: The value is corrected, and the graphs show the new value.

### Deleting statistics

Use this to remove statistics that you no longer need, for example, of a device or an integration that you removed.

{% important %}
**Risk of data loss**

Deleted statistics can't be restored, except from a backup.

To avoid this:

- Check that you selected the right statistics.
- Before you delete statistics, [create a backup](/common-tasks/general/#creating-a-manual-backup).
{% endimportant %}

#### To delete statistics

1. Go to {% my tools_statistics title="**Settings** > **Tools** > **Statistics**" %}.
2. Next to the search field, select **Enter selection mode** {% icon "mdi:format-list-checks" %}.
3. Select the statistics that you want to delete. To select all statistics with an issue, open the selection menu and select **Select all with issues**.
4. Select **Delete selected statistics**, and then select **Delete**.
   - Result: The statistics are deleted from the database.

## Assist tab

The **Assist** tab lets you test how Assist understands a sentence, without running anything. Home Assistant checks the sentence against the [built-in sentences](/voice_control/builtin_sentences/), your [custom sentences](/integrations/conversation/#adding-custom-sentences), and the [sentence triggers](/docs/automation/trigger/#sentence-trigger) of your {% term automations %}, and shows what matches. No {% term action %} runs, and no automation starts. Use it to find out why Assist doesn't understand a sentence, or to check a new sentence before you use it.

The **Assist** tab only tests the built-in Home Assistant conversation agent. If your assistant uses another conversation agent, such as an AI agent, [test the sentence in the debug view](/voice_control/troubleshooting/#test-a-sentence-per-assistant-without-voice-while-executing-the-commands) instead.

### Testing a sentence

1. Go to {% my tools_assist title="**Settings** > **Tools** > **Assist**" %}.
2. Under **Language**, select the language of the sentence.
3. Under **Sentences**, enter the sentence. To test several sentences at once, enter each sentence on its own line. To start a new line, press <kbd>Shift</kbd>+<kbd>Enter</kbd>.
   - The **Assist** tab doesn't know which device you're talking to. If a sentence relies on the area of your voice assistant, such as _turn on the lights_, add the area, for example, _turn on the lights in the kitchen_.
4. Select **Parse sentences**, or press <kbd>Enter</kbd>.
   - Result: The result of each sentence is shown, with the newest on top. If Assist doesn't understand a sentence at all, **No intent matched** is shown. Otherwise, the details are shown in YAML.
5. Check the details of the result:
   - `match`: `true` if Assist understands the whole sentence. `false` if the sentence is close to a known sentence, but a part of it doesn't match, for example, the name of an entity or an area. In that case, `unmatched_slots` shows which part doesn't match. The ✅ next to the sentence only means that a result was found, so always check `match`.
   - `source`: Where the matching sentence comes from: `builtin` for the built-in sentences, `custom` for your custom sentences, with the `file` they are in, or `trigger` for a sentence trigger of an automation.
   - `intent`: The name of the intent that the sentence matches, for example, `HassTurnOn`.
   - `slots` and `details`: The parts of the sentence that Assist recognized, such as the name of an area or an entity.
   - `targets`: The entities that the sentence is about. For a question, such as _what lights are on_, `matched: true` marks the entities whose state fits the question.
   - `sentence_template`: The sentence pattern that matches your sentence.
6. Optional: To save the results as a file, select **Download results**. To remove the results, select **Clear**.

For example, for the sentence _what lights are on in the office_, Assist matches the intent `HassGetState`, recognizes the domain `light`, the state `on`, and the area `office`, and lists the lights in that area as targets. The lights that are on are marked with `matched: true`.

![Example use of assist tools](/images/docs/developer-tools/Assist.png)
