---
layout: page
title: "Lovelace UI"
description: "The Lovelace UI is a powerful and configurable interface for Home Assistant."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='note warning'>
This is an experimental feature. Configuration might change in future versions.
</p>

Starting with Home Assistant 0.72, we're experimenting with a new way of defining your interface. We're calling it the Lovelace UI.

The Lovelace UI is:

 - **Extremely fast**. We create the user interface when the UI configuration changes. When a state changes, we just make the UI represent the current state.
 - **Extremely customizable**. We have a new file for just configuration. In the past, we declined UI specific options because they did not fit in the state machine. They will fit in a configuration file for a user interface.
 - **Extremely extensible**. It's based on the web standard [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). Don't like the built-in cards? Make your own! Custom cards are treated the same as built-in cards and are configured the same way. [Check the docs.](lovelace_custom_card.md)
 - **Making the backend faster**. With Lovelace, the backend will no longer need to maintain entities like groups for the sole purpose of showing them on the frontend.

## How it works

The old user interface relied solely on the state machine. This caused trouble as it meant that the state machine was now not only the source for device states, but also for user interface configuration. With Lovelace, we're taking a completely different approach. All user interface configuration will live in a seperate file, controlled by the user.

<p class='img'>
<img
  src='/images/lovelace/lovelace-ui-comparison.png'
  alt='Diagram showing how states no longer contain UI configuration.'>
Visual comparison of old configuration versus new configuration
</p>

<!-- source: https://docs.google.com/drawings/d/1O1o7-wRlnsU1lLgfdtn3s46P5StJjSL5to5RU9SV8zs/edit?usp=sharing -->

## Trying it out

Create a new file `<config>/ui-lovelace.yaml` and add the following content:

```yaml
title: My Awesome Home
views:
    # View tab title.
  - title: Example
    # Optional unique id for direct access /lovelace/${id}
    id: example
    # Each view can have a different theme applied. Theme should be defined in the frontend.
    theme: dark-mode
    # The cards to show on this view.
    cards:
        # The entities card will take a list of entities and show their state.
      - type: entities
        # Title of the entities card
        title: Example
        # The entities here will be shown in the same order as specified.
        entities:
          - input_boolean.switch_ac_kitchen
          - input_boolean.switch_ac_livingroom
          - input_boolean.switch_tv

        # The filter card will filter available entities for certain criteria
        # and render it as type 'entities'.
      - type: entity-filter
        # Filter criteria. They are all optional.
        filter:
          - domain: input_boolean
            state: 'on'
        # This config will be passed to the card rendering the filter results
        card_config:
          title: Input booleans that are on

    # Specify a tab icon if you want the view tab to be an icon.
  - icon: mdi:home-assistant
    # Title of the view. Will be used as the tooltip for tab icon
    title: Second view
    cards:
      - type: entities
        title: Lots of Kitchen AC
        entities:
            # It is totally possible to render duplicates.
          - input_boolean.switch_ac_kitchen
          - input_boolean.switch_ac_kitchen
          - input_boolean.switch_ac_kitchen
          - input_boolean.switch_ac_kitchen
          - input_boolean.switch_ac_kitchen
          - input_boolean.switch_ac_kitchen
```

Add to your `configuration.yaml`:

```yaml
input_boolean:
  switch_ac_kitchen:
    name: AC kitchen
  switch_ac_livingroom:
    name: AC living room
  switch_tv:
    name: TV
```

Now restart Home Assistant, navigate to `<YOUR HASS URL>/lovelace`. When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button at the top of the UI.

## Current limitations

This is the very very early version aimed at gathering feedback. Discussion and suggestions are welcome in the [ui-schema repository](https://github.com/home-assistant/ui-schema).
