---
title: Sanix
description: Instructions on how to integrate Sanix devices within Home Assistant.
ha_category:
  - Switch
ha_release: 2024.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tomaszsluszniak'
ha_domain: sanix
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Sanix {% term integration %} allows you to get water/sewage level sensor measurements from the Sanix devices made by [BIT Complex](https://bitcomplex.pl/).

## Pre-requisites

To set up the {% term integration %}, go to the [Sanix dashboard](https://sanix.bitcomplex.pl) and sign in to your account.

Not anyone can pull your data from the API. You need to authenticate by using an API token. To retrieve your API token, on the [Sanix dashboard](https://sanix.bitcomplex.pl), go to the **Help** page, and under **System version**, copy your API token. You will need this during setup in Home Assistant.

{% include integrations/config_flow.md %}

## Hardware support

- Sanix S M25 (<b>3.10</b> firmware version).
