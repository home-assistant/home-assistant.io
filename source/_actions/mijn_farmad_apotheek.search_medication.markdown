---
title: "Search medication"
action: mijn_farmad_apotheek.search_medication
domain: mijn_farmad_apotheek
description: "Searches the catalog of a Farmad pharmacy by product name or CNK and returns up to 25 matching products."
related_actions:
  - mijn_farmad_apotheek.order_medication
---

The **Search medication** action searches the product catalog of a Farmad pharmacy by product name or CNK code. It returns up to 25 products with price and stock, as [response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data) you can use in the rest of your automation or script. For example, you can look up the CNK code of a product before ordering it with the [Order medication](/actions/mijn_farmad_apotheek.order_medication/) action.

This action does not support targets. You select the pharmacy through the **Pharmacy** field instead of choosing an area, device, entity, or label.

{% include actions/ui_header.md %}

To search the catalog from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mijn Farmad Apotheek: Search medication**.
6. Under **Search term**, enter the product name or CNK code to search for.
7. If your account is linked to more than one pharmacy, enter its APB number under **Pharmacy**. Otherwise, leave **Pharmacy** empty to search at your linked pharmacy.
8. In the **Response variable** field, enter a name to store the results in, such as `search_result`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Search term:
  description: The product name or CNK code to search for.
  required: true
Pharmacy:
  description: The APB number of the pharmacy to search in, for example `343602`. Required when your account is linked to more than one pharmacy.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mijn_farmad_apotheek.search_medication`. A basic example looks like this:

{% example %}
action: |
  action: mijn_farmad_apotheek.search_medication
  data:
    query: "paracetamol 500 mg"
  response_variable: search_result
{% endexample %}

This searches for paracetamol at your linked pharmacy and stores the matching products in `search_result`.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
query:
  description: >
    The product name or CNK code to search for.
  required: true
  type: string
apb:
  description: >
    The APB number of the pharmacy to search in. Required when your account is
    linked to more than one pharmacy.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action returns a `products` list with up to 25 products. Each product has these fields:

- `cnk`: The CNK code of the product.
- `description`: The product name, in Dutch.
- `brand`: The brand of the product.
- `package_quantity`: The quantity in the package, such as the number of tablets in a box, or `null` when unknown.
- `price`: The sales price at the pharmacy, or `null` when unknown.
- `stock`: The number of items in stock, or `null` when unknown.
- `is_on_prescription`: Whether the product requires a prescription.

An example response:

```yaml
products:
  - cnk: "3093242"
    description: "Paracetamol EG 500 mg 120 tabl."
    brand: "EG"
    package_quantity: 120
    price: 3.15
    stock: 25
    is_on_prescription: false
```

## Good to know

- The search matches product names. A full CNK code matches its own product.
- Product names in the results are in Dutch.
- If you leave **Pharmacy** empty while your account is linked to more than one pharmacy, the error message lists each linked pharmacy with its APB number.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: check the price and stock of a product

Each week, this automation looks up a product at your pharmacy and sends the price and the stock of the first match to a phone. When the search returns no product, or when the price or the stock is unknown, the message says so. It uses a schedule {% term helper %}: create the helper with a weekly rule first.

- **Trigger**: Schedule block started
  - **Target**: Weekly price check (`schedule.weekly_price_check`)
- **Action**: Mijn Farmad Apotheek: Search medication
  - **Search term**: paracetamol 500 mg
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a weekly price and stock notification" %}

{% example %}
automation: |
  alias: "Check the price and stock of a product"
  description: "Sends the price and the stock of the first match to a phone."
  triggers:
    - trigger: schedule.block_started
      target:
        entity_id: schedule.weekly_price_check
  actions:
    - action: mijn_farmad_apotheek.search_medication
      data:
        query: "paracetamol 500 mg"
      response_variable: search_result
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >-
          {% if search_result.products %}
          {% set product = search_result.products[0] %}
          {{ product.description }} costs
          {{ product.price if product.price is not none else 'an unknown price' }}.
          Stock:
          {{ product.stock if product.stock is not none else 'unknown' }}.
          {% else %}
          No product found.
          {% endif %}
{% endexample %}

{% enddetails %}

### Automation: get a daily message when a product is in stock

Each day, this automation looks up a product at your pharmacy by its CNK code. When the product is in stock, it sends a message to a phone. The message repeats every day while the product stays in stock.

- **Trigger**: Time: 09:00
- **Action**: Mijn Farmad Apotheek: Search medication
  - **Search term**: 3093242
- **Action**: If-then
  - **If**: The product has more than zero items in stock
  - **Then**: Send a notification message
    - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a daily in-stock message" %}

{% example %}
automation: |
  alias: "Get a message when a product is in stock"
  description: "Sends a message when a product is in stock."
  triggers:
    - trigger: time
      at: "09:00:00"
  actions:
    - action: mijn_farmad_apotheek.search_medication
      data:
        query: "3093242"
      response_variable: search_result
    - if:
        - >-
          {{ search_result.products | length > 0
          and search_result.products[0].stock | default(0, true) > 0 }}
      then:
        - action: notify.send_message
          target:
            entity_id: notify.my_device
          data:
            message: >-
              {{ search_result.products[0].description }} is in stock
              at your pharmacy.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
