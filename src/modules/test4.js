define(function () {
    return {
    	name: "test4",
    	size: 2,
        noAjax: true,
        body: function () {
            var ret = document.createElement("div");
            var p = document.createElement("p");
            p.innerHTML='Test module 4';
            ret.appendChild(p);
            return ret;
        }
    };
});