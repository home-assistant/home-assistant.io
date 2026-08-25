---
title: "Next steps"
description: "You have Home Assistant up and running. Here is what to look at next: adding the rest of your household, installing the mobile apps, setting up backups, and exploring voice control."
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

Onboarding got you the basics: a working Home Assistant, your home's name and location, your first integrations. From here, your smart home is yours to shape. This page points you to a few of the next things most people do once they have Home Assistant running, so you can pick whichever one matters most to you and pace yourself.

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

You can back up your Home Assistant configuration and Home Assistant app data. Backups are used to restore the system (or parts of the system) if a rollback is needed. Backups are also used to migrate your Home Assistant to new hardware. It is good practice to create a backup before updating.

To learn how to create a backup of your Home Assistant installation, refer to the documentation on [creating a backup](/common-tasks/general/#backups).

## Editing the configuration.yaml and configuring file access

While you can configure most of Home Assistant from the user interface, for some integrations, you will need to [edit the `configuration.yaml` file](/docs/configuration/). This file contains integrations to be loaded along with their configurations. Throughout the documentation, you will find snippets that you can add to your configuration file to enable specific functionality. For starters, there is no need to edit the `configuration.yaml` file. You will be pointed to the documentation when this is needed.

## Setting up network storage

If you need more space to store data, you can configure a [network storage](/common-tasks/os/#network-storage), for example to store backups or to access media.

## Getting started with voice assistant

If you want to get started with a voice assistant, refer to the documentation on [Assist](/voice_control/).
