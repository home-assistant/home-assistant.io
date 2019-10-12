---
title: "Home Panel"
description: "Instructions on how to integrate Home Panel with Home Assistant."
logo: homepanel.png
ha_category:
  - Other
  - Sensor
ha_release: 0.101
ha_iot_class: Local Polling
---

[Home Panel](https://timmo.dev/home-panel/) is a customizable, themeable
interface which acts as an additional frontend for Home Assistant. The
`home_panel` integration allows you to send commands to it's UI as well as
monitor the changes in config.

## Configuration via the frontend

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Home Panel**.
Follow the configuration flow, after finishing, the Home Panel
integration will be available.

If you are using the add-on, make sure you have exposed the port in the
add-on's config, as this is required for Home Assistant to see the app.

## Sensors

This integration provides sensors for the following information from Home Panel:

- Number of pages.
- Number of groups.
- Number of cards.

## Service

The `home_panel.send_command` service allows you to send commands to the
logged in users' UI to, for example, expand a camera feed.

| Service data attribute | Optional | Description                                   |
| ---------------------- | -------- | --------------------------------------------- |
| `page`                 | No       | The page id/name.                             |
| `card`                 | No       | The card id/name.                             |
| `command`              | No       | The command to send. (show, expand, unexpand) |
