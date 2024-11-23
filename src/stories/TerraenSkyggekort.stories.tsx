import { MapContainer } from 'react-leaflet';

import type { Meta, StoryObj } from '@storybook/react';
import { EPSG25832 } from '../util';
import { TerraenTileLayer } from '../WMS/TerraenTileLayer';
import { OrtofotoTileLayer } from '../WMS/OrtofotoTileLayer';

const meta = {
  title: 'Terrænkort',
  component: TerraenTileLayer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MapContainer zoom={10}
      crs={EPSG25832}
      bounds={[[53.015, 2.47842], [58.6403, 17.5578]]}
       style={{height: 1000+'px', width: 1000+'px'}}
      center={[55.345, 10.335]}>
        <OrtofotoTileLayer format='image/png' layers='orto_foraar' usernameAndPassword={{username: process.env.UN_DATAFORDELEREN!, password: process.env.PW_DATAFORDELEREN!}}></OrtofotoTileLayer>
        <Story />
      </MapContainer>
    )
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TerraenTileLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Map: Story = {
  args: {
    layers: 'dhm_terraen_skyggekort',
    opacity: 0.6,
    usernameAndPassword: {username: process.env.UN_DATAFORDELEREN!, password: process.env.PW_DATAFORDELEREN!},
    transparent: false,
    format: 'image/png'
  },
};
