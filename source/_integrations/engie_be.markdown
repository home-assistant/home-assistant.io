---
title: ENGIE Belgium
description: Instructions on how to integrate ENGIE Belgium energy prices into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: "2026.10"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DaanVervacke'
ha_domain: engie_be
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **ENGIE Belgium** {% term integration %} integrates the [ENGIE Belgium](https://www.engie.be) API with Home Assistant.

The integration makes it possible to retrieve the electricity and gas prices from your ENGIE Belgium contracts, to gain insight into your rate and to adjust your consumption accordingly. It creates one set of price sensors per address (business agreement) on your account.

## Use cases

- Follow the current electricity and gas prices for each meter on a dashboard, and see them change whenever your tariff is revised.
- Trigger automations from the off-peak price so appliances like the dishwasher, EV charger, or heat pump run on the cheaper rate.
- Compare the offtake and injection prices to decide when it pays to use your solar production yourself instead of sending it back to the grid.

## Prerequisites

- An ENGIE Belgium account (engie.be). New accounts have two-factor authentication enabled by default.
- Access to the phone number or email address that receives the code, since signing in asks for a one-time verification code.

{% important %}
Use a dedicated ENGIE user for Home Assistant rather than your everyday login. Signing in to the same account from engie.be or the ENGIE Smart App revokes the integration's session and forces it to re-authenticate. You can create a separate user on the [ENGIE user management page](https://www.engie.be/nl/energiedesk/usermanagement/manage-access/).
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email address:
  description: The email address of your dedicated ENGIE Belgium account.
Password:
  description: The password of your ENGIE Belgium account. It is only used to sign in and re-authenticate, and is never stored.
Two-factor authentication method:
  description: How you want to receive the one-time verification code, by SMS or email.
Verification code:
  description: The six-digit code ENGIE sends you while signing in.
{% endconfiguration_basic %}

Once you are signed in, the integration finds every active business agreement (address) on the account. Each address becomes a device, and the meters (EANs) on that address get their price sensors.

## Sensors

The integration looks at the contract on each meter and creates the price sensors that fit it. All prices are in EUR/kWh, shown with six decimals.

These sensors show the supplier energy price only. They do not include network and distribution costs, energy taxes and levies, green energy contributions, or other charges on your bill, so your total cost per kWh is higher than the value shown. The default sensors include VAT, and each one has an excluding-VAT version that is turned off by default. You can turn it on from the entity settings if you need the price before VAT.

Entity IDs are built from the address, so a meter at an address like Main Street 1 ends up with IDs like `sensor.main_street_1_electricity_offtake_price`. When an address has two meters of the same energy type, the last four digits of the meter's EAN are added so the two stay apart.

Gas is always billed at a single rate:

- **Gas offtake price**: energy price per kWh of gas

A meter on a single electricity rate gets an offtake price, and an injection price when the contract supports it:

- **Electricity offtake price**: energy price per kWh you consume
- **Electricity injection price**: compensation per kWh you inject

On a dual-rate contract, a peak and an off-peak sensor take the place of the single-rate ones for that meter:

- **Electricity peak offtake price**: offtake price during peak hours
- **Electricity off-peak offtake price**: offtake price during off-peak hours
- **Electricity peak injection price**: injection price during peak hours
- **Electricity off-peak injection price**: injection price during off-peak hours

A tri-rate contract adds a super off-peak sensor on top of the peak and off-peak ones:

- **Electricity super off-peak offtake price**: offtake price during super off-peak hours
- **Electricity super off-peak injection price**: injection price during super off-peak hours

Injection sensors only appear when your contract includes injection, for example when you have solar panels.

## Multiple households

A single ENGIE login can cover more than one address or meter. The integration adds every active business agreement on the account as its own device, named after the address, and groups that address's price sensors under it. An address that has an agreement but no priced meters still shows up as a device, so you can tell it was found.

## Data updates

The integration polls the ENGIE API once an hour. Contracted prices only change when your tariff is revised, so there is nothing to gain from polling more often. The sign-in tokens it uses are refreshed on their own, so you should not have to sign in again during normal use.

If the session does become invalid, Home Assistant asks you to sign in again with your password and a fresh verification code, and the integration picks up where it left off. The usual cause is signing in to the same ENGIE account somewhere else, so a dedicated user (see [Prerequisites](#prerequisites)) avoids it.

Your password is only used to sign in and re-authenticate, and it is never stored. The integration keeps only the tokens ENGIE hands back, and refreshes them when needed.

## Known limitations

- Addresses on a dynamic (EPEX-based) tariff show up as a device, but their prices are not available yet. Support for dynamic prices is planned.
- When no price period covers the current day, for example during a gap between contract periods, the sensors read `unknown` until the next period begins.
- If Home Assistant happens to restart at the exact moment the sign-in tokens are being renewed, you may be asked to sign in again.

## Troubleshooting

### Re-authentication keeps being requested

This almost always means the ENGIE account is shared between the integration and engie.be or the ENGIE Smart App. Every sign-in somewhere else invalidates the integration's session. Set up a dedicated ENGIE user (see [Prerequisites](#prerequisites)) to avoid this.

## Removing the integration

This integration follows standard integration removal steps.

{% include integrations/remove_device_service.md %}

If you no longer need the dedicated user, you can remove it from the ENGIE user management page.
