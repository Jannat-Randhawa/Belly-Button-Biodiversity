var dropDown = d3.select("#selDataset")

});

function top10bar (ID){
    d3.json("samples.json").then((data) => {
        var samples = data.samples
        // console.log(samples);
        var idData = samples.filter(sample => parseInt(sample.id)=== parseInt(ID)); 
        // console.log(idData)
        var otuIDs = idData[0].otu_ids;
        console.log(otuIDs);
        var idOtu = idData[0].otu_ids.slice(0,10); 
        // console.log(idOtu)
        var IDotu = idOtu.map(i => "OTU_" + i);
        console.log(IDotu);
        var otuLabels = idData[0].otu_labels.slice(0,10);
        console.log(otuLabels);
        var sampleValues = idData[0].sample_values;
        console.log(sampleValues);
        var topSamples = idData[0].sample_values.slice(0,10);
        console.log(topSamples);
        var topSamplesrev = topSamples.reverse();
        console.log(topSamplesrev);


        var trace = {
            x: topSamplesrev ,
            y: IDotu,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        
        var data = [trace];
        
        var layout = {
            title: "Top Ten OTU ID"
        };
        
        Plotly.newPlot("bar", data, layout);

        var trace2 = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIDs
            }
        };

        var data2 = [trace2]; 

        var layout2 = {
            title: 'Bubble Chart',
            height: 600,
            width: 1000
        };
        
        Plotly.newPlot('bubble', data2, layout2);   
    });
    
};

function getInfo(ID){
    d3.json("samples.json").then((data) => {
        var demoInfo = d3.select("#sample-metadata");
        var metadata = data.metadata;
        var results = metadata.filter(d => parseInt(d.id) === parseInt(ID))[0];
        console.log(results);
        demoInfo.html("");
        Object.entries(results).forEach(([key, value]) => {
            demoInfo.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
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
    
    top10bar(940);
    getInfo(940);

};

function optionChanged(change){
    top10bar(change);
    getInfo(change);
    
}; 



init()






