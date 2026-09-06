---
title: "Add tracking"
action: aftership.add_tracking
domain: aftership
description: "Adds a new tracking number to AfterShip."
related_actions:
  - aftership.remove_tracking
---

The **Add tracking** action adds a new tracking number to your AfterShip account, so its delivery status starts showing up in Home Assistant.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you provide the tracking number and, optionally, the carrier and a friendly title.

{% include actions/ui_header.md %}

To add a tracking number from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AfterShip: Add tracking**.
6. Enter the **Tracking number**, and set any of the options you need.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Tracking number:
  description: The tracking number to add.
  required: true
Slug:
  description: The carrier (slug) of the tracking, such as `usps` or `fedex`. When left empty, AfterShip tries to detect the carrier automatically.
  required: false
Title:
  description: A custom title for the tracking, used as a friendly name for the package.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `aftership.add_tracking`. A basic example looks like this:

{% example %}
action: |
  action: aftership.add_tracking
  data:
    tracking_number: "123456789"
{% endexample %}

This adds the tracking number to your AfterShip account.

### Options in YAML

{% options_yaml %}
tracking_number:
  description: The tracking number to add.
  required: true
  type: string
slug:
  description: >
    The carrier (slug) of the tracking, such as `usps` or `fedex`. When left
    empty, AfterShip tries to detect the carrier automatically.
  required: false
  type: string
title:
  description: A custom title for the tracking, used as a friendly name for the package.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
