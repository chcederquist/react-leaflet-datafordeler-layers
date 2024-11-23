import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { WMSTileLayer, WMSTileLayerProps } from 'react-leaflet';
import { EPSG25832 } from '../util';
import { UsernameAndPassword } from '../shared/types';

export type SkaermkortTileLayerProps = Readonly<Omit<WMSTileLayerProps, 'url'> & {
  url?:string;
  usernameAndPassword?: UsernameAndPassword;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  layers: 'dtk_skaermkort' | 'topo_skaermkort' | 'dtk_skaermkort_graa' | 'dtk_skaermkort_daempet';
  format: 'image/jpeg' | 'image/png';
  version?: string;
}>

export function SkaermkortTileLayer({ version, crs, url, usernameAndPassword, transparent, ...rest }: SkaermkortTileLayerProps) {

  return <WMSTileLayer
      {...rest}
      url={`${url ?? `https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort/1.0.0/wms`}?${usernameAndPassword ? 'username='+usernameAndPassword.username+'&password='+usernameAndPassword.password : ''}`}
      attribution='Datafordeleren'
      version={version ?? '1.3.0'}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      
      crs={crs ?? EPSG25832}
    ></WMSTileLayer>
}
