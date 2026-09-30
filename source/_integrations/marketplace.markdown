---
title: Marketplace
description: Find and install integrations, dashboard cards, themes, and templates made by the Home Assistant community.
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

The **Marketplace** {% term integration %} lets you find and install things the Home Assistant community has made: integrations for devices and services Home Assistant does not support yet, cards for your dashboards, themes, and templates. Thousands of them are listed, and the Marketplace keeps the ones you install up to date.

The Marketplace comes with Home Assistant and is always set up. There is nothing to install or configure before you can use it.

{% warning %}
Everything in the Marketplace is made and published by the community, not by the Home Assistant project. What you install runs inside Home Assistant, with full access to your home, your data, and the system Home Assistant runs on.

- Nothing published in the Marketplace is tested, audited, or supported by the Home Assistant project.
- It can compromise the security of Home Assistant, your home, and your network.
- It can violate your privacy, for example by sending your data to others.
- It can degrade the stability and performance of Home Assistant.

You use everything you install from the Marketplace at your own risk. Before you install something, look at who made it, how active the project is, and what others say about it.
{% endwarning %}

## Opening the Marketplace

To open the Marketplace, go to **Settings** > **Marketplace**. The Marketplace is available to administrators only.

The first time you open it, the Marketplace shows the warning above. Read it and select **I understand the risks**. **Continue** becomes available after 30 seconds, which gives you the time to read the warning. Every user of your Home Assistant who opens the Marketplace reads the warning once for themselves, and it is not shown to them again. Until someone has accepted the warning, nothing can be installed or updated, not even by an automation.

## What you can install

Everything in the Marketplace comes from a repository on GitHub, which is where most community projects publish their work. Each repository is one of these types:

- **Integration**: Adds support for devices and services, like the integrations that come with Home Assistant. It is installed in the `custom_components` folder in your configuration folder. Most integrations are then added under {% my integrations title="**Settings** > **Devices & services**" %}, some are set up in YAML instead, as their documentation describes. Some need a restart of Home Assistant first; the Marketplace tells you when.
- **Dashboard**: A card, a card feature, or another addition to your dashboards. It is installed in `www/community` in your configuration folder, and the Marketplace adds it as a dashboard resource for you. You can then use it on your dashboards.
- **Theme**: Changes how Home Assistant looks. It is installed in the `themes` folder in your configuration folder. You can then pick it in your user profile.
- **Template**: Reusable template macros. They are installed in the `custom_templates` folder in your configuration folder, where your templates can import them.

{% note %}
Themes are loaded from the themes folder by a line in your `configuration.yaml` file that Home Assistant adds for you when it creates the file. If you removed it, or your configuration predates it, add it back, as described in [defining themes](/integrations/frontend/#defining-themes):

```yaml
frontend:
  themes: !include_dir_merge_named themes
```

If you manage your dashboard resources in YAML, the Marketplace cannot add them for you. The install dialog then shows the resource to add yourself.
{% endnote %}

## Finding something to install

The Marketplace opens on a list of everything it knows. To find what you are looking for:

- Use **Search** to look for a name, a description, or the name of a repository.
- Use **Filters** to show only some types, or only what you have installed.
- Use **Group by** and **Sort by** to order the list, for example by the number of stars on GitHub or by recent activity.

Select a repository to open its page. It shows the description the author wrote, the available version, who made it, and links to its source code and to its issue tracker. Take a moment here: the page is the best place to decide whether you trust a project.

Repositories that recently joined the catalog are marked as new. To clear that mark for all of them, open the menu in the top right corner and select **Dismiss new repositories**.

## Installing

1. Open the page of the repository you want.
2. Select **Install**.
3. The dialog tells you which version it installs. The first time you install a repository, it also reminds you that it is not reviewed or supported by the Home Assistant project.
4. Select **Install**.

What happens next depends on the type:

- **Integration**: When Home Assistant can load it right away, its setup opens as soon as the installation is done. If you close it, add the integration later under {% my integrations title="**Settings** > **Devices & services**" %}. Some integrations can only be loaded after a restart, for example when they are set up in YAML. A repair then shows up under {% my repairs title="**Settings** > **System** > **Repairs**" %} to remind you, and it can restart Home Assistant for you.
- **Dashboard**: Reload your browser, so it picks up the new resource. If your configuration folder had no `www` folder when Home Assistant started, a repair asks you to restart Home Assistant first.
- **Theme** and **Template**: These are reloaded for you and are ready to use.

### Installing another version

To install a version other than the newest, open the menu in the top right corner of the repository page and select **Install another version**. The dialog then lists the versions to choose from. Do not use this to roll back after a bad update; restore a backup instead.

When the newest version needs a newer version of Home Assistant than you have, the install dialog lists the earlier versions on its own, so you can pick one that works.

### When an installation replaces a built-in integration

Some community integrations use the same name as an integration that comes with Home Assistant. They do so on purpose, often to offer a newer or different version of it. Home Assistant supports this, but it has consequences, so the install dialog shows a warning and asks you to confirm it.

Once you install such an integration and restart, Home Assistant loads the installed one instead of the built-in one, for everything you set up with it. Devices and services you already set up may stop working. Fixes and improvements to the built-in integration no longer reach you with Home Assistant updates, and the Home Assistant project cannot help with problems it causes.

To go back to the built-in integration, uninstall it and restart Home Assistant.

## Keeping installations up to date

Every repository you install gets an [update entity](/integrations/update/). When a new version is available, it shows up under {% my updates title="**Settings** > **Updates**" %}, together with the updates of Home Assistant itself. From there, you can read the release notes and install the update. Because they are ordinary update entities, you can also update from an automation, as long as someone has accepted the warning.

The Marketplace checks the catalog for new versions every 6 hours. When it cannot reach the catalog, or GitHub for something you added from a link, the update entities that depend on it show as unavailable until it can again. What you installed keeps working in the meantime.

An update of an integration takes effect after a restart of Home Assistant. A repair reminds you, and it can restart Home Assistant for you.

By default, the Marketplace offers stable releases only. To also get pre-releases of a repository, enable its **Pre-release** switch. You find it on the device of the repository, under {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}. The switch is disabled by default; enable the entity first to use it.

## Example automations

{% details "Get a notification when an update is available" %}

Replace `update.card_mod` with the update entity of the repository you want to hear about. You find it on the device of the repository, under {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}.

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

{% enddetails %}

## Uninstalling

1. Open the page of the repository.
2. Open the menu in the top right corner and select **Uninstall**.
3. Confirm.

The Marketplace deletes the installed files. For a dashboard card, it also removes its dashboard resource, unless you manage your resources in YAML: then remove it there yourself. When an integration you uninstalled is still running, a repair under {% my repairs title="**Settings** > **System** > **Repairs**" %} asks you to restart Home Assistant, and it can do that for you.

An integration that is still set up cannot be uninstalled as it is: the setup runs on the files the Marketplace installed, and without them it would fail to load and leave its devices and entities behind. The Marketplace then shows what is set up. Select **View integration** to delete it yourself, or **Delete and uninstall** to have the Marketplace delete it and uninstall the integration in one go. It asks once more first: deleting the setup also deletes its devices and entities.

The other way around works too. When you delete the last entry of an integration from the Marketplace under {% my integrations title="**Settings** > **Devices & services**" %}, Home Assistant asks whether you want to uninstall it as well.

## Custom repositories

Not every community project is listed in the catalog. If you want something the Marketplace does not list, you can add its repository yourself. The Marketplace then treats it like any other repository: you can install it and keep it up to date.

A custom repository has to meet the same requirements as the ones in the catalog:

- It is a public repository on GitHub.
- It includes a `hacs.json` file that describes it. Most community projects already have one.
- Its content fits the type you add it as.

Adding a custom repository needs a [GitHub connection](#connecting-github). If you have not connected GitHub yet, the Marketplace asks you to do so when you add the repository.

To add a custom repository:

1. Go to **Settings** > **Marketplace**.
2. Open the menu in the top right corner and select **Custom repositories**.
3. Under **Repository**, enter the repository, either as its full address, like `https://github.com/owner/repository`, or as `owner/repository`.
4. Under **Type**, select what the repository holds.
5. Select **Add**.

The repository then appears in the list, where you can open it and install it. If the Marketplace cannot add it, the dialog tells you why. For example, when the repository is already in the Marketplace, or when it holds apps, which the Marketplace does not install.

To remove a custom repository from the list, open **Custom repositories** and select the remove button next to it. A repository you have installed stays in the list until you uninstall it.

When the catalog later starts listing a custom repository, the Marketplace notices and treats it as a regular catalog repository from then on. You do not have to do anything.

Some project pages have a button to open the project in your Home Assistant. Buttons made for HACS keep working and open the repository in the Marketplace.

## Connecting GitHub

You can use most of the Marketplace without a GitHub account. Browsing the catalog, installing from it, and updating what you installed from it all work without one.

A GitHub connection is needed for:

- **Adding custom repositories**. The Marketplace reads them straight from GitHub.
- **Keeping custom repositories up to date**. With a connection, the Marketplace checks them for new versions every 48 hours.
- **A higher limit**. Without an account, GitHub allows only a small number of requests per hour from your internet connection. Browsing and installing from the catalog mostly stay clear of that limit, but when you look at many repositories in a short time, you can reach it. The Marketplace then tells you, and you can try again later or connect GitHub. With a connection, the limit is much higher.

The connection asks GitHub for no extra permissions. The Marketplace can read public information only, the same as anyone without an account. It cannot see your private repositories, and it cannot change anything on GitHub.

### How connecting works

The Marketplace uses GitHub's device sign-in. You never enter your GitHub password in Home Assistant.

1. When the Marketplace needs a connection, it first explains what connecting does. Select **Continue** to get a code and a link to GitHub.
2. Open the link, sign in to GitHub if needed, and enter the code.
3. Approve the connection on GitHub.
4. Return to Home Assistant. The Marketplace finishes the connection on its own.

GitHub gives the Marketplace a token, which Home Assistant stores. If the connection does not complete, try again; a new code is created every time.

To connect GitHub before you need it, or to connect another account, go to {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}, open the menu of the entry, and select **Reconfigure**.

### Revoking the connection

You can revoke the connection at any time, in your GitHub account settings under **Applications** > **Authorized OAuth Apps**. The Marketplace then notices that the token no longer works and asks you to connect again. Until you do, the parts that need GitHub stop working.

## Coming from HACS

The Marketplace is what HACS became when it moved into Home Assistant itself. If you used HACS, the first start of this Home Assistant version takes it over for you:

- Everything you installed with HACS stays installed and keeps getting updates. The exception is a custom repository without a `hacs.json` file: it stays installed, but the Marketplace cannot update it.
- Your custom repositories, your update entities, and the names, areas, and labels you gave them carry over.
- The HACS integration is removed, together with its files.
- Bookmarks to `/hacs` open the Marketplace.

A few things work differently now:

- **AppDaemon apps and Python scripts** are no longer managed. Their files stay where they are and keep working, but they no longer get updates from the Marketplace. A repair tells you which ones this concerns.
- **Dashboard resources** are served from `/local/community/` now. The old `/hacsfiles/` addresses keep working. If you configured resources in YAML, a repair reminds you to change them to the new address.
- **Options** of HACS, like its sidebar title and icon, are gone. The Marketplace lives under **Settings** and shows all types.

### What changes for automations and tools

The update entities keep their entity IDs, so automations and dashboards that use them keep working. A few things that pointed at HACS itself do change:

- **Entities of the integration**: The entities now belong to the Marketplace integration. A template that uses `integration_entities('hacs')` finds nothing anymore: use `integration_entities('marketplace')` instead.
- **Restart after an update**: HACS put a restart message in the `release_summary` attribute of its update entities. The Marketplace tells you with a repair under {% my repairs title="**Settings** > **System** > **Repairs**" %} instead. The attribute stays empty.
- **The WebSocket API**: Tools that called the `hacs/` commands of HACS, like `hacs/repositories/list`, get an unknown command. The Marketplace has its own commands under `marketplace/`, with a different shape.
- **Links and icons**: Links to the integration page of HACS, and the `hacs:hacs` icon on dashboards, now lead to and show the Marketplace.

## Turning off the Marketplace

If you do not want to use the Marketplace, you can disable it. Go to {% my integration domain="marketplace" title="**Settings** > **Devices & services** > **Marketplace**" %}, open the menu of the entry, and select **Disable**.

What you installed keeps working while the Marketplace is disabled, but it no longer gets updates. Deleting the entry does not turn the Marketplace off: it is set up again the next time Home Assistant starts.

## Troubleshooting

{% details "The Marketplace is not available" %}

The Marketplace does not load in recovery mode. It also shows this when it could not start; the Home Assistant logs tell you why.

{% enddetails %}

{% details "GitHub limit reached" %}

Without a GitHub connection, the Marketplace shares a small hourly limit with everything else on your internet connection that uses GitHub. Wait for the limit to reset, or [connect GitHub](#connecting-github) for a higher limit.

{% enddetails %}

{% details "A repository was removed from the Marketplace" %}

The catalog sometimes removes a repository, for example when its author stopped maintaining it. When that happens to something you installed, a repair under {% my repairs title="**Settings** > **System** > **Repairs**" %} tells you why. What you installed keeps working, but it no longer gets updates. Uninstall it when you can.

{% enddetails %}

{% details "A repository was removed because it is critical" %}

Rarely, a repository turns out to be harmful, for example because an update deletes data or does something its users did not expect. The catalog then marks it as critical. If you installed it, the Marketplace uninstalls it right away and restarts Home Assistant. A repair explains which repository was removed and why, with a link to more information. Check whether anything that depended on it needs your attention, then confirm the repair.

{% enddetails %}

{% details "Something you installed does not work" %}

The Marketplace installs what the author published; it does not know how their project works. Open the page of the repository and select **Issue tracker** to report the problem to its author. The Home Assistant project cannot help with problems in community content.

If an installation itself fails, the Marketplace shows why. The Home Assistant logs have more details.

{% enddetails %}
