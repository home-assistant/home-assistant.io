---
title: "Remove URL"
action: adguard.remove_url
domain: adguard
description: "Removes a filter subscription from AdGuard Home."
related_actions:
  - adguard.add_url
  - adguard.enable_url
  - adguard.disable_url
  - adguard.refresh
---

The **Remove URL** action deletes a filter subscription from AdGuard Home. AdGuard Home stops using the rules from that list and removes the subscription completely.

Use this to clean up a blocklist you no longer need, such as a temporary list you added earlier. If you only want to switch a list off for a while and keep it around, use [Disable URL](/actions/adguard.disable_url/) instead.

{% include actions/ui_header.md %}

To remove a filter subscription from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AdGuard Home: Remove URL**.
6. Enter the **URL** of the filter list you want to remove.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
URL:
  description: The filter subscription URL to remove.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `adguard.remove_url`. A basic example looks like this:

{% example %}
action: |
  action: adguard.remove_url
  data:
    url: "https://www.example.com/filter/1.txt"
{% endexample %}

This removes the matching filter subscription from AdGuard Home.

### Options in YAML

{% options_yaml %}
url:
  description: >
    The filter subscription URL to remove.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The URL you provide must match the subscription URL exactly. You can find the exact URL in the AdGuard Home interface under **Filters** > **DNS blocklists**.
- To switch a list off temporarily without deleting it, use [Disable URL](/actions/adguard.disable_url/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: remove the study-time blocklist afterward

When study time ends, remove the extra blocklist you added earlier so normal browsing resumes.

- **Trigger**: A study-time helper turns off
- **Action**: AdGuard Home: Remove URL

{% details "YAML example for removing a blocklist when study time ends" %}

{% example %}
automation: |
  alias: "Remove study-time blocklist"
  triggers:
    - trigger: state
      entity_id: input_boolean.study_time
      to: "off"
  actions:
    - action: adguard.remove_url
      data:
        url: "https://www.example.com/study-blocklist.txt"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
