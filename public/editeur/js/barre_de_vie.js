


function healthBar(){
	var svg = d3.select('.progress')
		.append('svg')
		.attr('height', 100)
		.attr('width', 500);

	var states = ['completed', 'inProgress', 'started'],
	    segmentWidth = 100,
		currentState = 'completed';


	var colorScale = d3.scale.ordinal()
		.domain(states)
		.range(['yellow', 'orange', 'green']);

	svg.append('rect')
		.attr('class', 'bg-rect')
		.attr('rx', 10)
		.attr('ry', 10)
		.attr('fill', 'gray')
		.attr('height', 15)
		.attr('width', function(){
			return segmentWidth * states.length;
		})
		.attr('x', 0);

	var progress = svg.append('rect')
					.attr('class', 'progress-rect')
					.attr('fill', function(){
						return colorScale(currentState);
					})
					.attr('height', 15)
					.attr('width', 0)
					.attr('rx', 10)
					.attr('ry', 10)
					.attr('x', 0);

	progress.transition()
		.duration(1000)
		.attr('width', function(){
			var index = states.indexOf(currentState);
			return (index + 1) * segmentWidth;
		});


	function moveProgressBar(state){
			progress.transition()
				.duration(1000)
				.attr('fill', function(){
					return colorScale(state);
				})
				.attr('width', function(){
					var index = states.indexOf(state);
					return (index + 1) * segmentWidth;
				});
		}
	moveProgressBar("started")
}