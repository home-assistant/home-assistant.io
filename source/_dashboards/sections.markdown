---
type: view
title: Sections (experimental)
sidebar_label: Sections (experimental)
description: "Lets you organize your cards in sections on a grid."
description: "The panel view shows a single card in the full width of the screen."
related:
  - docs: /dashboards/masonry/
    title: Masonry view
  - docs: /dashboards/sidebar/
    title: Sidebar view
  - docs: /dashboards/panel/
    title: Panel view
  - docs: /blog/2024/03/04/dashboard-chapter-1/
    title: Dashboard chapter 1 blog post
  - docs: /dashboards/cards/#adding-cards-to-your-dashboard
    title: Adding cards to a view
  - docs: /dashboards/views/#adding-a-view-to-a-dashboard
    title: Adding a new view
---

The sections view lets you organize your cards in sections on a grid.
You can group cards without using horizontal or vertical stack cards.

<p class='img'>
    <img src="/images/blog/2024-03-dashboard-chapter-1/sections-example-dashboard.png" alt="A fully populated dashboard in Sections view layout"/>
    A fully populated dashboard in Sections view layout
</p>

{% note %}
The sections view was released beginning of March 2024 and is experimental! Do not build your daily dashboard on top of it yet! We are still collecting feedback.<br>
It is not possible to migrate dashboards into sections view.
{% endnote %}

## Creating a sections view

1. If you have multiple dashboards, in the left sidebar, select the dashboard to which you want to add the sections view.
2. Follow the steps on [adding a new view](/dashboards/views/#adding-a-view-to-a-dashboard).
   - Under **View type**, select **Sections (experimental)**.
3. Select the maximum number of columns you want to see in the new sections view.
4. When you are done, select **Save**.
   - You are now presented with a new, empty view.
   - If you chose a background image, the page is filled with that image.

## Adding sections and cards to a sections view

Once you have created a sections view, you can populate it with sections and cards. The new section comes with one section to which you can directly add a card.

1. To add a card, select the **Add card** button.
   - Follow the [steps on adding cards](/dashboards/cards/#adding-cards-to-your-dashboard).

    ![Add Section button](/images/dashboards/sections_view_add-card-or-section.png)

2. To add a new section, select the **Create section** button.
3. To edit the section title, select the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-edit.png" alt="Edit icon"/> button.
   - If you leave the section title empty, this line will be hidden.
4. If you want this section to be visible only to specific users or under a certain condition, you can define those conditions:
   - On the **Visibility** tab, select **Add condition**.
   - Select the type of condition, and enter the parameters.
   - If you define multiple conditions, the section is only shown when all conditions are met.
   - If you did not define any conditions, the section is always shown, to all users.

    ![Define visibility](/images/dashboards/section-visibility.png)

## Deleting a section

1. To delete a section, go to the dashboard and in the top right corner, select the pencil icon.
2. Open the view with the section you want to delete.
3. Select the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-trash.png" alt="Delete icon"/> button.

## Rearranging sections and cards

In the sections view, you can rearrange sections and cards by dragging them to a new location. This is not yet possible in other views.

1. To edit your dashboard, in the top right corner, select the pencil icon.
2. To rearrange sections, hold the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-move.png" alt="Move icon"/> button and move the card.

    <p class='img'>
        <img src="/images/blog/2024-03-dashboard-chapter-1/drag-and-drop-sections.gif" alt="Rearranging sections by dragging"/>
        Rearranging sections by dragging
    </p>

3. To rearrange cards, tap and hold the card and move it to your desired location.

   <p class='img'>
        <img src="/images/blog/2024-03-dashboard-chapter-1/drag-and-drop-cards.gif" alt="Rearranging cards by dragging"/>
        Rearranging cards by dragging
    </p>

## Show or hide section conditionally

You can choose to show or hide certain sections based on different conditions. The [available conditions](/dashboards/conditional/#card-conditions) are the same as that for the conditional card.

To edit the section visibility conditions, select the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-edit.png" alt="Edit icon"/> button and then click on the visibility tab.

## Check out the demo

Check out the demo from the March live stream on dashboards.

<lite-youtube videoid="XyBy0ckkiDU" videoStartAt="2047" videotitle="A Home-Approved Dashboard - Chapter 1: What about Grace?" posterquality="maxresdefault"></lite-youtube>

## About the sections view layout

To learn all about the design decisions and the grid layout used for the sections view, refer to the [Dashboard chapter 1 blog post](/blog/2024/03/04/dashboard-chapter-1/).

## YAML configuration

{% configuration %}
type:
  required: false
  description: "`sections`"
  type: string
{% endconfiguration %}
