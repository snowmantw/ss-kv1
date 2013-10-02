(function(){
window.Main = 
{
    /**
     * The bootstrap function, set the environment up.
     * It's NOT a part of main program, actually.
     * 
     * () -> ()
     */
     bootstrap: function m_bootstrap()
    {
        fluorine.Notifier.init()
        fluorine.infect()
    }

    /**
     * The main function.
     *
     * () -> IO ()
     */
    ,main: function m_main()
    {
        Event('initialize')
            .done()()
    }
}

})();


// Bootstrap code.
Main.bootstrap()
Main.main()
