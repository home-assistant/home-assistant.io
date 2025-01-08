## Enabling or disabling entities

Some {% term entities %} are disabled by default. Whether a particular entity of a device is disable or enabled by default, depends on the integration. Diagnostic entities for example are often disabled by default so that they don't clutter Home Assistant. For example, the RSSI entity (representing the RF signal strength) provided by the ZHA integration for each Zigbee device is disabled by default.

There are different ways to enable {% term entities %}. You can enable a single entity in the entity settings, or you can enable multiple entities at once from the list of entities.

### To enable or disable a single entity

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select your integration card.
2. Select the device.
3. To see all the entities, you may need to expand the **entity not shown** section.
4. Select the entity of interest, select the cogwheel {% icon "mdi:cog-outline" %}, then select the toggle for **Enable**.
5. Select **Update**.
6. Confirm the notification stating that it will take about 30 seconds for the entity to become enabled. Select **OK**.

   ![Screencast showing how to enable a single entity](/images/docs/configuration/enable_entity.webp)

### To enable or disable multiple entities

1. In Home Assistant, open the table of interest.
   - To enable or disable entities, go to {% my entities title="**Settings** > **Devices & Services** > **Entities**" %}.
   - To enable or disable automations, go to {% my automations title="**Settings** > **Automations & Scenes**" %}.
2. [Enable multiselect](/docs/organizing/tables) and select all the entities you want to enable or disable.
3. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Enable** or **Disable**.

   ![Screenshot showing how to enable or disable multiple automations](/images/organizing/enable_disable.png)

## Related topics

- [Customizing entities](/docs/configuration/customizing-devices/)
- [Grouping your assets](/docs/organizing/)
- [Working with tables](/docs/organizing/tables)
