/**
 * Low-level event manager, full with side-effect.
 *
 */

(function(){
window.Events =
{
    /**
     * Trigger event, in a convenient way.
     *
     * Name -> Data|undefined -> ()
     */
     trigger: function em_trigger(name, data)
    {
        let evt = window.CustomEvent(name, data) 
        window.dispatchEvent(evt)       
    } 

    /**
     * Hook on global events.
     * When pass object in, it must implement the 'handleEvent' method as
     * specification.
     *
     * Name -> Object|Function -> ()
     */
    ,on: function em_on(name, handler)
    {
        window.addEventListener(name, handler)
    }

    /**
     * Remove global event binder.
     *
     * Name -> Object|Function -> ()
     */
    ,off: function em_off(name, handler)
    {
        window.removeEventListener(name, handler)
    }
}

})();
