{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture google_dev_console_link %}{{ include.google_dev_console_link | default: page.google_dev_console_link }}{% endcapture %}
{% capture api %}{{ include.api | default: page.api }}{% endcapture %}
{% capture api_link %}{{ include.api_link | default: page.api_link }}{% endcapture %}
{% capture title %}{{ include.title | default: page.title }}{% endcapture %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to connect to {{ title }}.

{% details "OAuth and device authorization steps" %}

1. Continue through the steps of selecting the account you want to authorize.

2. **NOTE**: You may get a message telling you that the app has not been verified and you will need to acknowledge that in order to proceed.

3. You can now see the details of what you are authorizing Home Assistant to access with two options at the bottom. Select **Continue**.

4. The page will now display **Link account to Home Assistant?**, note **Your instance URL**. If this is not correct, refer to [My Home Assistant](/integrations/my). If everything looks good, select **Link Account**.

5. You may close the window, and return back to Home Assistant where you should see a **Success!** message from Home Assistant.

{% enddetails %}
