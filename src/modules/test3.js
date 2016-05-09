define(function () {
    return {
    	name: "test3",
    	size: 2,
        noAjax: true,
        body: function () {
            var ret = document.createElement("div");
            var p = document.createElement("p");
            p.innerHTML='Test module 3';
            ret.appendChild(p);
            return ret;
        }
    };
});