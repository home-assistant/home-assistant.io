{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

## Options

Options for {{ name }} can be set via the user interface, by taking the following steps:

- Browse to your Home Assistant instance.
- In the sidebar click on _**{% my config icon %}**_.
- From the configuration menu select: _**{% my integrations icon %}**_.
- If multiple instances of {{ name }} are configured, choose the instance you want to configure.
- Click on _**"Options"**_.
