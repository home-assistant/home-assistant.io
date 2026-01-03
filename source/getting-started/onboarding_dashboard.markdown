---
title: "Edit the dashboard"
description: "Instructions on editing the dashboard for the first time"
---

Dashboards are customizable pages to display information about your smart home devices.

## Dashboards, cards, and views

The screenshot shows an **Overview** dashboard with many [cards](/dashboards/cards/) to represent sensor values. For example, the status of some lights, a media player, and some temperature values. It also shows control elements. For example, you can change the ventilation, the color of the lights, or turn on a smart TV and start YouTube.

### Views

The following screenshot shows a fully populated dashboard in [masonry view](/dashboards/masonry/) layout. The icons in the blue menu bar on top each represent a different tab. Each tab contains a [view](/dashboards/views/).

<p class='img'>
<img src='/images/getting-started/lovelace.png' alt='Screenshot of a populated Overview dashboard in masonry view'>
Screenshot of a populated Overview dashboard in masonry view layout.
</p>

The following screenshot shows a fully populated dashboard in [sections view](/dashboards/sections/) layout.

<p class='img'>
    <img src="/images/dashboards/section_view.png" alt="A fully populated dashboard in Sections view layout"/>
    A fully populated dashboard in Sections view layout
</p>

### Multiple dashboards

In the sidebar on the left, you see the names of different dashboards. Home Assistant comes with [multiple dashboards](/dashboards/dashboards/) out of the box.

- Overview
- Energy
- Map
- Logbook
- History
- To-do lists

## First contact with the Overview dashboard

The **Overview** [dashboard](/dashboards/) is the first page you see after the [onboarding process](/getting-started/onboarding).

If you just onboarded, your dashboard will be nearly empty. It is using the [masonry view](/dashboards/masonry/) layout and shows cards for devices that were detected automatically. Your dashboard may look quite different, depending on the devices that you have at home.

<p class='img'>
<img src='/images/getting-started/onboarding_dashboard_raspi_bluetooth.png' alt='Screenshot of the Overview dashboard with Bluetooth devices'>
Screenshot of a new Overview dashboard with Bluetooth devices.
</p>

Let's take a look at the devices that were detected and which cards are used to represent them on the dashboard.

- 1 Sonos speaker: [media control](/dashboards/media-control/) card
- 1 Person (away): [entities](/dashboards/entities/) card
- 1 Weather forecast: [weather forecast](/dashboards/weather-forecast/) card
- 2 temperature sensors: [entities](/dashboards/entities/) card

### Sonos speaker

If you have a smart speaker connected to Wi-Fi, for example, this can be detected.

### Person

After onboarding, the first person shown here is the Home Assistant owner. Next to the name, it claims the person is **away**. You can track whether a person is present or not and create automations based on that. For example, turn down the heating when everyone has left the home. For more information on presence based automations, start with [presence detection](/getting-started/presence-detection/).

### Weather forecast

The weather forecast card is shown automatically if you provided a location during onboarding.

### Temperature sensors

The temperature sensors are shown because the Home Assistant device used here (Raspberry Pi) has a built-in Bluetooth module. In Giulia's home, there were 2 Bluetooth temperature sensors present. If your Home Assistant does not have a Bluetooth module (yet), Bluetooth devices in your home won't be shown automatically.

If your Home Assistant has other controllers, such as a [Zigbee](/integrations/zha/) or a [Z-Wave](/integrations/zwave_js/) controller, and you have Zigbee or Z-Wave devices, these could be detected and shown here. However, these devices usually need to be paired first.

## Creating a new dashboard and edit cards

The default **Overview** dashboard updates automatically when you add new devices. However, once you start editing the default dashboard, it no longer updates automatically. For this reason, we start here by adding a new dashboard. This lets us keep the default **Overview** dashboard.

In the following steps, we will create a new dashboard and edit some card settings.

1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %} and select **Add dashboard**.
   ![Screenshot of the dashboard list](/images/dashboards/dashboard-manage-02.png)
2. In the dialog, choose **Default dashboard**.
3. In the **Add new dashboard** dialog, enter a name and select an icon.
   - Leave the **Admin only** and **Show in sidebar** options as they are.
   - Select **Create**.
   - **Result**: The dashboard is added.
4. Open your new dashboard and in the top right of the screen, select the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-edit.png" alt="Edit icon"/> button.
5. By editing the dashboard, you are taking over control of this dashboard.
     - This means that it is no longer automatically updated when new dashboard elements become available.
     - To continue, in the dialog, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Take control**.
     - Read and accept this before continuing.
     - You can't get this specific dashboard back to update automatically. However. you can create a new default dashboard.
6. Your dashboard might not have much on it yet.
   - If you have smart home devices in your home, some may have been connected automatically.
   - In this example, some Bluetooth temperature sensors and an AV receiver connected automatically.
   - Some cards are there by default, such as the weather, a card for the person who set up the system, and the text-to-speech service.

    ![Dashboard after onboarding a new device](/images/getting-started/onboarding_dashboard_01.png)
7. Next, we want to edit the weather card.
   - Select the weather card.
   - Then, select the cogwheel {% icon "mdi:cog-outline" %}.

   ![Weather details](/images/getting-started/weather_card_details_01.png)

8. Change any of the units, if you like.
   - Do not change the **Entity ID**.
   - Once you are done, select **Update**.
   ![Weather details](/images/getting-started/onboarding_card_settings_01.png)

9. Next, we want to add a new card for this weather {% term service %}.
   - Select the weather card again, select the three dots {% icon "mdi:dots-vertical" %}, then **Device info**.
   - Under **Sensors**, select **Add to dashboard**, then **Pick different card**.
   ![Dashboard - change the card type](/images/getting-started/onboarding_pick_different_card_01.png)

10. From the list, select **Show current weather and forecast**.
11. Select the details to be shown on the card.
    ![Dashboard - change the card details](/images/getting-started/onboarding_card_settings_02.png)
    - **Save** your changes
    - You now see the forecast card on the dashboard.

12. Now let's delete the other weather card.
    - In the top right corner, select the pencil.
    ![Dashboard - edit the dashboard](/images/getting-started/onboarding_edit_dashboard_01.png)
    - On the card, select the three-dot menu and select **Delete**.
    ![Dashboard - delete card](/images/getting-started/onboarding_dashboard_delete_card.png)
13. Finally, we want to move the weather card to the top left corner.
    - On the bottom of the card, select the number or use the minus button to enter `1`.
    - Repeat this on other cards, if you want to move them around.
    - When you are done, in the top right corner, select **Done**.
14. If you want to change any of the other cards, select the **Edit** button on the card.
15. Congratulations! You have completed your first dashboard customization.
16. While your dashboard is still small, this is a good moment to [migrate it into sections view](/dashboards/views/#migrating-a-view-into-a-sections-view).
    - The sections view offers features such as drag and drop, customizing number and width of columns, and more heading options.
    - To learn more, head over to the documentation on [section view](/dashboards/sections/).

## Learning more about dashboards

If you want to learn more about dashboards, views, and cards, take a look at these topics:

1. Take a look at the [introduction to dashboards](/dashboards/) and learn about [multiple dashboards](/dashboards/dashboards).
2. Learn more about [view types](/dashboards/views/)
3. Learn how to [add cards](/dashboards/cards/#adding-cards-to-your-dashboard) to a view.

## Next step: integrations

To continue with this tutorial, select the button below to learn about {% term integrations %}.

{% include getting-started/next_step.html step="Integrations" link="/getting-started/integration/" %}

## Related topics

- [Dashboards](/dashboards/)
- [Views](/dashboards/views/)
- [Add cards to views](/dashboards/cards/#adding-cards-to-your-dashboard)
