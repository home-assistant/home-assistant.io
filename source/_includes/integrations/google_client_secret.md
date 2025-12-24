{% capture name %}{{ include.name | default: page.title }}{% endcapture %}
{% capture domain %}{{ include.domain | default: page.ha_domain }}{% endcapture %}
{% capture google_dev_console_link %}{{ include.google_dev_console_link | default: page.google_dev_console_link }}{% endcapture %}
{% capture api %}{{ include.api | default: page.api }}{% endcapture %}
{% capture api_link %}{{ include.api_link | default: page.api_link }}{% endcapture %}


### Scenario 1: You already have credentials

In this case, all you need to do is enable the API:

1. Go the Google Developers Console [{{ api }}]({{ api_link }}) {% if page.api2 %} and [{{ page.api2 }}]({{ page.api2_link }}) {% endif %}.
2. Confirm the project and **Enable** the API.
3. Continue with the steps described in the [Configuration](#configuration) section.
### Scenario 2: You do not have credentials set up yet

In this case, you need to generate a client secret first:

{% details "To generate client ID and client secret" %}

This section explains how to generate a client ID and client secret on
[Google Developers Console]({{ google_dev_console_link }}).

1. First, go to the Google Developers Console to enable [{{ api }}]({{ api_link }}) {% if page.api2 %} and [{{ page.api2 }}]({{ page.api2_link }}) {% endif %}.
2. Select **Create project**, enter a project name and select **Create**.
3. **Enable** the {{ api }}.
4. Navigate to **APIs & Services** (left sidebar) > [Credentials](https://console.cloud.google.com/apis/credentials).
5. In the left sidebar, select **OAuth consent screen**.
6. It will take you to the Overview page and ask for **Project Configuration**:
   - Complete the App Information:
      - Set the **App name** (the name of the application asking for consent) to anything you want, for example, *Home Assistant*.
      - For a **Support email**, choose your email address from the dropdown menu.
      - Click **Next**.
   - For Audience, select **External** then click  **Next**.
   - Under Contact Information, enter your email address (the same as above is fine). Click **Next**.
   - Read the policy and check the box if you agree. Click **Continue**.
   - Click **Create**.
7. In the left sidebar, select **Audience**:
   - Under **Publishing status > Testing**, select **Publish app**.
     > Otherwise, your credentials will expire every 7 days.
8. In the left sidebar, select **Clients**:
   - Click **+ Create Client**.
   - For Application type, choose **Web Application** and give this client ID a name (like "Home Assistant Client").
   - Add `https://my.home-assistant.io/redirect/oauth` to **Authorized redirect URIs** then select **Create**.
     > **Note**: This is not a placeholder. It is the URI that must be used.
9. From the resulting dialog take a note of **Client ID** and **Client Secret** you **can not retrieve it again** after closing the dialog.
   - Once you have noted these strings, select **Close**.
   - Congratulations! You are now the keeper of a client secret. Guard it in your treasure box. In most cases, your new credentials will be active within a few minutes. However, Google states that activation may take up to five hours in some circumstances.
{% enddetails %}
