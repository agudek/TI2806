describe("Hello world", function () {
    it("says hello", function () {
        var hello = "Hello world!";
        console.log(hello);
        expect(hello).toEqual("Hello world!");
    });
});