---
title: "Icons"
description: "Material Design Icons in the Home Assistant frontend"
---

<p class='img'>
  <img src='/images/frontend/mdi.png' alt='Material Design Icons' />
</p>

Home Assistant utilizes the community-driven [Material Design Icons](https://pictogrammers.com/library/mdi/) (MDI) project for icons in the frontend. The icon library is a superset of the base icon library provided by Google and contains thousands of community-made icons for very specific applications, industries, and use-cases.

## Default Icons

Every entity in Home Assistant has a default icon assigned to it. There are way too many to list out here, but you'll see them in your dashboard. You can [customize any of your entities](/docs/configuration/customizing-devices/#icon) to change the icons displayed to you.

## Finding Icons

### Icon Picker

The most common way you can find icons is by using the icon picker built right into Home Assistant. Click into the "Icon" field when customizing an entity and start typing. The list will filter to icons that match your search criteria. You can also scroll through all available icons when the field is empty.

<p class='img'>
  <img src='/images/screenshots/icon-picker.png' alt='Icon Picker in Home Assistant' />
</p>

<div class='note info'>

  The icon picker will filter by icon name and by aliases applied to the icon by the MDI project. For example, typing "user" will show you most "account"-named icons.

</div>

### Material Design Icons Picker Browser Extension

The easiest way to browse and find icons outside of Home Assistant is with the official [Material Design Icons Picker](https://github.com/Pictogrammers/MaterialDesignIcons-Picker) browser extension. The extension is available for Chrome, Firefox, and Edge and is maintained by the MDI team.

<p class='img'>
  <img src='/images/screenshots/mdi-picker.png' alt='Material Design Icons Picker' />
</p>

<div class='note info'>

  Not all icons that appear in the MDI Picker Browser Extension may be available in Home Assistant (yet!). While the browser extension is updated as MDI releases new packages, Home Assistant may lag behind until its next release.

</div>

### Material Design Icons on the Pictogrammers Website

The last way to browse through available icons is by viewing the library on the Pictogrammers website, [https://pictogrammers.com/library/mdi/](https://pictogrammers.com/library/mdi/). Select an icon you'd like to use, then click "Home Assistant" to see an example of its usage.

<div class='note info'>

  The Pictogrammers website will always show the latest release of the Material Design Icons library. However, you may find icons that may not yet be available in Home Assistant (yet!). Watch the Home Assistant release notes for announcements on upgrades of the Material Design Icons library.

</div>

## Suggesting or Contributing New Icons

Being open-source like Home Assistant, the Material Design Icons library is always accepting suggestions and contributions to expand the library.

<div class='note info'>

  Before suggesting or creating a new icon, it is very important that you [search the current library](https://pictogrammers.com/library/mdi/) and [search all issues](https://github.com/Templarian/MaterialDesign/issues?q=is%3Aissue), open and closed, on their GitHub. Try searching with different terms that might mean the same thing. (e.g. "user", "person", "account")

</div>

### Suggesting a New Icon

If you have an idea for an icon that isn't currently in the library, but are not interested in creating it yourself, [open a new icon suggestion](https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Icon+Request&template=1_icon_request.yml).

### Contributing a New Icon

If you want to contribute a new icon to the library, familiarize yourself with the [System icons guidelines](https://material.io/design/iconography/system-icons.html#design-principles) in the Material Design system. Then create your icon and [submit it to the Pictogrammers team for review](https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Icon+Request%2CContribution&template=2_contribution.yml).

#### Tips for Creating New Icons

- Really pay attention to [Material Design guidelines](https://material.io/design/iconography/system-icons.html#design-principles).
- Keep in mind that icons are meant to be contextual, not literal.
- When it comes to little details, less is more.
- If you're unsure, open an issue on their GitHub. They're more than happy to help you!
- Not all icons make it into the library and that is okay!

### Suggesting an Icon Alias

Sometimes an icon exists, but you aren't able to find it with the terms you were searching for. If this has ever happened to you, please [open an issue with the Pictogrammers team to suggest new aliases](https://github.com/Templarian/MaterialDesign/issues/new?assignees=&labels=Alias&template=4_alias.yml) that can be added to existing icons.
