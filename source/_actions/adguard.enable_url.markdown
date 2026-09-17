---
title: "Enable URL"
action: adguard.enable_url
domain: adguard
description: "Enables a filter subscription in AdGuard Home."
related_actions:
  - adguard.disable_url
  - adguard.add_url
  - adguard.remove_url
  - adguard.refresh
---

The **Enable URL** action switches on a filter subscription that was previously turned off. AdGuard Home starts blocking the domains on that list again, without you having to add the list from scratch.

This pairs nicely with [Disable URL](/actions/adguard.disable_url/) to turn a blocklist on and off on a schedule, for example a stricter list that switches on during homework time or at bedtime.

{% include actions/ui_header.md %}

To enable a filter subscription from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AdGuard Home: Enable URL**.
6. Enter the **URL** of the filter list you want to enable.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
URL:
  description: The filter subscription URL to enable.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `adguard.enable_url`. A basic example looks like this:

{% example %}
action: |
  action: adguard.enable_url
  data:
    url: "https://www.example.com/filter/1.txt"
{% endexample %}

This switches the matching filter subscription back on.

### Options in YAML

{% options_yaml %}
url:
  description: >
    The filter subscription URL to enable.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The list must already be added to AdGuard Home. To bring a brand-new list online, use [Add URL](/actions/adguard.add_url/) instead.
- To apply the rules right away instead of waiting for the next scheduled update, follow this action with [Refresh](/actions/adguard.refresh/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: enable a stricter blocklist at bedtime

Switch on a stricter blocklist for the kids' devices every evening, and refresh AdGuard Home so it applies straight away.

- **Trigger**: Time, 20:00
- **Action**: AdGuard Home: Enable URL, followed by AdGuard Home: Refresh

{% details "YAML example for enabling a blocklist at bedtime" %}

{% example %}
automation: |
  alias: "Enable bedtime blocklist"
  triggers:
    - trigger: time
      at: "20:00:00"
  actions:
    - action: adguard.enable_url
      data:
        url: "https://www.example.com/bedtime-blocklist.txt"
    - action: adguard.refresh
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
