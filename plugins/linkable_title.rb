module Jekyll	
  class LinkableTitleTag < Liquid::Tag	
    def initialize(tag_name, text, token)	
      super	
      @title = text	
    end	

     def render(context)	
      title = Liquid::Template.parse(@title).render context	
      "#{title}"	
    end	
  end	
end	

 Liquid::Template.register_tag('linkable_title', Jekyll::LinkableTitleTag)