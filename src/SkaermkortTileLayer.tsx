import type { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { WMSTileLayer } from 'react-leaflet';

export type SkaermkortTileLayerProps = Readonly<{
  token: string;
  crs?: typeof CRS.EPSG3395 | typeof CRS.EPSG3857 | typeof CRS.EPSG4326 | CRS;
  transparent?: boolean;
  layers: 'dtk_skaermkort' | 'topo_skaermkort' | 'dtk_skaermkort_graa' | 'dtk_skaermkort_daempet';
  format: 'image/jpeg' | 'image/png';
  version?: string;
}>
export const epsg25832 = new L.Proj.CRS('EPSG:25832',
  '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
  {    resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1] 
  }
);
export function SkaermkortTileLayer({ version, format, layers, token, transparent }: SkaermkortTileLayerProps) {

  return <WMSTileLayer
      url={'https://api.dataforsyningen.dk/topo_skaermkort_DAF?token='+token}
      attribution='Dataforsyningen'
      crossOrigin={true}
      version={version ?? '1.3.0'}
      layers={layers}
      //@ts-expect-error
      transparent={transparent ? 'TRUE' : 'FALSE'}
      
      crs={epsg25832}
      format={format}
    ></WMSTileLayer>
}
