---
title: "Refresh"
action: adguard.refresh
domain: adguard
description: "Refreshes all filter subscriptions in AdGuard Home."
related_actions:
  - adguard.add_url
  - adguard.remove_url
  - adguard.enable_url
  - adguard.disable_url
---

The **Refresh** action tells AdGuard Home to re-download all of its filter subscriptions and pull in the latest blocking rules. This keeps your blocklists current and applies any changes right away.

It pairs well with the other actions. After you add or enable a list, a refresh makes the new rules take effect immediately instead of waiting for AdGuard Home's next scheduled update.

{% include actions/ui_header.md %}

To refresh your filter subscriptions from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **AdGuard Home: Refresh**.
6. _Optional_: Turn on **Force** to bypass AdGuard Home's update throttling.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Force:
  description: Force the update, bypassing AdGuard Home's throttling. Leave off for a regular refresh.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `adguard.refresh`. A basic example looks like this:

{% example %}
action: |
  action: adguard.refresh
{% endexample %}

This refreshes all filter subscriptions in AdGuard Home.

### Options in YAML

{% options_yaml %}
force:
  description: >
    Force the update, bypassing AdGuard Home's throttling. Omit for a regular refresh.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- AdGuard Home normally throttles filter updates to reduce load. Only turn on **Force** when you need the rules updated immediately, and use it sparingly.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: refresh blocklists every night

Keep your blocklists current by refreshing them once a day, while everyone is asleep.

- **Trigger**: Time, 04:00
- **Action**: AdGuard Home: Refresh

{% details "YAML example for a nightly blocklist refresh" %}

{% example %}
automation: |
  alias: "Refresh AdGuard Home blocklists nightly"
  triggers:
    - trigger: time
      at: "04:00:00"
  actions:
    - action: adguard.refresh
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
