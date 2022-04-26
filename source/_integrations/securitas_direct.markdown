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

1. From Home Assistant, navigate to ‘Configuration’ then ‘Integrations’.
1. Click the plus icon and type/select ‘Securitas Direct’.
1. Enter your credentials and installation configuration.
1. Click the Save button.

{% configuration_basic %}
Username:
  description: Username for your Securitas Direct account.
Password:
  description: Password for your Securitas Direct account.
Installation:
  description: The number of your installation. To find information on installations run `pysecuritas -u USERNAME -p PASSWORD -c COUNTRY -l LANGUAGE INS`.
Country:
  description: Country identification (PT, ES, FR, GB, IT,...)
Language:
  description: Message language (pt, es, fr, en, it,...)
Code:
  description: PIN code to activate or deactivate alarm.
{% endconfiguration_basic %}