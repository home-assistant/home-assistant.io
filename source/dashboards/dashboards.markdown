---
title: "Multiple dashboards"
description: "Multiple powerful and configurable dashboards in Home Assistant."
related:
  - docs: /integrations/logbook/
    title: Activity integration
  - docs: /integrations/history/
    title: History integration
  - docs: /integrations/todo/
    title: To-do list integration
  - docs: /dashboards/views/
    title: Views
  - docs: /dashboards/iframe/
    title: Webpage card
  - docs: /docs/organizing/
    title: Grouping your assets
  - docs: /docs/organizing/areas/
    title: Grouping by areas
---

You can define multiple dashboards in Home Assistant. Each dashboard can be added to the sidebar. This makes it possible to create separate control dashboards for each individual part of your house.

Under {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}, you can see your own dashboards as well as the predefined, built-in dashboards.

<p class='img'>
<img src='/images/dashboards/dashboard-manage-01.png' alt='Screenshot of the dashboard list'>
Screenshot of the Dashboard list.
</p>

## Home Assistant built-in dashboards

**Built-in** dashboards are available out of the box, cannot be deleted, and there are limited options on how much you can edit them.

### Dashboards shown in the sidebar by default

Built-in dashboards that are available in the sidebar by default:

- [Activity dashboard](#activity-dashboard) Category: built-in.
- Energy dashboard. Category: built-in.
- [History dashboard](#history-dashboard). Category: built-in.
- [Map dashboard](#map-dashboard): Category: user-created. The Map dashboard is an exception: it is available out of the box, but you can edit it freely. This is why it is categorized as **User-created** dashboard.
- [Overview dashboard](#creating-a-new-dashboard). Category: built-in.
- [To-do lists dashboard](#to-do-lists-dashboard). Category: built-in.

<p class='img'>
<img src='/images/dashboards/dashboards-out-of-the-box.png' alt='Screenshot of the dashboard list on a new installation'>
Screenshot of the Dashboard list on a new installation.
</p>

### Dashboards only shown in the dashboard list by default

Some of the built-in dashboards are not shown in the sidebar by default, but are listed under {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}.

- [Home dashboard](#home-dashboard)
- **Lights** dashboards: Overview of your lights, [grouped](/docs/organizing/) by [floors](/docs/organizing/floors/) and [areas](/docs/organizing/areas/).
- **Security** dashboards: Overview of your security-related devices, [grouped](/docs/organizing/) by [floors](/docs/organizing/floors/) and [areas](/docs/organizing/areas/). The security-related devices include devices such as alarm, lock, camera, doors/covers, motion sensors, and binary sensor.
- **Climate** dashboards: Overview of your climate devices, [grouped](/docs/organizing/) by [floors](/docs/organizing/floors/) and [areas](/docs/organizing/areas/). The climate dashboard includes devices such as heating and cooling devices, windows, and fans.
- **Energy** dashboards: Allows you to visualize your energy consumption and production, if you have such entities available. This includes electricity from grid and from solar panels, gas and water consumption, and the status of your battery storage.

Not all of the predefined dashboards are listed under {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}. The **Activity** and **History** dashboards for example are powered by their respective integrations.

### Home dashboard

The **Home** dashboard is an entry point to open other built-in dashboards based on areas or topics such as lights, climate, or media players.

The **Home** dashboard is prepopulated by default and shows your {% term entities %} [grouped](/docs/organizing/) by [areas](/docs/organizing/areas/).

- It uses the [sections view](/dashboards/sections/) type and [tile cards](/dashboards/tile/).
- The first view shows all your areas and the {% term entities %} that are [assigned to those areas](/docs/organizing/areas/).
- In addition, the dashboard provides a separate view for each area.
- {% term entities Entities%}, such as lights, covers, and cameras are automatically grouped by {% term domain %}.

<p class='img'>
<img src='/images/dashboards/home-dashboard-overview.png' alt='Screenshot of the built-in Home dashboard'>
Screenshot of the built-in Home dashboard.
</p>

#### Editing the Home dashboard

1. Make sure all the {% term entities %} are [assigned to an area](/docs/organizing/areas/#assigning-an-area-to-multiple-items).
2. In the top-right corner, select the {% icon "mdi:pencil" %} icon.
3. You can add entities to customize which items appear on your dashboard.
4. If you don't like how the cards are arranged, [you can reorder floors and areas](/docs/organizing/areas/#reordering-areas-on-built-in-dashboards) under {% my areas title="**Settings** > **Areas, labels & zones**" %}.

#### Troubleshooting: entity is not showing

1. Not all devices or entity types are automatically added to the **Home** dashboard.
2. Make sure the entity is [assigned to an area](/docs/organizing/areas/#assigning-an-area-to-multiple-items) and check the dashboard again.

### History dashboard

The predefined **History** dashboard is powered by the [History integration](/integrations/history/). To learn about the data sources used and how to export data, refer to the documentation of the History integration.

### Activity dashboard

The predefined **Activity** dashboard is powered by the [Activity integration](/integrations/logbook/). To control which events to show or filter out, refer to the documentation of the Activity integration.

### Map dashboard

The predefined **Map** dashboard is populated by the [Map card](/dashboards/map/). You can edit this dashboard like any other dashboard. For example, you can edit the [view](/dashboards/views/) to use the **Sidebar** instead of the default **Panel** view type if you like.

#### Maps and presence detection

If you see a [person](/integrations/person/) on the map, it means you have connected a device that allows [presence detection](/integrations/#presence-detection). This is the case for example if you have the [Home Assistant Companion App](https://companion.home-assistant.io/) on your phone and allowed location tracking.

### To-do lists dashboard

The predefined **To-do lists** dashboard is powered by the [To-do integration](/integrations/todo/). To learn how to use to-do and shopping lists, refer to the documentation of the to-do list integration.

## Webpage dashboard

Another available (but not default) dashboard is the webpage dashboard. The webpage dashboard allows you to add and embed a webpage to your dashboard.
This could be a web page from the internet or a local web page from a local
machine or device like your router or NAS. The webpage dashboard uses the [webpage card](/dashboards/iframe/).

<img class="no-shadow" src='/images/blog/2024-04/dashboard-webpage.png' alt='Screenshots showing addition of a new webpage dashboard to Home Assistant, embedding the Home Assistant website.'>

This dashboard replaces the old iFrame panel (`iframe_panel`). If you have
existing panels configured in your YAML configuration, Home Assistant will
automatically migrate them to the new webpage dashboard on upgrade.

<img class="no-shadow" src='/images/blog/2024-04/embedded-home-assistant-website.png' alt='Screenshot showing the Home Assistant website embedded into the Home Assistant frontend using a webpage dashboard.'>

Note that not every webpage can be embedded due to security restrictions that
some sites have in place. These restrictions are enforced by your browser and prevent
embedding them into a Home Assistant dashboard.

## Setting a default dashboard

The default dashboard is the dashboard that is shown when you open Home Assistant. It is listed on top of the sidebar.

- If you have administrator rights, you can set an initial default dashboard for all users.
   1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}.
   2. In the list of dashboards, find the dashboard of interest and select the {% icon "mdi:dots-vertical" %} menu.
   3. Select **Set as default**.

      ![Setting a default dashboard for all users](/images/dashboards/dashboards-set-default.png)

   4. **Result**: This dashboard is shown to all users when they open Home Assistant.
- To change your personal default dashboard, you don't need administrator rights.
   1. Go to {% my profile title="**User profile**" %}.
   2. On the **General** tab, under **Dashboard**, select your default dashboard.

      ![Changing your own default dashboard](/images/dashboards/dashboard-change-your-default.png)
   3. If you want your wall tablet to use a different dashboard than your other devices, use a separate user profile for your wall tablet.
      - If you set your phone to one dashboard and your wall tablet to another, using the same user, they’ll both revert to the default dashboard.

## Creating a new dashboard

The built-in dashboards update themselves when you add new devices. If you want a customized dashboard, it is recommended not to change the **Overview** dashboard, but to create a new dashboard instead.

This will leave the default dashboard intact.

1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}.
2. Select **Add dashboard**.
3. In the dialog, choose one of the options:
   - If you want to start with a pre-populated dashboard, choose **Overview** or one of the suggested ones, such as the **Map** dashboard.
   - If you want to start with a completely empty dashboard, choose **New dashboard from scratch**.
   ![Screenshot of the Add Dashboard dialog showing dashboard options like Overview, Map, and Areas](/images/dashboards/dashboards-add-dashboard-selector.png)

4. In the **Add new dashboard** dialog, enter a name and select an icon.
   - Define if this dashboard should be visible only to the admin user.
   - Define if you want the dashboard to be listed in the sidebar.
   - Select **Create**.
   - **Result**: The dashboard is added.

## Editing a new dashboard

1. Open your new dashboard and in the top right of the screen, select the {% icon "mdi:pencil" %} button.
   - **Result**: The **Edit dashboard** dialog appears.
2. Select the areas you want to show on this new dashboard and select **Save**.
3. If you want to have more detailed control over the dashboard, you need to take control:
     - This means that this dashboard is no longer automatically updated when new dashboard elements become available.
     - Once you've taken control, you can't get this specific dashboard back to update automatically. However, you can create a new default dashboard.
     - To continue, in the dialog, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Take control**.
4. You can now [add a badge](/dashboards/badges/#adding-a-badge-to-your-dashboard), [add a card](/dashboards/cards/#adding-cards-to-your-dashboard), or [add a view](/dashboards/views/#adding-a-view-to-a-dashboard).
5. To **undo** or **redo** a change, select the buttons on top of the dashboard.

   ![Screenshot of the undo and redo buttons on top of the dashboard](/images/dashboards/dashboard-undo-redo.png)


## Deleting a dashboard

If you do not use one of the predefined dashboards, or created a dashboard you no longer need, you can delete that dashboard. It will then no longer show in the sidebar.

1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}.
2. From the list of dashboards, select the dashboard you want to delete.
3. In the dialog, select **Delete**.
   ![Deleting a dashboard](/images/dashboards/delete_dashboard.png)

## Using YAML for the Overview dashboard

To change the **Overview** dashboard, create a new file `ui-lovelace.yaml` in your configuration directory and add the following section to your `configuration.yaml` and restart Home Assistant:

```yaml
lovelace:
  mode: yaml
```

A good way to start this file is to copy and paste the "Raw configuration" from the UI so your manual configuration starts the same as your existing UI.

- In your sidebar, select **Overview**.
- In the top-right corner, select the pencil icon.
- Select the three dots {% icon "mdi:dots-vertical" %} menu and select **Raw configuration editor**.
- There you see the configuration for your current dashboard. Copy that into the `<config>/ui-lovelace.yaml` file.

Once you take control of your UI via YAML, the Home Assistant interface for modifying it won't be available anymore, and new entities will not automatically be added to your UI.

When you make changes to `ui-lovelace.yaml`, you don't have to restart Home Assistant or refresh the page. Just hit the refresh button in the menu at the top of the UI.

To revert back to using the UI to edit your dashboard, remove the `lovelace` section from your `configuration.yaml` and copy the contents of your `ui-lovelace.yaml` into the raw configuration section of Home Assistant and restart.

## Adding more dashboards with YAML

It is also possible to use YAML to define multiple dashboards. Each dashboard will be loaded from its own YAML file.

```yaml
lovelace:
  mode: yaml
  # Include external resources only add when mode is yaml, otherwise manage in the resources in the dashboard configuration panel.
  resources:
    - url: /local/my-custom-card.js
      type: module
    - url: /local/my-webfont.css
      type: css
  # Add more dashboards
  dashboards:
    lovelace-generated: # Needs to contain a hyphen (-)
      mode: yaml
      filename: notexist.yaml
      title: Generated
      icon: mdi:tools
      show_in_sidebar: true
      require_admin: true
    lovelace-hidden:
      mode: yaml
      title: hidden
      show_in_sidebar: false
      filename: hidden.yaml
```

You can also add YAML dashboards when your main dashboard is UI configured:

```yaml
lovelace:
  mode: storage
  # Add yaml dashboards
  dashboards:
    lovelace-yaml:
      mode: yaml
      title: YAML
      icon: mdi:script
      show_in_sidebar: true
      filename: dashboards.yaml
```

{% configuration dashboards %}
mode:
  required: true
  description: "In what mode should the main dashboard be, `yaml` or `storage` (UI managed)."
  type: string
resources:
  required: false
  description: "List of resources that should be loaded. Only use this when mode is `yaml`. If you change anything here, click the three dots {% icon "mdi:dots-vertical" %} menu (top-right) and click on `Reload resources` to pick up changes without restarting Home Assistant. You can also call `lovelace.reload_resources` action directly."
  type: list
  keys:
    url:
      required: true
      description: The URL of the resource to load.
      type: string
    type:
      required: true
      description: "The type of resource, this should be either `module` for a JavaScript module or `css` for a StyleSheet."
      type: string
dashboards:
  required: false
  description: Additional YAML dashboards. The key is used for the URL and should contain a hyphen (`-`)
  type: map
  keys:
    mode:
      required: true
      description: "The mode of the dashboard, this should always be `yaml`. Dashboards in `storage` mode can be created in the configuration panel."
      type: string
    filename:
      required: true
      description: "The file in your `config` directory where the configuration for this panel is."
      type: string
    title:
      required: true
      description: "The title of the dashboard, will be used in the sidebar."
      type: string
    icon:
      required: false
      description: The icon to show in the sidebar. You can use any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/). Prefix the icon name with `mdi:`, ie `mdi:home`.
      type: string
    show_in_sidebar:
      required: false
      description: Should this dashboard be shown in the sidebar.
      type: boolean
      default: true
    require_admin:
      required: false
      description: Should this dashboard be only accessible for admin users.
      type: boolean
      default: false
{% endconfiguration %}

As a super minimal example of a dashboard config, here's the bare minimum you will need for it to work:

```yaml
views:
    # View tab title.
  - title: Example
    cards:
        # The markdown card will render markdown text.
      - type: markdown
        title: Dashboard
        content: >
          Welcome to your **dashboard**.
```

A slightly more advanced example:

```yaml
views:
    # View tab title.
  - title: Example
    # Unique path for direct access /lovelace/${path}
    path: example
    # Each view can have a different theme applied. Theme should be defined in the frontend.
    theme: dark-mode
    # The cards to show on this view.
    cards:
        # The filter card will filter entities for their state
      - type: entity-filter
        entities:
          - device_tracker.paulus
          - device_tracker.anne_there
        state_filter:
          - 'home'
        card:
          type: glance
          title: People that are home

        # The picture entity card will represent an entity with a picture
      - type: picture-entity
        image: https://www.home-assistant.io/images/default-social.png
        entity: light.bed_light

    # Specify a tab icon if you want the view tab to be an icon.
  - icon: mdi:home-assistant
    # Title of the view. Will be used as the tooltip for tab icon
    title: Second view
    cards:
        # Entities card will take a list of entities and show their state.
      - type: entities
        # Title of the entities card
        title: Example
        # The entities here will be shown in the same order as specified.
        # Each entry is an entity ID or a map with extra options.
        entities:
          - light.kitchen
          - switch.ac
          - entity: light.living_room
            # Override the name to use
            name: LR Lights

        # The markdown card will render markdown text.
      - type: markdown
        title: Dashboard
        content: >
          Welcome to your **dashboard**.
```
