---
title: "Set clock"
action: opentherm_gw.set_clock
domain: opentherm_gw
description: "Sets the clock and day of the week on the connected thermostat."
---

The **Set clock** action provides the time and day of the week to your OpenTherm Gateway. The value is forwarded to the thermostat on its next date or time request. The OpenTherm Gateway cannot accurately keep track of time, so it only retains this information for about 61 seconds.

{% include actions/ui_header.md %}

To set the clock from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenTherm Gateway: Set clock**.
6. Enter the **Gateway ID**, then optionally set the **Date** and **Time**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Gateway ID:
  description: The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
Date:
  description: The date from which the day of the week is extracted, in `YYYY-MM-DD` format. Defaults to today.
  required: false
Time:
  description: The time in 24-hour format. Defaults to the current time.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `opentherm_gw.set_clock`. A basic example looks like this:

{% example %}
action: |
  action: opentherm_gw.set_clock
  data:
    gateway_id: opentherm_gateway
    date: "2018-10-23"
    time: "19:34"
{% endexample %}

This sets the thermostat clock to the given date and time.

### Options in YAML

{% options_yaml %}
gateway_id:
  description: >
    The ID of the OpenTherm Gateway, as specified during configuration.
  required: true
  type: string
date:
  description: >
    The date from which the day of the week is extracted, in
    `YYYY-MM-DD` format. Defaults to today.
  required: false
  type: string
time:
  description: >
    The time in 24-hour format. Defaults to the current time.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
