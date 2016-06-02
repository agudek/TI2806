define(['src/resolvers/objectResolver'], function (resolver) {
    describe('isUrl test', function () {
        it('should recognize the url as valid', function () {
            var oResolver = new ObjectResolver("");
            expect(oResolver.resolveSingleObject(JSON.stringify({}))).toBe(JSON.stringify({}));
        });
    });


});