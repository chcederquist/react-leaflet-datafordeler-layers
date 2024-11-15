import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from './util';
import { useEffect } from 'react';

export type AfstemningsomraadeGeoJsonProps = Readonly<{
  token: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  transparent?: boolean;
  version?: string;
}>


export function AfstemningsomraadeGeoJson({ token }: AfstemningsomraadeGeoJsonProps) {
  const url = 'https://api.dataforsyningen.dk/DAGI_10MULTIGEOM_GMLSFP_DAF?service=WFS&request=GetFeature&version=2.0.0&typenames=Afstemningsomraade&count=10&outputFormat=application/json&token='+token;
  useEffect(() => {
    // const result = fetch(url).then(res => res.text().then(text => {
    //   console.log(text);
    //   console.log(parseGML(text));
    //   debugger;
    // }))
    
    
  }, )
  return <div></div>;
}
