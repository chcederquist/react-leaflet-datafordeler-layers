import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { GenericDagiArea } from './dagi-types';
import { DagiArea } from './DagiArea';

export type AfstemningsomraadeProps = Readonly<{
  token: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
}>


export type DagiAfstemningsomraade = {
  'dagi:afstemningsomraadenummer': number,
  'dagi:afstemningsstedNavn': string,
} & GenericDagiArea;
export type GenericArea = {polygons: LatLng[][], id: number | string};

export function Afstemningsomraade({ token }: AfstemningsomraadeProps) {
  return <DagiArea token={token} typename='Afstemningsomraade' fetchWithinViewport={false}></DagiArea>
}
