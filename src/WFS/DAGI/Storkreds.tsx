import { type CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { Scale } from './dagi-types';
import { DagiArea } from './DagiArea';
import { UsernameAndPassword } from '../../shared/types';

export type StorkredsProps = Readonly<{
  usernameAndPassword?: UsernameAndPassword;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  scale?: Scale;
}>

export function Storkreds({ usernameAndPassword, scale = '50' }: StorkredsProps) {
  return <DagiArea usernameAndPassword={usernameAndPassword} scale={scale} typename='Storkreds' fetchWithinViewport={false}></DagiArea>
}
