

If you want to define a specific interval at which your device is being polled for data, you can disable the default polling interval and create your own polling automation.

To add the automation:

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %}, and select your integration.
2. On the integration entry, select the {% icon "mdi:dots-vertical" %}.
   - Then, select **System options** and toggle the button to disable polling.
   ![Disable polling for updates](/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   - Go to {% my automations title="**Settings** > **Automations & Scenes**" %} and create a new automation.
   - Define any trigger and condition you like.
   - Under action, select **Call service** and use the [`homeassistant.update_entity` service](/integrations/homeassistant/#service-homeassistantupdate_entity).
   ![Update entity](/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.
