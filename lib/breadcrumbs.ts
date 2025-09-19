export type SidebarItem = {
  title: string;
  url: string;
  items?: SidebarItem[];
};

export type Crumb = {
  label: string;
  href: string;
};

export function findBreadcrumbPath(
  items: SidebarItem[],
  url: string,
  path: Crumb[] = []
): Crumb[] | null {
  for (const item of items) {
    const current = [...path, { label: item.title, href: item.url }];
    if (item.url === url) return current;
    if (item.items) {
      const found = findBreadcrumbPath(item.items, url, current);
      if (found) return found;
    }
  }
  return null;
}
