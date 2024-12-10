---
title: FinTS
description: Instructions on how to use the FinTS sensor.
ha_category:
  - Finance
ha_release: '0.70'
ha_iot_class: Cloud Polling
ha_domain: fints
ha_platforms:
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

With the FinTS {% term integration %}, you can fetch your account information from your bank. This only works with banks that support the FinTS (aka. HBCI) standard. The FinTS standard used by many German banks. So if you do not have a German bank account, this will most likely not work for you. To find out if your bank supports FinTS, check the bank's website or call their hotline.

## Configuration

To find out the configuration for your bank, check their website or call their hotline. Do not use random information you find on the Internet! As you're storing your bank account information in the Home Assistant configuration: Make sure that this configuration is not accessible to anyone.

For each account you have with the bank, a separate sensor is created. If you have several accounts with a bank, you can select which ones you want to have, and you can also give the accounts a name.

To enable FinTS, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fints
    bank_identification_number: ID_FOR_YOUR_BANK
    username: YOUR_FINTS_USERNAME
    pin: YOUR_PIN
    url: URL_FOR_YOUR_BANK
```

{% configuration %}
name:
  description: Name of the bank.
  required: false
  type: string
bank_identification_number:
  description: Bank identification number, in most cases the "Bankleitzahl".
  required: true
  type: string
username:
  description: Your FinTS username.
  required: true
  type: string
pin:
  description: Your FinTS PIN or password.
  required: true
  type: string
url:
  description: URL of your bank's FinTS server.
  required: true
  type: string
accounts:
  description: The balance accounts to show. If not set then all accounts will show up.
  required: false
  type: list
  keys:
    account:
      description: The IBAN of the balance account.
      required: true
      type: string
    name:
      description: Use this field to give the account a meaningful name.
      required: false
      type: string
holdings:
  description: The holding accounts of your bank. If not set then all accounts will show up.
  required: false
  type: list
  keys:
    account:
      description: The classic account number.
      required: true
      type: string
    name:
      description: Use this field to give the account a meaningful name.
      required: false
      type: string
{% endconfiguration %}
