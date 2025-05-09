{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture title %}{{ include.title | default: page.title }}{% endcapture %}

To add the {{ title | downcase }} to your user interface:

1. In the top right of the screen, select the edit {% icon "mdi:edit" %} button.
   - If this is your first time editing a dashboard, the **Edit dashboard** dialog appears.
     - By editing the dashboard, you are taking over control of this dashboard.
     - This means that it is no longer automatically updated when new dashboard elements become available.
     - Once you've taken control, you can't get this specific dashboard back to update automatically. However, you can create a new default dashboard.
     - To continue, in the dialog, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Take control**.
2. [Add a card and customize actions and features](/dashboards/cards/#adding-cards-to-your-dashboard) to your dashboard.
