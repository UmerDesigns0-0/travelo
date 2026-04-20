import {
  Map,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from "~/components/ui/map";

const TripMap = () => {
  return (
    <div className="h-96 w-full rounded-md border">
      <Map center={[20, 0]} zoom={2} className="h-full w-full rounded-md">
        <MapTileLayer />
        <MapZoomControl position="topright" />
        <MapMarker position={[48.8566, 2.3522]}>
          <MapPopup>
            <div>
              <h3 className="font-bold">Paris, France</h3>
              <p>The City of Light, known for its art, fashion, and culture.</p>
            </div>
          </MapPopup>
        </MapMarker>
      </Map>
    </div>
  );
};
export default TripMap;
