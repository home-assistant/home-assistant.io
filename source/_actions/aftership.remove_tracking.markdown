---
title: "Remove tracking"
action: aftership.remove_tracking
domain: aftership
description: "Removes a tracking number from AfterShip."
related_actions:
  - aftership.add_tracking
---

The **Remove tracking** action removes a tracking number from your AfterShip account, so it no longer shows up in Home Assistant.

This action does not target an entity. Instead, you provide the carrier and the tracking number to remove.

{% include actions/ui_header.md %}

To remove a tracking number from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AfterShip: Remove tracking**.
6. Enter the **Slug** and **Tracking number**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Slug:
  description: The carrier (slug) of the tracking to remove, such as `usps` or `fedex`.
  required: true
Tracking number:
  description: The tracking number to remove.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `aftership.remove_tracking`. A basic example looks like this:

{% example %}
action: |
  action: aftership.remove_tracking
  data:
    slug: "usps"
    tracking_number: "123456789"
{% endexample %}

This removes the tracking number from your AfterShip account.

### Options in YAML

{% options_yaml %}
slug:
  description: The carrier (slug) of the tracking to remove, such as `usps` or `fedex`.
  required: true
  type: string
tracking_number:
  description: The tracking number to remove.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
