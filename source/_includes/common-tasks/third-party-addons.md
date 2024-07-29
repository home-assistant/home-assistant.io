##  Installing third-party add-ons

Home Assistant allows anyone to create add-on repositories to share their add-ons easily. To try this locally, you can use our example add-on repository at

```text
https://github.com/home-assistant/hassio-addons-example
```

{% caution %}
Home Assistant cannot guarantee the quality or security of third-party add-ons. Use at your own risk.
{% endcaution %}

<p class='img'>
<img src='/images/hassio/screenshots/dashboard.png' />
From {% my supervisor title="Settings > Add-ons" %} open the add-on store.
</p>

<p class='img'>
<img src='/images/hassio/screenshots/adding_repositories.png' />
Add the URL of the repository and then press "Add". A new card for the repository will appear.
</p>

### Help: Repository is not showing up

If you have added a repository, but it's not showing up, it means that the repository contains invalid configuration. Go to {% my logs title="Settings > System > Logs" %} to find the System log. It should tell you what went wrong. Report this information to the repository author.
