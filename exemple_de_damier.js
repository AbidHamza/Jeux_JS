    distance =  rayon - (Math.sin(1 * Math.PI / 3) * rayon);  // Distance latérale entre le point et le cercle
    let width = (nbColonnes+1)*(rayon-distance)*2;
    let height = nbLignes*(rayon-distance)*2;
    d3.select("#damier")
       .append("svg")
       .attr("width", width)
       .attr("height", height);
    let d = creeHexagone();

    // Le pochoir en forme d'hexagone
    d3.select("svg")
       .append("clipPath")
       .attr("id", "clip")
       .append("path")
       .attr("d", d);

    for (let type of types) {
       d3.select("svg")
          .append("image")
          .attr("id", type)
          .attr("xlink:href", images[type])
          .attr("clip-path", "url(#clip)");
    }

    d3.select("svg")
      .append("image")
      .attr("id", "modeleRadeauRobinson")
      .attr("xlink:href", imageRadeauSurLaMer)
      .attr("clip-path", "url(#clip)");
 
    for (var l=0; l < nbLignes; l++) {
      for (var c=0; c < nbColonnes; c++) {
         let opacity = 0.2;
         let zone = "ile";
         if (mer(l, c)) opacity = 1.0;
         if (zoneDeDepart(l, c)) zone = "zoneDeDepart";
         d3.select("svg")
            .append("use")
            .style("opacity", opacity)
            .attr("id", l+":"+c)
            .attr("class", zone)
            .attr("xlink:href", "#"+types[modele[l][c]])
            .attr("x", (c*(rayon-distance)*2)+decalageDemiColonne(l))
            .attr("y", (l*(rayon-distance*2)*2));
       }
    }
