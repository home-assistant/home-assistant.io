module Jekyll
  class DetailsBlock < Liquid::Block

    def initialize(tag_name, title, tokens)
      super
      @title = title
    end

    def render(context)
      contents = super(context)
      if @title.nil? || @title.empty? then
        title = "More info"
      else
        title = @title
      end
      title = title.to_s.delete("\"")

      <<~MARKUP
        <script>
        function showDetails(el) {
          const content = el.parentElement.querySelector(".details-block-content");
          const up = el.querySelector("svg#up");
          const down = el.querySelector("svg#down");
          up.style.display = up.style.display === "none" ? "block" : "none";
          down.style.display = down.style.display === "none" ? "block" : "none";
          content.hidden = !content.hidden;
        }
        </script>
        <div class="details-block">
          <div class='details-block-item'>
            <div class='details-block-title' onclick='showDetails(this)'>
              #{title}
              <svg id="down" style="display: block;" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
              <svg id="up" style="display: none;" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>
            </div>
            <div class='details-block-content' hidden>#{contents}</div>
          </div>
        </div>
      MARKUP
    end
  end
end

Liquid::Template.register_tag('details', Jekyll::DetailsBlock)