{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

## Options

To define options for {{ name }}, follow these steps:

1. In Home Assistant, go to **{% my integrations title="Settings > Devices & services" %}**.
2. If multiple instances of {{ name }} are configured, choose the instance you want to configure.
3. On the device, select the cogwheel {% icon "mdi:cog-outline" %}.
   - If the device does not have a cogwheel, it does not support options.

   ![Store tab in the Z-Wave JS UI web interface](/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.
