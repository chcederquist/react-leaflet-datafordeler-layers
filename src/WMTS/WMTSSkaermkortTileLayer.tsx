import 'leaflet/dist/leaflet.css';

import { TileLayer } from 'react-leaflet';
import { UsernameAndPassword } from '../shared/types';

export type WMTSSkaermkortTileLayerProps = Readonly<{
  token?: string;
  usernameAndPassword?: UsernameAndPassword
  dataSource: 'topo_skaermkort_wmts' | 'topo_skaermkort_daempet' | 'topo_skaermkort_graa'
  layer: 'topo_skaermkort' | 'topo_skaermkort_daempet' | 'topo_skaermkort_graa';
  format: 'image/jpeg' | 'image/png';
  version?: string;
}>
export function WMTSSkaermkortTileLayer({usernameAndPassword, version, format,token, dataSource, layer}: WMTSSkaermkortTileLayerProps) {
  return <TileLayer maxZoom={13}  tileSize={256} noWrap={true}
  crossOrigin
  url={`https://services.datafordeler.dk/DKskaermkort/${dataSource}/${version}/wmts?service=WMTS&TileMatrix={z}&TileCol={x}&TileRow={y}&version=${version}&layer=${layer}&style=default&tilematrixset=View1&Request=GetTile&Format=${format}${usernameAndPassword?'&username='+usernameAndPassword.username+'&password='+usernameAndPassword.password : token ? '&token='+token : ''}`}></TileLayer>
}
