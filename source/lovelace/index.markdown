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

<p class='note'>
This is an experimental feature. Configuration might change in future versions.
</p>

Starting with Home Assistant 0.72, we're experimenting with a new way of defining your interface. We're calling it the Lovelace UI.

The Lovelace UI is:

- **Extremely fast**. We create the user interface when the UI configuration changes. When a state changes, we just make the UI represent the current state.
- **Extremely customizable**. We have a new file for just configuration. In the past, we declined UI specific options because they did not fit in the state machine. They will fit in a configuration file for a user interface.
- **Extremely extensible**. It's based on the web standard [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). Don't like the built-in cards? Make your own! Custom cards are treated the same as built-in cards and are configured the same way. [Check the docs.](https://developers.home-assistant.io/docs/en/lovelace_custom_card.html)
- **Making the backend faster**. With Lovelace, the backend will no longer need to maintain entities like groups for the sole purpose of showing them on the frontend.

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6FX9_leiikw" frameborder="0" allowfullscreen></iframe>
</div>

## {% linkable_title How it works %}

The old user interface relied solely on the state machine. This caused trouble as it meant that the state machine was now not only the source for device states, but also for user interface configuration. With Lovelace, we're taking a completely different approach. All user interface configuration will live in a separate file, controlled by the user.

<p class='img'>
<img
  src='/images/lovelace/lovelace-ui-comparison.png'
  alt='Diagram showing how states no longer contain UI configuration.'>
Visual comparison of old configuration versus new configuration
</p>

<!-- source: https://docs.google.com/drawings/d/1O1o7-wRlnsU1lLgfdtn3s46P5StJjSL5to5RU9SV8zs/edit?usp=sharing -->

## {% linkable_title Trying it out %}

Create a new file `<config>/ui-lovelace.yaml` and add the following content. Adjust the entity names to entities that exist in your Home Assistant installation.

```yaml
title: My Awesome Home
# Optional background for all views. Check https://developer.mozilla.org/en-US/docs/Web/CSS/background for more examples.
background: center / cover no-repeat url("/background.png") fixed
# Exclude entities from "Unused entities" view
excluded_entities:
  - weblink.router
views:
    # View tab title.
  - title: Example
    # Optional unique id for direct access /lovelace/${id}
    id: example
    # Optional background (overwrites the global background).
    background: radial-gradient(crimson, skyblue)
    # Each view can have a different theme applied. Theme should be defined in the frontend.
    theme: dark-mode
    # The cards to show on this view.
    cards:
        # The filter card will filter entities for their state
      - type: entity-filter
        entities:
          - device_tracker.paulus
          - device_tracker.anne_there
        state_filter:
          - 'home'
        card_config:
          type: glance
          title: People that are home

        # The picture entity card will represent an entity with a picture
      - type: picture-entity
        image: https://www.home-assistant.io/images/default-social.png
        entity: light.bed_light

    # Specify a tab icon if you want the view tab to be an icon.
  - icon: mdi:home-assistant
    # Title of the view. Will be used as the tooltip for tab icon
    title: Second view
    cards:
        # Entities card will take a list of entities and show their state.
      - type: entities
        # Title of the entities card
        title: Example
        # The entities here will be shown in the same order as specified.
        # Each entry is an entity ID or a map with extra options.
        entities:
          - light.kitchen
          - switch.ac
          - entity: light.living_room
            # Override the name to use
            name: LR Lights

        # The markdown card will render markdown text.
      - type: markdown
        title: Lovelace
        content: >
          Welcome to your **Lovelace UI**.
```

Now restart Home Assistant, navigate to `<YOUR HASS URL>/lovelace`. When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button at the top of the UI.

## {% linkable_title Custom Cards %}

It is possible to add your own custom cards to show up in the Lovelace UI. For more information, check [the developer docs](https://developers.home-assistant.io/docs/en/lovelace_custom_card.html).

## {% linkable_title Current limitations %}

This is the very very early version aimed at gathering feedback. Discussion and suggestions are welcome in the [ui-schema repository](https://github.com/home-assistant/ui-schema) and in the [chat](/join-chat/) in #lovelace.

## {% linkable_title FAQ %}

### I am running Firefox but, custom cards like gauge-card look bad or don't load at all. How do I fix this?

This is probably because your version of Firefox doesn't have custom components supported or enabled. Please set to `true` in your `about:config` the following settings: `dom.webcomponents.customelements.enabled` and `dom.webcomponents.shadowdom.enabled`

### Custom components don't load on my IOS device?

This is because for IOS devices by default javascript served is `es5`. You can allow custom components to load by forcing `javascript_version: latest` in your `configuration.yaml` under `frontend:`. 

> Note: Enabling `latest` on IOS could cause automation and script editor to crash.
