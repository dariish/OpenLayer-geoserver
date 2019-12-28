function init(){

    const map = new ol.Map({
            view : new ol.View({
              
               center: ol.proj.transform([-8.3770108, 41.2771817],'EPSG:4326','EPSG:3857'),
                    //center: [-932510.7343462185,5053142.307944268],
                zoom: 15,
                maxZoom: 20,
                minZoom: 4

            }),
            target : 'js-map'
    })


    // Base Maps
const openStreetMap = new ol.layer.Tile({
    source : new ol.source.OSM(),
    visible: true,
    title: 'OpenStreetMap'
})

const bingMap = new ol.layer.Tile({
    source: new ol.source.BingMaps({
            key: 'AmsC0864kukoBixOpup8lsv3yFO_qzXenrScHMmdHz5HVDSI0wZsGcP9DyW9zIU-',
            imagerySet: 'Aerial'
    }),
    visible: false,
    title:'BingMap'
})

const CartoDB = new ol.layer.Tile({
    source: new ol.source.OSM({
        "url" : "http://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
    }),
    visible: false,
    title:'CartoDB'
})




//layer group
const baseLayerGroup = new ol.layer.Group({
    layers: [
        openStreetMap, bingMap, CartoDB
    ]
})



//Layer Switcher (BaseLayers)
const baseLayerElements = document.querySelectorAll('.baseSideBar > input[type=radio]');
for(let baseLayerElement of baseLayerElements){
    baseLayerElement.addEventListener('change', function(){
        let baseLayerElementValue = this.value;
        baseLayerGroup.getLayers().forEach(function(element, index, array){
        let baseLayerTitle = element.get('title');
        element.setVisible(baseLayerTitle === baseLayerElementValue);
        })
    })
}
map.addLayer(baseLayerGroup);


 // layers geoserver

var wms_layer = new ol.layer.Tile({  
    source: new ol.source.TileWMS({  
        url: 'http://localhost:8080/geoserver/sig/wms', 
        params: {
            'LAYERS': 'sig:grupo', 
            'VERSION': '1.1.1',
            'TILED': true }, 
        serverType: 'geoserver'}) });

 
        map.addLayer(wms_layer);

    
    }