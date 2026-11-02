---
title: "Introduction to dashboards"
description: "Dashboards are how you see and control your smart home in Home Assistant. Build them visually, no coding required."
---

Dashboards are how you see and control your smart home in Home Assistant. They are made up of cards and views, and you can build them visually with drag and drop, so no coding is required.

## Types of dashboards

In the left sidebar, you see the names of different dashboards. Home Assistant comes with [different dashboard types](/dashboards/dashboards/) out of the box, such as:

- Overview
- Energy
- Map
- Activity
- History
- To-do lists

## Elements of a dashboard

The main elements of a dashboard are cards and views.

A card is an element of the User Interface that shows information about a smart {% term device %}, a {% term service %}, or an {% term entity %} and even allows you to control them, depending on the [category of the card](/dashboards/cards/#card-categories). For more information on cards and how to edit them, refer to the [Cards](/dashboards/cards/) page.

A view is a tab inside a dashboard that displays cards in a specific layout. The layout is determined by the view type. A dashboard can have one or many views and, for each view, you can choose the cards that you want to display, and in which view type. For more information on views and how to edit them, refer to the [Views](/dashboards/views/) page.

The cards in the following screenshot are displayed in a [sections view](/dashboards/sections/) of a dashboard. In the upper menu bar, each icon represents a different tab, that is, a view.

<p class='img'>
    <img src="/images/dashboards/sections_view.png" alt="A fully populated dashboard in sections view layout"/>
    A fully populated dashboard in the sections view layout
</p>

## First contact with the Overview dashboard

The **Overview** [dashboard](/dashboards/) is the first page you see after the [onboarding process](/getting-started/onboarding).

If you just onboarded, your dashboard will be nearly empty. It has the [sections view](/dashboards/sections/) layout and shows cards for devices that were detected automatically.

The following cards appear automatically on your **Overview** dashboard:

- An [entities](/dashboards/entities/) card of the person defined as the Home Assistant owner. It presents the name and the {% term state %} of the person.
  - You can track whether a person is present or not and create automations based on that. For example, turn down the heating when everyone has left home. For more information on automations based on presence, start with [presence detection](/getting-started/presence-detection/).
- A [weather forecast](/dashboards/weather-forecast/) card of the weather for your location, if you provided it during onboarding.

Your dashboard may look quite different, depending on the smart devices that you have at home. For example, if you have the following devices, they will be detected:

- A smart speaker connected to Wi-Fi, such as a Sonos speaker.
  - Result: a [media control](/dashboards/media-control/) card will be displayed on your **Overview** dashboard.
- Bluetooth temperature sensors and a Bluetooth module in Home Assistant.
  - Result: [entities](/dashboards/entities/) cards will be shown on your **Overview** dashboard.
  - Note that, if your Home Assistant does not have a Bluetooth module yet, the Bluetooth devices that you have in your home won't be shown automatically.
- Light sensors.
  - Result: [entities](/dashboards/entities/) cards will be shown on your **Overview** dashboard with the status of some lights.

If your Home Assistant has other controllers, such as a [Zigbee](/integrations/zha/) or a [Z-Wave](/integrations/zwave_js/) controller, and you have Zigbee or Z-Wave devices, these could be detected and shown on the **Overview** dashboard. There you will have cards representing control elements that allow you, for example, to:

- Change the ventilation.
- Change the color of the lights.
- Turn on a smart TV and start YouTube.

However, these devices usually need to be paired first.

## Creating a new dashboard

The default **Overview** dashboard updates automatically when you add new devices. However, once you start editing the default dashboard, it no longer updates automatically. For this reason, we start here by adding a new dashboard. This lets us keep the default **Overview** dashboard.

Follow the steps in [Creating a new dashboard](/dashboards/dashboards/#creating-a-new-dashboard).

## Editing cards in a new dashboard

This section describes how to edit cards in a recently created dashboard, namely how to:

- Change the details of a weather forecast card.
- Add a new weather forecast card.
- Change the position of cards.

1. Open your new dashboard. It might not have much on it yet.
   - If you have smart home devices in your home, some may have been connected automatically.
   - Some cards are there by default, such as the weather forecast card, and a card for the person who set up the system.

2. To edit the weather forecast card, for example, select it and then select the cogwheel {% icon "mdi:cog-outline" %}.
3. Change any of the units or other details, such as name and icon, if you like.
   - Do not change the **Entity ID**.
   - Once you are done, select **Update**.

4. For the next activities, you need to edit your dashboard. In the top right of the screen, select the {% icon "mdi:pencil" %} button.
5. In the **Edit dashboard** dialog, go to the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Take control**.
   - Note that, by editing the dashboard, you are taking control over it. The dashboard will no longer update automatically when new {% term entities %} or dashboard components are available. You can't revert this. However, you can create a new default dashboard.
   - Read the text in the dialog and if you agree, select **Take control**.

6. Now you can add a new card for this weather {% term service %}.
   - Select the weather forecast card again, go to the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Service info**.
   - Under **Sensors**, select **Add to dashboard**.
   - In the **Choose a view** dialog, select your dashboard from the dropdown list, and then select **Next**.
   - In the suggestion dialog, select **Pick different card**.

7. On the **By card** tab of the dialog, select the **Weather forecast** card.
8. In the **Weather forecast card configuration** dialog:
   - Select the details to be shown on the card, and then select **Save**.
   - Go back to the edit window, and select **Done**.
   - Result: You see the new weather forecast card on the dashboard.

9. If you want to delete the other weather forecast card from the dashboard:
   - In the top right corner, select the {% icon "mdi:pencil" %} button to go back to the edit mode.
   - Do not select the card. Go to the three dots {% icon "mdi:dots-vertical" %} menu in the lower right corner of the card, and then select **Delete**.

10. Finally, to move the weather forecast card to the top left corner:
    - On the bottom of the card, select the number or use the minus button to enter `1`.
    - Change the number on the other cards, if you want to move them around.
    - When you are done, in the top right corner, select **Done**.

11. If you want to change the configuration of another card, select the {% icon "mdi:pencil" %} button again, and then select **Edit** on the card.

Congratulations! You have completed your first dashboard customization.

## Learning more about dashboards

If you want to learn more about dashboards, views, and cards, take a look at these topics:

1. Take a look at the [introduction to dashboards](/dashboards/) and learn about [dashboard types](/dashboards/dashboards).
2. Learn more about [view types](/dashboards/views/)
3. Learn how to [add cards](/dashboards/cards/#adding-cards-to-your-dashboard) to a view.

## Next step: integrations

To continue with this tutorial, select the button below to learn about {% term integrations %}.

{% include getting-started/next_step.html step="Integrations" link="/getting-started/integration/" %}

## Related topics

- [Dashboards](/dashboards/)
- [Views](/dashboards/views/)
- [Add cards to views](/dashboards/cards/#adding-cards-to-your-dashboard)
