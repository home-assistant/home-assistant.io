---
title: "Edit the dashboard"
description: "Instructions on editing the dashboard for the first time"
---

## First contact with the Overview dashboard

The **Overview** [dashboard](/dashboards/) is the first page you see after the [onboarding process](/getting-started/onboarding). Dashboards are customizable pages to display information in Home Assistant.

By default, there are two dashboards: **Overview** and **Energy**. The image below shows a customized example of the **Overview** dashboard. If you just onboarded, your dashboard will be nearly empty.

![Dashboard](/images/getting-started/lovelace.png)

The procedure below is optional. The idea is to learn some basics on changing the dashboard.

### To change a card on the Overview dashboard

1. To view your dashboard, go to **Overview**.
   - Your dashboard might not have much on it yet.
   - If you have smart home devices in your home, some may have been connected automatically.
   - In this example, some Bluetooth temperature sensors and an AV receiver connected automatically.
   - Some cards are there by default, such as the weather, a card for the person who set up the system, and the text-to-speech service.

    ![Dashboard after onboarding a new device](/images/getting-started/onboarding_dashboard_01.png)
2. To view the weather forecast for the next few days, select the weather card.

   ![Weather details](/images/getting-started/weather_card_details_01.png)

3. To change the units used on the card, select the cogwheel.
    - Change the units if you like.
    - Do not change any of the other settings for now.
    - Once you are done, select **Update**.
   ![Weather details](/images/getting-started/onboarding_card_settings_01.png)

4. To change the type of dashboard card, in the top right corner, select the pencil icon, then, in the **Edit dashboard** dialog, select the three dots and select **Take control**.
   ![Take control of the dashboard](/images/getting-started/dashboard-take-control.png)
   - Read and accept this before continuing.
   - On the dashboard, select the weather card, select the three dots, then **Device info**.
   - Under **Sensors**, select **Add to dashboard**, then **Pick different card**.
   ![Dashboard - change the card type](/images/getting-started/onboarding_pick_different_card_01.png)

5. From the list, select **Weather forecast**.
6. Select the details to be shown on the card.
   ![Dashboard - change the card details](/images/getting-started/onboarding_card_settings_02.png)
   - **Save** your changes
   - You now see the forecast card on the dashboard.

7. Now let's delete the other weather card.
   - In the top right corner, select the three-dot menu, then select **Edit dashboard**.
   ![Dashboard - edit the dashboard](/images/getting-started/onboarding_edit_dashboard_01.png)
   - On the card, select the three-dot menu and select **Delete**.
   ![Dashboard - delete card](/images/getting-started/onboarding_dashboard_delete_card.png)
8. Finally, we want to move the weather card to the top left corner.
   - On the bottom of the card, select the number or use the minus button to enter `1`.
   - Repeat this on other cards, if you want to move them around.
   - When you are done, in the top right corner, select **Done**.
9. Congratulations! You have completed your first dashboard customization.

To continue with this tutorial, select the button below to learn about {% term integrations %}.

{% include getting-started/next_step.html step="Integrations" link="/getting-started/integration/" %}

## Related topics

- [Dashboards](/dashboards/)
- [Views](/dashboards/views/)