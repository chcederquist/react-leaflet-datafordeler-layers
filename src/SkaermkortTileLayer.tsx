import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { WMSTileLayer } from 'react-leaflet';
import { EPSG25832 } from './util';

export type SkaermkortTileLayerProps = Readonly<{
  token: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | typeof EPSG25832 | CRS;
  transparent?: boolean;
  layers: 'dtk_skaermkort' | 'topo_skaermkort' | 'dtk_skaermkort_graa' | 'dtk_skaermkort_daempet';
  format: 'image/jpeg' | 'image/png';
  version?: string;
}>

export function SkaermkortTileLayer({ version, format, layers, crs, token, transparent }: SkaermkortTileLayerProps) {

  return <WMSTileLayer
      url={'https://api.dataforsyningen.dk/topo_skaermkort_DAF?token='+token}
      attribution='Dataforsyningen'
      crossOrigin={true}
      version={version ?? '1.3.0'}
      layers={layers}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      
      crs={crs ?? EPSG25832}
      format={format}
    ></WMSTileLayer>
}
