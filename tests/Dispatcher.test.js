define(['Gwa.Event.Dispatcher'], function( Dispatcher ) {

	describe("A dispatcher", function() {

		it("can be constructed", function() {
			var dispatcher = new Dispatcher();
			expect(dispatcher).toBeDefined();
		});

		it("can have a listener function added", function() {
			var dispatcher = new Dispatcher();
			dispatcher.on('myevent', function() {});
			expect(dispatcher.getListeners).toBeDefined();
			expect(typeof dispatcher.getListeners).toEqual('function');
			expect(typeof dispatcher.getListeners()).toEqual('object');
			expect(typeof dispatcher.getListeners()['myevent'][1]).toEqual('object');
		});

		it("can dispatch an event to listener function", function() {
			var dispatcher = new Dispatcher();
			var foo = null;
			dispatcher.on('myevent', function() {
				foo = 'bar';
			});
			expect(foo).toBeNull();
			dispatcher.dispatch('myevent');
			expect(foo).toEqual('bar');
		});

		it("can dispatch an event to listener function only once", function() {
			var dispatcher = new Dispatcher();
			var foo = null;
			dispatcher.once('myevent', function(arg) {
				foo = arg;
			});
			expect(foo).toBeNull();
			dispatcher.dispatch('myevent', 'bar');
			expect(foo).toEqual('bar');
			dispatcher.dispatch('myevent', 'baz');
			expect(foo).toEqual('bar');
		});

		it("can dispatch an event to more than one listener function", function() {
			var dispatcher = new Dispatcher();
			var foo = null;
			var baz = null;
			dispatcher.on('myevent', function() {
				foo = 'bar';
			});
			dispatcher.on('myevent', function() {
				baz = 'qux';
			});
			dispatcher.dispatch('myevent');
			expect(foo).toEqual('bar');
			expect(baz).toEqual('qux');
		});

		it("can pass a parameter to listener functions", function() {
			var dispatcher = new Dispatcher();
			var foo = null;
			var func = function( param ) {
				foo = param;
			}
			dispatcher.on('myevent', func);
			dispatcher.dispatch('myevent', 'bar');
			expect(foo).toEqual('bar');
		});

		it("can pass a more than one parameter to listener functions", function() {
			var dispatcher = new Dispatcher();
			var foo = null;
			var baz = null;
			var func = function( param1, param2 ) {
				foo = param1;
				baz = param2;
			}
			dispatcher.on('myevent', func);
			dispatcher.dispatch('myevent', 'bar', 'qux');
			expect(foo).toEqual('bar');
			expect(baz).toEqual('qux');
		});

		it("can have a listener function removed", function() {
			var dispatcher = new Dispatcher();
			var foo = null;
			var foo2 = null;
			var func = function( param ) {
				foo = param;
			};
			var func2 = function( param ) {
				foo2 = param;
			};
			dispatcher.on('myevent', func);
			dispatcher.on('myevent', func2);
			expect(foo).toBeNull();
			dispatcher.dispatch('myevent', 'bar');
			expect(foo).toEqual('bar');
			expect(foo2).toEqual('bar');
			dispatcher.off('myevent', func);
			dispatcher.dispatch('myevent', 'baz'); // won't affect foo, will affect foo2
			expect(foo).toEqual('bar');
			expect(foo2).toEqual('baz');
		});

		it("can have a listener function removed by index", function() {
			var dispatcher = new Dispatcher();
			var foo = null;
			var func = function( param ) {
				foo = param;
			};
			var index = dispatcher.on('myevent', func);
			expect(index).toEqual(1);
			expect(foo).toBeNull();
			dispatcher.dispatch('myevent', 'bar');
			expect(foo).toEqual('bar');
			var removed = dispatcher.off('myevent', index);
			expect(removed).toBeTruthy();
			dispatcher.dispatch('myevent', 'baz'); // won't affect foo
			expect(foo).toEqual('bar');
		});

	});

});
