{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

## Options

To define options for {{ name }}, follow these steps:

1. In Home Assistant, go to **{% my integrations title="Settings > Devices & services" %}**.
2. If multiple instances of {{ name }} are configured, choose the instance you want to configure.
3. On the card, select the cogwheel {% icon "mdi:cog-outline" %}.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.
