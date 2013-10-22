(function(){
window.Demo = 
{
     activities_stream: function dm_activities_stream()
    {
        // Because in the future our data will not come from the page.
        var mock_note = UI('#template-demo-note').$().html().done()().extract()
        var title = "Test Note"
        var datum = {_title_: title, _html_note_: mock_note}
        var tpl_note = UI('#template-activity-detail-mainframe-note').$().html().done()().extract() 

        // Pure code. Only manipulating HTMLs.
        var html_note = _.template(tpl_note)(datum)

        return UI('#stream-activities').$().as('stream')
            .append(html_note)
            .done()
    }
        
}
})();
