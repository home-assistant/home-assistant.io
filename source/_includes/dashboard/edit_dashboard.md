{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture title %}{{ include.title | default: page.title }}{% endcapture %}

To add the {{ title | downcase }} to your user interface:

1. In the top right of the screen, select the pencil icon.

   - If this is your first time editing a dashboard, the **Edit dashboard** dialog appears.
     - By editing the dashboard, you are taking over control of this dashboard.
     - This means that it is no longer automatically updated when new dashboard elements become available.
     - To continue, in the dialog, select the three dots menu, then select **Take control**.
2. In the bottom right corner, select the **Add card** button and select from the card picker.
