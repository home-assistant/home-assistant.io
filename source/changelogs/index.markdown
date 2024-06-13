---
---
{% assign recent_release_post = site.categories['Core'].first %}

<script>
  document.location = '{{ recent_release_post.url }}{{ site.patch_version_notes }}';
</script>
