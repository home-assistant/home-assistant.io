---
title: "Working with tables"
description: "Filter for items in tables."
related:
  - docs: /docs/organizing/floors/
    title: Floors
  - docs: /docs/organizing/labels/
    title: Labels
  - docs: /docs/organizing/areas/
    title: Areas
  - docs: /docs/organizing/categories/
    title: Categories
  - docs: /docs/organizing/
    title: Grouping your assets
  - docs: /docs/configuration/customizing-entities/#disabling-or-enabling-an-entity
    title: Disabling or enabling an entity
---

Many pages under **Settings** show their items in a table, such as your devices, entities, automations, and helpers. Depending on the table, you can search, filter, group, sort, select several items at once, and choose which columns to show.

If you have [organized](/docs/organizing/) your items into floors, areas, labels, or categories, you can use those to filter and group the table.

## Selecting multiple items in a table

Selecting multiple items lets you change them all at the same time, instead of one by one.

1. Above the table, select the {% icon "mdi:format-list-checks" %} **Enter selection mode** button.

   ![Screenshots point out the enable selection mode button in the toolbar of the tables in Home Assistant](/images/blog/2024-04/enable-selection-mode.png)

2. Select the items you want to change. To select everything at once, open the selection menu and choose **Select all**.

   ![Selecting multiple elements in a list](/images/organizing/multiselect_01.png)

3. Apply your change to all selected items, such as [adding labels](/docs/organizing/labels/) or [enabling or disabling entities](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

## Filtering items in a table

Filters narrow the table down, so you only see the items that match.

1. Above the table, select **Filters**.

   ![Select the filter button](/images/organizing/filters_01.png)

2. In the filters panel, choose what you want to see.
   - Which filters are available depends on the table. For example, you can filter by [floors](/docs/organizing/floors/), [areas](/docs/organizing/areas/), [labels](/docs/organizing/labels/), and [categories](/docs/organizing/categories/) once you have created them.
   - To remove a filter, select **Clear filter**.

   ![Screenshots showing the filter panel that tables can have, allowing you to easily find what you are looking for](/images/organizing/filter-panel.png)

3. To change how a filter matches, use the toggles at the top of the filter. For example, you can show everything _except_ what you picked, or only the items that have _all_ of your picks. These options are explained below.

The **With** and **Without** toggle described below is also available in the filters on other pages, such as **History**, **Logbook**, and **Settings** > **System** > **Logs**. On the **Logs** page, the raw logs can't leave out integrations. After you select **Show raw logs**, you can't switch the **Integrations** filter to **Without**, and a **Without** selection you made before is not applied.

### Finding items without an area, label, or other value

Not every item has an area, a label, or a category. To find those items, select the **No …** option at the bottom of the filter's list, such as **No area**, **No device**, **No label**, or **No category**.

Filters where every item always has a value, such as **Integrations**, don't have this option.

### Showing everything except your selection

Most filters have a **With** and **Without** toggle at the top:

- **With**: Shows the items that match what you picked. This is the default.
- **Without**: Shows all other items. For example, in the **Areas** filter, **Without** and **Garage** shows everything that is not in the garage. **Without** and **No label** shows every item that has at least one label.

### Matching any or all of your picks

Some items can have several values at once. For example, an automation can have several labels and use devices in several areas, and a backup can be stored in several locations. Filters for these values have an **Any** and **All** toggle:

- **Any**: Shows the items that have at least one of your picks. This is the default.
- **All**: Shows only the items that have every one of your picks. For example, on the automations page, selecting **All** with the **Lighting** and **Security** labels shows the automations that have both labels.

Together with **With** and **Without**, a filter can match in four ways:

- **With** and **Any**: The item has at least one of your picks.
- **With** and **All**: The item has all of your picks.
- **Without** and **Any**: The item has none of your picks.
- **Without** and **All**: The item is missing at least one of your picks.

While **All** is selected, you can't pick options that never go together. For example, selecting **No label** clears the labels you picked, because an item can't have no label and a label at the same time.

When you collapse a filter, the number next to its name shows how many options you picked. A **≠** in front of the number means the filter is set to **Without**, and **All** means it is set to **All**.

### Filtering by floor and area

In the **Areas** filter, areas are listed under their [floor](/docs/organizing/floors/):

- Selecting a floor selects all of its areas. On the automations and scripts pages, this also shows the items that target the floor itself.
- If you clear one area of a selected floor, its other areas stay selected, and the floor shows as partly selected.
- If you select all areas of a floor, the floor is selected again.

### Filtering entities by status

On the entities page, the **Status** filter groups opposite statuses in pairs:

- **Availability**: **Available** and **Unavailable**
- **Activation**: **Enabled** and **Disabled**
- **Visibility**: **Visible** and **Hidden**

Selecting the name of a pair selects both of its statuses. While **All** is selected, you can pick only one status of each pair. A disabled entity counts as **Unavailable**, as it has no state while it is disabled.

## Grouping and sorting items in a table

Grouping puts related items together under a shared heading. Unlike filtering, it doesn't hide anything: all items stay in the table.

1. Above the table, select **Group by** and choose how to group the items.
   - Which options are available depends on the table. For example, you can group devices by manufacturer, and entities by domain.
   - To go back to a flat list, choose **Don't group**.

   ![Select the Group by button](/images/organizing/table_group_01.png)

2. To collapse or expand groups, select a group heading. To do this for all groups at once, use **Collapse all** or **Expand all** in the **Group by** menu.

   ![Collapse groups](/images/organizing/table_group_collapse.png)

3. To sort the items, select **Sort by** and choose a column. You can also select a column header to sort by that column. Select it again to reverse the order.

## Customizing columns

You can choose which columns a table shows, and in which order.

1. Above the table, select the {% icon "mdi:table-cog" %} **Customize table** button.
2. To hide or show a column, select the {% icon "mdi:eye" %} or {% icon "mdi:eye-off" %} icon next to it.
3. To change the order, drag a column by its {% icon "mdi:drag-horizontal-variant" %} handle to a new position.
4. To go back to the original layout, select **Restore defaults**.

   ![Screencast showing how to show, hide, and rearrange columns](/images/organizing/customize_columns.webp)

Home Assistant remembers how you set up each table, including sorting, grouping, and columns. These settings are stored in your browser, so on another device or browser you start with the default layout.
