// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
     top: 20, 
     right: 40, 
     bottom: 80, 
     left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var myXAxis ='poverty';
var myYAxis = 'healthcare'


d3.csv('./assets/data/data.csv').then(function(data) {
    console.log(data);

    data.forEach(function(data){
        data.obesity = +data.obesity;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    var xLinearScale = d3.scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, d => d.poverty));

    var yLinearScale = d3.scaleLinear()
    .range([height, 0])
    .domain(d3.extent(data, d => d.healthcare));

    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .classed("axis", true)
    .call(yAxis);

    chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);



  // append circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "steelblue")
    .attr("stroke-width", "1")
    .attr("stroke", "black");
    //abbr
    var textGroup = chartGroup.selectAll('.stateText')
    .data(data)
    .enter()
    .append('text')
    .classed('stateText', true)
    .attr('x', d => xLinearScale(d.poverty))
    .attr('y', d => yLinearScale(d.healthcare))
    .attr('dy', 3)
    .attr('font-size', '10px')
    .text(function(d){return d.abbr});

    //make labels for chart
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

      //x axis label
    var PovertyLabel = labelsGroup.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", 40)
    .text("In Poverty (in %)");
    // y axis label
    var HealthcareLabel = labelsGroup.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 300)
    .attr("y", -500)
    .attr("dy", "2em")
    .classed("axis=test", true)
    .attr("transform", "rotate(-90)")
    .text("Lacks Healthcare (in %)");



}).catch(function(error) {
    console.log(error);
});
