import { type CRS, type LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { GenericDagiArea, Scale } from './dagi-types';
import { DagiArea } from './DagiArea';
import { UsernameAndPassword } from '../../shared/types';

export type AfstemningsomraadeProps = Readonly<{
  usernameAndPassword?: UsernameAndPassword;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  scale?: Scale;
}>


export type DagiAfstemningsomraade = {
  'dagi:afstemningsomraadenummer': number,
  'dagi:afstemningsstedNavn': string,
} & GenericDagiArea;
export type GenericArea = {polygons: LatLng[][], id: number | string};

export function Afstemningsomraade({ usernameAndPassword, crs, scale = '25' }: AfstemningsomraadeProps) {
  return <DagiArea usernameAndPassword={usernameAndPassword} crs={crs} scale={scale} typename='Afstemningsomraade' fetchWithinViewport={true}></DagiArea>
}
