import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { useEffect, useState } from 'react';
import { Polygon, useMap, useMapEvents } from 'react-leaflet';
import { DagiMultiGeomResponse, Scale, WfsMember } from './dagi-types';
import { getPolygonsFromDagiAreas } from './parsing';
import { xmlToJson } from 'rapid-xml-to-json';

export type DagiAreaProps = Readonly<{
  usernameAndPassword?: {username: string; password: string};
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  scale?: Scale;
  maxAreasFetched?: number;
  fetchWithinViewport: boolean;
  typename: 'Regionsinddeling' | 'Afstemningsomraade' | 'Opstillingskreds' | 'Kommuneinddeling'
}>

const typenameToWfsMemberKey = (key: 'Regionsinddeling' | 'Afstemningsomraade' | 'Opstillingskreds' | 'Kommuneinddeling', scale: Scale): keyof WfsMember => {
  return `dagi${scale}:${key}`;
}

export type GenericArea = {polygons: LatLng[][], id: number | string};

export function DagiArea({ maxAreasFetched = 100, typename, scale = '10', fetchWithinViewport, usernameAndPassword }: DagiAreaProps) {
  // Fetch geodata
  const map = useMap();
  const [bounds, setBounds] = useState<[number,number,number,number]>();

  const handlerFunc = () => {
    const viewportBounds = map.getBounds(); // TODO: How to avoid refetching all the time?
    const southWest = EPSG25832.project(viewportBounds.getSouthWest());
    const northEast = EPSG25832.project(viewportBounds.getNorthEast());
    setBounds([southWest.x, southWest.y, northEast.x, northEast.y]);
  }
  useMapEvents({
    zoom() {
      if (fetchWithinViewport) {
        handlerFunc();
      }
      
    },
    dragend() {
      if (fetchWithinViewport) {
        handlerFunc();
      }
      
    }
  });
  
  const [votingAreas, setVotingAreas] = useState<GenericArea[]>([]);
  useEffect(() => {

    const url = `https://wfs.datafordeler.dk/DAGIM/DAGI_${(scale === '10' ? '10' : scale === '2k' ? '2000': scale === '50' ? '500' : '250')}MULTIGEOM_GMLSFP/1.0.0/WFS?service=WFS&request=GetFeature&version=2.0.0&typenames=${typename}&count=${maxAreasFetched}${usernameAndPassword ? `&username=${usernameAndPassword.username}&password=${usernameAndPassword.password}` : ''}${bounds ? `&bbox=${bounds?.join(',')}`:''}`;
    fetch(url).then(res => res.text().then(xml => {
      // Parse out polygons using xml2json + manual traversing
      let json = xmlToJson(xml) as DagiMultiGeomResponse;
      console.log(json);
      const parseVotingAreas = getPolygonsFromDagiAreas(json, typenameToWfsMemberKey(typename, scale), (member) => {
        return member[`dagi${scale}:id.lokalId`]['#text'];
      }, scale)
      setVotingAreas(parseVotingAreas)
    }));
    
  }, [bounds, scale, typename, maxAreasFetched, usernameAndPassword?.username, usernameAndPassword?.password, usernameAndPassword])
  return votingAreas.flatMap(votingArea => votingArea.polygons.map((polygon,polygonI)=><Polygon key={votingArea.id.toString()+polygonI.toString()} positions={polygon}></Polygon>))
}
