---
title: IOTA
description: Instructions on how to integrate IOTA wallets with Home Assistant.
ha_category:
  - Finance
  - Sensor
ha_release: 0.62
ha_iot_class: Cloud Polling
ha_domain: iota
ha_platforms:
  - sensor
---

[IOTA](https://iota.org/) is a new blockless distributed ledger which is scalable, lightweight and makes it possible to transfer value without any fees.

The `iota` integration displays various details (e.g., the balance, node attributes) of IOTA wallets.

```yaml
# configuration.yaml example
iota:
  iri: https://testnet140.tangle.works:4434
  wallets:
    - name: Default Wallet
      seed: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

{% configuration %}
iri:
  description: URL of the IRI node.
  required: true
  type: string
testnet:
  description: Flag for indicating "testnet".
  required: false
  type: boolean
  default: false
wallets:
  description: List of IOTA wallets.
  required: true
  type: list
  keys:
    name:
      description: Name of the wallet.
    seed:
      description: Seed of the wallet.
{% endconfiguration %}

A full configuration example could look the one below:

```yaml
# Full example
iota:
  iri: https://testnet140.tangle.works:4434
  testnet: true
  wallets:
    - name: Default Wallet
      seed: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    - name: Exchange Wallet
      seed: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Sensor

The sensors are automatically created if the IOTA integration is present.

Available sensors:

- Wallet balance
- Node information
