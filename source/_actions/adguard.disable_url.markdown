---
title: "Disable URL"
action: adguard.disable_url
domain: adguard
description: "Disables a filter subscription in AdGuard Home."
related_actions:
  - adguard.enable_url
  - adguard.add_url
  - adguard.remove_url
  - adguard.refresh
---

The **Disable URL** action switches off a filter subscription without removing it. AdGuard Home keeps the list, but stops blocking the domains on it until you switch it back on.

Use this when you want to relax filtering for a while, then return to it later. Because the subscription stays in place, you can turn it back on at any time with [Enable URL](/actions/adguard.enable_url/), which makes the two a natural pair for scheduled blocking.

{% include actions/ui_header.md %}

To disable a filter subscription from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AdGuard Home: Disable URL**.
6. Enter the **URL** of the filter list you want to disable.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
URL:
  description: The filter subscription URL to disable.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `adguard.disable_url`. A basic example looks like this:

{% example %}
action: |
  action: adguard.disable_url
  data:
    url: "https://www.example.com/filter/1.txt"
{% endexample %}

This switches the matching filter subscription off while keeping it in AdGuard Home.

### Options in YAML

{% options_yaml %}
url:
  description: >
    The filter subscription URL to disable.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The subscription stays in AdGuard Home, so you can switch it back on later with [Enable URL](/actions/adguard.enable_url/).
- To remove a list completely instead of just switching it off, use [Remove URL](/actions/adguard.remove_url/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: relax filtering after bedtime hours

Switch the stricter bedtime blocklist back off in the morning so normal browsing resumes.

- **Trigger**: Time, 07:00
- **Action**: AdGuard Home: Disable URL

{% details "YAML example for disabling a blocklist in the morning" %}

{% example %}
automation: |
  alias: "Disable bedtime blocklist"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: adguard.disable_url
      data:
        url: "https://www.example.com/bedtime-blocklist.txt"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
