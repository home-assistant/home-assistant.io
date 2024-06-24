---
title: "Filtering your assets"
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

When working with tables, you can select multiple items to apply an action. If you have [grouped](/docs/organizing/) items by assigning them to floors, areas, labels, or directories, you can also filter your data accordingly.

## Selecting multiple items in a table

1. In your table, select the <img height="28px" src="/images/organizing/multiselect_icon.png" alt="Multiselect icon"/> button.

   ![Screenshots point out the enable selection mode button in the toolbar of the tables in Home Assistant](/images/blog/2024-04/enable-selection-mode.png)

2. In the list, select the items of interest.

   ![Selecting multiple elements in a list](/images/organizing/multiselect_01.png)

3. You can now apply changes to all selected elements, such as [applying labels](/docs/organzing/labels/) or [enabling or disabling entities and automations](/common-tasks/general/).

## Filtering items in a table

You can filter a table so that only items matching certain criteria are shown.

1. In the top left corner above the table, select the **Filters** button.

    ![Select the filter button](/images/organizing/filters_01.png)

2. In the filters panel, select your filter criteria.
   - You can filter for [floors](/docs/organizing/floors/), [areas](/docs/organizing/areas/), [labels](/docs/organizing/labels/), and [categories](/docs/organizing/categories/) if you have previously defined them.
   - The list of available criteria depends on the type of table.

    ![Screenshots showing the filter panel that tables can have, allowing you to easily find what you are looking for](/images/organizing/filter-panel.png)

## Grouping and sorting items in a table

You can group items in a table according to certain criteria. The number of shown items stays the same. No items will be hidden.

1. In the top right above the table, select the **Group by** button.
2. The items will be grouped according to the criteria you chose.
   - The list of available criteria depends on the type of table.
     - The example shows a list of devices, grouped by manufacturer.
     - In contrast, the entities table does not allow grouping by manufacturer, but by entity domains.

    ![Select the Group by button](/images/organizing/table_group_01.png)

3. To sort the items, select the **Sort by** button.
4. To get a better overview, you can collapse groups in the list.

    ![Collapse groups](/images/organizing/table_group_collapse.png)