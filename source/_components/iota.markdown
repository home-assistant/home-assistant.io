---
layout: page
title: "IOTA"
description: "Instructions on how to integrate IOTA wallets with Home Assistant."
date: 2017-12-31 13:29
sidebar: true
comments: false
sharing: true
footer: true
logo: iota.png
ha_category: Finance
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---

[IOTA](http://iota.org/) is a new blockless distributed ledger which is scalable, lightweight and makes it possible to transfer value without any fees. 

The `iota` component displays various details (e.g. balance of wallet, node attributes) of IOTA wallets.

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
  description: Url of the IRI node
  required: true
  type: string
testnet:
  description: Flag for indicating testnet
  required: false
  default: No testnet (false)
  type: bool
  
wallets:
  description: List of IOTA wallets
  required: true
  type: list
  keys:
    name:
      description: Name of the wallet
    seed:
      description: Seed of the wallet
{% endconfiguration %}

A full configuration example could looks the one below:

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