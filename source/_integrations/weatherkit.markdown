---
title: Apple WeatherKit
description: Instructions on how to set up Apple WeatherKit with Home Assistant.
ha_category:
  - Weather
ha_release: '2023.10'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@tjhorner'
ha_domain: weatherkit
ha_integration_type: integration
ha_platforms:
  - sensor
  - weather
---

The **Apple WeatherKit** {% term integration %} obtains current weather and forecasts (hourly and daily) from Apple Weather. It is the most direct replacement for those coming from the Dark Sky API since Apple bought Dark Sky and implemented its technology into their weather service.

There is currently support for the following device types within Home Assistant:

- Weather
- Sensor

## Requirements

You will need a [paid Apple Developer Program account](https://developer.apple.com/support/compare-memberships/) to use this {% term integration %}.

{% include integrations/config_flow.md %}

### Credentials

You will need to obtain the appropriate credentials which you will use to connect to Apple WeatherKit. We need to register a few things in your Apple Developer account:

1. Go to [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/certificates/list) in your Apple Developer account.
2. In the [Keys](https://developer.apple.com/account/resources/authkeys/list) section, add a new key.
    1. Name it whatever you want.
    2. Select "WeatherKit" from the list.
    3. Download the `.p8` file provided. This is your **Private Key**.
    4. Write down the **Key ID**. You will need it later.
3. In the [Identifiers](https://developer.apple.com/account/resources/identifiers/list) section, add a new identifier.
    1. Select "Services IDs" from the drop-down in the top-right.
    2. Enter whatever you'd like for the description.
    3. For the identifier, Apple recommends using a reverse-DNS style name, like `com.example.homeassistant`.
    4. Save the identifier you used. This is your **Service ID**.

You can add a new WeatherKit {% term integration %} entry now that you have all the credentials. Using the details from earlier, it should look something like this:

- **Key ID**: `ABC123DEFG`
- **Service ID**: `com.example.homeassistant`
- **Apple team ID**: `ABC123DEFG`
  - This value can be found in the top-right of the Apple Developer website.
- **Private key**: `-----BEGIN PRIVATE KEY----- [...]`
  - Open the `.p8` file you downloaded earlier in a text editor and copy the _entire_ contents into this field, including the header and footer.

### Troubleshooting

If you are having issues setting up the {% term integration %}, please make sure the following are true:

- You are entering the key exactly as it appears in the `.p8` file, including the header and footer.
- There are no leading or trailing spaces in other configuration values.
