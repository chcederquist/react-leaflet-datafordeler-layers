import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { WMSTileLayer } from 'react-leaflet';
import { EPSG25832 } from '../util';

export type OrtofotoTileLayerProps = Readonly<{
  token?: string;
  usernameAndPassword?: {username: string, password: string};
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  transparent?: boolean;
  layers: 'orto_foraar_cir' | 'orto_foraar' | 'fotoindex' | 'geodanmark_2023_12_5cm'
  format: 'image/jpeg' | 'image/png';
  version?: string;
}>

export function OrtofotoTileLayer({ version, format, layers, crs, token, usernameAndPassword, transparent }: OrtofotoTileLayerProps) {

  return <WMSTileLayer
  
      url={`https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar/1.0.0/WMS?${usernameAndPassword ? 'username='+usernameAndPassword.username+'&password='+usernameAndPassword.password : token ? '&token='+token:''}`}
      attribution='Dataforsyningen'
      crossOrigin={true}
      version={version ?? '1.1.1'}
      layers={layers}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      
      crs={crs ?? EPSG25832}
      format={format}
    ></WMSTileLayer>
}
