---
title: Mijn Farmad Apotheek
description: Search and order medication at your Farmad-connected pharmacy in Home Assistant.
ha_release: 2026.11
ha_category: Health
ha_iot_class: Cloud Polling
ha_domain: mijn_farmad_apotheek
ha_integration_type: service
ha_config_flow: true
ha_codeowners:
  - '@DaanVervacke'
ha_quality_scale: bronze
---

The **Mijn Farmad Apotheek** {% term integration %} lets you search the product catalog of your pharmacy and order medication for pickup from Home Assistant, using your [Mijn Farmad Apotheek](https://www.farmad.be/oplossingen/farmad-online-voor-gebruikers) account. Mijn Farmad Apotheek is the online service of pharmacies connected to Farmad, a platform used by more than 1000 pharmacies in Flanders.

The integration adds no entities. You use it through its two actions, which run on demand: search the catalog of a pharmacy, and order one product for pickup.

## Use cases

- Order medication that runs out on a regular schedule, without opening the app each time.
- Check the price and the stock of a product at your pharmacy before ordering.
- Place a new order when a supply you track in Home Assistant runs low.

## Prerequisites

- An account for the Mijn Farmad Apotheek app, registered at a pharmacy connected to Farmad. If you do not have an account yet, create one in the app or on the [Farmad website](https://www.farmad.be/oplossingen/farmad-online-voor-gebruikers).
- At least one pharmacy linked to your account in the app.
- The account must not require multi-factor authentication.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address of your Mijn Farmad Apotheek account.
Password:
  description: The password of your Mijn Farmad Apotheek account.
{% endconfiguration_basic %}

## Supported functionality

- The search action finds products in the catalog of a pharmacy by product name or CNK code, and returns up to 25 matches with price and stock.
- The order action places an order for one product at a pharmacy. Orders are paid at pickup.
- The **Pharmacy** field of both actions lists the pharmacies linked to your account. If your account is linked to a single pharmacy, you can leave the field empty. The list refreshes when the integration reloads.
- Only users with administrator rights can run the order action.

{% include integrations/actions.md %}

## Mijn Farmad Apotheek automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: order a product every month

This automation orders a known product on a monthly schedule. Create a schedule {% term helper %} with a monthly rule first, for example, on the first day of the month at 09:00. To find the CNK code of your product, use the [Search medication](/actions/mijn_farmad_apotheek.search_medication/) action.

- **Trigger**: Schedule
  - **Entity**: Monthly medication order (`schedule.monthly_medication_order`)
- **Action**: Mijn Farmad Apotheek: Order medication
  - **Product**: 3093242

{% details "YAML example for ordering a product every month" %}

{% example %}
automation: |
  alias: "Order a product every month"
  description: "Orders one package of a known product every month."
  triggers:
    - trigger: schedule
      entity_id: schedule.monthly_medication_order
  actions:
    - action: mijn_farmad_apotheek.order_medication
      data:
        product: "3093242"
{% endexample %}

{% enddetails %}

## Data updates

The integration fetches nothing on a schedule. Each action contacts Farmad when you run it, so the search results show the current price and stock.

## Known limitations

- Accounts that require multi-factor authentication cannot be set up yet. Support for these accounts is planned.
- When the Farmad session expires, remove the integration and set it up again. A flow to sign in again without removing the integration is planned.
- The integration supports a single account per Home Assistant instance.
- Each order holds one product. To order several products, call the order action once per product.
- Orders are paid at pickup. Paying online is not supported.
- Product names in the search results and order confirmations are in Dutch.

## Troubleshooting

{% details "The integration cannot be set up" %}

### Symptom

Setting up the integration fails with an error message.

#### Description

The setup form shows one of these errors:

- **Cannot connect**: Farmad could not be reached.
- **Invalid authentication**: the email address or the password is wrong.
- **Multi-factor authentication**: the account requires a one-time code.

#### Resolution

For a connection error, check that Home Assistant can reach the internet and try again. For an authentication error, check your credentials by signing in to the Mijn Farmad Apotheek app with them. Accounts that require multi-factor authentication cannot be set up yet.

{% enddetails %}

{% details "Ordering fails because the draft basket is not empty" %}

### Symptom

The order action fails with the message that the draft basket at the pharmacy still has products.

#### Description

The app keeps one draft basket per pharmacy. The order action refuses to order into a draft basket that already holds products, so it cannot overwrite a basket you started in the app.

#### Resolution

1. Open the Mijn Farmad Apotheek app.
2. Submit or clear the draft basket at the pharmacy.
3. Run the action again.

{% enddetails %}

{% details "The order could not be confirmed" %}

### Symptom

The order action fails with the message that the order could not be confirmed.

#### Description

The order was sent, but the pharmacy did not confirm it before the connection dropped. The order may still have been placed.

#### Resolution

Check the order history in the Mijn Farmad Apotheek app before running the action again, so you do not order the same product twice.

{% enddetails %}

{% details "Actions fail because the session expired" %}

### Symptom

The actions fail with the message that the Farmad session expired.

#### Description

The stored login is no longer accepted by Farmad, and the integration cannot sign in again on its own.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Remove the Mijn Farmad Apotheek integration.
3. Set it up again with your credentials.

{% enddetails %}

If your problem is not listed here, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and check the logs:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select Mijn Farmad Apotheek.
3. Open the three-dots menu in the top right and select **Enable debug logging**.
4. Run the action that gave you the error, then open the same menu, select **Disable debug logging**, and download the log file.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
