---
title: "Cards"
description: "Introduction to the role of cards on the dashboard and how to add a card."
related:
  - docs: /dashboards/actions/
    title: Card tap actions
  - docs: /dashboards/features/
    title: Card features
  - docs: /dashboards/header-footer/
    title: Card header and footer widgets
  - docs: /dashboards/views/
    title: Views
  - docs: /dashboards/
    title: Introduction to dashboards
  - docs: /dashboards/#get-started-with-your-own-dashboard/
    title: Take control of the default dashboard
---

Each dashboard is made up of cards.

<p class='img'>
<img src='/images/getting-started/lovelace.png' alt='Screenshot of the masonry view with different types of cards'>
Screenshot of the masonry view with different types of cards.
</p>

## Card categories

There are several different card types, each with their own configuration options. They can be categorized in terms of their function:

- **Specific to a device type or service**: [alarm](/dashboards/alarm-panel/), [light](/dashboards/light/), [humidifier](/dashboards/humidifier/), [thermostat](/dashboards/thermostat/), [plant status](/dashboards/plant-status/), [media control](/dashboards/media-control/), [weather forecast](/dashboards/weather-forecast/), [to-do list](/dashboards/todo-list/), [map](/dashboards/map/), [logbook](/dashboards/logbook/), [calendar](/dashboards/calendar/)
- **Grouping other cards**: [vertical stack](/dashboards/vertical-stack/), [horizontal stack](/dashboards/horizontal-stack/), [grid](/dashboards/grid/)
- **Logic function**: [conditional](/dashboards/conditional/), [entity filter](/dashboards/entity-filter/)
- **Display generic data**: [sensor](/dashboards/sensor/), [history graph](/dashboards/history-graph/), [statistic](/dashboards/statistic/), [statistics graph](/dashboards/statistics-graph/), [energy](/dashboards/energy/), [gauge](/dashboards/gauge/), [webpage](/dashboards/iframe/)
- **Control devices and entities**: [button](/dashboards/button/), [entity](/dashboards/entity/)
- **Display data and control entities**: [area](/dashboards/area/), [picture elements](/dashboards/picture-elements/), [picture glance](/dashboards/picture-glance/)

## Adding cards to your dashboard

A card can be added to a dashboard directly [from the view](#to-add-a-card-from-a-view) where you want to add it, or from the [device page](#to-add-a-card-from-the-device-page).

### To add a card from a view

1. In the bottom right of the view, select **Add card**.

2. There are two methods to add a card:
   - If you have an idea of what card type you want to use for an entity, add **By card** type:
        - Browse the list of available cards.
        - If you are using the **Sections** view, try the **Tile** card in the **Suggested cards** section.
        ![Add card by Card type dialog](/images/blog/2024-03-dashboard-chapter-1/sections-add-card-by-card.png)

   - If you want to add cards for multiple entities at once, select **By entity**.
        - Select the entities from the list.
        - Then, select **Continue**.
        ![Screenshot add cards by entity](/images/dashboards/dashboard_add-by-entity_02.png)

3. If you want this card to be visible only to specific users or under a certain condition, you can [define those conditions](#showing-or-hiding-a-card-or-badge-conditionally).
4. If you are adding this card to a [sections view](/dashboards/sections/), on the **Layout** tab, you can [resize the card](#resizing-a-card).
5. Customize your card:
   - [define card actions](/dashboards/actions/).
   - [define header and footer](/dashboards/header-footer/)
   - [customize features](/dashboards/features/#customizing-features).
   - Not all cards support these elements. Refer to the documentation of the specific card type.
6. Select **Add to dashboard**.

   ![Screenshot card suggestions](/images/dashboards/dashboard_add-by-entity_04.png)

### To add a card from the device page

This method is useful if you are on the **Device** page and want to create a card directly from there.

1. Go to **{% my integrations title="Settings > Devices & services" %}**.
2. On the integration card of interest, select **Devices**.
   - If there are multiple devices, select the device from the list.
3. Add the card:
   - Find the area of interest, for example **Sensors**, or **Events** and select **Add to Dashboard**.
  ![Add to Dashboard button on the device page](/images/dashboards/add_card_from_device_page.png)
4. In the dialog, select the target dashboard and if you have multiple views, select the view.
   - Select **Next**.
   - If you like the card proposal, select **Add to dashboard**.
   - If you want to change the card, **Pick different card** and choose your card type.
   - **Result**: The card is added to the selected view.
  ![Add to Dashboard button on the device page](/images/dashboards/add_card_from_device_page_02.png)
5. To edit the card configuration, open the view to which you added the card.
   - Select **Edit card**.
6. If you want this card to be visible only to specific users or under a certain condition, you can [define those conditions](#showing-or-hiding-a-card-or-badge-conditionally).
7. If you are adding this card to a [sections view](/dashboards/sections/), on the **Layout** tab, you can [resize the card](#resizing-a-card).

8. Customize your card:
   - [define card actions or header and footer widgets](#card-actions-features-header-and-footer-widgets).
   - [define header and footer](/dashboards/header-footer/)
   - [customize features](/dashboards/features/#customizing-features).
   - Not all cards support these elements. Refer to the documentation of the specific card type.

## Showing or hiding a card or badge conditionally

You can choose to show or hide certain cards or [badges](/dashboards/badges/) based on different conditions. The [available conditions](/dashboards/conditional/#card-conditions) are the same as the ones for the conditional card.

1. On the **Visibility** tab, select **Add condition**./dashboards/conditional/#conditions-options
   - **Troubleshooting**: Don't see a **Visibility** tab?
     - It is not available inside nested cards: vertical stack, horizontal stack, and grid card
2. Select the type of condition, and enter the parameters.
   - The [available conditions](/dashboards/conditional/#conditions-options) are the same as the ones for the conditional card.
   - If you define multiple conditions, the section is only shown when all conditions are met.
   - If you did not define any conditions, the section is always shown, to all users.
3. Select **Save**.

## Resizing a card

In [sections view](/dashboards/sections/), you can resize cards. Follow these steps:

1. On the **Layout** tab, move the sliders to adjust the card size.
  ![Screenshot of the Layout tab in the card dialog](/images/dashboards/card_resize.png)
    - **Troubleshooting**: Don't see a **Layout** tab?
      - It is not available inside nested cards: vertical stack, horizontal stack, and grid card
      - It is not available on the picture elements card.
2. **Precise mode** gives you a finer grid to size your card. The last row was done using precise mode.
  ![Screenshot of a section using precise mode for some cards](/images/dashboards/precise-mode-example.png)
3. Select **Save**.

## Revert resizing of a card

If you previously [resized](#resizing-a-card) a card in the [sections view](/dashboards/sections/), and you don't like the new size, you can revert back to the card's default size. Follow these steps:

1. On the **Layout** tab, select the {% icon "mdi:restore" %} icon.
   ![Screenshot of the Layout tab in the card dialog](/images/dashboards/card_resize.png)

2. Select **Save**.

## Card actions, features, header and footer widgets

Some cards have support for [tap actions](/dashboards/actions/). These actions define what will happen when you tap or hold on an object within a card.

Some cards have support for [features](/dashboards/features/). These widgets add quick controls to the card. Supported features depend on the card and entity capabilities. Multiple features can be added to a single card.

<p class='img'><img src='/images/dashboards/features/screenshot-tile-feature-grid.png' alt="Screenshot of tile cards with features.">
Screenshot of tile cards with features.
</p>

Some cards have support for [header and footer widgets](/dashboards/header-footer/). These widgets fill up the entire available space in a card.

<p class='img'><img src='/images/dashboards/header-footer/screenshot-picture-buttons.png' alt="Screenshot of an entities card with a picture header.">
Screenshot of an entities card with a picture header and buttons footer.
</p>
