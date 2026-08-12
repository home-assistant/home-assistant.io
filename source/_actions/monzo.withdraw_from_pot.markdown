---
title: "Withdraw from pot"
action: monzo.withdraw_from_pot
domain: monzo
description: "Moves money from a Monzo pot into an account."
related_actions:
  - monzo.deposit_into_pot
---

Use this action to move money from a Monzo pot into its account. After a successful transfer, Home Assistant refreshes the account and pot balances.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To withdraw money from a pot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Monzo: Withdraw from pot**.
6. Select the pot in **From pot** and its account in **To account**.
7. Enter the **Amount** to transfer.
8. Select **Save**.

### Options in the UI

{% options_ui %}
From pot:
  description: The Monzo pot to move money from.
  required: true
To account:
  description: The Monzo account to move money into.
  required: true
Amount:
  description: The amount of money to move, in the selected account's currency. The amount must be positive and have no more than two decimal places.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `monzo.withdraw_from_pot`:

{% example %}
action: |
  action: monzo.withdraw_from_pot
  data:
    pot: fedcba9876543210fedcba9876543210
    account: 0123456789abcdef0123456789abcdef
    amount: 25.50
{% endexample %}

### Options in YAML

{% options_yaml %}
pot:
  description: The device ID of the Monzo pot to move money from.
  required: true
  type: string
account:
  description: The device ID of the Monzo account to move money into.
  required: true
  type: string
amount:
  description: The amount of money to move, in the selected account's currency. The amount must be positive and have no more than two decimal places.
  required: true
  type: float
{% endoptions_yaml %}

## Good to know

- The selected pot must belong to the selected account and Monzo connection.
- After a successful transfer, Home Assistant refreshes the account and pot balances.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
