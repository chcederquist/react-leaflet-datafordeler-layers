import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { Polygon, useMap, useMapEvents } from 'react-leaflet';
import { DagiGeometri, DagiMultiGeomResponse, WfsMember } from './dagi-types';
import { getPolygonsFromDagiAreas } from './polygon-parsing';

export type DagiAreaProps = Readonly<{
  token: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  maxAreasFetched?: number;
  fetchWithinViewport: boolean;
  typename: 'Regionsinddeling' | 'Afstemningsomraade' | 'Opstillingskreds' | 'Kommuneinddeling'
}>

const typenameToWfsMemberKey: Record<'Regionsinddeling' | 'Afstemningsomraade' | 'Opstillingskreds' | 'Kommuneinddeling', keyof WfsMember> = {
  Afstemningsomraade: 'dagi:Afstemningsomraade',
  Regionsinddeling: 'dagi:Regionsinddeling',
  Opstillingskreds: 'dagi:Opstillingskreds',
  Kommuneinddeling: 'dagi:Kommuneinddeling'
}
export type GenericDagiArea = {
  'dagi:id.lokalId': number,
  'dagi:geometri': DagiGeometri
}


export type GenericArea = {polygons: LatLng[][], id: number | string};

export function DagiArea({ token, maxAreasFetched = 25, typename, fetchWithinViewport }: DagiAreaProps) {
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
    const url = `https://api.dataforsyningen.dk/DAGI_10MULTIGEOM_GMLSFP_DAF?service=WFS&request=GetFeature&version=2.0.0&typenames=${typename}&count=${maxAreasFetched}&token=${token}${bounds ? `&bbox=${bounds?.join(',')}`:''}`;
    fetch(url).then(res => res.text().then(xml => {
      // Parse out polygons using xml2json + manual traversing
      const parser = new XMLParser(); // TODO: Performance needs to be improved here
      const json = parser.parse(xml) as DagiMultiGeomResponse;
      const parseVotingAreas = getPolygonsFromDagiAreas(json, typenameToWfsMemberKey[typename], (member) => {
        return member['dagi:id.lokalId'].toString();
      })
      setVotingAreas(parseVotingAreas)
    }));
    
  }, [token, bounds])
  return votingAreas.flatMap(votingArea => votingArea.polygons.map((polygon,polygonI)=><Polygon key={votingArea.id.toString()+polygonI.toString()} positions={polygon}></Polygon>))
}
