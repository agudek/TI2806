/* globals define */
define(function () {
    return {
    	name: "no-name",
        title: "No title",
    	size: 1,
        parentSelector: "#bodyrow",
        xAxisLabel: "",
        yAxisLabel: "",
        yRightAxisLabel: "",
        xAxisLine: true,
        yAxisLine: true,
        yRightAxisLine: true,
        xAxisTicks: true,
        yAxisTicks: true,
        yRightAxisTicks: false,
        xAxisLabelRotation: 0,
        yAxisLabelRotation: 0,
        yRightAxisLabelRotation: 0,
        xAxisScale: function() { return "fit" },
        yAxisScale: function() { return "fit" },
        yRightAxisScale: function() { return "fit" },
        xAxis: true,
        yAxis: true,
        yRightAxis: false,
        data: [],
        body: document.createElement('g'),
        failBody: document.createElement('g'),
        customContainer: false
    };
});