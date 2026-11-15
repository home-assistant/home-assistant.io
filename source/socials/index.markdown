---
title: "Follow us on social media"
description: "Stay up to date with the latest Home Assistant news, tips, and community highlights. Follow us on your favorite social media platform."
sidebar: false
---

Stay connected and never miss an update. Follow Home Assistant on any of these platforms to get the latest news, tips, community highlights, and release announcements.

<div class="social-grid">
  {% for social in site.data.social_media %}
  <a href="{{ social.url }}" rel="me noopener noreferrer" target="_blank">
    <iconify-icon icon="{{ social.icon }}"></iconify-icon>
    <span>{{ social.title }}</span>
  </a>
  {% endfor %}
</div>
