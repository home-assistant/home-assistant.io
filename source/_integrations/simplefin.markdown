---
title: Simplefin
description: Instructions on the SimpleFIN Integration for personal finance.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2024.2
ha_codeowners:
  - '@jeeftor'
  - '@scottg489'
ha_domain: simplefin
ha_config_flow: true
ha_platforms:
  - sensor
ha_dhcp: false
ha_integration_type: integration
---

[SimpleFIN](http://simplefin.org) allows users to share read-only financial data. This is a paid service although it is quite affordable ($1.50 a month). 

{% include integrations/config_flow.md %}



## Setup Guide

Within the SimpleFIN Interface you can make a **Claim Token**. You will exchange this 1-time **Claim Token** during the setup process for access information from which Home Assistant will be able to pull read-only data.

### Accounts & Devices

Each financial institution you setup will configured as a **Device** within HomeAssistant. And any associated accounts will be linked to these devices.