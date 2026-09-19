---
title: "Update records"
action: route53.update_records
domain: route53
description: "Updates your AWS Route53 DNS records with your current public IP address."
---

The **Update records** action immediately updates your AWS Route53 DNS records with your current public IP address. The integration already updates the records once an hour on its own, so use this action when you want to apply a change right away instead of waiting for the next scheduled run.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Update records**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `route53.update_records`:

{% example %}
action: |
  action: route53.update_records
{% endexample %}

This updates your Route53 DNS records with your current public IP address.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- The integration updates your records automatically once an hour. This action lets you trigger an update on demand.
- The action updates the records you configured for the integration.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: update records when your public IP changes

If you track your public IP address with a sensor, you can update your Route53 records as soon as that address changes.

- **Trigger**: Your public IP sensor changes
- **Action**: Update records

{% details "YAML example for updating records when your public IP changes" %}

{% example %}
automation: |
  alias: "Update Route53 records on IP change"
  triggers:
    - trigger: state
      entity_id: sensor.public_ip
  actions:
    - action: route53.update_records
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
