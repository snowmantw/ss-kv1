/**
 * Establish connections between client and server, then forward every API
 * interaction to application events.
 *
 * These are low-level codes and full with side-effects.
 *
 * Remember that the message from server must be able to be decoded as
 * {'head': {'type': Type, ...}, {'content': ...}}
 *
 * @requires: Session.js, Events.js 
 *
 */

(function()
{
window.APIs =
{
    /**
     * These are event generator. Will generate the specific event.
     * In this way we can list all information about the event here,
     * instead scattering them about everywhere.
     *
     */

     ready: function apis_ready()
    {
        return 'apis.ready'
    }

    ,unusable: function apis_unusable()
    {
        return 'apis.unusable'
    }

    ,vanillaGenerator: function apis_vanillaGenerator(msg)
    {
        return {'apis.' + msg.head.type, msg.contnet}
    }

    /**
     * Establish the connection between client and server.
     *
     * () -> ()
     */
    ,init: function apis_init()
    {
        var socket = new WebSocket(Session.url_socket)
        socket.onopen = function apis_init_onopen()
        {
            Events.trigger(APIs.ready())
        }
        socket.onclose = function apis_init_onclose()
        {
            Events.trigger(APIs.unusable())
        }
        socket.onmessage = APIs.forwardMessage 
    }

    /**
     * Forward system messages to applicaton events.
     *
     * WebSocketEvent -> () 
     */
    ,forwardMessage: function apis_forwardMessage(evt)
    {
        var msg = JSON.parse(evt.data)

        // If we have special case, we can handle them here to call
        // other generator.
        switch(msg.head.type)
        {
            default:
                Events.trigger(APIs.vanillaGenerator(msg))
        }
    }
}    

})();
