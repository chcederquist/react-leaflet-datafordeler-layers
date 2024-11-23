import 'leaflet/dist/leaflet.css';

import { WMSTileLayer, WMSTileLayerProps } from 'react-leaflet';
import { EPSG25832 } from '../util';
import { UsernameAndPassword } from '../shared/types';

export type DTKTileLayerProps = Readonly<Omit<WMSTileLayerProps, 'url'> & {
  token?: string;
  url?: string;
  usernameAndPassword?: UsernameAndPassword;
  layers: 'dtk_1000' | 'dtk_25' | 'dtk_500' | 'dtk_250'
  format: 'image/jpeg' | 'image/png';
}>

export function DTKTileLayer({ version, crs, token, usernameAndPassword, transparent, layers, url, ...rest }: DTKTileLayerProps) {

  return <WMSTileLayer
      {...rest}
      url={`${url ?? `https://services.datafordeler.dk/DKtopokort/${layers}/1.0.0/WMS`}?${usernameAndPassword ? 'username='+usernameAndPassword.username+'&password='+usernameAndPassword.password : token ? '&token='+token:''}`}
      attribution='Datafordeleren'
      layers={layers}
      version={version ?? '1.3.0'}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      
      crs={crs ?? EPSG25832}
    ></WMSTileLayer>
}
