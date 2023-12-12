{% capture product_name %}{{ include.name | default: page.product_name }}{% endcapture %}
{% capture device_name_entry %}{{ include.name | default: page.device_name_entry }}{% endcapture %}

### To delete the {{ product_name }} configuration from ESPHome

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %}, and select the ESPHome integration.
   - Under **Devices**, next to the **{{device_name_entry}}** entry, select the three-dots menu.
   - Select **Delete**.
2. Make sure you have [access to the configuration files](/common-tasks/os/#configuring-access-to-files).
   - If you have never done this before, [install the file editor add-on](/common-tasks/os/#installing-and-using-the-file-editor-add-on).
3. Access the config files and open the **esphome** folder.
4. If there is a configuration file for the {{ product_name }}, delete it.
