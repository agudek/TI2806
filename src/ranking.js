var Rank = function () {
    var RE = new REmap();
    var FR = new FRmap();
    var DR = new DRmatrix();
    var RF = new RFmap();
    
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
    function Scores() {
        var dru = DR.dru();
        for (var i = 0; i < dru.length; ++i) {
            var r = dru[i];
            RF.addScore(r, Score(r));
        }
    }

    this.addReviewer = function (uname, files) {
        var r = ''; // reviewer name
        var f = []; // reviewer files
        RE.addReviewer(r, f);
        for (var i = 0; i < files.length; ++i) {
            var fname = '';
            var C = '';
            var W = '';
            var T = '';
            RE.addFile(r, fname, C, W, T);
        }

    };
    this.addFiles = function (files) {
        for (var i = 0; i < files.length; ++i) {
            var fname = '';
            var C = '';
            var W = '';
            var T = '';
            FR.addFile(f, C, W, T);
        }
    };
    this.rank = function (m) {
        return RF.RF(m);
    };

    DR.add(RE);
    Scores();

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

        this.getReviewers = function () {
            return Object.keys(map);
        }
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

    var DRmatrix = function () {
        var map = {
            'ranking_js': ['marco', 'leendert', 'borek'],
            'testing_js': []
        };

        this.add = function (RE) {
            for (var i = 0; i < RE.getReviewers().length; ++i) {
                var r = RE.getReviewers()[i];
                var files = RE.getFiles(r);
                for (var j = 0; j < files.length; ++j) {
                    var f = RE.getFiles(r)[j];
                    if (typeof map.f == 'undefined') {
                        map.f = [];
                    }
                    map.f.push(r);
                }
            }
        };
        this.dr = function (f) {
            return map.f;
        };
        this.dru = function () {
            var reviewers = [];
            for (var i = 0; i < Object.keys(map).length; ++i) {
                for (var j = 0; j < map[i].length; ++j) {
                    var reviewer = map[i][j];
                    if (typeof reviewers[reviewer] == 'undefined') {
                        reviewers.push(reviewer);
                    }
                }
            }
            return reviewers;
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
        };
    };
};