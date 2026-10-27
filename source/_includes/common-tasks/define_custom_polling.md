If you want to define a specific interval at which your device is being polled for data, you can disable the default polling interval and create your own polling automation.

To turn off the default polling and create your own polling automation, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, and select your integration.
2. On the integration entry, select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **System options**.
3. Turn off **Enable polling for changes**, and then select **Update**.
   - If Home Assistant asks you to restart, restart it.
4. Go to {% my automations title="**Settings** > **Automations & scenes**" %}, and select **Create automation** > **Create new automation**.
5. Add the triggers and conditions for when you want to poll for data.
6. Select **Add action**, select **By type**, select **Perform action**, and then select **+** next to **Perform action**.
7. Under **Action**, search for and select the [**Update entity**](/actions/homeassistant.update_entity/) action.
8. Under **Entities to update**, select the entities you want to poll.
   - You can only select entities. Areas, devices, and labels aren't supported.
9. Select **Save**.

Many integrations update their data at most once every 10 seconds. If you poll more often, Home Assistant waits until the 10 seconds have passed before it updates the data again.
