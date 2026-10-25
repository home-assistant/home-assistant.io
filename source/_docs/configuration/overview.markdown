---
title: "Configuring Home Assistant"
description: "An overview of the settings that you set up once and keep, such as your home information, people and users, remote access, and the YAML configuration."
related:
  - docs: /docs/configuration/basic/
    title: Home information
  - docs: /docs/configuration/
    title: The configuration.yaml file
---

Configuration covers the settings that you set up once and then keep. You set most of them in the UI, under **Settings**.

## Your home and the people in it

- [Home information](/docs/configuration/basic/): Your home's name, location, time zone, and units of measurement.
- [People and user configuration](/docs/configuration/user-configuration/): Your own profile, and the people who use your Home Assistant.

## Entities and helpers

- [Customizing entities](/docs/configuration/customizing-entities/): Rename or hide entities, and change their icons or other properties.
- [Helpers](/docs/configuration/helpers/): Entities that you create yourself, such as a toggle, a timer, or a sensor that combines other sensors.

## Remote access and security

- [Remote access to Home Assistant](/docs/configuration/remote/): Ways to reach your Home Assistant from outside your home network.
- [Securing your Home Assistant](/docs/configuration/securing/): Settings and practices that keep your Home Assistant secure.

## YAML configuration

Some integrations and settings are set up in the `configuration.yaml` file instead of the UI. You only need these pages if you edit this file.

- [The configuration.yaml file](/docs/configuration/): When you need it, where to find it, and how to edit it safely.
- [YAML syntax](/docs/configuration/yaml/): The rules you need to know to edit YAML by hand.
- [Storing secrets in YAML](/docs/configuration/secrets/): Keep passwords and API keys in a separate `secrets.yaml` file.
- [Splitting up the configuration](/docs/configuration/splitting_configuration/): Split `configuration.yaml` into smaller files.
- [Packages](/docs/configuration/packages/): Bundle related YAML configuration from several integrations into one file.
- [Entity component platform options](/docs/configuration/platform_options/): Shared entity options, such as the polling interval.

## How Home Assistant works

- [Entities and domains](/docs/configuration/entities_domains/): How devices, sensors, and services appear as entities, grouped by domain.
- [State and state object](/docs/configuration/state_object/): What the state of an entity contains.
- [Events](/docs/configuration/events/): How parts of Home Assistant tell each other that something has happened.
- [Long-term statistics](/docs/configuration/long-term-statistics/): How Home Assistant keeps trends for sensors over months and years.

## Troubleshooting

- [Troubleshooting configuration](/docs/configuration/troubleshooting/): Find and fix problems in your configuration, turn on debug logging, and download diagnostics.

## Storage on Home Assistant OS

On {% term "Home Assistant Operating System" %}, you can also connect network storage, and move your data to an external data disk. For the steps, refer to [Network storage](/common-tasks/os/#network-storage) and [Using external data disk](/common-tasks/os/#using-external-data-disk).
