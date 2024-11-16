import { DagiAfstemningsomraade } from './Afstemningsomraade';

export type GenericDagiArea = {
  'dagi:id.lokalId': number,
  'dagi:geometri': DagiGeometri
}

type GmlPolygon = {
  'gml:exterior': {
    'gml:LinearRing': {
      'gml:coordinates': string;
    };
  };
};
type GmlSurfaceMember = {
  'gml:Polygon': GmlPolygon;
};
export type DagiGeometri = {
  'gml:MultiSurface': {
    'gml:surfaceMember': GmlSurfaceMember | GmlSurfaceMember[];
  };
};
export type WfsMember = {
  'dagi:Afstemningsomraade': DagiAfstemningsomraade;
  'dagi:Regionsinddeling': GenericDagiArea;
  'dagi:Opstillingskreds': GenericDagiArea;
  'dagi:Kommuneinddeling': GenericDagiArea;
};
export type DagiMultiGeomResponse = {
  'wfs:FeatureCollection': {
    'wfs:member': WfsMember | WfsMember[];
  };
};
