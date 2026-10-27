---
description: Search and order medication at your Farmad-connected pharmacy in Home Assistant.
ha_release: 2026.11
ha_domain: mijn_farmad_apotheek
---

The **Mijn Farmad Apotheek** {% term integration %} lets you search the product catalog of your pharmacy and order medication for pickup from Home Assistant, using your [Mijn Farmad Apotheek](https://procura.farmad.be/) account. Mijn Farmad Apotheek is the online service of pharmacies connected to Farmad, a platform used by more than 1000 pharmacies in Flanders.

The integration adds no entities. You use it through its two actions, which run on demand: search the catalog of a pharmacy, and order one product for pickup.

## Use cases

- Order medication that runs out on a regular schedule, without opening the app each time.
- Check the price and the stock of a product at your pharmacy before ordering.
- Place a new order when a supply you track in Home Assistant runs low.

## Prerequisites

- An account for the Mijn Farmad Apotheek app, registered at a pharmacy connected to Farmad. If you do not have an account yet, create one in the app or on the [Farmad website](https://procura.farmad.be/).
- At least one pharmacy linked to your account in the app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address of your Mijn Farmad Apotheek account.
Password:
  description: The password of your Mijn Farmad Apotheek account. It is only used to sign in, and is never stored.
One-time code:
  description: The current six-digit code from your authenticator app. Only requested when your account requires two-factor authentication.
{% endconfiguration_basic %}

## Supported functionality

- The search action finds products in the catalog of a pharmacy by product name or CNK code, and returns up to 25 matches with price and stock.
- The order action places an order for one product at a pharmacy. Orders are paid at pickup.
- The **Pharmacy** field of both actions takes the APB number of the pharmacy, for example `343602`.
- Only users with administrator rights can run the order action.

{% include integrations/actions.md %}

## Mijn Farmad Apotheek automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: order a product every month

This automation orders a known product on a monthly schedule, with a comment for the pharmacist. Create a calendar first, for example with the [Local Calendar](/integrations/local_calendar/) integration, and add an event that repeats on the first day of every month at 09:00. To find the CNK code of your product, use the [Search medication](/actions/mijn_farmad_apotheek.search_medication/) action.

- **Trigger**: Calendar event started
  - **Calendar**: Medication orders (`calendar.medication_orders`)
- **Action**: Mijn Farmad Apotheek: Order medication
  - **Product**: 3093242
  - **Quantity**: 2
  - **Pharmacy**: 343602
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
        apb: "343602"
        comment: "For monthly pickup"
{% endexample %}

{% enddetails %}

## Data updates

The integration fetches nothing on a schedule. Each action contacts Farmad when you run it, so the search results show the current price and stock.

If Farmad rejects the stored session, the actions fail and Home Assistant asks you to sign in again.

Your password is only used to sign in, and it is never stored. The integration keeps only your email address and the tokens Farmad returns, and refreshes the tokens when needed.

## Known limitations

### Authentication

- The integration supports a single account per Home Assistant instance.

### Ordering

- Each order holds one product. To order several products, call the order action once per product.
- Orders are paid at pickup. Paying online is not supported.

### Language

- Product names in the search results and order confirmations are in Dutch.

## Troubleshooting

{% details "The integration cannot be set up" %}

### Symptom: The setup form shows an error message

Setting up the integration fails with an error message.

#### Description

The setup form shows one of these errors:

- **Failed to connect**: Farmad could not be reached.
- **Invalid authentication**: the email address or the password is wrong.

#### Resolution

For a connection error, check that Home Assistant can reach the internet and try again. For an authentication error, check your credentials by signing in to the Mijn Farmad Apotheek app with them.

{% enddetails %}

{% details "Actions fail because the pharmacy is not linked" %}

### Symptom: Your account has no access to the pharmacy

The action fails with the message that your account has no access to the pharmacy.

#### Description

The APB number in the **Pharmacy** field does not belong to a pharmacy linked to your account, for example because of a typo in the number.

#### Resolution

1. Check the APB number and correct it if needed.
2. If the number is correct, link the pharmacy in the Mijn Farmad Apotheek app, then run the action again.

{% enddetails %}

{% details "Ordering fails because the draft basket is not empty" %}

### Symptom: The order fails because the draft basket is not empty

The order action fails with the message that the draft basket at the pharmacy still has products or a comment.

#### Description

The app keeps one draft basket per pharmacy. The order action refuses to order into a draft basket that already holds products or a comment, so it cannot overwrite a basket you started in the app. When an order fails before it reaches the pharmacy, the integration removes the product it added to the draft basket. When an order could not be confirmed, the product can stay in the draft basket, because the pharmacy may already have accepted the order.

#### Resolution

1. Open the Mijn Farmad Apotheek app.
2. When the draft basket holds the product of an order that could not be confirmed, check the order history first and contact the pharmacy if its status remains unclear.
3. Once you know the order was not placed, submit the draft basket to place the order it holds, or clear it and run the action again to place a new order.

{% enddetails %}

{% details "The order could not be confirmed" %}

### Symptom: The order could not be confirmed

The order action fails with the message that the order could not be confirmed.

#### Description

The order was sent, but the pharmacy did not confirm it before the connection dropped. The order may still have been placed.

#### Resolution

Check the order history in the Mijn Farmad Apotheek app before running the action again, so you do not order the same product twice.

{% enddetails %}

{% details "Actions fail because the session expired" %}

### Symptom: The Farmad session expired

The actions fail with the message that the Farmad session expired, or Home Assistant asks you to sign in again to Mijn Farmad Apotheek.

#### Description

The stored session is no longer accepted by Farmad.

#### Resolution

Sign in again when Home Assistant prompts you.

{% enddetails %}

If your problem is not listed here, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and check the logs:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select Mijn Farmad Apotheek.
3. In the top right of the page, open the three dots {% icon "mdi:dots-vertical" %} menu, and select **Enable debug logging**.
4. Run the action that gave you the error, then open the same menu, select **Disable debug logging**, and download the log file.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
