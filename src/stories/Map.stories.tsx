import { MapContainer } from 'react-leaflet';

import type { Meta, StoryObj } from '@storybook/react';
import { epsg25832, SkaermkortTileLayer } from '../SkaermkortTileLayer';

const meta = {
  title: 'Map',
  component: SkaermkortTileLayer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MapContainer zoom={3}
      crs={epsg25832}
      bounds={[[53.015, 2.47842], [58.6403, 17.5578]]}
       style={{height: 1000+'px', width: 1000+'px'}}
      center={[55.345, 10.335]}>
        <Story />
      </MapContainer>
    )
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SkaermkortTileLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Map: Story = {
  args: {
    layers: 'dtk_skaermkort_daempet',
    token: process.env.TOKEN_DATAFORDELEREN!,
    transparent: false,
    format: 'image/png'
  },
};
