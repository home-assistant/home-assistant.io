{% capture name %}{{ include.name | default: page.title }}{% endcapture %}

## Configuration

Adding {{ name }} to your Home Assistant instance can be done via the user
interface, by taking the following steps:

- Browse to your Home Assistant instance.
- In the sidebar click on <i class="icon-cog"/> Configuration.
- From the configuration menu select: <i class="icon-puzzle-piece" /> Integrations.
- In the bottom right, click on the <i class="icon-plus-sign" /> Add Integration button.
- Follow the instruction on screen to complete the set up.

After completing, the {{ name }} integration will be immediately available for use.
