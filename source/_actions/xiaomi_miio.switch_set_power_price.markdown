---
title: "Switch set power price"
action: xiaomi_miio.switch_set_power_price
domain: xiaomi_miio
description: "Sets the power price stored on a Xiaomi power strip."
related_actions:
  - xiaomi_miio.switch_set_power_mode
---

The **Switch set power price** action stores a power price on a Xiaomi power strip. The power strip uses this value to calculate energy cost.

{% include actions/ui_header.md %}

To set the power price from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Switch set power price**.
6. Enter the power price value.
7. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Xiaomi power strip to act on. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Xiaomi power strip to act on. If you leave this empty, all of them are affected.
Price:
  description: The power price to store on the power strip.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.switch_set_power_price`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.switch_set_power_price
  data:
    entity_id: switch.power_strip
    price: 0.25
{% endexample %}

This stores a power price of `0.25` on `switch.power_strip`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Xiaomi power strip to act on. If you leave this out, all of them are affected.
  required: false
  type: [string, list]
price:
  description: The power price to store on the power strip.
  required: true
  type: float
{% endoptions_yaml %}

## Good to know

- The power price is sent in the `price` field. If you call this action from YAML, use `price`, as shown above.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
