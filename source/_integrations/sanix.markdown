---
title: Sanix
description: Instructions on how to integrate Sanix devices within Home Assistant.
ha_category:
  - Binary sensor
  - Switch
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tomaszsluszniak'
ha_domain: sanix
ha_platforms:
  - sensor
  - binary_sensor
ha_integration_type: integration
---

The **Sanix** {% term integration %} allows you to get water/sewage level sensor measurements from the `Sanix` devices made by [BIT Complex](https://bitcomplex.pl/).
This is an unofficial integration developed by a **Sanix** user.

## Setup

To set up the {% term integration %} go to the [Sanix dashboard](https://sanix.bitcomplex.pl) and sign in to your account.

As the `Device number` use your `Sanix dashboard` login.

To get the `Token`, go to the `Help` page, and `System version`.

<div class="note warning">
The integration was developed and tested only with <b>Sanix S M25</b> device with <b>3.10</b> firmware version.
</div>
