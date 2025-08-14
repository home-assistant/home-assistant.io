{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture title %}{{ include.title | default: page.title }}{% endcapture %}

## Adding a {{ title | downcase }} to your dashboard

1. To add a card, follow steps 1-4 on [adding a card from a view](/dashboards/cards/#to-add-a-card-from-a-view).
   - In step 2, on the **By card** tab, select {{ title | downcase }}.

2. Add a picture:

   - **Upload picture** lets you pick an image from the system used to show your Home Assistant UI.
   - **Local path** lets you pick an image stored on Home Assistant. For example: `/homeassistant/images/lights_view_background_image.jpg`.
     - To store an image on Home Assistant, you need to [configure access to files](/common-tasks/os/#configuring-access-to-files), for example via [Samba](/common-tasks/os/#installing-and-using-the-samba-add-on) or the [Studio Code Server](/common-tasks/os/#installing-and-using-the-visual-studio-code-vsc-add-on) add-on.
   - **web URL** let you use an image from the web. For example `https://www.home-assistant.io/images/frontpage/assist_wake_word.png`.

3. Define the parameters that are specific to the {{ title | downcase }}.
   - For a description of the specific settings, refer to the description under YAML configuration.
   - They also apply to the UI.
4. Save your changes.
