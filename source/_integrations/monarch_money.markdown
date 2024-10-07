---
title: Monarch Money
description: Instructions on the Monarch Money Integration for personal finance.
ha_category:
  - Finance
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_codeowners:
  - '@jeeftor'
ha_domain: monarch_money
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

[Monarch Money](https://www.monarchmoney.com) is a personal finance aggregation and budgeting service that integrates with Plaid, MX, and FinCity, the three major financial backends.

## Prerequisites

- You need a Monarch Money account to use this integration.
- You need account credentials. This integration supports both `username` and `password` login, as well as accounts configured with `MFA`.

{% include integrations/config_flow.md %}

### Accounts & devices

Each `account` is set up as a device in Home Assistant and contain the following sensors:

|Sensor|Description|
|-------|---------------|
|Balance|Account balance|
|Age| This sensor shows when the data was retrieved by Monarch's back end |


## Actions: Get Holdings

This integration registers the `get_holdings` which will reutrn a data structure of the various holdings associated with a set of Monarch Money accounts. 


### Using the action

In the frontend open **Settings**. Select **Developer tools**, click **Actions**. From the **Action** dropdown menu choose `monarch_money.get_holdings` from the list of available actions. Select 1 or more Devices or Entities. Now select **Perform action**.


## Holdings Template Sensors

If you want to expose data regarding holdings you can use template sensors - unfortunately the syntax is somewhat complex. The following example shows how to expose the allocations of an account made up of a 3-fund portfolio consiting of `VTI` `BND` and `VXUS`

{% raw %}
```yaml
template:
  - trigger:
      - platform: time_pattern
        hours: /8 # Trigger every 8 hrs
    action:
      - action: monarch_money.get_holdings
        target:
          entity_id: sensor.my_account
        response_variable: holdings
    sensor:
      - name: percent_vxus
        unique_id: vxus
        state: "{{(holdings['sensor.my_account'] | from_json)['VXUS']['percentage'] | float}}"
        unit_of_measurement: '%'
        attributes:
          shares: "{{(holdings['sensor.my_account'] | from_json)['VXUS']['quantity'] | float }}"
          type: "{{(holdings['sensor.my_account'] | from_json)['VXUS']['type'] }}"
          name: "{{(holdings['sensor.my_account'] | from_json)['VXUS']['name'] }}"
          percent: "{{(holdings['sensor.my_account'] | from_json)['VXUS']['percentage'] }}"
          sharePriceAge: "{{(holdings['sensor.my_account'] | from_json)['VXUS']['sharePriceUpdate']}}"
          sharePrice:  "{{(holdings['sensor.my_account'] | from_json)['VXUS']['sharePrice'] }}"
          totalValue: "{{(holdings['sensor.my_account'] | from_json)['VXUS']['totalValue'] }}"
      - name: percent_bnd
        unique_id: bnd
        state: "{{(holdings['sensor.my_account'] | from_json)['BND']['percentage'] | float}}"
        unit_of_measurement: '%'
        attributes:
          shares: "{{(holdings['sensor.my_account'] | from_json)['BND']['quantity'] | float }}"
          type: "{{(holdings['sensor.my_account'] | from_json)['BND']['type'] }}"
          name: "{{(holdings['sensor.my_account'] | from_json)['BND']['name'] }}"
          percent: "{{(holdings['sensor.my_account'] | from_json)['BND']['percentage'] }}"
          sharePriceAge: "{{(holdings['sensor.my_account'] | from_json)['BND']['sharePriceUpdate']}}"
          sharePrice:  "{{(holdings['sensor.my_account'] | from_json)['BND']['sharePrice'] }}"
          totalValue: "{{(holdings['sensor.my_account'] | from_json)['BND']['totalValue'] }}"
      - name: percent_vti
        unique_id: VTI
        state: "{{(holdings['sensor.my_account'] | from_json)['VTI']['percentage'] | float}}"
        unit_of_measurement: '%'
        attributes:
          shares: "{{(holdings['sensor.my_account'] | from_json)['VTI']['quantity'] | float }}"
          type: "{{(holdings['sensor.my_account'] | from_json)['VTI']['type'] }}"
          name: "{{(holdings['sensor.my_account'] | from_json)['VTI']['name'] }}"
          percent: "{{(holdings['sensor.my_account'] | from_json)['VTI']['percentage'] }}"
          sharePriceAge: "{{(holdings['sensor.my_account'] | from_json)['VTI']['sharePriceUpdate']}}"
          sharePrice:  "{{(holdings['sensor.my_account'] | from_json)['VTI']['sharePrice'] }}"
          totalValue: "{{(holdings['sensor.my_account'] | from_json)['VTI']['totalValue'] }}"

```
{% endraw %}

This would then give you 3 different template sensors