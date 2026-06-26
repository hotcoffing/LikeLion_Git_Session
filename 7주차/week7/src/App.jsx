import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import "./App.scss";
import getCandidates from "./apis/getCandidates";
import postCandidates from "./apis/postCandidates";
import deleteCandidates from "./apis/deleteCandidates";

export default function App() {
  const PROMISE_ID = import.meta.env.VITE_PROMISE_ID;
  const [candidates, setCandidates] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleMapClick = (_map, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 클릭한 위치의 좌표를 주소로 변환하여 selectedPlace 상태에 저장
    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address =
          (result[0].road_address?.address_name || result[0].address.address_name);
        // selectedPlace에 주소, 좌표 정보 저장
        setSelectedPlace({ lat: latlng.getLat(), lng: latlng.getLng(), address });
      }
    });
  };

  const handleRegister = async () => {
    // selectedPlace에 담긴 정보(주소, 좌표)를 API로 전달하여 후보지 등록
    const data = await postCandidates(PROMISE_ID, { 
      // 현재 selectedPlace에 (현재 상태 : {address, lat, lng} 포함)
      ...selectedPlace, 
      // API 명세에 맞게 name 필드 추가 (현재는 임시로 name 프로퍼티에 주소를 사용)
      name: selectedPlace.address, 
    });

    // 등록이 완료된 후보지를 후보지 목록에 추가
    setCandidates((prev) => [
      ...prev, 
      // API 응답에서 서버가 제공하는 id를 selectedPlace에 추가해 후보지 목록에 저장 
      {...selectedPlace, id: data.id}
    ]);
    // 등록 후 선택된 장소 초기화
    setSelectedPlace(null);
  };

  const handleDelete = async (id) => {
    (await 
      // 후보지 삭제 API 호출
      deleteCandidates(PROMISE_ID, id),
      // 삭제가 완료된 후보지를 후보지 목록에서 제거
      setCandidates((prev) => prev.filter((c) => c.id !== id)));
  };

  // 약속 후보지 목록을 최초 1회 불러오는 API 호출
  useEffect(() => {
    getCandidates(PROMISE_ID).then((data) => setCandidates(data));
  }, []);

  return (
    <div className="app">
      <Map
        center={{ lat: 37.5826, lng: 127.0109 }}
        level={3}
        className="map-wrapper"
        onClick={handleMapClick}
      > 
        {/* 후보지 MapMarker를 map 함수로 뿌리기 */}
        {candidates.map((c) => (
          <MapMarker
            key={c.id}
            position={{ lat: c.lat, lng: c.lng }}
          />
        ))}
      </Map>

      {
        /* 선택된 장소(selectedPlace)가 있을 경우 */
        selectedPlace && (
          <div className="place-card">
            {/* 선택된 장소의 주소를 보여주고 */}
            <p className="place-card__address">
              {selectedPlace.address}
            </p>
            {/* 후보지 등록 버튼을 누르면 handleRegister 함수가 실행되어 
            함수 내에서 API로 후보지 등록 후 함수 내에서 selectedPlace 상태를 초기화 */}
            <button className="place-card__btn" onClick={handleRegister}>
              후보지 등록
            </button>
          </div>
        )
      }

      <div className="candidate-list">
        <h3 className="candidate-list__title">📍 후보지 목록</h3>
        {candidates.map((c) => (
          <div className="candidate-item" key={c.id}>
            <span className="candidate-item__address">
              {c.address}
            </span>
            <button className="candidate-item__delete" onClick={() => handleDelete(c.id)}>
              취소
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}