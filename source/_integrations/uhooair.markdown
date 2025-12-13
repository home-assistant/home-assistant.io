---
title: uHoo
description: Instructions on how to integrate uHoo with Home Assistant
ha_release: 2025.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@getuhoo'
  - '@joshsmonta'
ha_domain: uhooair
ha_integration_type: iot-cloud
related:
  - url: https://developers.home-assistant.io/docs/documenting/standards
    title: Documentation standard
  - url: https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/
    title: Integration Quality Scale - Rules
  - docs: /docs/glossary/
    title: Glossary
  - docs: /docs/tools/quick-bar/#my-links
    title: My link
---

<!--- The integration documentation template provides a documentation structure as well as some example content per section. The example content is meant for inspiration, it may not apply for your integration or will at least have to be adapted. -->

<!--- Use this template together with the developer documentation, under [Documentation standard](https://developers.home-assistant.io/docs/documenting/standards) and the documentation rules of the [Integration Quality Scale](https://developers.home-assistant.io/docs/core/integration-quality-scale/rules/). -->

The **uHoo** {% term integration %} supports the integration of [uHoo](https://getuhoo.com) devices.

## About uHoo

uHoo delivers advanced, real-time indoor air quality monitoring designed to help you understand, manage, and improve the air in your home. By measuring 9 key environmental factors, uHoo provides accurate and science-backed insights that support healthier living and smarter home automation.

What sets uHoo apart is its suite of proprietary health and safety indices that go beyond raw data to show you exactly how your environment affects your well-being, helping you act before problems even start.
- Virus Index
- Mold Index
- Influenza Index

Connecting uHoo with Home Assistant unlocks even more possibilities: create air-quality-based routines, receive instant alerts, track long-term trends, and maintain a safer, more energy-efficient home environment.

With uHoo, you can confidently make better decisions about your indoor air and stay on top of your game every day.

## Supported Devices

- [uHoo Smart Air Monitor] (https://getuhoo.com/home/smart-air-monitor)
- [uHoo Caeli Air Monitor] (https://getuhoo.com/home/caeli)

## Prerequisites

1. Download the **uHoo** app from the App Store or Google Play.
2. Sign up for a uHoo account.
3. Register at least one device to your account.
4. Upgrade your account to uHoo Premium.
5. Open the [web dashboard] (https://premium.getuhoo.com/) and tap the **Account** icon in the bottom left corner.
6. Navigate to the **API Key** section and enter your account password to create an API key.

{% include integrations/config_flow.md %}

## Supported functionality

### Sensors

- Temperature
- Relative Humidity
- TVOC
- PM2.5
- Carbon Dioxide (CO2)
- Carbon Monoxide (CO)
- Nitrogen Dioxide (NO2)
- Ozone
- Air Pressure

### Indices

- Virus Index
- Mold Index

### Data frequency

The **uHoo** integration {% term polling polls %} data from the device every 5 minutes.

## Troubleshooting

### I can't login the uHoo Premium web dashboard

Login your uHoo app and confirm your account is in uHoo Premium, or reach out to support@getuhoo.com for further assistance.

### I can't see my devices

Make sure that your devices are visible in the uHoo app, and that you have used the same account to create the API key in the web dashboard.

### I can't see my data

Check your API key and make sure it is up to date.

## Removing the integration

This integration follows standard integration removal. We suggest that you update your API key afterwards for security reasons.

{% include integrations/remove_device_service.md %}