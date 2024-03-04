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
   - Select **External** and **Create**.
   - Set the **App name** (the name of the application asking for consent) to anything you want, e.g., *Home Assistant*.
6. You then need to select a **Support email**.
   - From the dropdown menu, select your email address.
7. Under **Developer contact information**, enter your email address (the same as above is fine).
8. Scroll to the bottom and select **Save and continue**.
    - You don't have to fill out anything else here. Adding other information to this page (like an app logo) may trigger an additional review process from Google and delay setup by days.
9. You will then be automatically taken to the **Scopes** page.
    - You do not need to add any scopes here. Select **Save and continue** to move to the **Test users** page.
    - You do not need to add anything to the **Test users** page. Select **Save and continue**, which will take you to the **Summary** page.
    - Select **Back to dashboard**.
10. Select **OAuth consent screen** again and under **Publishing status**, select **Publish app**.
    - Otherwise your credentials will expire every 7 days.
11. Make sure **Publishing status** is set to **In production**.
12. In the left sidebar, select **Credentials**, then select **Create credentials** (at the top of the screen), then select **OAuth client ID**.
13. Set the **Application type** to **Web application** and give this credential set a name (like "Home Assistant Credentials").
14. Add `https://my.home-assistant.io/redirect/oauth` to **Authorized redirect URIs** then select **Create**.
    - This is not a placeholder. It is the URI that must be used.
15. You will then be presented with a pop-up saying **OAuth client created**, showing **Your client ID** and **Your client secret**.
    - Make a note of these (for example, copy and paste them into a text editor), as you will need them shortly.
    - Once you have noted these strings, select **OK**.
    - If you need to find these credentials again at any point, then navigate to **APIs & Services** > **Credentials**, and you will see **Home Assistant Credentials** (or whatever you named them in the previous step) under **OAuth 2.0 Client IDs**.
    - To view both the **Client ID** and **Client secret**, select the pencil icon. This will take you to the settings page for these credentials, and the information will be on the right-hand side of the page.
16. Congratulations! You are now the keeper of a client secret. Guard it in your treasure box. In most cases your new credentials will be active within a few moments. However, Google states that activation may take up to five hours in some circumstances.

{% enddetails %}
