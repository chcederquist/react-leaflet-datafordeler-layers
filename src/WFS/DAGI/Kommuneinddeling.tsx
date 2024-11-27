import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { DagiArea } from './DagiArea';
import { UsernameAndPassword } from '../../shared/types';
import { Scale } from './dagi-types';

export type KommuneinddelingProps = Readonly<{
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  usernameAndPassword?: UsernameAndPassword;
  scale?: Scale;
}>



export type GenericArea = {polygons: LatLng[][], id: number | string};

export function Kommuneinddeling({ usernameAndPassword, crs, scale = '25' }: KommuneinddelingProps) {
  return <DagiArea typename='Kommuneinddeling' usernameAndPassword={usernameAndPassword} scale={scale} crs={crs} fetchWithinViewport={false}></DagiArea>
}
