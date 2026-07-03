import { useEffect, useState } from 'react';

/**
 * 화면이 주어진 미디어 쿼리 조건을 만족하는지 실시간으로 알려주는 커스텀 훅
 * @param {string} query 예: '(min-width: 768px)'
 * @returns {boolean} 조건을 만족하면 true
 */
function useMediaQuery(query) {
  // TODO 1. matches 상태를 만들어보세요 (기본값 false)
  const [matches, setMatches] = useState(false);

  // TODO 2. useEffect 안에서
  //   - window.matchMedia(query)로 현재 상태를 확인하고
  //   - 'change' 이벤트가 발생할 때마다 상태를 갱신하는 리스너를 등록하세요
  //   - 컴포넌트가 사라질 때 리스너를 정리(cleanup)하는 것도 잊지 마세요
  useEffect(() => {
    const media = window.matchMedia(query);
    
    // 초기 상태 설정
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // 이벤트 리스너 등록
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    // cleanup 함수 반환 (메모리 누수 방지)
    return () => media.removeEventListener('change', listener);

  }, [matches, query]);

  // TODO 3. matches 값을 반환하세요
  return matches;
}

export default useMediaQuery;
