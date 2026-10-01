---
title: Marketplace
description: Find and install community-created integrations, dashboard cards, themes, and templates.
ha_category:
  - Other
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: marketplace
ha_config_flow: true
ha_platforms:
  - diagnostics
  - switch
  - update
ha_integration_type: system
related:
  - docs: /integrations/update/
    title: Update entities
  - docs: /integrations/repairs/
    title: Repairs
  - docs: /integrations/frontend/#defining-themes
    title: Themes
---

The **Marketplace** {% term integration %} lets you find and install community-created integrations, dashboard cards, themes, and templates. Integrations can add support for devices and services that Home Assistant does not include. The catalog contains thousands of projects, and the Marketplace checks for updates to the projects you install.

The Marketplace comes with Home Assistant and is ready to use. There is nothing to install or configure before you can use it.

{% warning %}
Everything in the Marketplace is made and published by the community, not by the Home Assistant project. Marketplace content runs in Home Assistant. It can access your home, your data, and the system that runs Home Assistant.

- Nothing published in the Marketplace is tested, audited, or supported by the Home Assistant project.
- Marketplace content can compromise the security of Home Assistant, your home, and your network.
- Marketplace content can violate your privacy, for example by sending your data to others.
- Marketplace content can degrade the stability and performance of Home Assistant.

You use everything you install from the Marketplace at your own risk. Before you install something, review its author, recent project activity, and community feedback.
{% endwarning %}

## Opening the Marketplace

To open the Marketplace, go to **Settings** > **Marketplace**. The Marketplace is available to administrators only.

The first time you open it, the Marketplace shows the warning above.
Until you accept the warning, Home Assistant cannot install or update Marketplace content, including from an automation.

## What you can install

Marketplace projects are published in GitHub repositories. A repository is a project's source-code location on GitHub. The Marketplace includes the following content types.

### Integrations

Integrations add support for devices and services, like the integrations included with Home Assistant. The Marketplace installs them in the `custom_components` folder in your configuration folder, which stores your Home Assistant configuration. You can add most integrations under {% my integrations title="**Settings** > **Devices & services**" %}. Some integrations use YAML configuration, as described in their documentation. Some require a Home Assistant restart before you can add them. The Marketplace tells you when this is needed.

### Dashboards

Dashboard content adds a card, card feature, or other item to your dashboards. The Marketplace installs it in the `www/community` folder in your configuration folder and adds it as a dashboard resource. You can then add it to a dashboard.

{% note %}
If you manage dashboard resources in YAML, the Marketplace cannot add dashboard resources automatically. The install dialog shows the resource that you need to add to your YAML configuration.
{% endnote %}

### Themes

Themes change how Home Assistant looks. The Marketplace installs them in the `themes` folder in your configuration folder. You can then select a theme in your user profile.

{% note %}
Home Assistant normally loads Marketplace themes automatically. This requires the following line in your `configuration.yaml` file. Home Assistant adds it when it creates the file.

If you removed this line, or your Home Assistant configuration was created before Home Assistant added it automatically, add it back. For more information, refer to [defining themes](/integrations/frontend/#defining-themes):

```yaml
frontend:
  themes: !include_dir_merge_named themes
```
{% endnote %}

### Templates

Templates provide reusable template macros. The Marketplace installs them in the `custom_templates` folder in your configuration folder. You can then import the macros into your templates.

## Finding something to install

The Marketplace opens to the catalog. To find a project:

- Use **Search** to look for a name, a description, or the name of a repository.
- Use **Filters** to show specific content types or only installed projects.
- Use **Sort by** to order the list, for example by the number of GitHub stars or by recent activity.

Select a repository to open its page. It shows the project description, available version, author, and links to the source code and issue tracker. Use this information to decide whether you trust the project.

Repositories that recently joined the catalog are marked as new. To clear that mark for all of them, select the three dots {% icon "mdi:dots-vertical" %} menu in the upper-right corner, then select **Dismiss new repositories**.

## Installing a repository

1. Open the page of the repository you want.
2. Select **Install**.
3. Review the version shown in the dialog. The first time you install a repository, the dialog also reminds you that it is not reviewed or supported by the Home Assistant project.
4. Select **Install**.

What happens next depends on the type:

- **Integration**: When Home Assistant can load it immediately, the integration setup page opens after the installation is complete. If you close it, add the integration later under {% my integrations title="**Settings** > **Devices & services**" %}. Some integrations can only load after a restart, for example when they use YAML configuration. A repair under {% my repairs title="**Settings** > **System** > **Repairs**" %} reminds you when a restart is needed and can restart Home Assistant for you.
- **Dashboard**: Reload your browser to load the new dashboard resource. If your configuration folder did not contain a `www` folder when Home Assistant started, a repair asks you to restart Home Assistant first.
- **Theme** and **Template**: Home Assistant reloads these automatically, and they are ready to use.

### Installing another version

To install a version other than the latest, select the three dots {% icon "mdi:dots-vertical" %} menu in the upper-right corner of the repository page, then select **Install another version**. The dialog lists the available versions. Do not use this option to return to an earlier version after an update. Restore a backup instead.

When the latest version requires a newer version of Home Assistant than you have, the install dialog lists earlier versions automatically, so you can select one that works.

### When an installation replaces a built-in integration

Some community integrations use the same domain as an integration included with Home Assistant. A domain is the integration's internal identifier. This can provide a newer or different implementation. Home Assistant supports this, but the install dialog shows a warning because it has consequences.

After you install such an integration and restart Home Assistant, it loads the installed integration instead of the built-in integration for existing and future setups that use that domain. Devices and services that you already set up may stop working. Fixes and improvements to the built-in integration no longer arrive with Home Assistant updates. The Home Assistant project cannot help with problems caused by the installed integration.

To use the built-in integration again, uninstall the community integration and restart Home Assistant.

## Keeping installations up to date

For each installed repository, the Marketplace creates an [update entity](/integrations/update/). When a new version is available, it appears under {% my updates title="**Settings** > **Updates**" %}, with Home Assistant updates. From there, you can read the release notes and install the update. You can also use an automation to install updates after someone accepts the Marketplace warning.

The Marketplace checks the catalog for new versions every 6 hours. If it cannot reach the catalog or GitHub for a repository that you added from a link, the affected update entities are unavailable until the Marketplace can reach it again. Installed content keeps working in the meantime.

After you update an integration, restart Home Assistant to apply the update. A repair reminds you and can restart Home Assistant for you.

By default, the Marketplace offers stable releases only. To also get pre-releases of a repository, enable its **Pre-release** switch. You can find it on the repository's Marketplace device page, under {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}. The **Pre-release** entity is disabled by default. Enable the entity, then turn on the switch.

## Example automations

You can create an automation that displays a persistent notification when an update is available.

### Get a notification when an update is available

Replace `update.card_mod` with the update entity ID for the repository for which you want notifications. You can find it on the repository's Marketplace device page, under {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}.

```yaml
alias: "Marketplace update available"
description: "Tell me when a new version of a repository is available"
triggers:
  - trigger: state
    entity_id:
      - update.card_mod
    from: "off"
    to: "on"
actions:
  - action: persistent_notification.create
    data:
      title: "Marketplace update"
      message: >-
        Version {{ state_attr(trigger.entity_id, 'latest_version') }} of
        {{ state_attr(trigger.entity_id, 'friendly_name') }} is available.
```

## Uninstalling a repository

1. Open the page of the repository.
2. Select the three dots {% icon "mdi:dots-vertical" %} menu in the upper-right corner, then select **Uninstall**.
3. Confirm.

The Marketplace deletes the installed files. For a dashboard card, it also removes its dashboard resource unless you manage resources in YAML. In that case, remove the resource from your YAML configuration.

When an integration that you uninstall is still running, a repair under {% my repairs title="**Settings** > **System** > **Repairs**" %} asks you to restart Home Assistant and can do that for you.

An integration cannot be uninstalled while it is still configured in Home Assistant. Its setup uses the files that the Marketplace installed. Without those files, the integration would fail to load and leave its devices and entities behind. The Marketplace shows the existing integration setups. Select **View integration** to remove the integration setup yourself, or **Delete and uninstall** to remove the setup and uninstall the integration in one step. The Marketplace asks you to confirm because removing the setup also deletes its devices and entities.

You can also remove the last Marketplace integration setup from {% my integrations title="**Settings** > **Devices & services**" %}. Home Assistant then asks whether you want to uninstall it.

## Custom repositories

Not every community project is listed in the catalog. If a community project is not in the catalog, you can add its repository yourself. The Marketplace then treats it like any other repository: you can install it and keep it up to date.

A custom repository must meet the same requirements as the repositories in the catalog:

- It is a public repository on GitHub.
- It includes a `hacs.json` file that describes it. Most community projects already have one.
- It holds an integration, dashboard, theme, or template and uses the folder structure required for its content type.

To add a custom repository, [connect GitHub](#connecting-github). If you have not connected GitHub yet, the Marketplace asks you to do so when you add the repository.

To add a custom repository:

1. Go to **Settings** > **Marketplace**.
2. In the upper-right corner, select **Add from link**.
3. Under **GitHub link**, enter the repository as a full GitHub URL, such as `https://github.com/owner/repository`, or as `owner/repository`.
4. Select **Add**.

The Marketplace checks the repository to identify its content type. If it cannot identify the type, or if the repository holds more than one type of content, select the type under **Type**, then select **Add** again.

The repository then appears in the list. Select the repository to open its page, then install it. If the Marketplace cannot add it, the dialog tells you why. For example, the repository may already be in the Marketplace or contain apps, which the Marketplace does not install.

To remove a custom repository from the list, select **Add from link** and select the remove button next to it under **Added from links**. A repository you have installed stays in the list until you uninstall it.

When the catalog later starts listing a custom repository, the Marketplace notices and treats it as a regular catalog repository from then on. You do not have to do anything.

## Connecting GitHub

You can browse the catalog, install catalog content, and update catalog content without connecting a GitHub account.

A GitHub connection is needed for:

- **Adding custom repositories**. The Marketplace reads them directly from GitHub.
- **Keeping custom repositories up to date**. With a connection, the Marketplace checks for new versions every 48 hours.
- **A higher request limit**. Without a connection, GitHub limits how often Home Assistant can request information. If you reach this limit, wait for it to reset or connect GitHub. A GitHub connection provides a higher limit.

The connection does not request access to private repositories or permission to make changes on GitHub. The Marketplace can read only the public information available without signing in.

### Connecting your GitHub account

The Marketplace uses GitHub's device sign-in method. You approve the connection in GitHub rather than entering your password in Home Assistant.

1. When the Marketplace needs a connection, it explains what connecting does. Select **Continue**. The Marketplace displays a code and a link to GitHub.
2. Open the link, sign in to GitHub if needed, and enter the code.
3. Approve the connection on GitHub.
4. Return to Home Assistant. The Marketplace finishes the connection automatically.

GitHub gives Home Assistant an access token, which it stores to maintain the connection. If the connection does not complete, try again. GitHub creates a new code each time.

To connect GitHub before you need it, or to connect a different GitHub account, go to {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}. Open the three dots {% icon "mdi:dots-vertical" %} menu of the **Marketplace** integration entry, then select **Reconfigure**.

### Revoking the GitHub connection

You can revoke the connection at any time in your GitHub account settings under **Applications** > **Authorized OAuth Apps**. The Marketplace then notices that the token no longer works and asks you to connect again. Until you do, Marketplace features that require GitHub become unavailable.

## Coming from HACS

The Marketplace replaces the Home Assistant Community Store (HACS) in Home Assistant. If you used HACS, the Marketplace migrates your HACS content automatically when Home Assistant starts after the update.

Buttons made for HACS still work and open the repository in the Marketplace.

During the migration:

- Everything you installed with HACS stays installed and continues to receive updates. A custom repository without a `hacs.json` file stays installed, but the Marketplace cannot update it.
- Your custom repositories and update entities carry over with their names, areas, and labels.
- The HACS integration is removed, together with its files.
- Bookmarks to `/hacs` open the Marketplace.

The following HACS features and paths change in the Marketplace:

- **AppDaemon apps and Python scripts** are no longer managed. Their files stay where they are and keep working, but they no longer receive updates from the Marketplace. A repair tells you which ones this concerns.
- **Dashboard resources** are served from `/local/community/` now. The old `/hacsfiles/` paths keep working. If you configured resources in YAML, a repair reminds you to change them to the new path.
- **HACS options**, including the sidebar title and icon, are unavailable. The Marketplace is under **Settings** and shows all content types.

### Changes to automations, templates, and custom tools

The update entities keep their entity IDs, so automations and dashboards that use them keep working. References to HACS itself change:

- **Templates**: Templates that look up entities by the HACS integration must use the Marketplace integration name instead. A template that uses `integration_entities('hacs')` finds nothing. Use `integration_entities('marketplace')` instead.
- **Restart after an update**: HACS stored restart information in the `release_summary` attribute of its update entities. The Marketplace creates a repair under {% my repairs title="**Settings** > **System** > **Repairs**" %} instead. The attribute remains empty.
- **WebSocket API for custom tools**: Tools that call HACS `hacs/` commands, such as `hacs/repositories/list`, receive an unknown command. The Marketplace provides its own commands under `marketplace/`, with a different command format.
- **Links and icons**: Links to the integration page of HACS, and the `hacs:hacs` icon on dashboards, now lead to and show the Marketplace.
- **Custom integrations that use HACS data**: HACS is removed when Home Assistant first starts after the update. Custom integrations that read the `hacs.*` files in `.storage`, use `hass.data["hacs"]`, or listen to `hacs_dispatch_*` signals no longer find that data. Marketplace update entities provide the same installed-version and latest-version information.

## Disabling the Marketplace

If you do not want to use the Marketplace, you can disable it. Go to {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}. Open the three dots {% icon "mdi:dots-vertical" %} menu of the **Marketplace** integration entry, then select **Disable**.

Installed Marketplace content continues to work while the Marketplace is disabled, but it no longer receives updates. Deleting the integration entry does not disable the Marketplace. Home Assistant sets it up again the next time it starts.

## Troubleshooting

{% details "The Marketplace is not available" %}

The Marketplace does not load in recovery mode. This message also appears if the Marketplace could not start. Check the Home Assistant logs for details.

{% enddetails %}

{% details "GitHub limit reached" %}

Without a GitHub connection, the Marketplace shares GitHub's hourly request limit with other devices on your internet connection. Wait for the limit to reset, then try again, or [connect GitHub](#connecting-github) for a higher limit.

{% enddetails %}

{% details "A repository was removed from the catalog" %}

The catalog sometimes removes a repository, for example if its author no longer maintains it. When that happens to installed content, a repair under {% my repairs title="**Settings** > **System** > **Repairs**" %} tells you why. Installed content continues to work, but it no longer receives updates. Uninstall it if you no longer use it.

{% enddetails %}

{% details "A repository was removed because it is critical" %}

Rarely, a repository is harmful, for example because an update deletes data or has unexpected behavior. The catalog then marks it as critical. If you installed the repository, the Marketplace uninstalls it immediately and restarts Home Assistant.

A repair explains which repository was removed and why, with a link to more information. Check any automations, dashboards, or other Home Assistant features that used the repository, then confirm the repair.

{% enddetails %}

{% details "Something you installed does not work" %}

The Marketplace installs the content published by the project author, but does not provide support for that content. Open the repository page and select **Issue tracker** to report the problem to the project author. The Home Assistant project cannot help with problems in community content.

If an installation fails, the Marketplace shows why. Check the Home Assistant logs for more details.

{% enddetails %}
