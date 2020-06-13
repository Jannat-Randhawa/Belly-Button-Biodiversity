var dropDown = d3.select("#selDataset").on("change", optionChanged); 


function top10bar (ID){
    d3.json("samples.json").then((data) => {
        var samples = data.samples
        // console.log(samples);
        var idData = samples.filter(sample => parseInt(sample.id)=== ID); 
        // console.log(idData)
        var idOtu = idData[0].otu_ids.slice(0,10); 
        // console.log(idOtu)
        var idOturev = idOtu.reverse();
        console.log(idOturev);
        var labels = idOtu.map(i => "OTU_" + i);
        console.log(labels);
        var otuLabels = idData[0].otu_labels.slice(0,10);
        console.log(otuLabels)
        var topSamples = idData[0].sample_values.slice(0,10);
        console.log(topSamples);
        var topSamplesrev = topSamples.reverse();
        console.log(topSamplesrev);

        var trace = {
            x: topSamplesrev ,
            y: labels,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        
        var data = [trace];
        
        var layout = {
            title: "Top Ten OTU ID"
        };
        
        Plotly.newPlot("bar", data, layout);
    });

};

function init() {
    d3.json("samples.json").then((data) => {
        var names = data.names; 
        console.log(names);
        names.forEach((sample) => {
            dropDown
              .append("option")
              .text(sample)
              .property("value", sample);
          });
    });
    top10bar(940)

};

function optionChanged(change){
    top10bar(change)
    
}; 

init()






