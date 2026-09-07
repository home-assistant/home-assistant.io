PhotoSwipe 5.4.4 is vendored from the `photoswipe` npm package.

Files used by the website:

- `source/javascripts/photoswipe/photoswipe-lightbox.esm.min.js`
- `source/javascripts/photoswipe/photoswipe.esm.min.js`
- `source/stylesheets/photoswipe/photoswipe.css`

PhotoSwipe is licensed under the MIT license. See `LICENSE` in this directory
and `source/stylesheets/photoswipe/LICENSE` for the stylesheet copy.

To update PhotoSwipe to a newer reviewed version, replace `5.4.4` with the
target version and run:

```bash
VERSION=5.4.4
TMP_DIR=/tmp/photoswipe-${VERSION}
npm pack photoswipe@${VERSION} --pack-destination /tmp
mkdir -p ${TMP_DIR} source/javascripts/photoswipe source/stylesheets/photoswipe
tar -xzf /tmp/photoswipe-${VERSION}.tgz -C ${TMP_DIR}
cp ${TMP_DIR}/package/dist/photoswipe-lightbox.esm.min.js \
  source/javascripts/photoswipe/photoswipe-lightbox.esm.min.js
cp ${TMP_DIR}/package/dist/photoswipe.esm.min.js \
  source/javascripts/photoswipe/photoswipe.esm.min.js
cp ${TMP_DIR}/package/dist/photoswipe.css \
  source/stylesheets/photoswipe/photoswipe.css
cp ${TMP_DIR}/package/LICENSE source/javascripts/photoswipe/LICENSE
cp ${TMP_DIR}/package/LICENSE source/stylesheets/photoswipe/LICENSE
```

After updating the files, update `lightboxVersion` in
`source/javascripts/image-lightbox.js`.
