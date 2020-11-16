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
  .attr("height", svgHeight + 40);


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
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append('g')
    .classed('x-axis', true)
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis);

    var yAxis = chartGroup.append('g')
      .classed('y-axis', true)
      .call(leftAxis);

      var circlesGroup = chartGroup.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .classed('stateCircle', true)
      .attr('cx', d => xLinearScale(d[x]))
      .attr('cy', d => yLinearScale(d[y]))
      .attr('r', 14)
      .attr('opacity', '.5');


      var textGroup = chartGroup.selectAll('.stateText')
      .data(data)
      .enter()
      .append('text')
      .classed('stateText', true)
      .attr('x', d => xLinearScale(d[x]))
      .attr('y', d => yLinearScale(d[y]))
      .attr('dy', 3)
      .attr('font-size', '10px')
      .text(function(d){return d.abbr});


}).catch(function(error) {
    console.log(error);
});
