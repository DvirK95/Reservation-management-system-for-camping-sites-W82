import { useState } from 'react';

function useHeader() {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  return { isCollapseOpen, setIsCollapseOpen };
}

export default useHeader;
