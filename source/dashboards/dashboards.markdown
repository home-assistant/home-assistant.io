---
title: "Multiple dashboards"
description: "Multiple powerful and configurable dashboards in Home Assistant."
related:
  - docs: /integrations/logbook/
    title: Logbook integration
  - docs: /integrations/history/
    title: History integration
  - docs: /integrations/todo/
    title: To-do list integration
  - docs: /dashboards/views/
    title: Views
  - docs: /dashboards/iframe/
    title: Webpage card
---

You can define multiple dashboards in Home Assistant. Each dashboard can be added to the sidebar. This makes it possible to create separate control dashboards for each individual part of your house.

Under {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}, you can see your own dashboards and some of the predefined ones.

<p class='img'>
<img src='/images/dashboards/dashboard-manage-01.png' alt='Screenshot of the dashboard list'>
Screenshot of the Dashboard list.
</p>

## Home Assistant default dashboards

Home Assistant ships with some dashboards out of the box:

- Overview
- Energy
- [Map](#map-dashboard)
- Logbook
- History
- To-do lists

Not all of the predefined dashboards are listed under {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}. The **Logbook** and **History** dashboards are powered by their respective integrations.

### Map dashboard

The predefined **Map** dashboard is populated by the [Map card](/dashboards/map/). You can edit this dashboard like any other dashboard. For example, you can edit the [view](/dashboards/views/) to use the **Sidebar** instead of the default **Panel** view type if you like.

#### Maps and presence detection

If you see a [person](/integrations/person/) on the map, it means you have connected a device that allows [presence detection](/integrations/#presence-detection). This is the case for example if you have the [Home Assistant Companion App](https://companion.home-assistant.io/) on your phone and allowed location tracking.

### Logbook dashboard

The predefined **Logbook** dashboard is powered by the [Logbook integration](/integrations/logbook/). To control which events to show or filter out, refer to the documentation of the Logbook integration.

### History dashboard

The predefined **History** dashboard is powered by the [History integration](/integrations/history/). To learn about the data sources used and how to export data, refer to the documentation of the History integration.

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

## Creating a new dashboard

The default **Overview** dashboard updates itself when you add new devices, as long as you do not edit the default dashboard. If you want a customized dashboard, it is recommended not to change the **Overview** dashboard, but to create a new dashboard instead.

This will leave the default dashboard intact.

1. Go to {% my lovelace_dashboards title="**Settings** > **Dashboards**" %}.
2. Select **Add dashboard**.
   ![Screenshot of the dashboard list](/images/dashboards/dashboard-manage-02.png)
3. In the dialog, choose one of the options:
   - If you want to start with a pre-populated dashboard, choose **Default dashboard**.
   - If you want to start with a completely empty dashboard, choose **New dashboard from scratch**.
4. In the **Add new dashboard** dialog, enter a name and select an icon.
   - Define if this dashboard should be visible only to the admin user.
   - Define if you want the dashboard to be listed in the sidebar.
   - Select **Create**.
   - **Result**: The dashboard is added.
5. Open your new dashboard and in the top right of the screen, select the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-edit.png" alt="Edit icon"/> button.
6. If you chose **Default dashboard**, you need to take control before you can edit it:
   - The **Edit dashboard** dialog appears.
     - By editing the dashboard, you are taking over control of this dashboard.
     - This means that it is no longer automatically updated when new dashboard elements become available.
     - Once you've taken control, you can't get this specific dashboard back to update automatically. However, you can create a new default dashboard.
     - To continue, in the dialog, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Take control**.
7. You can now [add a card](/dashboards/cards/#adding-cards-to-your-dashboard) or [add a view](/dashboards/views/#adding-a-view-to-a-dashboard).

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
