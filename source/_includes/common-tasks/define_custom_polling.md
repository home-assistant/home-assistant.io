

If you want to define a specific interval at which your device is being polled for data, you can disable the default polling interval and create your own polling automation.

The reason why we chose this approach is because this gives you way more flexibility on when to poll.

1. This already works with most of the integrations. Since changing the polling interval could be a use case for every integration, it makes sense to pick an approach that works for every integration without having to add support to every individual integration.
2. You can poll whenever you want. With this approach, you can make your polling smarter and more efficient. For example, if you have a rate-limited solar panel provider with a maximum number of requests per day, it might make sense to lower/stop the polling at night so you can poll more during the day when it matters.

To add the automation:

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %}, and select your integration.
2. On the integration entry, select the three dots.
   - Then, select **System options** and toggle the button to disable polling.
   ![Disable polling for updates](/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   - Go to {% my automations title="**Settings** > **Automations & Scenes**" %} and create a new automation.
   - Define any trigger and condition you like.
   - Under action, select **Call service** and use the [`homeassistant.update_entity` service](/integrations/homeassistant/#service-homeassistantupdate_entity).
   ![Update entity](/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.
