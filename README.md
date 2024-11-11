
# react-leaflet-kds-layers

`react-leaflet-kds-layers` is a React library that provides pre-configured `WMSTileLayer` components for using various map layers from the Danish Climate Data Service (Klimadatastyrelsen). This library is designed to integrate seamlessly with `react-leaflet` maps by providing reusable and easy-to-set-up components for multiple Klimadatastyrelsen map layers. 

## Features

- Simplifies integration with Klimadatastyrelsen map layers, such as **Skærmkortet**
- Configurable for different Coordinate Reference Systems (CRS), layer types, and formats
- Easily used in `<MapContainer>` elements as a drop-in replacement for `WMSTileLayer`

## Installation

To install this library, use npm or yarn:

```bash
npm install react-leaflet-kds-layers
# or
yarn add react-leaflet-kds-layers
```

You will also need to have `react-leaflet` and `leaflet` installed in your project:

```bash
npm install react-leaflet leaflet
# or
yarn add react-leaflet leaflet
```

## Usage

To use a specific map layer, import the component and add it as a child of a `<MapContainer>` element. You need an API token from Klimadatastyrelsen to access these layers.

### Example with Skærmkortet

Here's how to use the **Skærmkortet** layer component:

```jsx
import { MapContainer } from 'react-leaflet';
import { SkaermkortTileLayer } from 'react-leaflet-kds-layers';

function MyMap() {
  return (
    <MapContainer center={[55.6761, 12.5683]} zoom={10} style={{ height: "100vh", width: "100%" }}>
      <SkaermkortTileLayer
        token="your_api_token_here"
        layers="dtk_skaermkort"
        format="image/png"
        crs={CRS.EPSG3857}
        transparent={false}
      />
    </MapContainer>
  );
}

export default MyMap;
```

## API

### SkaermkortTileLayer Component

Renders a `WMSTileLayer` for Skærmkortet maps. The available properties are:

| Prop         | Type                                              | Required | Description                                                                 |
|--------------|---------------------------------------------------|----------|-----------------------------------------------------------------------------|
| `token`      | `string`                                          | Yes      | API token for accessing the map layer.                                      |
| `crs`        | `typeof CRS.EPSG3395` \| `CRS`                    | No       | Coordinate Reference System; defaults to `CRS.EPSG3857` if not specified.   |
| `transparent`| `boolean`                                         | No       | Determines if the layer should be transparent.                              |
| `layers`     | `"dtk_skaermkort" \| "topo_skaermkort" \| ...`    | Yes      | Specifies the map layer to use. Options: `"dtk_skaermkort"`, `"topo_skaermkort"`, `"dtk_skaermkort_graa"`, `"dtk_skaermkort_daempet"`. |
| `format`     | `"image/jpeg" \| "image/png"`                     | Yes      | Image format for the tiles.                                                 |
| `version`    | `string`                                          | No       | WMS version, defaulting to `1.3.0`.                                         |

## Map Layers

The `SkaermkortTileLayer` component supports the following map layers:

- **`dtk_skaermkort`**: Standard map view
- **`topo_skaermkort`**: Topographic map
- **`dtk_skaermkort_graa`**: Grayscale map
- **`dtk_skaermkort_daempet`**: Dimmed map version

## Attribution

The tiles are provided by [Dataforsyningen](https://dataforsyningen.dk/) and require attribution to "Dataforsyningen".

## License

This project is licensed under the MIT License.