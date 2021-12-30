import { useEffect, useState } from "react";

const useWindowLocation = () => {
  const [url, setUrl] = useState(window.location.href);
  
  let lastUrl = window.location.href;
  
  const onUrlChange = () => {
    setUrl(window.location.href);
  }

  useEffect(() => {
    new MutationObserver(() => {
      const url = window.location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
      }
    }).observe(document, {subtree: true, childList: true});
  }, [])

  return url;

}
export default  useWindowLocation;