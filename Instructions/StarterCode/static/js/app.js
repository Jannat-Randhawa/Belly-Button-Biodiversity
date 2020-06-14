var globalJson = null;
var dropDown = d3.select("#selDataset");


function init () {
    d3.json("samples.json").then((data) => {

        globalJson = data; 
        var names = globalJson.names; 
        console.log(names);
        names.forEach((sample) => {
            dropDown
              .append("option")
              .text(sample)
              .property("value", sample);
          });
    });
    
    // top10bar(940);
    getInfo(940);

};

function getInfo(ID) {  
    var metadata = globalJson.metadata;
    var results = metadata.filter(d => parseInt(d.id) === parseInt(ID))[0];
    var demoInfo = d3.select("#sample-metadata");
    console.log(results);
    demoInfo.html("");
    Object.entries(results).forEach(([key, value]) => {
        demoInfo.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
};

function optionChanged(change){
    // top10bar(change);
    getInfo(change);   
}; 

init()







