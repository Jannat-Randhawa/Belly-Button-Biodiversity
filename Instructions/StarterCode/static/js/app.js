// Select a global variable 
var globalJson = null;
d3.json("samples.json").then((data) => {
    console.log(data); 
});

function init() {
    d3.json("samples.json").then((data) => { 
        
        // set the data to a global so we don't have to parse again
        globalJson = data;

        var names  = globalJson.names; 
        
        names.forEach((sample) => {
            
            d3.select("#selDataset")
              .append("option")
              .text(sample) 
          });

          var selectedName = d3.select("#selDataset").node().value
          // update the first id on load
          getInfo(selectedName);
          graphUpdate(selectedName);
    });  
}; 

function getInfo(ID) {  
        var metadata = globalJson.metadata;
        var demoInfo = d3.select("#sample-metadata");
        var results = metadata.filter(d => parseInt(d.id) === parseInt(ID))[0];
        console.log(results);
        demoInfo.html("");
        Object.entries(results).forEach(([key, value]) => {
            demoInfo.append("h6").text(`${key.toUpperCase()}: ${value}`);
      }); 

        var samples = globalJson.samples;
        var idData = samples.filter(sample => parseInt(sample.id)=== parseInt(ID));
        console.log(idData);
        var otu_ID = idData[0].otu_ids;
        //console.log(otuIDs);
        var otu_ids = idData[0].otu_ids.slice(0,10); 
        // console.log(idOtu)
        var otu_idsLabels = otu_ids.map(i => "OTU_" + i);
        // console.log(otu_idsLabels);
        var otuLabels = idData[0].otu_labels.slice(0,10);
        // console.log(otuLabels);
        var sample_values = idData[0].sample_values;
        // console.log(sample_values);
        var topSamples = idData[0].sample_values.slice(0,10);
        // console.log(topSamples);
        var topSamplesrev = topSamples.reverse();
        // console.log(topSamplesrev);
    

        var trace = {
            x: topSamplesrev ,
            y: otu_idsLabels,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        
        var data = [trace];
        
        var layout = {
            title: "Top Ten OTU ID"
        };
        
        Plotly.newPlot("bar", data, layout);
}

function optionChanged(change){
    getInfo(change);
};

init()



