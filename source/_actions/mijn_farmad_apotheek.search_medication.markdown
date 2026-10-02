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
7. If your account is linked to more than one pharmacy, select the **Pharmacy** to search in. Otherwise the search runs at your linked pharmacy.
8. In the **Response variable** field, enter a name to store the results in, such as `search_result`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Search term:
  description: The product name or CNK code to search for.
  required: true
Pharmacy:
  description: The pharmacy to search in. Required when your account is linked to more than one pharmacy. The list of pharmacies refreshes when the integration reloads.
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
    The apb number of the pharmacy to search in. Required when your account is
    linked to more than one pharmacy. The list of pharmacies refreshes when the
    integration reloads.
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
- To refresh the list of pharmacies, reload the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: check the price and stock of a product

Each week, this automation looks up a product at your pharmacy and sends the price and the stock of the first match to a phone. It uses a schedule {% term helper %}: create the helper with a weekly rule first.

- **Trigger**: Schedule
  - **Entity**: Weekly price check (`schedule.weekly_price_check`)
- **Action**: Mijn Farmad Apotheek: Search medication
  - **Search term**: paracetamol 500 mg
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a weekly price and stock notification" %}

{% example %}
automation: |
  alias: "Check the price and stock of a product"
  description: "Sends the price and the stock of a product to a phone."
  triggers:
    - trigger: schedule
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
          {{ search_result.products[0].description }} costs
          {{ search_result.products[0].price }} euro.
          {{ search_result.products[0].stock }} in stock.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
