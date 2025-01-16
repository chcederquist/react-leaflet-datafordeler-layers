import { type CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EPSG25832 } from '../../util';
import { GenericDagiArea, Scale } from './dagi-types';
import { DagiArea } from './DagiArea';
import { UsernameAndPassword } from '../../shared/types';

export type OpstillingskredsProps = Readonly<{
  usernameAndPassword?: UsernameAndPassword;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  version?: string;
  scale?: Scale;
}>


export type DagiAfstemningsomraade = {
  'dagi:afstemningsomraadenummer': number,
  'dagi:afstemningsstedNavn': string,
} & GenericDagiArea;

export function Opstillingskreds({ usernameAndPassword, scale = '50' }: OpstillingskredsProps) {
  return <DagiArea usernameAndPassword={usernameAndPassword} scale={scale} typename='Opstillingskreds' fetchWithinViewport={false}></DagiArea>
}
