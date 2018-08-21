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

<p class='note warning'>
If you're not using Chrome, please be sure to [read the FAQ](/lovelace/#faq) below.
</p>

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
# Include external resources
resources:
  - url: /local/my-custom-card.js
    type: js
  - url: /local/my-webfont.css
    type: css

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
        card:
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

## {% linkable_title Setting Lovelace as the Default UI %}
Once you are ready to start using Lovelace UI as your main user interface, click on info, the "i" icon under 'Developer Tools" in the home assistant side-bar. Next, locate >>Set lovelace as default page on this device<< under the home assistant version information and click it. 

Note that this is a per-device setting and will need to be changed on each device you access the UI from.

## {% linkable_title Custom Cards %}

It is possible to add your own custom cards to show up in the Lovelace UI. For more information, check [the developer docs](https://developers.home-assistant.io/docs/en/lovelace_custom_card.html).

## {% linkable_title Current limitations %}

This is the very very early version aimed at gathering feedback. Discussion and suggestions are welcome in the [ui-schema repository](https://github.com/home-assistant/ui-schema) and in the [chat](/join-chat/) in #lovelace.

## {% linkable_title FAQ %}

### {% linkable_title I am running Firefox but, custom cards like gauge-card look bad or don't load at all. How do I fix this? %}

This is probably because your version of Firefox doesn't have custom components supported or enabled. Please set to `true` in your `about:config` the following settings: `dom.webcomponents.customelements.enabled` and `dom.webcomponents.shadowdom.enabled`

### {% linkable_title Custom cards don't load on my iOS device? %}

Home Assistant comes with two versions of the frontend. A compatability mode for older devices and a modern mode. The custom cards need to target one mode and usually choose the modern mode. Before Home Assistant 0.76, we had an issue in the automation and script editor that prevented modern iOS and Mac devices running Safari from using the modern mode.

If you can, resolve this issue by upgrading to Home Assistant 0.76 or later. If you are on an older version and don't mind that the automation and script editor don't work on iOS devices, you can force the new version via the configuration:

```yaml
frontend:
  javascript_version: latest
```

### {% linkable_title I would like to add an image to my card, but I do not know where to put them. %}

Given examples refer to `/local/example_image.jpg`. That means you should have `www` directory next to your HA `configuration.yaml`. An image kept in `HA_configuration_dir/www/example_image.jpg` will be shown after refreshing Lovelace page.

Restart Home Assistant after creating the `www` directory. Otherwise, HA will not know that you created this directory.
