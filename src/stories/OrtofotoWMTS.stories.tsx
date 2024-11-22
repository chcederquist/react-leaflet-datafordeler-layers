import { MapContainer } from 'react-leaflet';
import 'proj4leaflet';
import type { Meta, StoryObj } from '@storybook/react';
import { EPSG25832WMTS } from '../util';
import { WMTSOrtofotoTileLayer } from '../WMTS/WMTSOrtofotoTileLayer';

const meta = {
  title: 'WMTS Ortofoto',
  component: WMTSOrtofotoTileLayer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MapContainer zoom={1}
       style={{height: 1000+'px', width: 1000+'px'}}
       crs={EPSG25832WMTS}
       maxZoom={13}
       bounds={[[53.015, 2.47842], [58.6403, 17.5578]]}
      center={[55.345, 10.335]}>
        <Story />
      </MapContainer>
    )
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WMTSOrtofotoTileLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Map: Story = {
  args: {
    format: 'image/png',
    usernameAndPassword: {username: process.env.UN_DATAFORDELEREN!, password: process.env.PW_DATAFORDELEREN!},
    version: '1.0.0',
  }
};
