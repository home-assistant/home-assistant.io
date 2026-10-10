---
title: "Order medication"
action: mijn_farmad_apotheek.order_medication
domain: mijn_farmad_apotheek
description: "Places an order for one product at a Farmad pharmacy. The product is paid at pickup."
related_actions:
  - mijn_farmad_apotheek.search_medication
---

The **Order medication** action places an order for one product at a Farmad pharmacy. The order is paid at pickup. Only users with administrator rights can run this action.

Give the product as a CNK code, a seven-digit code that identifies a product. Use the [Search medication](/actions/mijn_farmad_apotheek.search_medication/) action to find the CNK code of a product. A CNK code that already appears in your order history can be ordered without a search.

This action does not support targets. You select the pharmacy through the **Pharmacy** field instead of choosing an area, device, entity, or label.

{% caution %}
Ordering places a real order at your pharmacy. If the action reports that the order could not be confirmed, check the Mijn Farmad Apotheek app before calling it again. The order may have gone through, and calling again can order the same product twice.
{% endcaution %}

{% include actions/ui_header.md %}

To order a product from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mijn Farmad Apotheek: Order medication**.
6. Under **Product**, enter the CNK code of the product to order.
7. Set the **Quantity**, the number of packages to order.
8. If your account is linked to more than one pharmacy, enter its APB number under **Pharmacy**. Otherwise, leave **Pharmacy** empty to order from your linked pharmacy.
9. Optionally, enter a **Comment** for the pharmacist.
10. Optionally, in the **Response variable** field, enter a name to store the order details in, such as `order_result`.
11. Select **Save**.

### Options in the UI

{% options_ui %}
Product:
  description: The CNK code of the product to order. Use the Search medication action to find the CNK code of a product.
  required: true
Quantity:
  description: The number of packages to order. The default is 1.
  required: false
Pharmacy:
  description: The APB number of the pharmacy to order from, for example `343602`. Required when your account is linked to more than one pharmacy.
  required: false
Comment:
  description: A comment for the pharmacist.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mijn_farmad_apotheek.order_medication`. A basic example looks like this:

{% example %}
action: |
  action: mijn_farmad_apotheek.order_medication
  data:
    product: "3093242"
    comment: "I will pick the order up on Saturday."
{% endexample %}

This orders one package, the default, of the product with CNK code 3093242 at your linked pharmacy, with a comment for the pharmacist.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
product:
  description: >
    The CNK code of the product to order.
  required: true
  type: string
quantity:
  description: >
    The number of packages to order.
  required: false
  type: integer
  default: 1
apb:
  description: >
    The APB number of the pharmacy to order from. Required when your account is
    linked to more than one pharmacy.
  required: false
  type: string
comment:
  description: >
    A comment for the pharmacist.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The action returns:

- `basket_id`: The ID of the order at the pharmacy.
- `description`: The product name, in Dutch.

## Good to know

- The action refuses to order when your draft basket at the pharmacy still holds products or a comment. Submit or clear the draft in the Mijn Farmad Apotheek app, then run the action again.
- Each order holds one product. To order several products, call the action once per product.
- If you leave **Pharmacy** empty while your account is linked to more than one pharmacy, the error message lists each linked pharmacy with its APB number.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: order a product every month

This automation orders a known product on a monthly schedule, with a comment for the pharmacist. Create a calendar first, for example with the [Local Calendar](/integrations/local_calendar/) integration, and add an event that repeats on the first day of every month at 09:00.

- **Trigger**: Calendar event started
  - **Calendar**: Medication orders (`calendar.medication_orders`)
- **Action**: Order medication
  - **Product**: 3093242
  - **Quantity**: 2
  - **Comment**: For monthly pickup

{% details "YAML example for ordering a product every month" %}

{% example %}
automation: |
  alias: "Order a product every month"
  description: "Orders two packages of a known product every month."
  triggers:
    - trigger: calendar.event_started
      target:
        entity_id: calendar.medication_orders
  actions:
    - action: mijn_farmad_apotheek.order_medication
      data:
        product: "3093242"
        quantity: 2
        comment: "For monthly pickup"
{% endexample %}

{% enddetails %}

### Automation: order a product when the supply runs low

This automation orders a known product when a supply you track in Home Assistant runs low. Create a number {% term helper %} first, for example `input_number.paracetamol_boxes`, and set it to the number of packages you have left. Lower the number every time you take a package. When it reaches zero, the automation orders a new package. A condition keeps the automation from ordering again after a restart while the supply still reads zero.

- **Trigger**: Numeric state: Paracetamol boxes below 1
- **Condition**: The supply changed from a number, not from unavailable
- **Action**: Order medication
  - **Product**: 3093242

{% details "YAML example for ordering when the supply runs low" %}

{% example %}
automation: |
  alias: "Order a product when the supply runs low"
  description: "Orders a new package when the supply reaches zero."
  triggers:
    - trigger: numeric_state
      entity_id: input_number.paracetamol_boxes
      below: 1
  conditions:
    - >-
      {{ trigger.from_state is not none
      and is_number(trigger.from_state.state) }}
  actions:
    - action: mijn_farmad_apotheek.order_medication
      data:
        product: "3093242"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
