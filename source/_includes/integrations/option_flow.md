{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

## Options

Options for {{ name }} can be set via the user interface, by taking the following steps:

- Browse to your Home Assistant instance.
- Go to **{% my integrations title="Settings > Devices & Services" %}**.
- If multiple instances of {{ name }} are configured, choose the instance you want to configure.
- Select the integration, then select **Configure**.
