import { useState } from 'react';
// 커스텀 훅 useMediaQuery를 불러옵니다
import useMediaQuery from '../hooks/useMediaQuery';
import DesktopModal from './DesktopModal';
import MobileBottomDrawer from './MobileBottomDrawer';
import './ResponsiveExplanation.scss';

export default function ResponsiveExplanation() {
  const [isOpen, setIsOpen] = useState(false);

  // TODO 1. useMediaQuery를 이용해 현재 화면이 768px 이상인지(isDesktop) 구해보세요
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="responsive-explanation">
      <button className="responsive-explanation__open-btn" onClick={() => setIsOpen(true)}>
        라우팅 설명 보기
      </button>

      {/* TODO 2. isOpen이 true일 때, isDesktop 여부에 따라
                 DesktopModal 또는 MobileBottomDrawer를 조건부 렌더링 해보세요 */}
      {isOpen && (isDesktop ? 
        ( <DesktopModal onClose={() => setIsOpen(false)} /> ) 
        : ( <MobileBottomDrawer onClose={() => setIsOpen(false)} /> )
      )}
    </div>
  );
}
