import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { WMSTileLayer } from 'react-leaflet';

export type SkaermkortTileLayerProps = Readonly<{
  token: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | CRS;
  transparent?: boolean;
  layers: 'dtk_skaermkort' | 'topo_skaermkort' | 'dtk_skaermkort_graa' | 'dtk_skaermkort_daempet';
  format: 'image/jpeg' | 'image/png';
  version?: string;
}>

export function SkaermkortTileLayer({ version, format, layers, token, crs, transparent }: SkaermkortTileLayerProps) {

  return <WMSTileLayer
      url={'https://api.dataforsyningen.dk/topo_skaermkort_DAF?token='+token}
      attribution='Dataforsyningen'
      crossOrigin={true}
      version={version ?? '1.3.0'}
      layers={layers}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      crs={crs}
      format={format}
    ></WMSTileLayer>
}
