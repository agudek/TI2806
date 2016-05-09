define(function () {
    return {
    	name: "test6",
    	size: 1,
        noAjax: true,
        body: function () {
            var ret = document.createElement("div");
            var p = document.createElement("p");
            p.innerHTML='Test module 6';
            ret.appendChild(p);
            return ret;
        }
    };
});