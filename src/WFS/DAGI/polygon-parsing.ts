import { type LatLng, Point } from "leaflet";
import { EPSG25832 } from "../../util";
import { GenericArea } from "./Afstemningsomraade";
import { WfsMember, DagiMultiGeomResponse } from "./dagi-types";


export function getPolygonsFromDagiAreas<T extends keyof WfsMember>(dagiAreas: DagiMultiGeomResponse, key: T, idGenerator: (member: WfsMember[T]) => string) {
  const votingAreas = [dagiAreas['wfs:FeatureCollection']['wfs:member']].flatMap(c => c);
  const votingAreasTransformed: GenericArea[] = [];
  for (let votingArea of votingAreas) {
    const surfaceMembers = [votingArea[key]['dagi:geometri']['gml:MultiSurface']['gml:surfaceMember']].flatMap(c => c);
    const polygonsForDagiArea: LatLng[][] = [];
    for (let surfaceMember of surfaceMembers) {
      let points = surfaceMember['gml:Polygon']['gml:exterior']['gml:LinearRing']['gml:coordinates'].split(' ').map(c => c.split(',')).map(c => {
        return EPSG25832.unproject(new Point(+c[0], +c[1], false));
      });
      if (points.length < 20) {
        polygonsForDagiArea.push(points);
      } else {
        polygonsForDagiArea.push(new Array(20).fill(0).map((_,i)=>points[Math.floor(i*points.length/20)]))
      }
      
    }
    const id = idGenerator(votingArea[key]);
    votingAreasTransformed.push({ id, polygons: polygonsForDagiArea });
  }
  return votingAreasTransformed;
}
