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
  - docs: /common-tasks/os/#backups
    title: Backups
  - docs: /voice_control/
    title: Voice control
  - url: https://companion.home-assistant.io/
    title: Home Assistant on Android and iOS
---

The onboarding process takes you through the initial setup for Home Assistant, such as getting the system up and running, naming your home and selecting your location. This section points you to further documentation helping you with the next steps.

## Changing the basic settings

To change basic settings such as location, unit system and language, refer to [Changing basic settings](/docs/configuration/basic/).

## Creating a backup

You can back up your Home Assistant, add-on data, and configuration. Backups are used to restore a system or parts of it if a rollback is needed, or to migrate your Home Assistant to new hardware. It is good practice to create a backup before updating.

To learn how to create a backup of your Home Assistant installation, refer to the following topics:

- {% term "Home Assistant Operating System" %}: [Creating a backup from OS](/common-tasks/os/#backups)
- {% term "Home Assistant Supervised" %}: [Creating a backup from Supervised](/common-tasks/supervised/#backups)

## Editing the configuration.yaml and configuring file access

While you can configure most of Home Assistant from the user interface, for some integrations, you will need to [edit the `configuration.yaml` file](/docs/configuration/). This file contains integrations to be loaded along with their configurations. Throughout the documentation, you will find snippets that you can add to your configuration file to enable specific functionality. For starters, there is no need to edit the `configuration.yaml` file. You will be pointed to the documentation when this is needed.

## Setting up network storage

If you need more space to store data, you can configure a [network storage](/common-tasks/os/#network-storage), for example to store backups or to access media.

## Getting started with voice assistant

If you want to get started with a voice assistant, refer to the documentation on [Assist](/voice_control/).

## Apps for Android and iOS

If you are looking for information on Home Assistant for Android or iOS, refer to the [documentation for the Companion Apps](https://companion.home-assistant.io/).
