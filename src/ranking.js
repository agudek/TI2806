var Rank = function () {
    var RE = new REmap();
    var FR = new FRmap();
    var RF = new RFmap();
    var Dr = {
        "ranking_js": ["marco", "leendert", "borek"],
        "testing_js": []
    }
    function Dr(f) {
        return Dr.f;
    }
    function Dru() {
        var reviewers = [];
        for (var i = 0; i < Object.keys(Dr).length; ++i) {
            for (var j = 0; j < Dr[i].length; ++j) {
                var reviewer = Dr[i][j];
                if (typeof reviewers[reviewer] == 'undefined') {
                    reviewers.push(reviewer);
                }
            }
        }
        return reviewers;
    }
    
    function xFactor(r, f) {
        var reviewer = RE.RE(r, f);
        var file = FR.FR(f);
        var val = (reviewer.f.C / file.C) + (reviewer.f.W / file.W);
        if (Math.abs(reviewer.f.T - file.T) == 0) {
            val += 1;
        } else {
            val += 1 / (reviewer.f.T - file.T);
        }
    }

    function Score(r) {
        var val = 0;
        for (var i = 0; i < RE.getFiles(r) ; ++i) {
            var f = RE.getFiles(r)[i];
            val += xFactor(r, f);
        }
    }
};

var REmap = function () {
    var map = {
        'marco': {
            'ranking_js': {
                'C': 0,
                'W': 0,
                'T': 0
            }
        }
    };

    this.RE = function (r, f) {
        f = f.replace('.', '_');
        return map.r.f;
    };

    this.addReviewer = function (r, f) {
        map.r = f;
    };
    this.addFile = function (r, f, C, W, T) {
        f = f.replace('.', '_');
        map.r = {};
        map.r.f = {
            'C': C,
            'W': W,
            'T': T
        };
    };

    this.getFiles = function (r) {
        return Object.keys(map.r);
    }
};

var FRmap = function () {
    var map = {
        'ranking_js': {
            'C': 0,
            'W': 0,
            'T': 0
        }
    };

    this.FR = function (f) {
        f = f.replace('.', '_');
        return map.f;
    };
    this.addFile = function (f, C, W, T) {
        map.f = {
            'C': C,
            'W': W,
            'T': T
        };
    };
};

var RFmap = function () {
    var map = {
        'marco': 0
    };
    
    this.addScore = function (r, s) {
        map.r = s;
    };
    this.RF = function (m) {
        var arr = new Array();
        for (var i = 0; i < Object.keys(map).length; ++i) {
            var x = new Array();
            x.push(Object.keys(map)[i]);
            x.push(map[i]);
        }
        arr.sort(function (a, b) { return (b[1] - a[1]); });
        return arr.slice(0, m);
    }
}