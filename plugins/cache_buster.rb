module Jekyll
  module CacheBuster
    require 'digest/md5'

    # Cache digests per file so each asset is read and hashed once per
    # build instead of once per page. Keyed on the file's mtime, so edits
    # during `--watch` sessions still produce a fresh digest.
    DIGEST_CACHE = {}

    def cache_buster(file_name)
      path = File.join('./source', file_name)
      mtime = File.mtime(path)

      cached = DIGEST_CACHE[file_name]
      unless cached && cached[0] == mtime
        cached = [mtime, Digest::MD5.hexdigest(File.read(path))]
        DIGEST_CACHE[file_name] = cached
      end

      [file_name, '?', cached[1]].join
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBuster)
