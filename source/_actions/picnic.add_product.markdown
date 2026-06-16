---
title: "Add a product to the cart"
action: picnic.add_product
domain: picnic
description: "Adds a product to your Picnic shopping cart by product ID or by searching for a product name."
---

Use this action to add a product to your Picnic shopping cart. You can add a product either by its product ID or by a product name. When you add a product by name, Picnic searches for it and adds the first result to your cart.

This is handy for automations, for example, to top up your cart with a staple like milk or coffee on a schedule, so it is ready the next time you place an order.

{% include actions/ui_header.md %}

To add a product to your cart from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Picnic: Add a product to the cart**.
6. Select the **Picnic service** to add the product to, then provide a product ID or a product name.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Picnic service:
  description: The Picnic service to add the product to.
  required: true
Product ID:
  description: The product ID of a Picnic product.
  required: false
Product name:
  description: Search for a product and add the first result.
  required: false
Amount:
  description: The amount to add of the selected product.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `picnic.add_product`. A basic example looks like this:

{% example %}
action: |
  action: picnic.add_product
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    product_name: "Picnic cola zero"
{% endexample %}

This searches for "Picnic cola zero" and adds the first result to your cart.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Picnic service config entry to add the product to.
  required: true
  type: string
product_id:
  description: >
    The product ID of a Picnic product.
  required: false
  type: string
product_name:
  description: >
    A product name to search for. The first search result is added to
    the cart.
  required: false
  type: string
amount:
  description: >
    The amount to add of the selected product.
  required: false
  type: integer
  default: 1
{% endoptions_yaml %}

## Good to know

- Provide either a product ID or a product name, not both. The two are mutually exclusive.
- When you add a product by name, the first search result is added to your cart.
- The action fails when no matching product can be found, or when neither a product ID nor a product name is provided.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add coffee to the cart every Monday

Add a bag of coffee to your Picnic cart at the start of each week, so it is ready for your next order.

- **Trigger**: Every Monday at 09:00
- **Action**: Picnic: Add a product to the cart

{% details "YAML example for adding coffee every Monday" %}

{% example %}
automation: |
  alias: "Add coffee to the Picnic cart"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
  actions:
    - action: picnic.add_product
      data:
        config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
        product_name: "Coffee beans"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
