---
title: ENGIE Belgium
description: Instructions on how to integrate ENGIE Belgium energy prices into Home Assistant.
ha_category:
  - Binary sensor
  - Energy
  - Sensor
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@DaanVervacke'
ha_domain: engie_be
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **ENGIE Belgium** {% term integration %} integrates the [ENGIE Belgium](https://www.engie.be) API with Home Assistant.

The integration makes it possible to retrieve the electricity and gas prices from your ENGIE Belgium contracts, to gain insight into your rate and to adjust your consumption accordingly. It creates one set of price sensors per address (business agreement) on your account. An address on a dynamic tariff gets sensors for the Belgian EPEX day-ahead wholesale prices.

Use case: Follow the current electricity and gas prices for each meter on a dashboard and see them change whenever your tariff is revised. Use the price sensors in automations that estimate the cost of running appliances. On a dynamic tariff, run flexible appliances, such as a dishwasher or a tumble dryer, during the cheap hours of the EPEX day-ahead prices. Compare the offtake and injection prices to decide when it pays to use your solar production yourself instead of sending it back to the grid.

## Prerequisites

- An ENGIE Belgium account (engie.be). New accounts have two-factor authentication enabled by default.
- Access to the phone number or email address that receives the code, since signing in asks for a one-time verification code.

{% important %}
Use a dedicated ENGIE user for Home Assistant rather than your everyday login. Signing in to the same account from engie.be or the ENGIE Smart App revokes the integration's session and stops its sensors from updating. You can create a separate user on the [ENGIE user management page](https://www.engie.be/nl/energiedesk/usermanagement/manage-access/).
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email address:
  description: The email address of your dedicated ENGIE Belgium account.
Password:
  description: The password of your ENGIE Belgium account. It is only used to sign in, and is never stored.
Two-factor authentication method:
  description: How you want to receive the one-time verification code, by SMS or email.
Verification code:
  description: The six-digit code ENGIE sends you while signing in.
{% endconfiguration_basic %}

Once you are signed in, the integration finds every active business agreement (address) on the account. Each address becomes a device, and the meters (EANs) on that address get their price sensors.

## Supported functionality

The **ENGIE Belgium** integration provides the following entities.

### Sensors

The integration looks at the contract on each meter and creates the price sensors that fit it.

#### Fixed and variable tariff prices

All prices are in EUR/kWh, shown with six decimals.

These sensors show the supplier energy price only. They do not include network and distribution costs, energy taxes and levies, green energy contributions, or other charges on your bill, so your total cost per kWh is higher than the value shown. The default sensors include VAT, and each one has an excluding-VAT version that is turned off by default. You can turn it on from the entity settings if you need the price before VAT.

Entity IDs are derived from the device name, which is the full address, so a meter at an address like Main Street 1, 1000 Brussels ends up with IDs like `sensor.main_street_1_1000_brussels_electricity_offtake_price`. When an address has two meters of the same energy type, the last four digits of the meter's EAN are added so the two stay apart.

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

#### Dynamic tariff (EPEX) prices

A dynamic tariff has no fixed or variable electricity prices: the EPEX day-ahead auction sets the price of every hour and quarter hour of the coming day. A dynamic address gets the sensors below instead of the prices above. Meters on a fixed or variable rate, like gas, keep their price sensors.

The integration always creates both the hourly and the quarter-hourly sensors, regardless of the interval your contract bills you in. They sit on the same address device and follow the same entity ID pattern.

- **EPEX current hour price**: price of the hour you are in
- **EPEX next hour price**: price of the next hour
- **EPEX lowest hour price today**: today's cheapest hour, its start and end are in the attributes
- **EPEX highest hour price today**: today's most expensive hour, its start and end are in the attributes
- **EPEX current quarter-hourly price**: price of the quarter hour you are in
- **EPEX next quarter-hourly price**: price of the next quarter hour
- **EPEX lowest quarter-hourly price today**: today's cheapest quarter hour, its start and end are in the attributes
- **EPEX highest quarter-hourly price today**: today's most expensive quarter hour, its start and end are in the attributes

All EPEX prices are in EUR/kWh, shown with four decimals. They are the raw wholesale market prices, without VAT, taxes and levies, or network costs, so the price you pay per kWh is higher. Wholesale prices can be negative: when supply exceeds demand, the raw price drops below zero.

Tomorrow's prices are published in the early afternoon, Brussels time. Until they are in, the next price sensors have no value whenever the next hour or quarter hour falls on the unpublished day.

To follow the cost of your consumption, go to {% my energy title="**Settings** > **Dashboards** > **Energy**" %} and select the current price sensor with the **Use an entity with current price** option when you set up grid consumption.

### Binary sensors

Addresses on a dynamic tariff get the **EPEX tomorrow prices available** binary sensor. It turns on once the hourly and the quarter-hourly prices for tomorrow are both published.

## Multiple households

A single ENGIE login can cover more than one address or meter. The integration adds every active business agreement on the account as its own device, named after the address, and groups that address's price sensors under it. An address that has an agreement but no priced meters still shows up as a device, so you can tell it was found.

## Data updates

The integration polls the ENGIE API once an hour. Contracted prices only change when your tariff is revised, so there is nothing to gain from polling more often. The sign-in tokens it uses are refreshed on their own, so it keeps working without you signing in again.

For an address on a dynamic tariff, the integration also fetches the EPEX day-ahead prices once an hour. The EPEX sensors refresh on every quarter-hour boundary, so the current and next prices switch on time. If the prices cannot be fetched during startup, the sensors stay unavailable and come back once a retry succeeds.

If the session is revoked, the integration can no longer reach the API and its sensors become unavailable. The usual cause is signing in to the same ENGIE account somewhere else, so a dedicated user (see [Prerequisites](#prerequisites)) avoids it. To recover, delete the integration and set it up again.

Your password is only used to sign in, and it is never stored. The integration keeps only the tokens ENGIE hands back, and refreshes them when needed.

## Known limitations

- Price sensors appear only while a price period covers the current day. During a gap between contract periods, they become unavailable until a new price period starts.
- If Home Assistant restarts at the exact moment the sign-in tokens are being renewed, the integration can lose the session and its sensors become unavailable until you set it up again.

## Troubleshooting

### Sensors stopped updating

This almost always means the ENGIE account is shared between the integration and engie.be or the ENGIE Smart App. Every sign-in somewhere else revokes the integration's session, so its sensors become unavailable. Set up a dedicated ENGIE user (see [Prerequisites](#prerequisites)) to avoid this, then delete the integration and set it up again to recover.

### The EPEX price sensors are unavailable

The integration could not fetch the EPEX day-ahead prices, for example because the ENGIE API was unreachable during startup. It retries on its own, so the sensors come back once a fetch succeeds. To try again right away, call the [Update entity](/actions/homeassistant.update_entity/) action on one of the EPEX sensors.

### The EPEX price sensors did not appear

The integration could not look up your tariff while it was starting, for example because the ENGIE API was unreachable. It retries the lookup in the background, so the sensors of a dynamic address appear once it succeeds.

## Removing the integration

This integration follows standard integration removal steps.

{% include integrations/remove_device_service.md %}

If you no longer need the dedicated user, you can remove it from the ENGIE user management page.
