import 'leaflet/dist/leaflet.css';

import { TileLayer } from 'react-leaflet';
import { UsernameAndPassword } from '../shared/types';

export type WMTSOrtofotoTileLayerProps = Readonly<{
  token?: string;
  usernameAndPassword?: UsernameAndPassword;
  format: 'image/jpeg' | 'image/png';
  version?: string;
}>
export function WMTSOrtofotoTileLayer({usernameAndPassword, version, format,token}: WMTSOrtofotoTileLayerProps) {
  return <TileLayer maxZoom={13} tileSize={256} noWrap={true}
  crossOrigin
  url={`https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar_wmts/${version}/WMTS?service=WMTS&TileMatrix={z}&TileCol={x}&TileRow={y}&version=${version}&layer=orto_foraar_wmts&style=default&tilematrixset=KortforsyningTilingDK&Request=GetTile&Format=${format}${usernameAndPassword?'&username='+usernameAndPassword.username+'&password='+usernameAndPassword.password : token ? '&token='+token : ''}`}></TileLayer>
}