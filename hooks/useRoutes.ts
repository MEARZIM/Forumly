import { useMemo } from "react";
import { usePathname } from "next/navigation";

import useConversation from "./useConversation";
import { ChevronLeft } from "lucide-react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: 'Back',
      href: '/conversations',
      icon: ChevronLeft,
      active: pathname === '/conversations' || !!conversationId
    },
  ], [pathname, conversationId]);

  return routes;
}

export default useRoutes;