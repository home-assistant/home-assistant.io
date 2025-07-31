---
title: Anki
description: See the number of Anki flashcards to review
ha_release: 2025.9
ha_iot_class: Cloud Polling
ha_domain: anki
ha_integration_type: service
ha_platforms:
  - sensor
---

The **Anki** {% term integration %} displays the number of [Anki flashcards](https://apps.ankiweb.net) to review for the current day.

{% important %}
An AnkiWeb account (or a custom sync server) is mandatory to use this integration.
{% endimportant %}

## Prerequisites

1. Download and install Anki.
2. Create an account on AnkiWeb, or on any other Anki sync server.
3. Log into this account in Anki.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "Your email address or username on the Anki sync server."
Password:
    description: "Your password on the Anki sync server."
Host:
    description: "The URL of the Anki sync server. If you created an account on AnkiWeb, leave it to the default value of `https://sync.ankiweb.net`."
{% endconfiguration_basic %}

## Supported functionality

The **Anki** integration provides the following entities.

### Sensors

- **Anki new cards**: The cards that you haven't seen.
- **Anki learning cards**: The cards that you haven't finished reviewing.
- **Anki review cards**: The cards that you reviewed in the past but that you must review again today.

## Troubleshooting

### Symptom: Invalid credentials

#### Description

The AnkiWeb credentials aren't accepted by the integration.

#### Resolution

Double-check your email address and password. You may have changed them recently.

### Symptom: (AnkiWeb) You must verify your email address.

#### Description

Once a year, AnkiWeb asks you to verify your email address. The sync cannot be completed until the address is verified.

#### Resolution

Check your inbox for an email from AnkiWeb in your inbox and select the link.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to your Home Assistant config directory and delete the `anki/<email>` directory.
