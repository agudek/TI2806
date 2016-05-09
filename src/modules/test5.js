define(function () {
    return {
    	name: "test5",
    	size: 1,
        noAjax: true,
        body: function () {
            var ret = document.createElement("div");
            var p = document.createElement("p");
            p.innerHTML='Test module 5';
            ret.appendChild(p);
            return ret;
        }
    };
});