define(function () {
    return {
    	name: "test1",
    	size: 3,
        noAjax: false,
        body: function () {
            var ret = document.createElement("div");
            var p = document.createElement("p");
            p.innerHTML='Test module 1';
            ret.appendChild(p);
            return ret;
        }
    };
});