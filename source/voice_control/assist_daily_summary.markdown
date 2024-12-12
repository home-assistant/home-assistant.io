---
title: "Daily summary by Assist"
related:
  - docs: /voice_control/voice_remote_local_assistant/
    title: Local assistant pipeline
  - docs: /integrations/local_calendar/
    title: Local calendar
  - docs: /integrations/telegram/#setup-example
    title: Telegram notification
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Telegram notification
  - url: https://www.nabucasa.com
    title: Home Assistant Cloud
---

In this tutorial, we are creating an automation that has Assist send you a daily summary. Assist will tell you about the weather and your calendar events today. It will also send you the summary to your messenger.

<p class='img'>
<img class='no-shadow' src='/images/assist/assist-daily-summary.png' alt='Daily summary notification'>Daily summary notification - using a neutral tone
</p>

We will be using OpenAI, which requires an OpenAI account. For what we do in this tutorial, the free trial option is sufficient. No need to leave your credit card information.

## Prerequisites

This tutorial assumes you have a few things set up already:

- [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [local assistant pipeline](/voice_control/voice_remote_local_assistant/).

This tutorial was done using the **Local calendar**, the **Meteorologisk institutt**,  and the **Telegram** integrations. It has not been tested with other integrations of the notifications or calendar category.

### Adding a calendar

Skip this if you're already using a calendar.

1. Go to the [integrations page](/integrations/) and select the calendar **Calendar** filter.
2. Pick a calendar you like and install it as described in the documentation.
3. If you just want to follow along with this tutorial, install the [local calendar](/integrations/local_calendar/) integration.
   - When prompted for a name, call it `Local calendar`.
   - In the navigation bar on the left, you should now see a new entry for the calendar. Open it.
    
     ![Calendar](/images/assist/calendar_01.png)
   - Add a few events for today and the next few days.

### Adding a weather integration

Skip this if you're already using a weather integration.

1. Go to the [integrations page](/integrations/) and select the **Weather** filter.
2. Pick a calendar you like and install it as described in the documentation.
3. If unsure, select **Meteorologisk institutt** and add the integration.
   - When prompted, enter the latitude and longitude of your home.
   - The coordinates allow the integration to show the weather forecast for your location.

### Connect Home Assistant to a messenger service

Skip this if you're already using a notification integration.

1. Go to the [integrations page](/integrations/) and select the **Notifications** filter.
2. Pick a messenger service you like and install it as described in the documentation.
3. If unsure, select **Telegram** and add the integration.
4. If you don't have it already, install Telegram on your phone.
5. To get started with Telegram on Home Assistant, follow the [set up instruction](/integrations/telegram/#setup-example) step by step.
   - Make sure not to copy and paste the following values from the example. Enter the real values:
     - `api_key`
     - `allowed_chat_ids`
     - `name`
     - `chat_id`
     - `service`
6. You now have a working **Notification** integration. Home Assistant can now send messages to you.

### Creating an OpenAI voice assistant personality

The OpenAI personality gives the messages a special touch.
Using OpenAI requires an OpenAI account. For this tutorial, the free trial option is sufficient. No need to leave your credit card information.

- [Create a Mario personality](/voice_control/assist_create_open_ai_personality/).

### Creating an automation from a blueprint

We are using a blueprint (courtesy of [@allenporter]) that polls calendar events and collects weather information. It then asks ChatGPT to summarize it and ships that response to your phone.

1. To import the blueprint, select the button below:
   
   {% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/conversation_notify_agent_agenda.yaml" %}

2. Select **Preview**, then select **Import blueprint**.
3. Select the blueprint **Conversation agent agenda notification** from the list.
4. Enter the values for each category.
   ![Add prompt for Mario personality](/images/assist/blueprint_daily_summary_notification_01.png)
   - Under **Notify service name**, make sure not to leave the default but to use the one you set up previously. For example `notify.nina`.
   - **Save** your changes.
   - In the dialog, enter a name for your new automation. For example, `Daily summary by Mario`.
5. To view the automation, go to {% my automations title="**Settings** > **Automations & Scenes**" %}.
6. To test the automation, select the three dots on your automation, and select **Run**.
   - You should now receive a notification from Assist in your messenger app.

[@allenporter]: https://github.com/allenporter
