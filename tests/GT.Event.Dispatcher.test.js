define(['GT.Event.Dispatcher'], function( Dispatcher ) {

	describe("A dispatcher", function() {

		it("can be constructed", function() {
			var dispatcher = new Dispatcher();
			expect(dispatcher).toBeDefined();
		});

		it("have a listener added", function() {
			var dispatcher = new Dispatcher();
			dispatcher.on('myevent', function() {});
			expect(dispatcher.getListeners).toBeDefined();
		});

	});

});
