import { type LatLng, Point } from "leaflet";
import { EPSG25832 } from "../../util";
import { WfsMember, DagiMultiGeomResponse, Scale } from "./dagi-types";
import { GenericArea } from "./DagiArea";


export function getPolygonsFromDagiAreas<T extends keyof WfsMember>(dagiAreas: DagiMultiGeomResponse, key: T, idGenerator: (member: WfsMember[T]) => string, scale: Scale) {
  const votingAreas = [dagiAreas['wfs:FeatureCollection']['wfs:member']].flatMap(c => c);
  const votingAreasTransformed: GenericArea[] = [];
  for (let votingArea of votingAreas) {
    const surfaceMembers = [votingArea[key][`dagi${scale}:geometri`]['gml:MultiGeometry']['gml:geometryMember']].flatMap(c => c);
    const polygonsForDagiArea: LatLng[][] = [];
    for (let surfaceMember of surfaceMembers) {
      polygonsForDagiArea.push()
      let maxPolySize = 200;
      let points: [number,number,number][] = []
      let coords = surfaceMember['gml:Polygon']['gml:exterior']['gml:LinearRing']['gml:posList']['#text'].split(' ').map(c=>+c);
      for (let i = 0; i < coords.length; i+=3) {
        points.push([coords[i], coords[i+1], coords[i+2]])
      }
      if (points.length > maxPolySize) {
        points = new Array(maxPolySize).fill(0).map((_,i)=>points[Math.floor(i*points.length/maxPolySize)])  
      }
      
      polygonsForDagiArea.push(points.map(c => {
        return EPSG25832.unproject(new Point(+c[0], +c[1], false));
      }));
    }
    const id = idGenerator(votingArea[key]);
    votingAreasTransformed.push({ id, polygons: polygonsForDagiArea });
  }
  return votingAreasTransformed;
}
