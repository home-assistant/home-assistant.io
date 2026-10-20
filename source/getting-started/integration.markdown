---
title: "Adding integrations"
description: "Add your first integration to Home Assistant. Choose from over a thousand brands, with most setups handled by the user interface."
---
Let's start by adding your first {% term integration %}. Home Assistant works with devices and services from over a thousand brands, and most of them can be added through the user interface in just a few steps.

In this tutorial, you use the **Workday** integration. It can be used to automate based on workdays, days off, or holidays. No smart device is needed for this tutorial.

## Prerequisites

This tutorial assumes that you have [installed Home Assistant](/installation/) and have at least completed the [onboarding steps](/getting-started/onboarding/).

## Adding integrations

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - The integrations page shows all the integrations you have already installed. Some of them were installed automatically.
   - If devices were discovered in your network, you see them in the **Discovered** section.
2. If there are any devices discovered for you, you can add them now.
   - Under **Discovered**, on the integration, select **Add**.
   - Follow the steps in the UI if additional configuration is required.
   - If no devices were discovered, don't worry. You add an integration in the next step.
3. In the bottom-right corner, select **Add integration**.
4. Type `workd` and select the **Workday** integration.
5. Select your country, and then select **Submit**.
   - The country is used to determine the local holidays.
6. Configure the options, and then select **Submit**.
   - For example, if Monday is not a workday for you, under **Days to include**, select the "x" next to Monday.
   - To check if tomorrow is a workday, under **Offset**, enter `1`.
   - To include regional holidays, under **Subdivision of country**, select your region.
7. In the **Name and assign** dialog, select the {% term area %}, for example, office, and select **Finish**.
8. You now see the **Workday** integration in the list.
   - {% icon "mdi:party-popper" %} Congratulations! You've added your first integration. Job done.

## Looking at integration details

1. Select the **Workday** integration.
   - Result: The integration page opens. It lists your Workday entry, named for example **Workday Sensor US**, after your country.
2. Select **1 service**.
   - Result: The service page opens. It shows the following:
     - The two {% term entities %} that this integration provides: a binary sensor that is on when the day is a workday, and a calendar.
     - A list of related automations, scripts, and scenes.
     - The activity of updates and changes related to the service.

## Modifying the integration

1. To rename the entry, go back to the integration page. On the entry, select **Menu** {% icon "mdi:dots-vertical" %} > **Rename**.
2. You can also add another Workday {% term sensor %}. For example, if you want to know when your colleagues have a holiday.
   - On the integration page, select **Add service**.
   - Select the country of interest, and define your options.
3. That's it! {% icon "mdi:party-popper" %}
   - {% icon "mdi:checkbox-outline" %} You have gained an overview of the integrations page, and know where to find the integration page and the service page with its entities.
   - {% icon "mdi:checkbox-outline" %} You have learned to rename an integration entry and add another one.
   - To find more integrations, check out the [integrations](/integrations/) page.
   - You are now ready to use **Workday** in an automation.

{% include getting-started/next_step.html step="Automate Home Assistant" link="/getting-started/automation/" %}
