---
title: Contact Energy NZ
description: Instructions on how to set up Contact Energy NZ Consumption sensors in Home Assistant.
ha_category:
  - Energy
ha_release: 2023.4.4
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tkhadimullin'
ha_domain: contact_energy_nz
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

[Contact Energy Limited](https://www.contact.co.nz/) is a New Zealand electricity generator, a wholesaler of natural gas, and a retailer of electricity, natural gas, broadband and LPG. This integration uses the API to get the following stats for the `current month`:

* total power consumption
* total bill so far
* amount of off-peak consumption
* cost of power consumed off-peak
* amount of free power that is not billed

{% include integrations/config_flow.md %}

<div class='note'>

The integration relies on the API key that the website is using. It can be obtained by downloading the latest `https://myaccount.contact.co.nz/main.<hash>.esm.js` file (search for `x-api-key` in there).

For configuration use the same credentials you use to log into https://myaccount.contact.co.nz

</div>
