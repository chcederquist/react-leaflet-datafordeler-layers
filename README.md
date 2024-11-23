# React Leaflet Components for Datafordeleren Services

This library provides React Leaflet components for integrating WMS, WMTS, and WFS services from [Datafordeleren](https://datafordeler.dk) into your maps. These components are designed for seamless integration with `react-leaflet` and are pre-configured for Danish spatial data services.  

Datafordeleren is a Danish government platform providing access to official geographic datasets such as maps, boundaries, and other spatial data.
---

## Features

- **WMTS Layers:** Add tiled maps such as `Skærmkortet` to your application.
- **WMS Layers:** Overlay WMS layers with customizable parameters like format, transparency, and layer settings.
- **WFS Polygons:** Render vector data (e.g., municipal boundaries) directly from WFS services.
- Support for Danish spatial reference systems (e.g., EPSG:25832).

---

## Installation

Install the package via npm or yarn:

```bash
npm install react-leaflet-datafordeler-layers
```

or

```bash
yarn add react-leaflet-datafordeler-layers
```

---

## Usage Examples

### WMTS Layer

Display a `Skærmkortet` map using WMTS:

```tsx
import { MapContainer } from 'react-leaflet';
import 'proj4leaflet';
import { WMTSSkaermkortTileLayer, EPSG25832WMTS } from 'react-leaflet-datafordeler-layers';

<MapContainer
  zoom={1}
  style={{ height: '1000px', width: '1000px' }}
  crs={EPSG25832WMTS}
  maxZoom={13}
  bounds={[[53.015, 2.47842], [58.6403, 17.5578]]}
  center={[55.345, 10.335]}
>
  <WMTSSkaermkortTileLayer
    dataSource="topo_skaermkort_daempet"
    format="image/png"
    layer="topo_skaermkort_daempet"
    usernameAndPassword={{ username: 'xxxx', password: 'yyyy' }}
    version="1.0.0"
  />
</MapContainer>
```

---

### WMS Layer

Add a `Skærmkortet` map layer using WMS:

```tsx
import { MapContainer } from 'react-leaflet';
import { SkaermkortTileLayer, EPSG25832 } from 'react-leaflet-datafordeler-layers';

<MapContainer
  zoom={3}
  crs={EPSG25832}
  bounds={[[53.015, 2.47842], [58.6403, 17.5578]]}
  style={{ height: '1000px', width: '1000px' }}
  center={[55.345, 10.335]}
>
  <SkaermkortTileLayer
    layers="dtk_skaermkort"
    format="image/png"
    transparent={false}
    usernameAndPassword={{ username: 'xxxx', password: 'yyyy' }}
  />
</MapContainer>
```

---

### WFS Polygons

Render municipal boundaries using WFS on top of a Skærmkort:

```tsx
import { MapContainer } from 'react-leaflet';
import { SkaermkortTileLayer, Kommuneinddeling, EPSG25832 } from 'react-leaflet-datafordeler-layers';

<MapContainer
  zoom={3}
  crs={EPSG25832}
  bounds={[[53.015, 2.47842], [58.6403, 17.5578]]}
  style={{ height: '1000px', width: '1000px' }}
  center={[55.345, 10.335]}
>
  <SkaermkortTileLayer
    format="image/png"
    layers="dtk_skaermkort"
    usernameAndPassword={{ username: 'xxxx', password: 'yyyy' }}
  />
  <Kommuneinddeling
    usernameAndPassword={{ username: 'xxxx', password: 'yyyy' }}
  />
</MapContainer>
```

---

## Configuration

### CRS (Coordinate Reference Systems)

The library includes utilities for Danish CRS definitions such as EPSG:25832. Use the provided CRS configurations (e.g., `EPSG25832` and `EPSG25832WMTS`) for compatibility with Datafordeleren services.

### Authentication

All components require authentication via `usernameAndPassword`:
```typescript
{ username: 'xxxx', password: 'yyyy' }
```
This is the username and password of the Tjenestebruger that you've set up on Datafordeleren
---

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests on the [GitHub repository](https://github.com/chce/react-leaflet-datafordeler-layers).

---

## License

This project is licensed under the MIT License.