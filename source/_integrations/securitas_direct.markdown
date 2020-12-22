---
title: Securitas Direct
description: Instructions on how to setup Securitas Direct home security system on Home Assistant.
ha_category:
  - Hub
  - Alarm
ha_release: 2020.12
ha_iot_class: Cloud Polling
ha_domain: securitas_direct
---

The `securitas_direct` integration allows users to manage their Securitas Direct installation
There is currently support for the following device types within Home Assistant:
- **Alarm Control Panel**: Reports on the current alarm status and can be used to arm and disarm the system.

## Configuration

To integrate Verisure with Home Assistant, add the following section to your `configuration.yaml` file:

Securitas Direct can be integrated by adding the following `securitas_direct` section to your `configuration.yaml` file:

## Configuration

1. From Home Assistant, navigate to ‘Configuration’ then ‘Integrations’. Click the plus icon and type/select ‘Securitas Direct’.
1. Choose your platform `Securitas Direct`.
1. Enter your credentials and installation configuration.

1. Click the Save button.

| Attribute | Description | Required |
| --------- | ----------- | ----------- |
| `username` | Username for your Securitas Direct account.| `yes`
| `password` | Password for your Securitas Direct account. | `yes`
| `installation` | The number of your installation. To find information on installations run `pysecuritas -u USERNAME -p PASSWORD -c COUNTRY -l LANGUAGE INS`.| `yes`
| `country` | Country identification (`PT`, `ES`, `FR`, `GB`, `IT`,...).| `default ES`
| `lang` | Messages language (`pt`, `es`, `fr`, `en`, `it`,...).| `default es`
| `code` | PIN code to activate or deactivate alarm.| `no`