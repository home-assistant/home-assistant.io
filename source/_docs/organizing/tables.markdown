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
  - docs: /common-tasks/general/
    title: Enabling or disabling entities and automations
---

Many pages under **Settings** show their items in a table, such as your devices, entities, automations, and helpers. Depending on the table, you can search, filter, group, sort, select several items at once, and choose which columns to show.

If you have [organized](/docs/organizing/) your items into floors, areas, labels, or categories, you can use those to filter and group the table.

## Selecting multiple items in a table

Selecting multiple items lets you change them all at the same time, instead of one by one.

1. Above the table, select the {% icon "mdi:format-list-checks" %} **Enter selection mode** button.

   ![Screenshots point out the enable selection mode button in the toolbar of the tables in Home Assistant](/images/blog/2024-04/enable-selection-mode.png)

2. Select the items you want to change. To select everything at once, open the selection menu and choose **Select all**.

   ![Selecting multiple elements in a list](/images/organizing/multiselect_01.png)

3. Apply your change to all selected items, such as [adding labels](/docs/organizing/labels/) or [enabling or disabling entities and automations](/common-tasks/general/).

## Filtering items in a table

Filters narrow the table down, so you only see the items that match.

1. Above the table, select **Filters**.

   ![Select the filter button](/images/organizing/filters_01.png)

2. In the filters panel, choose what you want to see.
   - Which filters are available depends on the table. For example, you can filter by [floors](/docs/organizing/floors/), [areas](/docs/organizing/areas/), [labels](/docs/organizing/labels/), and [categories](/docs/organizing/categories/) once you have created them.
   - To remove a filter, select **Clear filter**.

   ![Screenshots showing the filter panel that tables can have, allowing you to easily find what you are looking for](/images/organizing/filter-panel.png)

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
