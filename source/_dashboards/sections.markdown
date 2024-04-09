---
type: view
title: Sections (experimental)
sidebar_label: Sections (experimental)
description: "Lets you organize your cards in sections on a grid."
---

The sections view lets you organize your cards in sections on a grid.
You can group cards without using horizontal or vertical stack cards.

<p class='img'>
    <img src="/images/blog/2024-03-dashboard-chapter-1/sections-example-dashboard.png" alt="A fully populated dashboard in Sections view layout"/>
    A fully populated dashboard in Sections view layout
</p>

<div class='note notice'>
    <p>The sections view was released beginning of March 2024 and is experimental! Do not build your daily dashboard on top of it yet! We are still collecting feedback.</p><br><p>It is not possible to migrate dashboards into sections view.</p>
</div>

## Creating a sections view

1. If you have multiple dashboards, in the left sidebar, select the dashboard to which you want to add the sections view.
2. [Add a new view](/dashboards/views/#adding-a-view-to-a-dashboard) and under **View type**, select **Sections**.
3. Select the number of columns you want to see in the new view. Select **Save**.
4. To add a card, select the **Add card** button.
   - Follow the [steps on adding cards](/dashboards/cards/#adding-cards-to-your-dashboard).

    ![Add Section button](/images/dashboards/sections_view_add-card-or-section.png)

5. To add a section, select the **Create section** button.
6. To edit the section title, select the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-edit.png" alt="Edit icon"/> button.
   - If you leave the section title empty, this line will be hidden.
7. To delete a section, select the <img height="28px" src="/images/blog/2024-03-dashboard-chapter-1/mdi-trash.png" alt="Delete icon"/> button.

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

## Related topics

- [Masonry view](/dashboards/masonry/)
- [Panel view](/dashboards/panel/)
- [Sidebar view](/dashboards/sidebar/)
- [Dashboard chapter 1 blog post](/blog/2024/03/04/dashboard-chapter-1/)
- [Adding cards to a view](/dashboards/cards/#adding-cards-to-your-dashboard)
- [Adding a new view](/dashboards/views/#adding-a-view-to-a-dashboard)