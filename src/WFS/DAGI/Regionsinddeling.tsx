import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { DagiArea } from './DagiArea';

export type RegionsinddelingProps = Readonly<{
  token: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
}>

export type GenericArea = {polygons: LatLng[][], id: number | string};

export function Regionsinddeling({ token }: RegionsinddelingProps) {
  return <DagiArea token={token} typename='Regionsinddeling' fetchWithinViewport={false}></DagiArea>
}
