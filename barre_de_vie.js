
function healthBar(w,h,maxHealth,color){
	this.w = w;
	this.h = h;
	this.maxWidth = w;
	this.maxHealth = maxHealth;
	this.color=color;
	this.health=maxHealth;
}

var healthBar1 = new healthBar (300,50,100,"green");

function updateHealth(value){
	if(healthBar1.health+value<=100){
		healthBar1.health += value;
		healthBar1.w = ((healthBar1.health/healthBar1.maxHealth )*healthBar1.maxWidth);
		console.log(healthBar1.health,healthBar1.w)
		d3.select("#healthBar")
			.attr("width",healthBar1.w)}
	else{
		healthBar1.health=100
		healthBar1.w = ((healthBar1.health/healthBar1.maxHealth )*healthBar1.maxWidth);
		d3.select("#healthBar")
			.attr("width",healthBar1.w)}
		if(healthBar1.health<30){
			d3.select("#healthBar")
				.attr("fill","red")
		}else{
			if(healthBar1.health<70 && healthBar1.health>30){
				d3.select("#healthBar")
					.attr("fill","yellow")
			}else{
				d3.select("#healthBar")
					.attr("fill","green")}
			}
		if(healthBar1.health==0 ||healthBar1.health<=0 ){
			alert("Vous êtes mort.")
		}
}

function healthBarr(){

	d3.select("#barreVie").append("svg").attr("id","healthBarSVG").attr("width",healthBar1.maxWidth).attr("height",healthBar1.h)
	d3.select("#healthBarSVG")
		.append("rect")
		.attr("width",healthBar1.maxWidth)
		.attr("height",healthBar1.h)
		.style("stroke", "black");
	d3.select("#healthBarSVG")
		.append("rect")
		.attr("id","healthBar")
		.attr("width",healthBar1.w)
		.attr("height",healthBar1.h)
		.style("stroke","black")
		.style("fill",healthBar1.color);

}
