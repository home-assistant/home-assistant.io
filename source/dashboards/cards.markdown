---
title: "Cards"
description: "Introduction to the role of cards on the dashboard and how to add a card."
---

Each dashboard is made up of cards.

<p class='img'>
<img src='/images/getting-started/lovelace.png' alt='Screenshot of the masonry view with different types of cards'>
Screenshot of the masonry view with different types of cards.
</p>

## Card categories

There are several different card types, each with their own configuration options. They can be categorized in terms of their function:

- **Specific to a device type or {% term service %}**: alarm, light, humidifier, thermostat, plant status, media control, map, weather forecast, shopping list, map, logbook, and calendar card
- **Grouping other cards**: vertical stack, horizontal stack, and grid card
- **Logic function**: conditional and entity filter card
- **Display generic data**: sensor, history graph, statistic, statistics graph, energy, gauge, and webpage card
- **Control devices and entities**: button and entity card
- **Display data and control entities**: area, picture elements, and picture glance card

## Card actions and features

Some cards have support for [tap actions](/dashboards/actions/). These actions define what will happen when you tap or hold on an object within a card.

Some dashboard cards have support for [features](/dashboards/actions/). These widgets add quick controls to the card. Supported features depend on the card and entity capabilities. Multiple features can be added to a single card.

<p class='img'><img src='/images/dashboards/features/screenshot-tile-feature-grid.png' alt="Screenshot of tile cards with features.">
Screenshot of tile cards with features.
</p>

## Adding cards to your dashboard

1. If this is your first time editing a dashboard, [take control of the default dashboard](/dashboards/#get-started-with-your-own-dashboard).

2. Choose one of the two methods to add cards to a dashboard:

{% details "Using the Add Card button" %}

1. In the bottom right, select **Add card**.

2. There are two methods to add a card: **By card** type and **By entity**:
   - **By card** type:
        - If you have an idea of what card type you want to use for an entity, browse the list of available cards.
        - If you are using the **Sections** view, try the **Tile** card in the **Suggested cards** section.
        ![Add card by Card type dialog](/images/blog/2024-03-dashboard-chapter-1/sections-add-card-by-card.png)

   - **By entity**:
        - If you want to add multiple entities at once, select them from the list.
        - Then, select **Continue**.
        ![Screenshot add cards by entity](/images/dashboards/dashboard_add-by-entity_02.png)

3. Select **Add to dashboard**.
   ![Screenshot card suggestions](/images/dashboards/dashboard_add-by-entity_04.png)

{% enddetails %}

{% details "Using the Add to dashboard button on device page" %}

Another way to add entities to a dashboard is to use the **Device** page.

1. Go to **{% my integrations title="Settings > Devices & services" %}**.
2. On the integration card of interest, select **Devices**. 
   - If there are multiple devices, select the device from the list.

3. In the **Controls** section, select **Add to Dashboard**.
  ![Add to Dashboard button on the device page](/images/blog/2024-03-dashboard-chapter-1/sections-add-from-device-page.jpg)

{% enddetails %}

## Related topics

- For a list of available card types and more detailed documentation, refer to the **Card types** section in the side navigation.
- [Views](/dashboards/views/)
- [Introduction to dashboards](/dashboards/)
- [Take control of the default dashboard](/dashboards/#get-started-with-your-own-dashboard)
- [Card tap actions](/dashboards/actions/)
- [Card features](/dashboards/actions/)