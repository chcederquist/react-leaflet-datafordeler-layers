import { DagiAfstemningsomraade } from './Afstemningsomraade';

export type GenericDagiArea = {
  'dagi10:id.lokalId': {'#text': string},
  'dagi25:id.lokalId': {'#text': string},
  'dagi50:id.lokalId': {'#text': string},
  'dagi2k:id.lokalId': {'#text': string},
  'dagi10:geometri': DagiGeometri
  'dagi25:geometri': DagiGeometri
  'dagi50:geometri': DagiGeometri
  'dagi2k:geometri': DagiGeometri
}

type GmlPolygon = {
  'gml:exterior': {
    'gml:LinearRing': {
      'gml:posList': {'#text': string};
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
  'dagi25:Afstemningsomraade': DagiAfstemningsomraade;
  'dagi50:Afstemningsomraade': DagiAfstemningsomraade;
  'dagi2k:Afstemningsomraade': DagiAfstemningsomraade;
  'dagi10:Regionsinddeling': GenericDagiArea;
  'dagi25:Regionsinddeling': GenericDagiArea;
  'dagi50:Regionsinddeling': GenericDagiArea;
  'dagi2k:Regionsinddeling': GenericDagiArea;
  'dagi10:Opstillingskreds': GenericDagiArea;
  'dagi25:Opstillingskreds': GenericDagiArea;
  'dagi50:Opstillingskreds': GenericDagiArea;
  'dagi2k:Opstillingskreds': GenericDagiArea;
  'dagi10:Kommuneinddeling': GenericDagiArea;
  'dagi25:Kommuneinddeling': GenericDagiArea;
  'dagi50:Kommuneinddeling': GenericDagiArea;
  'dagi2k:Kommuneinddeling': GenericDagiArea;
};
export type DagiMultiGeomResponse = {
  'wfs:FeatureCollection': {
    'wfs:member': WfsMember | WfsMember[];
  };
};

export type Scale = '10' | '25' | '50' | '2k';