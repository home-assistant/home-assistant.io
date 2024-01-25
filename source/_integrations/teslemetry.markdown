---
title: Teslemetry
description: Instructions on how to integrate Teslemetry within Home Assistant.
ha_category:
  - Climate
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
  - climate
ha_integration_type: integration
---

The Teslemetry integration exposes various commands and sensors from the Tesla vehicles connected to a [Teslemetry](https://teslemetry.com/) subscription.

## Prerequisites

You must have a [Teslemetry](https://teslemetry.com/) account and [access token](https://teslemetry.com/console).

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity to control the vehicle's climate control system. This entity can:

- Turn on and off
- Change the set temperature
- Change to one of the four modes: Off, Keep mode, Dog mode, and Camp mode 
