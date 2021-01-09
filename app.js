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
        var sampleMetadata = dataset.samples.metadata;

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
function buildplots(data)
{
    d3.json("samples.json").then((data) => 
    {
        console.log(data);
        
        var otu_ids = data.otu_ids;
        var otu_labels = data.otu_labels;
        var sampleValues = data.sample_values;      

        let barChart=
        [
           var barTrace = 
            {
                values: sampleValues.slice(0, 10),
                labels: otu_ids.slice(0, 10),
                hovertext: otu_labels.slice(0, 10),
                type: "bar"
            }
            var barData = [trace1]    
            var barLayout = 
            {
                title: "Top 10 OTUs",
                xaxis: {title: "x"},
                yaxis: {title: "y"}
            };
        ];
        Plotly.newPlot("bar", barData, barLayout);
        
        let bubbleData = 
        [
            {
              x: otu_ids,
              y: sampleValues,
              text: otu_labels,
              mode: "markers",
              marker: 
              {
                size: sample_values,
                color: otu_ids,
                colorscale: "Picnic"
              }
            }
        ];
  
        let bubbleLayout = 
        {
            title: "Top 10 OTUs",
            xaxis: { title: "OTU ID"},
            yaxis: {title: "y"}
        };
    
        Plotly.plot("bubble", bubbleData, bubbleLayout);
  
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

