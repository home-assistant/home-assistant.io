---
title: "Next steps"
description: "Next steps in configuring your Home Assistant"
related:
  - docs: configuration/basic/
    title: Changing basic settings
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /common-tasks/os/#network-storage
    title: Network storage
  - docs: /common-tasks/general/#backups
    title: Backups
  - docs: /voice_control/
    title: Voice control
  - url: https://companion.home-assistant.io/
    title: Home Assistant on Android and iOS
---

The onboarding process takes you through the initial setup for Home Assistant, such as getting the system up and running, naming your home and selecting your location. This section points you to further documentation helping you with the next steps.

## Adding other persons to Home Assistant

You can add other people to Home Assistant. They can have their own login, use Home Assistant on their devices and create their own dashboards. To add other people, refer to [Adding a person to Home Assistant](/integrations/person/#adding-a-person-to-home-assistant).

## Apps for Android and iOS

You can use Home Assistant on your phone, smartwatch, and even in your car.

- To learn how to install Home Assistant on Android or iOS, refer to the [documentation for the Companion Apps](https://companion.home-assistant.io/).
- Want to use your voice to control Home Assistant?
  - Refer to the documentation on using [Assist on Android](/voice_control/android/).

## Changing the basic settings

To change basic settings such as location, unit system, and language, refer to [Changing basic settings](/docs/configuration/basic/).

## Creating a backup

You can back up your Home Assistant, add-on data, and configuration. Backups are used to restore a system or parts of it if a rollback is needed, or to migrate your Home Assistant to new hardware. It is good practice to create a backup before updating.

To learn how to create a backup of your Home Assistant installation, select the link below that matches your installation type.

- {% term "Home Assistant Operating System" %}: [Creating a backup from OS](/common-tasks/general/#backups)
- {% term "Home Assistant Supervised" %}: [Creating a backup from Supervised](/common-tasks/general/#backups)
- {% term "Home Assistant Core" %} or {% term "Home Assistant Container" %}: [Creating a backup from Core or Container](/integrations/backup/)

## Editing the configuration.yaml and configuring file access

While you can configure most of Home Assistant from the user interface, for some integrations, you will need to [edit the `configuration.yaml` file](/docs/configuration/). This file contains integrations to be loaded along with their configurations. Throughout the documentation, you will find snippets that you can add to your configuration file to enable specific functionality. For starters, there is no need to edit the `configuration.yaml` file. You will be pointed to the documentation when this is needed.

## Setting up network storage

If you need more space to store data, you can configure a [network storage](/common-tasks/os/#network-storage), for example to store backups or to access media.

## Getting started with voice assistant

If you want to get started with a voice assistant, refer to the documentation on [Assist](/voice_control/).

