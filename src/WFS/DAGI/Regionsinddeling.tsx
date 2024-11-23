import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { DagiArea } from './DagiArea';
import { UsernameAndPassword } from '../../shared/types';
import { Scale } from './dagi-types';

export type RegionsinddelingProps = Readonly<{
  token?: string;
  usernameAndPassword?: UsernameAndPassword;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  scale?: Scale;
}>

export type GenericArea = {polygons: LatLng[][], id: number | string};

export function Regionsinddeling({ token, usernameAndPassword, crs, scale = '2k' }: RegionsinddelingProps) {
  return <DagiArea token={token} usernameAndPassword={usernameAndPassword} crs={crs} scale={scale} typename='Regionsinddeling' fetchWithinViewport={false}></DagiArea>
}
