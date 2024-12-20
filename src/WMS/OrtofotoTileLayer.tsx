import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { WMSTileLayer, WMSTileLayerProps } from 'react-leaflet';
import { EPSG25832 } from '../util';
import { UsernameAndPassword } from '../shared/types';

export type OrtofotoTileLayerProps = Readonly<Omit<WMSTileLayerProps, 'url'> & {
  usernameAndPassword?: UsernameAndPassword;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  layers: 'orto_foraar_cir' | 'orto_foraar' | 'fotoindex' | 'geodanmark_2023_12_5cm'
  format: 'image/jpeg' | 'image/png';
  url?: string;
}>

export function OrtofotoTileLayer({ version, crs, usernameAndPassword, transparent, url, ...rest }: OrtofotoTileLayerProps) {

  return <WMSTileLayer
      {...rest}
      url={`${url ?? 'https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar/1.0.0/WMS'}?${usernameAndPassword ? 'username='+usernameAndPassword.username+'&password='+usernameAndPassword.password : ''}`}
      attribution='Datafordeleren'
      version={version ?? '1.1.1'}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      
      crs={crs ?? EPSG25832}
    ></WMSTileLayer>
}
