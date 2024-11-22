import L from 'leaflet';
import 'proj4leaflet';

export const EPSG25832 = new L.Proj.CRS('EPSG:25832',
  '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
  {    resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1] 
  }
);

export const EPSG25832WMTS = new L.Proj.CRS('EPSG:25832',
  '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
  {       resolutions: [
    5851428.57142857182770967484, // Resolution for zoom level 0
    2925714.28571428591385483742, // Resolution for zoom level 1
    1462857.14285714295692741871,  // Resolution for zoom level 2
    731428.57142857147846370935,  // Resolution for zoom level 3
    365714.28571428573923185468,  // Resolution for zoom level 4
    182857.14285714286961592734,   // Resolution for zoom level 5
    91428.57142857143480796367,   // Resolution for zoom level 6
    45714.28571428571740398183,   // Resolution for zoom level 7
    22857.14285714285870199092,    // Resolution for zoom level 8
    11428.57142857142935099546,    // Resolution for zoom level 9
    5714.28571428571467549773,    // Resolution for zoom level 10
    2857.14285714285733774886,    // Resolution for zoom level 11
    1428.57142857142866887443,     // Resolution for zoom level 12
    714.28571428571433443722,     // Resolution for zoom level 13
  ].map(c=>c*0.28/1000),
  origin: [120000, 6500000], // Top-left corner in meters
  }
);