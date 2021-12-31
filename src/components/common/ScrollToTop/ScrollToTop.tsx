// ScrollToTop.jsx
import { FC, useEffect, useRef } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop:FC <ScrollToTopProps> = ({children}) => {
  const location = useLocation();
  const prevLocationRef:any = useRef();
  useEffect(() => {
    prevLocationRef.current = location;
  });
  const prevLocation = prevLocationRef.current;
  var scrollToTop = true;

  console.log(prevLocation);
  console.log(location);
  if (prevLocation) {
    if (prevLocation.pathname == '/openings' && location.pathname == '/openings') {
      scrollToTop = false;
    }
  }
  console.log('scrollToTop', scrollToTop);
  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{children}</>
};

export default ScrollToTop;