gwa.EventDispatcher
===================

A JavaScript event dispatcher class.

## Usage

Basic usage:

~~~js
// create an event dispatcher
var dispatcher = new gwa.EventDispatcher();

// add a listener
var callback = function(arg) {
    console.log(arg);
};
var idlistener = dispatcher.on('FOO', callback);

// dispatch an event
dispatcher.dispatch('FOO', 'optional argument');

// console > 'optional argument'
~~~

More than one argument can be passed:

~~~js
// create an event dispatcher
var dispatcher = new gwa.EventDispatcher();

// add a listener
var callback = function(arg1, arg2) {
    console.log(arg1, arg2);
};
var idlistener = dispatcher.on('FOO', callback);

// dispatch an event
dispatcher.dispatch('FOO', 'optional argument 1' 'optional argument 2');

// console > 'optional argument 1'
// console > 'optional argument 2'
~~~

Listening to an event only once:

~~~js
dispatcher.once('FOO', function() {
    console.log('FOO EVENT');
});

dispatcher.dispatch('FOO');

// console > 'FOO EVENT'

dispatcher.dispatch('FOO');

// no console output
~~~

Removing listeners:

~~~js
// remove the listener by id...
dispatcher.off('FOO', idlistener);
// or remove the listener by function 
dispatcher.off('FOO', callback);

// remove all listeners for an event
dispatcher.off('FOO');

// remove all listeners
dispatcher.offAll();
~~~


