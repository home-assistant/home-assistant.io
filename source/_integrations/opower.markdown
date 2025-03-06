---
title: Opower
description: Instructions on how to integrate Opower within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2023.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tronikos'
ha_domain: opower
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Opower integration allows you to get energy information from utilities that use [Opower](https://www.oracle.com/industries/utilities/opower-energy-efficiency/).

More than 175 utilities use Opower. Currently only the following utilities are supported by this integration:

- American Electric Power (AEP) subsidiaries
  - AEP Ohio
  - AEP Texas
  - Appalachian Power
  - Indiana Michigan Power
  - Kentucky Power
  - Public Service Company of Oklahoma (PSO)
  - Southwestern Electric Power Company (SWEPCO)
- Arizona Public Service (APS)
- Burbank Water and Power (BWP)
- City of Austin Utilities
- Consolidated Edison (ConEd) and subsidiaries
  - Orange & Rockland Utilities (ORU)
- Duquesne Light Company (DQE)
- Enmax Energy
- Evergy
- Exelon subsidiaries
  - Atlantic City Electric
  - Baltimore Gas and Electric (BGE)
  - Commonwealth Edison (ComEd)
  - Delmarva Power
  - PECO Energy Company (PECO)
  - Potomac Electric Power Company (Pepco)
- Mercury NZ Limited
- National Grid NY Upstate
- Pacific Gas & Electric (PG&E)
- Portland General Electric (PGE)
- Puget Sound Energy (PSE)
- Sacramento Municipal Utility District (SMUD)
- Seattle City Light (SCL)

When you add the Opower integration to Home Assistant, you will need to provide your utility account's authentication details to enable retrieving your energy data.
This is typically the same information needed to access your utility's website.

## Utility Authentication Requirements

For many utilities, only a username and password are required to access your accounts. Some utilities requires additional authentication information.
It might be necessary to configure your utility account with an authentication method that is compatible with the Opower integration.
Utility-specific authentication requirements are listed below:

### Consolidated Edison (ConEd)

Your ConEd account must be set up to use two-factor authentication using time-based one time passwords (TOTP). Other authentication methods, such as secret questions, are not supported.

When adding the Opower ConEd integration you will need to provide the TOTP secret that is used to synchronize your authenticator app, such as Google Authenticator, to your ConEd account.

NOTE: The TOTP secret is not one of the 6 digit time-based numeric codes.
It is a string of around 16 characters containing the shared secret that enables your authenticator app to generate the correct time-based code at the appropriate time.
The QR codes used for setting up TOTP accounts contain the secret.
Using the TOTP secret, the Opower integration will be able to generate the correct time-based code when it needs to authenticate to the ConEd website.

If you have an existing TOTP set up, there are methods for exporting the account from your authenticator app and then using a tool to obtain the TOTP secret from the encoded string.

Alternatively, you can create a new TOTP secret for your account and use the "no camera to scan" option to capture the TOTP secret. You may also want to capture the QR code by taking a picture, or using a QR code scanner. There are tools available that can decode the TOTP data from a QR code.

**NOTE: At this time, ConEd only has a single TOTP set up per account. Therefore, it is important that you configure the same TOTP secret for ConEd access in both Opower and your authenticator app.**

### Exelon subsidiaries

When using Opower with any of the Exelon subsidiaries, such as BGE, ComEd, PECO, Pepco, etc., you need to actively disable two-factor authentication.
Before proceeding, make sure you understand the security implications of disabling 2FA.
Log onto the website, select **Don't use 2FA** and **Don't ask me again**. If you have already enabled 2FA, disable it.

{% include integrations/config_flow.md %}

## Sensors

The integration adds the following sensors only if your utility provides forecasted usage/cost:

For electricity:

- Current bill electric usage to date
- Current bill electric cost to date
- Current bill electric forecasted usage (for the first few days of the bill this is 0)
- Current bill electric forecasted cost (for the first few days of the bill this is 0)
- Typical monthly electric usage (based on the same month for previous years, not populated for accounts younger than a year)
- Typical monthly electric cost (based on the same month for previous years, not populated for accounts younger than a year)

For gas:

- Current bill gas usage to date
- Current bill gas cost to date
- Current bill gas forecasted usage (for the first few days of the bill this is 0)
- Current bill gas forecasted cost (for the first few days of the bill this is 0)
- Typical monthly gas usage (based on the same month for previous years, not populated for accounts younger than a year)
- Typical monthly gas cost (based on the same month for previous years, not populated for accounts younger than a year)

Note the unit for gas is CCF (centum cubic feet). 1 CCF is one hundred cubic feet which is equivalent to 1 therm.

## Energy

Because utilities only release usage/cost data with a 48-hour delay, the integration inserts data into statistic objects.
You can find the statistics in {% my developer_statistics title="**Developer Tools** > **Statistics**"%} and search for "opower".
**This delay means that there will be no data in the energy dashboard for today and likely yesterday** (depending on time of day you are checking).

At the initial setup, the integration pulls historical monthly usage/cost since the account activation. If the utility provides more granular data, it pulls daily usage/cost for the past 3 years and hourly usage/cost for the past 2 months (note: typically, utilities provide only monthly or daily data for gas).
After the initial setup, the integration keeps pulling data (twice per day) for the past 30 days to allow for any corrections in the data from the utilities.

In the configuration of the energy dashboard (**{% my config_energy title="Settings > Dashboards > Energy" %}**):

For electricity:

1. Select **Add consumption** for the **Electricity grid**.
2. Select **Opower {utility name} elec {account number} consumption** for the **consumed energy**.
3. Select the radio button to **Use an entity tracking the total costs**.
4. Select **Opower {utility name} elec {account number} cost** for the **entity with the total costs**.

Your **Configure grid consumption** should now look like this:
![Screenshot configure grid consumption](/images/integrations/opower/configure_grid_consumption.png)

For gas:

1. Select **Add gas source** for the **Gas consumption**.
2. Select **Opower {utility name} gas {account number} consumption** for the **gas usage**.
3. Select the radio button to **Use an entity tracking the total costs**.
4. Select **Opower {utility name} gas {account number} cost** for the **entity with the total costs**.

Your **Configure gas consumption** should now look like this:
![Screenshot configure gas consumption](/images/integrations/opower/configure_gas_consumption.png)

With the above changes your (**{% my config_energy title="Settings > Dashboards > Energy" %}**) page should now look like this:

![Screenshot Energy Configuration](/images/integrations/opower/energy_config.png)

## Known limitations

- There is a delay, often for up to a few days, for sensors and statistics to have up-to-date data.
- For some utilities, there are no sensors added by this integration.
- For some utilities, the sensors might disappear or become unavailable at the beginning of your bill period.
- Sensors for typical monthly usage and cost are not populated for accounts younger than a year.
- Many utilities provide granular usage (for example, daily or hourly) but not cost. They only provide cost for billing periods (for example, month). This results in showing 0 for cost.

## Troubleshooting

- Before opening an issue, ensure you can access the energy usage section/dashboard on your utility website and verify that the data is up-to-date there.
- In your energy dashboard in Home Assistant, make sure you use the statistics and not the sensors.
