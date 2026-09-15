---
title: "Add URL"
action: adguard.add_url
domain: adguard
description: "Adds a new filter subscription to AdGuard Home."
related_actions:
  - adguard.remove_url
  - adguard.enable_url
  - adguard.disable_url
  - adguard.refresh
---

The **Add URL** action subscribes AdGuard Home to a new filter list. AdGuard Home downloads the rules from the URL you provide and starts blocking the domains on that list.

This is handy when you want to bring an extra blocklist online only when you need it, for example a stricter list during exam week or a seasonal list around the holidays, instead of adding it by hand in the AdGuard Home interface.

{% include actions/ui_header.md %}

To add a filter subscription from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AdGuard Home: Add URL**.
6. Enter a **Name** for the subscription and the **URL** of the filter list.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Name:
  description: The name of the filter subscription.
  required: true
URL:
  description: The filter URL to subscribe to, containing the filter rules.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `adguard.add_url`. A basic example looks like this:

{% example %}
action: |
  action: adguard.add_url
  data:
    name: "Example blocklist"
    url: "https://www.example.com/filter/1.txt"
{% endexample %}

This subscribes AdGuard Home to the filter list at the given URL.

### Options in YAML

{% options_yaml %}
name:
  description: >
    The name of the filter subscription.
  required: true
  type: string
url:
  description: >
    The filter URL to subscribe to, containing the filter rules.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- A newly added subscription is enabled right away.
- AdGuard Home does not block on the new rules until it has downloaded the list. To apply them immediately, follow this action with [Refresh](/actions/adguard.refresh/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add a stricter blocklist during study time

When study time starts, subscribe to an extra blocklist and refresh AdGuard Home so the rules take effect right away.

- **Trigger**: A study-time helper turns on
- **Action**: AdGuard Home: Add URL, followed by AdGuard Home: Refresh

{% details "YAML example for adding a blocklist during study time" %}

{% example %}
automation: |
  alias: "Add study-time blocklist"
  triggers:
    - trigger: state
      entity_id: input_boolean.study_time
      to: "on"
  actions:
    - action: adguard.add_url
      data:
        name: "Study-time blocklist"
        url: "https://www.example.com/study-blocklist.txt"
    - action: adguard.refresh
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
