---
title: "Adding integrations"
description: "Instructions to add an integration."
---
Let's start by adding your first {% term integration %}. In this tutorial, we will use the **Workday** integration. It can be used to automate based on workdays, days off, or holidays. No smart device is needed for this tutorial.

## Prerequisites

This tutorial assumes that you have [installed Home Assistant](/installation/) and have at least completed the [onboarding steps](/getting-started/onboarding/).

## Adding integrations

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - The integrations page shows all the integrations you have already installed. Some of them were installed automatically.
   - If devices were discovered in your network, you will see them in the **Discovered** section.

   ![Screenshot of the integrations page, with discovered devices](/images/getting-started/integrations_page_discovered.png)
  
2. If there are any devices discovered for you, you can add them now.
   - Under **Discovered**, on the integration, select **Add**.
   - Follow the steps in the UI if additional configuration is required.
   - If no devices were discovered, don't worry, we will add an integration in the next step.
3. In the bottom-right corner, select **Add integration**.
4. Type `workd` and select the **Workday** integration.

   ![Screenshot of the add integrations dialog](/images/getting-started/add_workday_integration.png)

5. Give it a name, for example `Workday tomorrow`, and select the country.
   - The country is used to determine the local Holidays.
   - Select **Submit**, then **Finish**.
6. Configure the options.
    - For example, if Monday is not a workday for you, select the "x" to remove it.
    - To check if tomorrow is workday, under **Offset**, enter `1`.
    - Fill in all other options as needed. At a minimum, define the **Holidays** and **Language**.
    - Select **Submit**.

   ![Screenshot of the configuration options](/images/getting-started/workday_configure.png)
7. Select the {% term area %}, for example, office, and select **Finish**.
8. You now see the **Workday** integration in the list.
   - {% icon "mdi:party-popper" %} Congratulations! You've added your first integration. Job done.

   ![Screenshot of the workday integration on the integrations page](/images/getting-started/workday_select_integration.png)

## Looking at integration details

1. Select the integration.

   ![Screenshot of the workday integration on the integrations page](/images/getting-started/workday_select_integration.png)

   - This opens the integration details page.
   - We see that this integration has one {% term service %} and one {% term entity %}.
   - **Documentation** opens the documentation page of this integration.
   - **Known issues** opens the GitHub issue tracker, filtered for issues related to this integration.
     - This allows you to see if other users reported issues related to that integration.
   - **Enable debug logging** lets you [activate the debug logs for that integration](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

   ![Screenshot of the workday integration details page](/images/getting-started/workday_sensor_details.png)

2. Select **Service**, to open the service info page.
   - In the **Logbook**, you can see the timeline of that {% term sensor %}.
   - Under **Sensors**, you can see all the sensors an integration provides. Here, we have only one, but if you have a climate device, for example, you might see temperature, humidity, and battery status here.
   - You can also see that **Workday** is not used (yet) in any {% term automations %}, {% term scripts %}, or {% term scenes %}.

   ![Screenshot of the workday sensor info page](/images/getting-started/workday_service_info.png)
3. Select the back button {% icon "mdi:arrow-back" %}. Then, select **Entity** to open the list of {% term entities %}.
   - Although your Home Assistant already has many entities, you see only 1 entry in the entities table.
   - This is because it is [filtered](/docs/organizing/tables#filtering-items-in-a-table).
   - You see the entity ID, which consist of the domain (a technical term for device type) and the entity name, in the following format: `domain.entity_name`.

   ![Screenshot of the entities list, filtered for workday](/images/getting-started/workday_entities_list.png)

## Modifying the integration

1. To change the name, select the three dots {% icon "mdi:dots-vertical" %} menu, and select **Rename**.

   ![Screenshot of the entities list, filtered for workday](/images/getting-started/workday_three_dots.png)
2. You can also add another Workday {% term sensor %}. For example, if you want to know when your colleagues have a holiday.
   - Select **Add entry**, give it a name and define your options.
   - Select the country of interest.
3. That's it! {% icon "mdi:party-popper" %}
   - {% icon "mdi:checkbox-outline" %} You have gained an overview of the integrations page and know where to find the integration details page, the sensor info page, and the entities table.
   - {% icon "mdi:checkbox-outline" %} You have learned to rename, modify, and delete an integration.
   - If you want to find more integrations, checkout the [integration documentation](/integrations/workday/).
   - We are now ready to use **Workday** in an automation.

{% include getting-started/next_step.html step="Automate Home Assistant" link="/getting-started/automation/" %}