---
title: "Add a product to the cart"
action: picnic.add_product
domain: picnic
description: "Adds a product to your Picnic shopping cart by product ID, product name, or GTIN barcode."
---

Use this action to add a product to your Picnic shopping cart. You can add a product by its product ID, product name, or <abbr title="Global Trade Item Number">GTIN</abbr> barcode. When you add a product by name, Picnic searches for it and adds the first result to your cart.

This is handy for automations, for example, to top up your cart with a staple like milk or coffee on a schedule, so it is ready the next time you place an order.

{% include actions/ui_header.md %}

To add a product to your cart from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Picnic: Add a product to the cart**.
6. Select the **Picnic service** to add the product to, then provide a **Product ID**, **Product name**, or **GTIN (EAN)**.
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
  description: The product name to search for. The first search result is added to the cart.
  required: false
GTIN (EAN):
  description: The product barcode. Picnic must recognize the code.
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
    The configuration entry ID of the Picnic service to add the product to.
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
gtin:
  description: The product barcode. Picnic must recognize the code.
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

- Provide exactly one of `product_id`, `product_name`, or `gtin`. These fields are mutually exclusive.
- GTINs must contain 8, 12, 13, or 14 digits and have a valid check digit.
- In YAML, enclose GTINs in quotes to preserve leading zeros, for example `gtin: "01234565"`.
- A valid GTIN only works if Picnic can match it to a product.
- When you add a product by name, the first search result is added to your cart.
- The action fails when no matching product can be found, or when no product ID, product name, or GTIN is provided.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add coffee to the cart every Monday

Add a bag of coffee to your Picnic cart at the start of each week, so it is ready for your next order.

- **Trigger**: Time
  - **At time**: `09:00`
- **Condition**: Time
  - **Days of the week**: Monday
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
