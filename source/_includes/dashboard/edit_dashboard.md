{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture title %}{{ include.title | default: page.title }}{% endcapture %}

To add the {{ title | downcase }} to your user interface:
1. In the top right of the screen, select the three dots menu and then select **Edit dashboard**.
   - By editing the dashboard, you are taking over control of this dashboard. This means that it is no longer automatically updated when new dashboard elements become available. To continue, in the dialog, select **Take control**.
2. In the bottom right corner, select the **Add card** button  and select from the card picker.
