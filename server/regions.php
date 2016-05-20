<?

$regionsarray = array(
    array("region_id" => "1", "region_name" => "Catalonia", "lat" => "41.8167", "long" => "1.4667", "flag" => "Catalonia_Flag.png", "location" => "Catalonia_Location.png",
    "images" => array(
        array("image_id" => "1", "description" => "El Greco, Sitges", "url" => "El Greco.jpg"),				
        array("image_id" => "2", "description" => "Pont Eiffel, Girona", "url" => "Pont Eiffel (Custom).jpg"),
        array("image_id" => "3", "description" => "Sitges", "url" => "Sitges (Custom).jpg"),					
    )
),
array("region_id" => "2", "region_name" => "Community of Madrid", "lat" => "40.5", "long" => "-3.6667", "flag" => "CommunityOfMadrid_Flag.png", "location" => "CommunityOfMadrid_Location.png",
"images" => array(
    array("image_id" => "4", "description" => "Barajas Airport", "url" => "Barajas_T4 (Custom).jpg"),
    array("image_id" => "5", "description" => "Circo y cima de Peñalara1 (Custom)", "url" => "Circo_y_cima_de_Peñalara1 (Custom).jpg"),
    array("image_id" => "6", "description" => "Vista aerea del Monasterio de El Escorial", "url" => "Vista_aerea_del_Monasterio_de_El_Escorial (Custom).jpg")
)
),
array("region_id" => "3", "region_name" => "Basque Country", "lat" => "42.8333", "long" => "-2.6833", "flag" => "BasqueCountry_Flag.png", "location" => "BasqueCountry_Location.png",
"images" => array(
    array("image_id" => "7", "description" => "Basque Country Mountains", "url" => "Mountains (Custom).jpg"),				
    array("image_id" => "8", "description" => "Un Sociedad", "url" => "Sociedad (Custom).jpg"),
    array("image_id" => "9", "description" => "Vizcaya Bridge", "url" => "Vizcaya Bridge (Custom).jpg")
)
),
array("region_id" => "4", "region_name" => "Andalusia", "lat" => "37.3833", "long" => "-5.9833", "flag" => "Andalusia_Flag.png", "location" => "Andalusia_Location.png",
"images" => array(
    array("image_id" => "10", "description" => "Buddha, Benalmadena", "url" => "Buddha (Custom).jpg"),	
    array("image_id" => "11", "description" => "Mosque, Cordoba", "url" => "Mosque_Cordoba (Custom).jpg"),	
    array("image_id" => "12", "description" => "Río Guadalquivir, Cordoba", "url" => "Río_Guadalquivir_Cordoba (Custom).jpg"),
)
),
array("region_id" => "5", "region_name" => "Valencia", "lat" => "39.5", "long" => "-0.75", "flag" => "Valencia_Flag.png", "location" => "Valencia_Location.png",
"images" => array(
    array("image_id" => "13", "description" => "El Castillo de Santa Barbara", "url" => "Barbara (Custom).jpg"),				
    array("image_id" => "14", "description" => "Puerto de Alicante", "url" => "Puerto_de_Alicante_desde_el_Castillo_de_Santa_Bárbara (Custom).jpg"),
    array("image_id" => "15", "description" => "Castillo de Denia", "url" => "Castillo_de_Denia (Custom).jpg")
)
),
array("region_id" => "6", "region_name" => "Galicia", "lat" => "42.5", "long" => "-8.1", "flag" => "Galicia_Flag.png", "location" => "Galicia_Location.png",
"images" => array(			
    array("image_id" => "16", "description" => "Aynutamiento de Santiago de Compostela", "url" => "Ayuntamiento_de_Santiago_de_Compostela (Custom).jpg"),
    array("image_id" => "17", "description" => "Carnota", "url" => "Carnota (Custom).jpg")					
)
),			
array("region_id" => "7", "region_name" => "Canary Islands", "lat" => "28.1", "long" => "-15.4", "flag" => "CanaryIslands_Flag.png", "location" => "CanaryIslands_Location.png",
"images" => array(
    array("image_id" => "18", "description" => "Mount Teide", "url" => "MountTeide_Tenerife (Custom).jpg"),
    array("image_id" => "19", "description" => "Parque San Telmo, Las Palmas de Gran Canaria", "url" => "Las_palmas_gran_canaria_parque_san_telmo (Custom).jpg")					
)
),			
array("region_id" => "8", "region_name" => "Asturias", "lat" => "43.3333", "long" => "-6", "flag" => "Asturias_Flag.png", "location" => "Asturias_Location.png",
"images" => array(
    array("image_id" => "20", "description" => "Plaza de Domingo Acebal, Aviles", "url" => "Aviles_-_Plaza_de_Domingo_Acebal (Custom).jpg"),		
    array("image_id" => "21", "description" => "Iglesia de Santa Maria del Naranco", "url" => "Iglesia_de_Santa_María_del_Naranco (Custom).jpg")					
)
),				
);
echo '{"regions":';
echo json_encode($regionsarray) . '}';

?>