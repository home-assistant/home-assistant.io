---
title: Sanix
description: Instructions on how to integrate Sanix devices within Home Assistant.
ha_category:
  - Switch
ha_release: 2024.1
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

To set up the {% term integration %} go to the [Sanix dashboard](https://sanix.bitcomplex.pl) and sign in to your account.

Go to the `Help` page, and `System version` - there you will find the API token.

## Configuration

[![Open your Home Assistant instance and start setting up a new integration.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=sanix)

## Hardware support

- Sanix S M25 (<b>3.10</b> firmware version).
