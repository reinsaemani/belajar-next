export type SidebarItem = {
  title: string;
  url: string;
  items?: SidebarItem[];
  subItems?: SidebarItem[];
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

    // ⬇️ cek baik 'items' maupun 'subItems'
    const children = item.items || item.subItems;
    if (children) {
      const found = findBreadcrumbPath(children, url, current);
      if (found) return found;
    }

    if (url.startsWith(item.url + "/")) {
      if (url.includes("/details")) {
        return [...current, { label: "Detail", href: url }];
      }
      if (url.includes("/records")) {
        return [...current, { label: "Records", href: url }];
      }

      return current;
    }
  }
  return null;
}
