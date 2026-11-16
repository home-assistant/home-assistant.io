{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture api %}{{ include.api | default: page.api }}{% endcapture %}
{% capture api_link %}{{ include.api_link | default: page.api_link }}{% endcapture %}


### Scenario 1: You already have credentials

In this case, all you need to do is enable the API:

1. Go to the Google Cloud console [{{ api }}]({{ api_link }}) {% if page.api2 %} and [{{ page.api2 }}]({{ page.api2_link }}) {% endif %}.
2. Confirm that the correct project is selected, then select **Enable**.
3. Continue with the steps described in the [Configuration](#configuration) section.
### Scenario 2: You do not have credentials set up yet

In this case, you need to generate a client secret first:

{% details "To generate client ID and client secret" %}

This section explains how to generate a client ID and client secret in the Google Cloud console.

1. Go to the [Google Cloud console](https://console.cloud.google.com/).
2. Select **Create or select a project**, then **New project**, enter a project name, and select **Create**.
3. When the project opens, make sure it is selected in the console toolbar at the top. If it isn't, select it.
4. Go to [{{ api }}]({{ api_link }}) {% if page.api2 %} and [{{ page.api2 }}]({{ page.api2_link }}) {% endif %}, then select **Enable**.
5. Go to the [Branding page](https://console.cloud.google.com/auth/branding) in the Google Auth Platform Console.
6. If Google Auth Platform is not configured, select **Get started**:
   - Under **App Information**, enter an app name (for example, *Home Assistant*) and select your email address for **User support email**. Then select **Next**.
   - Under **Audience**, select **External**, then select **Next**.
   - Under **Contact Information**, enter your email address, then select **Next**.
   - Review the Google API Services User Data Policy. If you agree, select the check box, then select **Continue** and **Create**.
7. In the left sidebar, select **Branding**:
   - Under **App domain**, enter `https://home-assistant.io` for **Application home page**, **Application privacy policy link**, and **Application terms of service link**.
   - Under **Authorized domains**, add `home-assistant.io`.
8. In the left sidebar, select **Audience**:
   - Under **Publishing status**, select **Publish app**.
     > Otherwise, your credentials will expire every 7 days.
   - If you leave the app in **Testing**, under **Test users**, select **Add users**, add your Google Account email address, then select **Save**.
9. In the left sidebar, select **Clients**:
   - Select **Create client**.
   - For **Application type**, choose **Web application** and give the client a name (for example, `Home Assistant Client`).
   - Under **Authorized redirect URIs**, add `https://my.home-assistant.io/redirect/oauth`, then select **Create**.
     > **Note**: This is not a placeholder. It is the URI that must be used.
10. From the resulting dialog, take a note of the **Client ID** and **Client Secret**. You _cannot_ retrieve it again after closing the dialog.
   - Once you have noted these strings, select **Ok** to close.
   - Congratulations! You are now the keeper of a client secret. Guard it in your treasure box. In most cases, your new credentials will be active within a few minutes. However, Google states that activation may take up to five hours in some circumstances.
{% enddetails %}
