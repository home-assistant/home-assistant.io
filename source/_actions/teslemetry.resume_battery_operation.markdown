---
title: "Resume battery operation"
action: teslemetry.resume_battery_operation
domain: teslemetry
description: "Ends a battery power dispatch early and returns the Powerwall to its normal operation."
related_actions:
  - teslemetry.dispatch_battery_power
---

The **Teslemetry: Resume battery operation** action ends a [battery power dispatch](/actions/teslemetry.dispatch_battery_power/) before its duration ends, and returns the Powerwall to its normal operation. It is sent directly to your Powerwall over your local network, so the energy site must be [paired for local control](/integrations/teslemetry/#local-powerwall-control).

Use it to hand control back to your Powerwall as soon as the reason for a dispatch is gone, for example when a demand response event ends early.

{% include actions/ui_header.md %}

To resume battery operation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Teslemetry: Resume battery operation**.
6. Select the **Energy site** to control.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Energy site:
  description: The energy site to control. It must be paired with its Powerwall for local control.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `teslemetry.resume_battery_operation`. A basic example looks like this:

{% example %}
action: |
  action: teslemetry.resume_battery_operation
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the energy site to control. It must be paired with its Powerwall for local control.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- You don't need this action for a dispatch to end. When its duration ends, the Powerwall returns to its normal operation by itself.
- Calling it when no dispatch is active does nothing.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
