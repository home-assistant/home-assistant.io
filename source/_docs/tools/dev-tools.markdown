---
title: "Tools"
description: "Use the Tools in Home Assistant to check your configuration, look at the states of your entities, and test actions, templates, events, and Assist sentences."
---

**Tools** let you look at what is happening in Home Assistant and try things out, without creating an {% term automation %} or a dashboard first. For example, you can check the current {% term state %} of an {% term entity %}, control a {% term device %}, test a {% term template %}, or see which {% term events %} happen. Tools are useful for everyone, not only for developers.

Tools are only available to administrators.

To open Tools, go to {% my tools_yaml title="**Settings** > **Tools**" %}.

<p class='img'>
<img src='/images/screenshots/tools.png' alt='Screenshot showing the Tools page in Home Assistant' />
Screenshot of Home Assistant's tools.
</p>

Tools has the following tabs:

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

1. Go to {% my server_controls title="**Settings** > **Tools** > **YAML**" %} and scroll down to the **YAML configuration reloading** section. Alternatively, select the **C** key from anywhere in the UI to open the command palette of the [quick search](/docs/tools/quick-search/) and then search for `reload`.
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

1. Go to {% my developer_states title="**Settings** > **Tools** > **States**" %}.
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

1. Go to {% my developer_states title="**Settings** > **Tools** > **States**" %}.
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

1. Go to {% my developer_services title="**Settings** > **Tools** > **Actions**" %}.
2. In the **Action** dropdown list, select the action. The list shows the name of each action, with its integration on the right. For example, to turn on a light, select **Turn on light**, with **Light** next to it. You can also search by name, integration, or action ID, such as `light.turn_on`.
   - Result: The options of the action are shown.
3. If the action accepts a target, select **Add target**, and then select what you want to control, for example, an entity or an area.
4. Fill in the options that you need.
5. Select **Perform action**.
   - Result: The action runs. If the action returns data, the data is shown under **Response**. To use the data in a template, select **Copy to clipboard as template**.

### Performing an action in YAML mode

Some options, and {% term templates %}, are only available in **YAML mode**. In **UI mode**, these options are listed under **Parameters only available in YAML mode**.

1. Go to {% my developer_services title="**Settings** > **Tools** > **Actions**" %}, and select the action in the **Action** dropdown list.
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

The template editor provides a way to quickly test templates prior to placing them into automations and scripts. A code editor is on the left side and your real-time output is displayed in the preview on the right side.

By default, this will contain sample code that illustrates how templates can be written and tested. This sample code can be removed and replaced with your own. You can restore the default example by pressing the **Reset to Demo Template** button beneath the code editor.

For more information about Jinja2, visit [Jinja2 documentation](https://jinja.palletsprojects.com/en/latest/templates/), and also read templating document [here](/docs/templating).

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

1. Go to {% my developer_events title="**Settings** > **Tools** > **Events**" %}.
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

1. Go to {% my developer_events title="**Settings** > **Tools** > **Events**" %}.
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

The **Statistics** tab shows a list of long-term statistic entities. If the long term statistics is not working for an entity, a **Fix issue** link is shown. Select it to view a description of the issue. There might also be an option to fix the issue.

![Statistics issue message](/images/docs/developer-tools/statistics_issue.png)

Another use of the {% my developer_statistics title="statistics tool" %} is to correct any measurements. Select the
<svg width="24" height="24" viewBox="0 0 24 24"><path d="M22,13V22H2V19L22,13M21.68,7.06L16.86,4.46L17.7,7.24L7.58,10.24C6.63,8.95 4.82,8.67 3.53,9.62C2.24,10.57 1.96,12.38 2.91,13.67C3.85,14.97 5.67,15.24 6.96,14.29C7.67,13.78 8.1,12.97 8.14,12.09L18.26,9.09L19.1,11.87L21.68,7.06Z" /></svg>
icon. Use the date and time fields to search for the incorrect data point and select it to adjust the value.

![Screenshot showing the dialog to adjust a statistic where the time, date and value to adjust can be selected](/images/docs/developer-tools/adjust-statistics.png)

![Screenshot showing the dialog to adjust a previous selected statistic value](/images/docs/developer-tools/adjust-statistic-value.png)

## Assist tab

The **Assist** tab lets you see how Home Assistant's Assist processes a sentence.

If no matching intent is found, then Assist is unable to interpret the sentence. If a matching intent was found, information is provided on the action that will be performed on which entities. The example below shows how the following sentence was parsed: *what lights are on in the office*.

- Assist found a matching intent: *HassGetState*.
- It found entities matching the domain: *lights*.
- The lights have the state *on*.
- The lights are in the area *office*.
- The targets are the narrowed-down entities in scope.

![Example use of assist tools](/images/docs/developer-tools/Assist.png)
