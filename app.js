//filter/dropdown
function init()
{
    var dropdownMenu = d3.select("#selDataset");
    //var dataset = dropdownMenu.property("value");
    d3.json("samples.json").then((dataset)=>
        {
            console.log(dataset.names);
            var sampleNames = dataset.names;
            sampleNames.forEach((sample)=>
            {
                dropdownMenu.append("option").text(sample).property("value",sample);
            });
            var first = sampleNames[0]
            build(first)
            buildplots(first)
        });
}
init();

//create summary stats
function build(sample)
{
    d3.json("samples.json").then((dataset) => 
    {
        console.log(dataset);
        var sampleMetadata = dataset.metadata;

        var results = sampleMetadata.filter(s=>s.id == sample);
        console.log(results);

        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(results[0]).forEach(([key,value])=>
        {
            panel.append("h6").text(`${key}:${value}`);
        });
    });
};


//bar/bubble
function buildplots(sample)
{
    d3.json("samples.json").then((dataset) => 
    {
        console.log(dataset);
        var samples = dataset.samples;
        var results = samples.filter(s=>s.id == sample);
        console.log("results");
        console.log(results);
        var graphData = results[0];
        console.log(graphData);
        
        //bar (top 10 OTUs)
        var sample_values = graphData.sample_values;
        var otu_ids = graphData.otu_ids;
        var otu_labels = graphData.otu_labels;
        
        var barTrace = 
        {
          x: sample_values.slice(0,10).reverse(),
          y: otu_ids.slice(0,10).map(value=>`OTU ID ${value}`).reverse(),
          type: "bar",
          text: otu_labels.slice(0,10).reverse(),
          orientation: "h"
        };
        var barData = [barTrace];
        var barLayout = 
        {
          title: "Bar",
          xaxis: { title: "Sample Values"},
        };
        
        Plotly.newPlot("bar", barData, barLayout);
        
        //bubble
        var bubbleTrace = 
        {
          x: otu_ids,
          y: sample_values,
          mode: "markers",
          marker: 
          {
              color: otu_ids,
              size: sample_values
          },
          text: otu_labels
        };
        var bubbleData = [bubbleTrace];
        var bubbleLayout = 
        {
          title: "Bubble",
          xaxis: { title: "otu_id"},
          yaxis: { title: "sample_value"}
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);


        // //gauge (optional)
  
    });
};

//event read/change
function optionChanged(sample)
{
    build(sample);
    buildplots(sample);
};

  
//f1 filter&drop down - init(){}
//f2 create summary stats - build()
//f3 bar/bubble - buildplots()
//f4 read changes and change f1 f2 f3 - optionChanged
