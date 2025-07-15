---
title: Anki
description: See the number of Anki flashcards to review
ha_release: 2025.7
ha_iot_class: Cloud Polling
ha_domain: anki
ha_integration_type: service
ha_platforms:
- sensor
---

The **Anki** {% term integration %} displays the number of [Anki flashcards](https://apps.ankiweb.net) to review for the current day.

**An AnkiWeb account** (or a custom sync server) **is mandatory to use this integration.**

## Prerequisites

1. Download and install Anki.
2. Create an account on AnkiWeb, or on any other Anki sync server.
3. Log into this account in Anki.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "Your email address or username on the Anki sync server."
Password:
    description: "Your password on the Anki sync server".
Host:
    description: "The URL of the Anki sync server. If you created an account on AnkiWeb, leave it to the default value of `https://sync.ankiweb.net`."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Anki** integration provides the following entities.

#### Sensors

- **Anki new cards**: The cards that you haven't seen.
- **Anki learning cards**: The cards that you haven't finished reviewing.
- **Anki review cards**: The cards that you reviewed in the past but that you must review again today.

## Examples

### Turning off the LEDs during the night

The status LEDs on the device can be quite bright.
To tackle this, you can use this blueprint to easily automate the LEDs turning off when the sun goes down.

link to the blueprint on the [blueprints
    exchange](https://community.home-assistant.io/c/blueprints-exchange/53)

## Data updates

The **My integration** integration {% term polling polls %} data from the device every 5 minutes by default.
Newer devices (the ones running MyOS) have the possibility to push data.
In this case, pushing data is enabled when the integration is started. If enabling data push fails, the integration uses data {% term polling %}.

## Known limitations

The integration does not provide the ability to reboot, which can instead be done via the manufacturer's app.

## Troubleshooting

### Invalid credentials

#### Description

The AnkiWeb credentials aren't accepted by the integration.

#### Resolution

Double-check your email address and password. You may have changed them recently.

### (AnkiWeb) You must verify your email address.

#### Description

Once a year, AnkiWeb asks its users to verify their email address. Until they do so, the sync can't be done.

#### Resolution

Check an email from AnkiWeb in your inbox and click on the link.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to your Home Assistant config directory and delete the `anki/<email>` directory.
