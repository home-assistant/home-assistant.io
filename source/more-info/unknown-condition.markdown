---
title: "No page for this condition"
description: "There is no documentation page for the condition you requested."
sidebar: false
---

There is no documentation page for the condition you were looking for. This can have a few reasons:

- The condition comes from a custom integration. Custom integrations document their own conditions themselves. Check the documentation of the custom integration you installed.
- The condition is documented on the general [conditions](/docs/scripts/conditions/) page, together with other built-in conditions.
- The condition was renamed, removed, or deprecated. Conditions that are no longer supported are removed from the documentation. If an automation still uses it, Home Assistant usually tells you what to use instead under {% my repairs title="**Settings** > **System** > **Repairs**" %}.

You can also browse all [documented conditions](/conditions/), or search the documentation using the search at the top of this page.

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function () {
  if (typeof window.plausible === "function") {
    window.plausible("Unknown condition", { props: { path: window.location.pathname } });
  }
});
</script>
