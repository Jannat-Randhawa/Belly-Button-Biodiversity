// Select a global variable 
var globalJson = null;
d3.json("samples.json").then((data) => {
    console.log(data); 
});

// create function for redering the data 
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

        // Build Gauge
        var dataGauge = [
            {
                domain: {x:[0,1], y: [0,1]},
                value: results.wfreq,
                title: {text: `Weekly washing frequency`},
                type: "indicator", 
                mode: "gauge+number",
                gauge: {axis: {range: [null, 10] },
                            steps: [
                                {range: [0,2], color: "White" },
                                {range: [2,4], color: "cornsilk"},
                                {range: [4,6], color: "LightPink"},
                                {range: [6,8], color: "PaleVioletRed"},
                                {range: [8,10], color: "MediumVioletRed"}
                            ]}
            }
        ];

        var layoutGauge = {
            width: 700,
            height: 700
        };
        
        Plotly.newPlot('gauge', dataGauge, layoutGauge);

        var samples = globalJson.samples;
        var idData = samples.filter(sample => parseInt(sample.id)=== parseInt(ID));
        console.log(idData);
        // Make variables for the graph.
        var otu_ID = idData[0].otu_ids;
        //console.log(otuIDs);
        
        // select top ten otu_ids
        var otu_ids = idData[0].otu_ids.slice(0,10).map(i => "OTU_" + i); 
        // console.log(idOtu)

        //select top ten otu_labels 
        var otuLabels = idData[0].otu_labels.slice(0,10);
        // console.log(otuLabels);
       
       // Select top 10 sample values 
        var sample_values = idData[0].sample_values;
        // console.log(sample_values);
        var topSamples = idData[0].sample_values.slice(0,10).reverse();
        // console.log(topSamples);
    
      // BAR GRAPHS
        var trace = {
            x: topSamples ,
            y: otu_ids,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        
        var data = [trace];
        
        var layout = {
            title: "Top Ten OTU ID",
            margin: {
                l: 130,
                r: 85,
                t: 30,
                b: 30
              }
        };
        
        Plotly.newPlot("bar", data, layout);

        // BUBBLE GRAPHS
        var trace2  = {
            x: otu_ID, 
            y: sample_values, 
            text: otuLabels, 
            mode: 'markers', 
            marker: {
                size: sample_values,
                color: otu_ID
            }
        }; 

        var data2 = [trace2]; 

        var layout2 = {
            height: 700, 
            width: 1000, 
        };

        Plotly.newPlot('bubble', data2, layout2);
};

        

function optionChanged(change){
    getInfo(change);
};

init()



