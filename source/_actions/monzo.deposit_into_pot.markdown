---
title: "Deposit into pot"
action: monzo.deposit_into_pot
domain: monzo
description: "Moves money from a Monzo account into a pot."
related_actions:
  - monzo.withdraw_from_pot
---

Use this action to move money from a Monzo account into one of its pots. After a successful transfer, Home Assistant refreshes the account and pot balances.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To deposit money into a pot from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Monzo: Deposit into pot**.
6. Select the account in **From account** and its pot in **To pot**.
7. Enter the **Amount** to transfer.
8. Select **Save**.

### Options in the UI

{% options_ui %}
From account:
  description: The Monzo account to move money from.
  required: true
To pot:
  description: The Monzo pot to move money into.
  required: true
Amount:
  description: The amount of money to move, in the selected account's currency. The amount must be positive and have no more than two decimal places.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `monzo.deposit_into_pot`:

{% example %}
action: |
  action: monzo.deposit_into_pot
  data:
    account: 0123456789abcdef0123456789abcdef
    pot: fedcba9876543210fedcba9876543210
    amount: 25.50
{% endexample %}

### Options in YAML

{% options_yaml %}
account:
  description: The device ID of the Monzo account to move money from.
  required: true
  type: string
pot:
  description: The device ID of the Monzo pot to move money into.
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
