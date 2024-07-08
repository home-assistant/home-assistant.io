---
title: "Frontend of Home Assistant"
description: "Frontend of Home Assistant."
---

The Home Assistant [frontend integration](/integrations/frontend/) provides the graphical user interface that allows you to browse and control the state of your house, manage automations, and configure integrations.

<p class='img'>
  <img src='/images/frontend/ui2022.png' />
</p>

Home Assistant comes with a [default dashboard](/dashboards/dashboards/#home-assistant-default-dashboards). But you can also create and customize your own dashboards.

## Creating and styling your own dashboards

To learn how to create and style your own dashboards, refer to the following topics:

- [Dashboard introduction](/dashboards/)
- [Types of dashboards](/dashboards/dashboards/)
- [Views](/dashboards/views/)
- [Dashboard cards](/dashboards/cards/)
- [Badges](/dashboards/badges/)
- [Themes](/integrations/frontend/)
- [Icons](/docs/frontend/icons/)

## Organizing and filtering data

To learn how to organize and filter your data on an existing dashboard, refer to the following topics:

- [Grouping](/docs/organizing/) into [areas](/docs/organizing/areas/), [floors](/docs/organizing/floors/), [labels](/docs/organizing/labels/), and [categories](/docs/organizing/categories/)
- [Filtering](/docs/organizing/tables)

## User- or browser-dependent settings, general settings

### User- or browser-dependent settings

Some of the frontend settings depend on the user. Other settings can be set by client. This allows you for example to have different languages per user, and a different theme depending on the device that is used to display Home Assistant.

To change these settings, in the bottom left, select your username to open your {% my profile title="**User profile**" %}.

- To change general settings such as language, number and time format, go to the **User settings**.
- To change browser dependent settings such as the theme, default dashboard, or whether or not to show the sidebar, change the **Browser settings**.

### Themes

Themes can be set per browser. In the {% my profile title="**User profile**" %}, you can define some theme settings, such as whether you want a light or dark theme. However, more detailed theme settings require YAML configuration. Refer to the documentation of the [frontend integration](/integrations/frontend/).

### General settings

Some of the settings, such as location and currency, were defined during the onboarding process. They can be changed under {% my general title="**Settings** > **System** > **General**" %}. Refer to the documentation on [setup basic information](/docs/configuration/basic/).

## Apps for Android and iOS

If you are looking for information on Home Assistant for Android or iOS, refer to the [documentation for the Companion Apps](https://companion.home-assistant.io/).
