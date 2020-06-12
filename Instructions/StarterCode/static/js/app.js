var dropDown = d3.select("#selDataset"); 


function top10bar (ID){
    d3.json("samples.json").then((data) => {
        var samples = data.samples
        console.log(samples);
        ID =  parseInt(ID)
        var idData = samples.filter(sample => parseInt(sample.id)=== ID); 
        console.log(idData)
        var idOtuData = idData[0].otu_ids.slice(0,10); 
        console.log(idOtuData)
        var topSamples = idData[0].sample_values.slice(0,10);

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
}

function optionChanged(change){
    top10bar(change)
}
init()




