## Installing a third-party add-on repository

Home Assistant allows anyone to create an add-on repository to share their own add-ons with the community.

{% warning %}
Home Assistant cannot guarantee the quality or security of third-party add-ons. Use at your own risk.
{% endwarning %}

To add an add-on repository, follow these steps:

1. Copy the URL of the repository.
   - If you do not have your own repository, but want to try how this works, you can use our example add-on repository:

        ```text
        https://github.com/home-assistant/hassio-addons-example
        ```
2. Go to {% my supervisor title="**Settings** > **Add-ons**" %} and select **Add-on store**.
   ![Screenshot of the add-on store](/images/getting-started/add-ons.png)
3. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu, and select **Repositories**.
4. Add the URL of the repository and select **Add**.
   ![Screenshot of the add-on store](/images/hassio/screenshots/adding_repositories.png)
   - **Result**: A new card for the repository will appear in the **Home Assistant Community Add-ons** section.
   ![Screenshot of the add-on store](/images/hassio/screenshots/add-ons-community_example.png)

### Troubleshooting: Repository is not showing up

If you have added an add-on repository, but it's not showing up, it means that the add-on repository contains invalid configuration.

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %} to find the System log.
   - It should tell you what went wrong.
2. Report this information to the add-on repository author.
