import { DagiAfstemningsomraade } from './Afstemningsomraade';

export type GenericDagiArea = {
  'dagi10:id.lokalId': string,
  'dagi10:geometri': DagiGeometri
}

type GmlPolygon = {
  'gml:exterior': {
    'gml:LinearRing': {
      'gml:posList': string;
    };
  };
};
type GmlGeometryMember = {
  'gml:Polygon': GmlPolygon;
};
export type DagiGeometri = {
  'gml:MultiGeometry': {
    'gml:geometryMember': GmlGeometryMember | GmlGeometryMember[];
  };
};
export type WfsMember = {
  'dagi10:Afstemningsomraade': DagiAfstemningsomraade;
  'dagi10:Regionsinddeling': GenericDagiArea;
  'dagi10:Opstillingskreds': GenericDagiArea;
  'dagi10:Kommuneinddeling': GenericDagiArea;
};
export type DagiMultiGeomResponse = {
  'wfs:FeatureCollection': {
    'wfs:member': WfsMember | WfsMember[];
  };
};
