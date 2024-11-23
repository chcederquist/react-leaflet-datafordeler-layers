import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { DagiArea } from './DagiArea';
import { UsernameAndPassword } from '../../shared/types';

export type KommuneinddelingProps = Readonly<{
  token?: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  usernameAndPassword?: UsernameAndPassword
}>



export type GenericArea = {polygons: LatLng[][], id: number | string};

export function Kommuneinddeling({ token, usernameAndPassword, crs }: KommuneinddelingProps) {
  return <DagiArea token={token} typename='Kommuneinddeling' usernameAndPassword={usernameAndPassword} crs={crs} fetchWithinViewport={true}></DagiArea>
}
