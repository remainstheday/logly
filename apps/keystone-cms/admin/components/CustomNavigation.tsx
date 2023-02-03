import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import {
  ListNavItems,
  NavigationContainer,
  NavItem,
} from "@keystone-6/core/admin-ui/components";

export function CustomNavigation({
  lists,
  authenticatedItem,
}: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href="https://billing.stripe.com/p/login/6oEaFY7790Fv2ly288">
        Subscription Management
      </NavItem>
    </NavigationContainer>
  );
}
