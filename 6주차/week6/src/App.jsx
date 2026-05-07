import "./App.css";
import MarkerIcon from "./assets/markerIcon.svg";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  const location = {
    lat: 37.582,
    lng: 127.011,
  };
  
  const handleMapClick = (map, mouseEvent) => {
    // 클릭한 위치의 위도와 경도 정보 가져오기
    const latlng = mouseEvent.latLng;
    // 위치 정보 콘솔 출력 
    console.log(`Clicked location: ${latlng.getLat()}, ${latlng.getLng()}`);
  
    // 마커 설정 변수 (비동기처리)
    const size = new kakao.maps.Size(30, 42);
    const options = new kakao.maps.Point(latlng.getLat(), latlng.getLng());

    // 마커 이미지 설정 
    const imageSrc = MarkerIcon; // 마커 이미지 경로
    const imageSize = size;
    const imageOption = { offset: options };

    // 마커 이미지 생성
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 해당 위치에 마커 추가
    var marker = new window.kakao.maps.Marker({
      position: latlng,
      image: markerImage,
      map: map
    });

    // 마커를 지도에 표시
    marker.setMap(map);
  }

  return (
    <div className="container">
      <Map center={location} className="map" onClick={handleMapClick}>
        <MapMarker position={location} image={ {src: MarkerIcon, size: { width: 30, height: 42 }} } />
      </Map>
    </div>
  );
}

export default App;