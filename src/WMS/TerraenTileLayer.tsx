import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { WMSTileLayer, WMSTileLayerProps } from 'react-leaflet';
import { EPSG25832 } from '../util';
import { UsernameAndPassword } from '../shared/types';

export type TerraenTileLayerProps = Readonly<Omit<WMSTileLayerProps, 'url'> & {
  usernameAndPassword?: UsernameAndPassword;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  layers: 'dhm_terraen_skyggekort' | 'dhm_overflade_skyggekort';
  format: 'image/jpeg' | 'image/png';
  url?: string;
}>

export function TerraenTileLayer({ version, crs, url, usernameAndPassword, transparent, ...rest }: TerraenTileLayerProps) {

  return <WMSTileLayer
      {...rest}
      url={`${url ?? `https://services.datafordeler.dk/DHMNedboer/dhm/1.0.0/WMS`}?${usernameAndPassword ? 'username='+usernameAndPassword.username+'&password='+usernameAndPassword.password : ''}`}
      attribution='Datafordeleren'
      version={version ?? '1.3.0'}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      crs={crs ?? EPSG25832}
    ></WMSTileLayer>
}
