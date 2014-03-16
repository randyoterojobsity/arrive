jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

$(function() {

    describe("Arrive", function() {

        describe("Arrive Event Tests", function() {

            describe("Event unbinding tests", function() {
                var eventFired, 
                    selector = ".test-elem";
                    callback = function() {
                        eventFired = true;
                    };


                beforeEach(function() {
                    eventFired = false;
                    $(document).arrive(selector, callback);
                });

                it("arrive event should not be fired when unbind is called", function(done) {
                    $(document).unbindArrive();
                    $("body").append($("<div class='test-elem'></div>"));

                    setTimeout(function() {
                        expect(eventFired).not.toBeTruthy();
                        done();
                    }, 400);
                });

                it("arrive event should not be fired when unbind is called with selector as an argument", function(done) {
                    $(document).unbindArrive(selector);
                    $("body").append($("<div class='test-elem'></div>"));

                    setTimeout(function() {
                        expect(eventFired).not.toBeTruthy();
                        done();
                    }, 400);
                });

                it("arrive event should not be fired when unbind is called with callback as an argument", function(done) {
                    $(document).unbindArrive(callback);
                    $("body").append($("<div class='test-elem'></div>"));

                    setTimeout(function() {
                        expect(eventFired).not.toBeTruthy();
                        done();
                    }, 400);
                });

                it("arrive event should not be fired when unbind is called with selector and callback as arguments", function(done) {
                    $(document).unbindArrive(selector, callback);
                    $("body").append($("<div class='test-elem'></div>"));

                    setTimeout(function() {
                        expect(eventFired).not.toBeTruthy();
                        done();
                    }, 400);
                });
            });

            describe("Selector involving single element: .test-elem", function() {
                var selector = ".test-elem";

                it("event should be fired when element with specified class is injected to DOM", function(done) {
                    $(document).arrive(selector, done);
                    $("body").append($("<div class='test-elem'></div>"));
                });

            });

            describe("Selector involving nested elements: div.container1 .container2 .btn.red", function() {
                var selector = "div.container1 .container2 .btn.red";
                $("body").append("<div class='container1'></div>");

                it("event should be fired when a tree is inserted and it contains an element which satisfy the selector", function(done) {
                    $(document).unbindArrive();
                    $(document).arrive(selector, done);
                    $("body .container1").append($("<div class='container2'><span class='btn red'></span></div>"));
                });

                it("event should be fired when target element is directly injected in DOM", function(done) {
                    $("body .container1").children().remove();
                    $(document).unbindArrive();
                    $(document).arrive(selector, done);
                    $("body .container1").append($("<div class='container2'>"));
                    $("body .container1 .container2").append($("<span class='btn red'></span>"));
                });

            });

        });

        describe("Leave Event Tests", function() {
            var selector = ".test-elem";

            it("event should be fired when element with specified class is removed from DOM", function(done) {
                $(".test-elem").remove(); // remove any previous test element in DOM
                $("body").append($("<div><div class='test-elem'></div></div>"));
                $(document).leave(selector, done);
                $(".test-elem").remove();
            });

            describe("Selector involving nested elements: div.container1 .container2 .btn.red", function() {
                var selector = ".btn.red";

                beforeEach(function() {
                    $(".btn.red").remove();
                    $("body").append("<div class='container1'><div class='container2'><span class='btn red'></span></div></div>");
                });

                it("event should be fired when a tree is removed and it contains an element which satisfy the selector", function(done) {
                    $(document).unbindLeave();
                    $(document).leave(selector, done);
                    $(".container2").remove();
                });

                it("event should be fired when target element is directly removed from DOM", function(done) {
                    $(document).unbindLeave();
                    $(document).leave(selector, done);
                    $(".btn.red").remove();
                });

            });
        });
    });

});
