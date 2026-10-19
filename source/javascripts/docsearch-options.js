function rewriteDocSearchPreviewUrl(url) {
  if (!url || !window.location.hostname.endsWith("--home-assistant-docs.netlify.app")) {
    return url;
  }

  try {
    const resultUrl = new URL(url);
    if (resultUrl.hostname !== "www.home-assistant.io" && resultUrl.hostname !== "home-assistant.io") {
      return url;
    }

    resultUrl.protocol = window.location.protocol;
    resultUrl.host = window.location.host;
    return resultUrl.toString();
  } catch (err) {
    return url;
  }
}
