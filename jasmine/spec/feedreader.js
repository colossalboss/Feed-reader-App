/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* Placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('name defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            }
        });
    });


    /* A new test suite named "The menu" */

    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('menu is hidden', function() {
            const target = document.querySelector('body');
            expect(target.classList.contains('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('menu changes visibility', function() {
            const target = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            expect(target.classList.contains('menu-hidden')).toBe(true);
            menu.click();
            expect(target.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(target.classList.contains('menu-hidden')).toBe(true);


        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('completes its work', function() {
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
        });
    });


    /* A new test suite named "New Feed Selection" */
    describe('New feed Selection', function() {

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        const feed = document.querySelector('.feed');
        const firstFeed = [];

        beforeEach(function(done) {
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry) {
                firstFeed.push(entry.innerText);
            });
            loadFeed(1, done);
        });

        it('changes content', function() {
            Array.from(feed.children).forEach(function(entry, idx) {
                expect(entry.innerText === firstFeed[idx]).toBe(false);
            });
        });

    });
}());
