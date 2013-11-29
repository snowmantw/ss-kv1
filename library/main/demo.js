(function(){
window.Demo = 
{
     activities_detail_note: function dm_activities_detail_note()
    {
        // Because in the future our data will not come from the page.
        var mock_note = UI('#template-demo-note').$().html().done()().extract()
        var title = "The text-overflow declaration allows you to deal with clipped text: that is, text that does not fit into its box."
        var datum = {_title_: title, _html_note_: mock_note}
        var tpl_note = UI('#template-activity-detail-mainframe-note').$().html().done()().extract() 

        // Pure code. Only manipulating HTMLs.
        var html_note = _.template(tpl_note)(datum)

        return UI('#stream-activities').$().as('stream')
            .append(html_note)
            .tie(function(dom)
            { 
              return UI(dom).$().select('.note-wrapper').children().eq(0).addClass('fix-first').done()
            })
            .done()
    }

    ,activities_stream: function dm_activities_stream(category)
    {
        var mock_note_summary = 
          { '_title_': "Lorem Ipsum Note Title Dummy Mock Void Null"
          , '_digest_': "From health to home, money to food, family, travel, work, holidays and more, Reader's Digest focuses on"
          , '_datetime_': Date.now()
          , '_author_': "Bocha Uois"
          , '_id_': 'some-mock-activity-hashid-can-be-retrived'
          , '_category_': category
          }
        var msg =
          { 'head': 
            { 'type': 'new-activity-shared'
            , 'category': 'note'    // Should be dispatched to generate specified class of activity.
            , 'timestamp': Date.now()
            }
          , 'content': mock_note_summary
          }

        var tpl_act = UI('#template-activity-summary').$().html().done()().extract() 
        var html_act = _.template(tpl_act)(mock_note_summary)

        return UI(html_act).$().as('activity')
          .prependTo('#list-activities').tie(function() {
            return UI(this.activity).$().select('.title').forward('click', function(e) {
              var content = $(e.target).parent().find('.content');
              if (content.hasClass('show'))
              {
                content.removeClass('show')
              }
              else
              {
                content.addClass('show')
              }
              return '_'
            })
            .done()
          })
          .tie(function() {
            return UI(this.activity).$().select('.content .expand').forward('click', function(e) {
              $('#stream-activities').empty()
              Demo.activities_detail_note()()
              return '_'
            })
            .done()
          })
          .done()
    }
        
}
})();
